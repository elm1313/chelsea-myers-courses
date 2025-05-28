-- Create bonus courses table to track relationships
CREATE TABLE IF NOT EXISTS bonus_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  main_course_id uuid REFERENCES courses(id) NOT NULL,
  bonus_course_id uuid REFERENCES courses(id) NOT NULL,
  UNIQUE(main_course_id, bonus_course_id)
);

-- Add the 5 bonus courses
INSERT INTO courses (
  name,
  slug,
  price,
  storage_path,
  is_standalone,
  stripe_price_id
) VALUES 
  (
    'Framework for Difficult Conversations',
    'framework-difficult-conversations',
    0,
    'communication/bonus/framework-difficult-conversations',
    false,
    null
  ),
  (
    'Analyzing Perspectives',
    'analyzing-perspectives',
    0,
    'communication/bonus/analyzing-perspectives',
    false,
    null
  ),
  (
    'The Connection Duo: Professional Communication',
    'connection-duo',
    0,
    'communication/bonus/connection-duo',
    false,
    null
  ),
  (
    'Communication: Influencing Behavior and Change',
    'influencing-behavior',
    0,
    'communication/bonus/influencing-behavior',
    false,
    null
  ),
  (
    'Gossip: What It Is and Weeding It Out',
    'gossip',
    0,
    'communication/bonus/gossip',
    false,
    null
)
ON CONFLICT (slug) DO NOTHING;

-- Link bonus courses to main course
INSERT INTO bonus_courses (main_course_id, bonus_course_id)
SELECT 
  (SELECT id FROM courses WHERE slug = 'communication'),
  id
FROM courses 
WHERE slug IN (
  'framework-difficult-conversations',
  'analyzing-perspectives',
  'connection-duo',
  'influencing-behavior',
  'gossip'
)
ON CONFLICT (main_course_id, bonus_course_id) DO NOTHING;

-- Create function to handle automatic bonus course enrollment
CREATE OR REPLACE FUNCTION handle_bonus_course_enrollment()
RETURNS TRIGGER AS $$
BEGIN
  -- When a new enrollment is created
  INSERT INTO enrollments (user_id, course_id)
  SELECT 
    NEW.user_id,
    bc.bonus_course_id
  FROM bonus_courses bc
  WHERE bc.main_course_id = NEW.course_id
  ON CONFLICT (user_id, course_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic bonus course enrollment
DROP TRIGGER IF EXISTS auto_enroll_bonus_courses ON enrollments;
CREATE TRIGGER auto_enroll_bonus_courses
  AFTER INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION handle_bonus_course_enrollment();

-- Update RLS policies to handle bonus courses
DROP POLICY IF EXISTS "Hide bonus courses from catalog" ON courses;
CREATE POLICY "Hide bonus courses from catalog"
  ON courses
  FOR SELECT
  TO public
  USING (
    is_standalone = true OR
    id IN (
      SELECT course_id 
      FROM enrollments 
      WHERE user_id = auth.uid()
    ) OR
    id NOT IN (
      SELECT bonus_course_id 
      FROM bonus_courses
    )
  );