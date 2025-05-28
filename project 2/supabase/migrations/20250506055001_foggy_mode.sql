/*
  # Update Course Storage Path

  1. Changes
    - Update storage path for quantum-upgrade course to match package.zip location
*/

-- Update course configuration to match package.zip location
UPDATE courses 
SET storage_path = 'quantum-upgrade'
WHERE slug = 'quantum-upgrade';