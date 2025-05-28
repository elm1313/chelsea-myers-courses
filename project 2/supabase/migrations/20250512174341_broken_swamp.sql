/*
  # Add Nickname to User Profiles

  1. Changes
    - Add nickname column to user_profiles table
    - Set default nickname to first_name
*/

-- Add nickname column with first_name as default
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS nickname text;

-- Update existing profiles to use first_name as nickname
UPDATE user_profiles
SET nickname = first_name
WHERE nickname IS NULL;