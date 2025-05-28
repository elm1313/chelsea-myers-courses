/*
  # Add last_streak column to streaks table

  1. Changes
    - Add `last_streak` column to `streaks` table with default value of 0
    - This column will store the previous streak value when a user resets their streak

  2. Security
    - No changes to RLS policies needed as the existing policies cover the new column
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'streaks' AND column_name = 'last_streak'
  ) THEN
    ALTER TABLE streaks ADD COLUMN last_streak integer DEFAULT 0;
  END IF;
END $$;