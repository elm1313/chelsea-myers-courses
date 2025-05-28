-- First create a temporary table to store existing data
CREATE TEMP TABLE temp_user_progress AS
SELECT 
  up.id,
  u.email as user_email,
  up.course_id,
  up.completion_percentage,
  up.last_accessed,
  up.scorm_completion_status,
  up.scorm_progress_measure,
  up.time_spent
FROM user_progress up
JOIN auth.users u ON up.user_id = u.id;

-- Drop existing table
DROP TABLE IF EXISTS user_progress;

-- Create new table with updated structure
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress_data jsonb DEFAULT '{}'::jsonb,
  completion_percentage integer DEFAULT 0,
  last_accessed timestamptz DEFAULT now(),
  scorm_completion_status text DEFAULT 'incomplete',
  scorm_progress_measure float DEFAULT 0,
  time_spent integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_email, course_id),
  CONSTRAINT valid_completion_status CHECK (scorm_completion_status IN ('not attempted', 'incomplete', 'completed', 'passed', 'failed')),
  CONSTRAINT valid_progress_measure CHECK (scorm_progress_measure >= 0.0 AND scorm_progress_measure <= 1.0),
  CONSTRAINT valid_time_spent CHECK (time_spent >= 0)
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Migrate existing data
INSERT INTO user_progress (
  id,
  user_email,
  course_id,
  completion_percentage,
  last_accessed,
  scorm_completion_status,
  scorm_progress_measure,
  time_spent,
  progress_data
)
SELECT 
  id,
  user_email,
  course_id,
  completion_percentage,
  COALESCE(last_accessed, now()),
  COALESCE(scorm_completion_status, 'incomplete'),
  COALESCE(scorm_progress_measure, 0),
  COALESCE(time_spent, 0),
  '{}'::jsonb
FROM temp_user_progress;

-- Drop temporary table
DROP TABLE temp_user_progress;

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  WITH CHECK (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create index for performance
CREATE INDEX idx_user_progress_email_course ON user_progress (user_email, course_id);