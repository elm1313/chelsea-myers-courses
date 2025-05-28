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
USING (
  bucket_id = 'course-content' AND 
  EXISTS (
    SELECT 1 FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = auth.uid()
    AND c.storage_path IS NOT NULL
    AND (
      name LIKE c.storage_path || '/content/%' OR
      name LIKE c.storage_path || '/content/index.html'
    )
  )
);

-- Update course configuration to match actual storage path
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';