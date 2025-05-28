-- Update password for test user
UPDATE auth.users
SET encrypted_password = crypt('2nd1stDate12!', gen_salt('bf')),
    updated_at = now()
WHERE id = '00000000-0000-0000-0000-000000000005';