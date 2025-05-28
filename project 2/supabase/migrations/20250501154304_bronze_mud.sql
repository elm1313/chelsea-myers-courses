/*
  # Update test accounts with proper credentials
  
  1. Changes
    - Updates test account passwords with properly hashed values
    - Ensures accounts are confirmed and active
*/

-- Update the bundle test account
UPDATE auth.users
SET 
  encrypted_password = crypt('TestP@ssw0rd123', gen_salt('bf')),
  email_confirmed_at = now(),
  confirmation_sent_at = now(),
  is_sso_user = false,
  raw_app_meta_data = '{"provider":"email","providers":["email"]}',
  raw_user_meta_data = '{"full_name":"Test Bundle"}'
WHERE 
  email = 'courses+bundle@test.com';

-- Ensure the account exists if it doesn't
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  is_sso_user,
  raw_app_meta_data,
  raw_user_meta_data
) 
SELECT 
  '00000000-0000-0000-0000-000000000005'::uuid,
  'courses+bundle@test.com',
  crypt('TestP@ssw0rd123', gen_salt('bf')),
  now(),
  now(),
  false,
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test Bundle"}'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'courses+bundle@test.com'
);

-- Ensure user profile exists
INSERT INTO user_profiles (user_id, first_name, last_name, country, state, city)
VALUES (
  '00000000-0000-0000-0000-000000000005',
  'Test',
  'Bundle',
  'United States',
  'Test State',
  'Test City'
) ON CONFLICT (user_id) DO NOTHING;

-- Ensure course enrollments exist
INSERT INTO enrollments (user_id, course_id)
SELECT 
  '00000000-0000-0000-0000-000000000005',
  id
FROM courses 
WHERE slug IN ('quantum-upgrade', 'communication')
ON CONFLICT (user_id, course_id) DO NOTHING;