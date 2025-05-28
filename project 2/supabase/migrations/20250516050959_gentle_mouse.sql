/*
  # Enable Multi-Course Enrollment Support

  1. Changes
    - Add unique constraint to enrollments table to prevent duplicate enrollments
    - Add cascade delete to ensure clean removal of related records
    - Update existing RLS policies to support multiple courses
*/

-- Ensure unique constraint exists for user_id and course_id combination
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'enrollments_user_id_course_id_key'
  ) THEN
    ALTER TABLE enrollments 
    ADD CONSTRAINT enrollments_user_id_course_id_key 
    UNIQUE (user_id, course_id);
  END IF;
END $$;

-- Add cascade delete for course progress
ALTER TABLE course_progress
DROP CONSTRAINT IF EXISTS course_progress_user_id_fkey,
ADD CONSTRAINT course_progress_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- Add cascade delete for enrollments
ALTER TABLE enrollments
DROP CONSTRAINT IF EXISTS enrollments_user_id_fkey,
ADD CONSTRAINT enrollments_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- Update RLS policies for enrollments
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
CREATE POLICY "Users can view their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Update RLS policies for course progress
DROP POLICY IF EXISTS "Users can view their own progress" ON course_progress;
CREATE POLICY "Users can view their own progress"
  ON course_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create helper function to enroll user in course
CREATE OR REPLACE FUNCTION enroll_user(
  p_user_id uuid,
  p_course_id uuid
) RETURNS uuid AS $$
DECLARE
  v_enrollment_id uuid;
BEGIN
  -- Insert enrollment if it doesn't exist
  INSERT INTO enrollments (user_id, course_id)
  VALUES (p_user_id, p_course_id)
  ON CONFLICT (user_id, course_id) DO NOTHING
  RETURNING id INTO v_enrollment_id;
  
  RETURN v_enrollment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;