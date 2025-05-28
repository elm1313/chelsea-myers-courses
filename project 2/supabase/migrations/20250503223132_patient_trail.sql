/*
  # Add Progress Tracking to Enrollments

  1. Changes
    - Add progress column to enrollments table
    - Update content_path for Quantum Upgrade course
    - Set initial progress values
*/

-- Add progress column to enrollments
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS progress integer DEFAULT 0;

-- Update content path for Quantum Upgrade course
UPDATE courses 
SET content_path = 'courses/quantum-upgrade'
WHERE slug = 'quantum-upgrade';

-- Set initial progress values
UPDATE enrollments 
SET progress = 0
WHERE progress IS NULL;