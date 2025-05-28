/*
  # Fix Storage Access for Course Content

  1. Changes
    - Recreate storage bucket with proper configuration
    - Simplify storage policy to match exact paths
    - Update course paths to match actual storage structure
*/

-- Recreate storage bucket with proper configuration
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-content', 'course-content', false)
ON CONFLICT (id) DO UPDATE 
SET public = false;

-- Enable RLS on storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

-- Create simple policy for course content access
CREATE POLICY "Authenticated users can read course content"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-content'
);

-- Update storage path for Quantum Upgrade course to match actual structure
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';