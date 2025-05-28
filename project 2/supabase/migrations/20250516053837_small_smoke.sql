/*
  # Update Dental Course Storage Path

  1. Changes
    - Set storage_path for dental course to match SCORM content structure
    - Ensure course has correct slug and path configuration
*/

-- Update storage path for Entrepreneurial Intelligence for Dentists course
UPDATE courses 
SET storage_path = 'dental',
    slug = 'dental'
WHERE id = 'b159ef8a-b9d9-42eb-957b-b2f5c6e19024';

-- Verify course configuration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM courses 
    WHERE id = 'b159ef8a-b9d9-42eb-957b-b2f5c6e19024' 
    AND storage_path IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'Course storage path not properly configured';
  END IF;
END $$;