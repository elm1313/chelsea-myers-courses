/*
  # Update Course Slug for Entrepreneurial Intelligence for Dentists

  1. Changes
    - Update slug to match GitHub repository structure
    - Update storage_path to match new slug
    - Maintain existing course ID and other properties
*/

-- Update course slug and storage path
UPDATE courses 
SET slug = 'entrepreneurial_intelligence_for_dentists',
    storage_path = 'entrepreneurial_intelligence_for_dentists'
WHERE id = 'b159ef8a-b9d9-42eb-957b-b2f5c6e19024';

-- Verify the update was successful
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM courses 
    WHERE id = 'b159ef8a-b9d9-42eb-957b-b2f5c6e19024' 
    AND slug = 'entrepreneurial_intelligence_for_dentists'
  ) THEN
    RAISE EXCEPTION 'Course slug not properly updated';
  END IF;
END $$;