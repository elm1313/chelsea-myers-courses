/*
  # Simplify Storage Access Control

  1. Changes
    - Create storage bucket with proper settings
    - Add helper function for path validation
    - Implement simplified storage policy
    - Update course paths
*/

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-content', 'course-content', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can read course content" ON storage.objects;

-- Create helper function to check if a path is within a course directory
CREATE OR REPLACE FUNCTION storage.is_course_path(object_path text, course_path text)
RETURNS boolean AS $$
BEGIN
  -- Normalize paths by removing leading/trailing slashes
  object_path := trim(both '/' from object_path);
  course_path := trim(both '/' from course_path);
  
  -- Check if object path starts with course path
  RETURN object_path LIKE course_path || '%';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create simplified policy for course content access
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
    AND storage.is_course_path(name, c.storage_path)
  )
);

-- Update storage path for Quantum Upgrade course
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';