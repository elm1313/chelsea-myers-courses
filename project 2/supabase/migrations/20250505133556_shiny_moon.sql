-- Ensure storage bucket exists and is private
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-content', 'course-content', false)
ON CONFLICT (id) DO UPDATE 
SET public = false;

-- Enable RLS on storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

-- Create simplified policy for course content access
CREATE POLICY "Authenticated users can read course content"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-content' AND 
  EXISTS (
    SELECT 1 FROM enrollments e
    WHERE e.user_id = auth.uid()
  )
);

-- Update storage path for Quantum Upgrade course
UPDATE courses 
SET storage_path = 'quantum-upgrade',
    content_path = null
WHERE slug = 'quantum-upgrade';