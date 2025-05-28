-- First clean up any existing test account
DO $$ 
BEGIN
  -- Delete enrollments first to avoid FK constraints
  DELETE FROM enrollments 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email = 'callninja@gmail.com'
  );
  
  -- Delete user profile
  DELETE FROM user_profiles 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email = 'callninja@gmail.com'
  );
  
  -- Delete user
  DELETE FROM auth.users 
  WHERE email = 'callninja@gmail.com';
END $$;

-- Create test user with proper auth setup
DO $$
DECLARE
  test_user_id uuid;
BEGIN
  -- Insert the user
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
    'callninja@gmail.com',
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
  ) RETURNING id INTO test_user_id;

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
  INSERT INTO enrollments (
    user_id,
    course_id
  ) VALUES (
    test_user_id,
    '0273b9fb-8122-4ae9-a10e-3bb521a9ee14'
  );
END $$;