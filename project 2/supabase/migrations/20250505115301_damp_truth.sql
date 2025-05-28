-- Update storage policy to be more permissive for testing
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

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
  )
);

-- Ensure storage path is correct
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';