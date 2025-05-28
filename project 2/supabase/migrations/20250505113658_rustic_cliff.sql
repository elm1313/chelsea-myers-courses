-- Update storage path for Quantum Upgrade course to match exact folder structure
UPDATE courses 
SET storage_path = 'quantum-upgrade/content'
WHERE slug = 'quantum-upgrade';

-- Ensure storage policy is correct
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
    AND c.storage_path IS NOT NULL
    AND (
      -- Allow access to exact path and any subfolders
      name LIKE c.storage_path || '%' OR
      name LIKE c.storage_path || '/%'
    )
  )
);