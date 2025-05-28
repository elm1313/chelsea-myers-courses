/*
  # Update Course Content Storage

  1. Changes
    - Add storage_path column to courses table
    - Update existing courses with storage paths
    - Add RLS policies for storage access
*/

-- Add storage path column
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS storage_path text;

-- Update storage path for Quantum Upgrade course
UPDATE courses 
SET storage_path = 'course-content/quantum-upgrade'
WHERE slug = 'quantum-upgrade';

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('course-content', 'course-content')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read course content
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
    AND storage_path IS NOT NULL
    AND storage.foldername(name) = storage.foldername(c.storage_path)
  )
);