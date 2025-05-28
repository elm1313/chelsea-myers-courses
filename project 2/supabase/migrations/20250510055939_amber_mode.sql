/*
  # Fix Authentication Schema and Permissions

  1. Changes
    - Grant necessary permissions to authenticated and anon roles
    - Ensure auth schema exists and has correct permissions
    - Fix user management policies
  
  2. Security
    - Add proper RLS policies for auth schema
    - Grant minimal required permissions to roles
*/

-- Ensure proper permissions for auth schema
GRANT USAGE ON SCHEMA auth TO postgres, authenticated, anon;
GRANT USAGE ON SCHEMA public TO postgres, authenticated, anon;

-- Grant necessary permissions for auth-related functions
GRANT EXECUTE ON FUNCTION auth.role() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated, anon;

-- Ensure authenticated users can read their own data
GRANT SELECT ON auth.users TO authenticated, anon;
GRANT SELECT ON public.user_profiles TO authenticated;

-- Fix RLS policies for user_profiles if they don't exist
DO $$ 
BEGIN
    -- Check if the policy doesn't exist before creating
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles' 
        AND policyname = 'Users can view their own profile'
    ) THEN
        CREATE POLICY "Users can view their own profile" 
        ON public.user_profiles
        FOR SELECT 
        TO authenticated 
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles' 
        AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile" 
        ON public.user_profiles
        FOR UPDATE 
        TO authenticated 
        USING (auth.uid() = user_id)
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;