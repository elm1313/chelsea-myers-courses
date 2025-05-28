/*
  # Enroll User in Influencing Behavior Course

  1. Changes
    - Enroll user in the Communication: Influencing Behavior and Change course
    - Ensure course exists with correct ID
*/

-- First ensure the course exists with the correct ID
INSERT INTO courses (
  id,
  name,
  slug,
  price,
  storage_path,
  is_standalone,
  stripe_price_id
) VALUES (
  'a3b0c127-857f-46a9-8935-f290f87a00ad',
  'Communication: Influencing Behavior and Change',
  'influencing-behavior',
  0,
  'communication_influencing',
  false,
  null
) ON CONFLICT (id) DO UPDATE
SET storage_path = 'communication_influencing';

-- Enroll the user in the course
INSERT INTO enrollments (
  user_id,
  course_id
) VALUES (
  '32b60b73-d016-4c6b-b82d-28e851ad3124',
  'a3b0c127-857f-46a9-8935-f290f87a00ad'
) ON CONFLICT (user_id, course_id) DO NOTHING;