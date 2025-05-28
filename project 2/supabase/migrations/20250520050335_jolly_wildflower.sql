/*
  # Fix Communication Course Enrollment

  1. Changes
    - Ensure Communication Blueprint course exists with correct ID
    - Ensure Influencing Behavior bonus course exists with correct ID
    - Link courses properly in bonus_courses table
    - Enroll user in both courses
*/

-- First ensure the main Communication Blueprint course exists
INSERT INTO courses (
  id,
  name,
  slug,
  price,
  storage_path,
  is_standalone
) VALUES (
  'c159ef8a-b9d9-42eb-957b-b2f5c6e19024',
  'The Communication Blueprint',
  'communication',
  199,
  'communication',
  true
) ON CONFLICT (id) DO UPDATE
SET storage_path = 'communication';

-- Ensure the Influencing Behavior bonus course exists
INSERT INTO courses (
  id,
  name,
  slug,
  price,
  storage_path,
  is_standalone
) VALUES (
  'a3b0c127-857f-46a9-8935-f290f87a00ad',
  'Communication: Influencing Behavior and Change',
  'influencing-behavior',
  0,
  'communication_influencing',
  false
) ON CONFLICT (id) DO UPDATE
SET storage_path = 'communication_influencing';

-- Link the bonus course to the main course
INSERT INTO bonus_courses (
  main_course_id,
  bonus_course_id
) VALUES (
  'c159ef8a-b9d9-42eb-957b-b2f5c6e19024',
  'a3b0c127-857f-46a9-8935-f290f87a00ad'
) ON CONFLICT (main_course_id, bonus_course_id) DO NOTHING;

-- Enroll the user in the main Communication Blueprint course
INSERT INTO enrollments (
  user_id,
  course_id
) VALUES (
  '32b60b73-d016-4c6b-b82d-28e851ad3124',
  'c159ef8a-b9d9-42eb-957b-b2f5c6e19024'
) ON CONFLICT (user_id, course_id) DO NOTHING;

-- The bonus course enrollment will happen automatically through the trigger