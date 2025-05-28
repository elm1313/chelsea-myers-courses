/*
  # Update User Progress Table for SCORM Tracking

  1. Changes
    - Remove current_lesson and completed_lessons columns
    - Add scorm_completion_status (text)
    - Add scorm_progress_measure (float)
    - Add time_spent (integer) for tracking time in seconds
    
  2. Security
    - Maintain existing RLS policies
*/

-- First remove the old columns
ALTER TABLE user_progress
DROP COLUMN IF EXISTS current_lesson,
DROP COLUMN IF EXISTS completed_lessons;

-- Add new SCORM tracking columns
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS scorm_completion_status text DEFAULT 'not attempted',
ADD COLUMN IF NOT EXISTS scorm_progress_measure float DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS time_spent integer DEFAULT 0;

-- Add check constraints
ALTER TABLE user_progress
ADD CONSTRAINT valid_completion_status 
  CHECK (scorm_completion_status IN ('not attempted', 'incomplete', 'completed', 'passed', 'failed')),
ADD CONSTRAINT valid_progress_measure
  CHECK (scorm_progress_measure >= 0.0 AND scorm_progress_measure <= 1.0),
ADD CONSTRAINT valid_time_spent
  CHECK (time_spent >= 0);

-- Update existing rows to have valid default values
UPDATE user_progress
SET 
  scorm_completion_status = 'not attempted',
  scorm_progress_measure = 0.0,
  time_spent = 0
WHERE scorm_completion_status IS NULL;