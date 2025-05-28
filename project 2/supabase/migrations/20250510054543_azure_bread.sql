-- First create the user in auth.users
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
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000'::uuid,
  'callninjallc@gmail.com',
  crypt('2nd1stDate12!', gen_salt('bf')),
  now(),
  now(),
  false,
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  now(),
  now(),
  now(),
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
WHERE email = 'callninjallc@gmail.com';

-- Create enrollment
INSERT INTO enrollments (
  user_id,
  course_id
)
SELECT 
  id,
  '0273b9fb-8122-4ae9-a10e-3bb521a9ee14'
FROM auth.users
WHERE email = 'callninjallc@gmail.com';