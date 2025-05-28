-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

-- Create a more permissive policy for testing
CREATE POLICY "Authenticated users can read course content"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-content'
);

-- Update storage path to include content subdirectory
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';

-- Ensure the bucket is private
UPDATE storage.buckets
SET public = false
WHERE id = 'course-content';