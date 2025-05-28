-- Update storage bucket to be public (required for SCORM content)
UPDATE storage.buckets
SET public = true
WHERE id = 'course-content';

-- Drop old storage policies as we'll use public access
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

-- Create policy for public read access to course content
CREATE POLICY "Public can read course content"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'course-content');

-- Update course paths to match SCORM package structure
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';