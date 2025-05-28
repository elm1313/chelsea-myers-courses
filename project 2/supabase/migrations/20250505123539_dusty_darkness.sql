-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

-- Create a more permissive policy for course content access
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
      -- Allow access to index.html and all course content
      name = storage_path || '/index.html' OR
      name LIKE storage_path || '/%' OR
      name LIKE storage_path || '%'
    )
  )
);

-- Ensure storage path is correct
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';