/*
  # Add Streak Tracking

  1. New Tables
    - streaks
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - current_streak (integer)
      - longest_streak (integer)
      - last_updated (timestamptz)
      - created_at (timestamptz)
      - streak_history (jsonb)

  2. Security
    - Enable RLS
    - Add policies for users to manage their own streaks
*/

CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  streak_history jsonb DEFAULT '[]',
  UNIQUE(user_id)
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own streaks"
  ON streaks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);