/*
  # Fix test account setup

  1. Changes
    - Properly create test user with correct ID and credentials
    - Set up user profile
    - Create course enrollment
    - Ensure all required fields are populated
*/

-- First clean up any existing test account
DO $$ 
BEGIN
  -- Delete enrollments first to avoid FK constraints
  DELETE FROM enrollments 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email = 'test@chelseamyers.courses'
  );
  
  -- Delete user profile
  DELETE FROM user_profiles 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email = 'test@chelseamyers.courses'
  );
  
  -- Delete user
  DELETE FROM auth.users 
  WHERE email = 'test@chelseamyers.courses';
END $$;

-- Create test user with proper auth setup
DO $$
DECLARE
  test_user_id uuid := gen_random_uuid();
BEGIN
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
    test_user_id,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'test@chelseamyers.courses',
    crypt('Test123!', gen_salt('bf')),
    now(),
    now(),
    false,
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "Test User"}',
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
  ) VALUES (
    test_user_id,
    'Test',
    'User',
    'United States',
    'CA',
    'San Francisco'
  );

  -- Create enrollment for Quantum Upgrade course
  INSERT INTO enrollments (user_id, course_id)
  SELECT 
    test_user_id,
    id
  FROM courses
  WHERE slug = 'quantum-upgrade';
END $$;