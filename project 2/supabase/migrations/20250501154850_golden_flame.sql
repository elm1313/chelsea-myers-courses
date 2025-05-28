-- First clean up existing data
DO $$ 
BEGIN
  -- Delete enrollments first to avoid FK constraints
  DELETE FROM enrollments WHERE user_id = '00000000-0000-0000-0000-000000000005';
  
  -- Delete user profile
  DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000005';
  
  -- Delete user
  DELETE FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000005';
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
  '00000000-0000-0000-0000-000000000005',
  'test@example.com',
  crypt('test123', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
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
) VALUES (
  '00000000-0000-0000-0000-000000000005',
  'Test',
  'User',
  'United States',
  'CA',
  'San Francisco'
);

-- Create enrollments
INSERT INTO enrollments (user_id, course_id)
SELECT 
  '00000000-0000-0000-0000-000000000005',
  id
FROM courses 
WHERE slug IN ('quantum-upgrade', 'communication');