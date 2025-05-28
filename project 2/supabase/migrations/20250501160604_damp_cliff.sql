/*
  # Set up test authentication account

  1. Changes
    - Creates a test user with proper authentication setup
    - Adds user profile
    - Creates necessary enrollments
    - Ensures proper role and metadata
*/

-- First clean up existing data
DO $$ 
BEGIN
  -- Delete enrollments first to avoid FK constraints
  DELETE FROM enrollments WHERE user_id IN (
    SELECT id FROM auth.users WHERE email = 'testuser@chelseamyers.courses'
  );
  
  -- Delete user profile
  DELETE FROM user_profiles WHERE user_id IN (
    SELECT id FROM auth.users WHERE email = 'testuser@chelseamyers.courses'
  );
  
  -- Delete user
  DELETE FROM auth.users WHERE email = 'testuser@chelseamyers.courses';
END $$;

-- Create test user with proper auth setup
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  'testuser@chelseamyers.courses',
  crypt('TestPassword123!', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Test User"}',
  'authenticated',
  'authenticated'
);

-- Create user profile
INSERT INTO user_profiles (
  user_id,
  first_name,
  last_name,
  country,
  state,
  city
) 
SELECT 
  id,
  'Test',
  'User',
  'United States',
  'CA',
  'San Francisco'
FROM auth.users
WHERE email = 'testuser@chelseamyers.courses';

-- Create enrollments
INSERT INTO enrollments (user_id, course_id)
SELECT 
  u.id,
  c.id
FROM auth.users u
CROSS JOIN courses c
WHERE u.email = 'testuser@chelseamyers.courses'
  AND c.slug = 'quantum-upgrade';