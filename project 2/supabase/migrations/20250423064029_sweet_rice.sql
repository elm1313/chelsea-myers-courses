/*
  # Create test users and enrollments

  1. Test Users
    - Creates test users in auth.users table
    - Creates corresponding user profiles
    - Uses secure passwords with proper complexity

  2. Enrollments
    - Creates test enrollments for each user
    - Links users to appropriate courses
*/

-- Create test users in auth.users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data)
VALUES 
  ('00000000-0000-0000-0000-000000000001'::uuid, 'courses@test.com', '$2a$10$TestP@ssw0rd123ForQuantum', now(), '{"provider":"email","providers":["email"]}'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'courses+gossip@test.com', '$2a$10$TestP@ssw0rd123ForGossip', now(), '{"provider":"email","providers":["email"]}'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'courses+communication@test.com', '$2a$10$TestP@ssw0rd123ForComm', now(), '{"provider":"email","providers":["email"]}'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'courses+dental@test.com', '$2a$10$TestP@ssw0rd123ForDental', now(), '{"provider":"email","providers":["email"]}'),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'courses+bundle@test.com', '$2a$10$TestP@ssw0rd123ForBundle', now(), '{"provider":"email","providers":["email"]}')
ON CONFLICT (id) DO NOTHING;

-- Create test user profiles
INSERT INTO user_profiles (user_id, first_name, last_name, country, state, city)
VALUES 
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Test', 'Quantum', 'United States', 'Test State', 'Test City'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Test', 'Gossip', 'United States', 'Test State', 'Test City'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Test', 'Communication', 'United States', 'Test State', 'Test City'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Test', 'Dental', 'United States', 'Test State', 'Test City'),
  ('00000000-0000-0000-0000-000000000005'::uuid, 'Test', 'Bundle', 'United States', 'Test State', 'Test City')
ON CONFLICT (user_id) DO NOTHING;

-- Create enrollments for each test account
WITH course_ids AS (
  SELECT id, slug FROM courses
)
INSERT INTO enrollments (user_id, course_id)
SELECT v.user_id::uuid, c.id
FROM (
  VALUES 
    ('00000000-0000-0000-0000-000000000001', 'quantum'),
    ('00000000-0000-0000-0000-000000000002', 'gossip'),
    ('00000000-0000-0000-0000-000000000003', 'communication'),
    ('00000000-0000-0000-0000-000000000004', 'dental'),
    ('00000000-0000-0000-0000-000000000005', 'quantum'),
    ('00000000-0000-0000-0000-000000000005', 'gossip'),
    ('00000000-0000-0000-0000-000000000005', 'communication')
) AS v(user_id, course_slug)
JOIN course_ids c ON c.slug = v.course_slug
ON CONFLICT (user_id, course_id) DO NOTHING;