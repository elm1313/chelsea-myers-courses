/*
  # Add Storage Path to Courses

  1. Changes
    - Add content_path column to courses table to support Supabase Storage paths
    - Update existing courses with storage paths
*/

-- Update content_path for Quantum Upgrade course to use Supabase Storage
UPDATE courses 
SET content_path = 'storage:/courses/quantum-upgrade'
WHERE slug = 'quantum-upgrade';