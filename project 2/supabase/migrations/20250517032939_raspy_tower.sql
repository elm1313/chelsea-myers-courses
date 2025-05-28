/*
  # Add Communication Blueprint Course Configuration

  1. Changes
    - Add Communication Blueprint course to courses table
    - Set up proper storage path and slug
    - Ensure course has correct price and configuration
*/

-- Add Communication Blueprint course if it doesn't exist
INSERT INTO courses (
  id,
  name,
  slug,
  price,
  storage_path,
  is_standalone,
  stripe_price_id
)
VALUES (
  'c159ef8a-b9d9-42eb-957b-b2f5c6e19024',
  'The Communication Blueprint',
  'communication',
  199,
  'communication',
  false,
  'prod_SBIEqrLKsAdRio'
)
ON CONFLICT (slug) DO UPDATE
SET 
  storage_path = 'communication',
  stripe_price_id = 'prod_SBIEqrLKsAdRio';

-- Create helper function to enroll test users
CREATE OR REPLACE FUNCTION enroll_in_communication_blueprint(
  p_user_id uuid
) RETURNS void AS $$
BEGIN
  INSERT INTO enrollments (user_id, course_id)
  SELECT p_user_id, id
  FROM courses
  WHERE slug = 'communication'
  ON CONFLICT (user_id, course_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;