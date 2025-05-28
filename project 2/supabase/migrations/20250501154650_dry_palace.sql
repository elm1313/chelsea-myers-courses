/*
  # Fix test account authentication

  1. Changes
    - Remove existing test account data
    - Recreate test account with proper password hashing
    - Set up profile and enrollments
*/

-- First remove existing enrollments for the test user
DELETE FROM enrollments WHERE user_id = '00000000-0000-0000-0000-000000000005';

-- Then remove existing user profile
DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000005';

-- Now we can safely remove the user
DELETE FROM auth.users WHERE email = 'courses+bundle@test.com';

-- Create the test account with proper password hashing
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  is_sso_user,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  last_sign_in_at,
  aud,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000005'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'courses+bundle@test.com',
  crypt('test123', gen_salt('bf')),
  now(),
  now(),
  false,
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated'
);

-- Create user profile
INSERT INTO user_profiles (user_id, first_name, last_name, country, state, city)
VALUES (
  '00000000-0000-0000-0000-000000000005',
  'Test',
  'Bundle',
  'United States',
  'Test State',
  'Test City'
);

-- Create course enrollments
INSERT INTO enrollments (user_id, course_id)
SELECT 
  '00000000-0000-0000-0000-000000000005',
  id
FROM courses 
WHERE slug IN ('quantum-upgrade', 'communication');