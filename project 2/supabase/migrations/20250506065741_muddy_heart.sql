-- Update course configuration to match content structure
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';

-- Ensure storage bucket exists and is private
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-content', 'course-content', false)
ON CONFLICT (id) DO UPDATE 
SET public = false;

-- Enable RLS on storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

-- Create policy for course content access
CREATE POLICY "Authenticated users can read course content"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'course-content');