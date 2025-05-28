/*
  # Add Stripe-related fields to user_profiles and courses tables

  1. Changes
    - Add stripe_customer_id to user_profiles
    - Add stripe_price_id to courses
    
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE user_profiles
ADD COLUMN stripe_customer_id text;

ALTER TABLE courses
ADD COLUMN stripe_price_id text;

-- Update existing RLS policies to include new columns
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);