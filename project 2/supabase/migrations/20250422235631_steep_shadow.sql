/*
  # Initial Schema Setup for Course Platform

  1. New Tables
    - courses
      - id (uuid, primary key)
      - name (text)
      - slug (text, unique)
      - price (integer)
      - content_path (text, nullable)
      - is_standalone (boolean)
      - created_at (timestamp)
      
    - enrollments
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - course_id (uuid, references courses)
      - created_at (timestamp)
      - bundle_id (uuid, nullable, for tracking bundle purchases)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their enrollments
    - Add policies for authenticated users to read courses
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price integer NOT NULL,
  content_path text,
  is_standalone boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  course_id uuid REFERENCES courses NOT NULL,
  created_at timestamptz DEFAULT now(),
  bundle_id uuid,
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Courses are viewable by everyone"
  ON courses
  FOR SELECT
  TO public
  USING (true);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial course data
INSERT INTO courses (name, slug, price, is_standalone) VALUES
  ('Quantum Upgrade Personal Transformation', 'quantum-upgrade', 399, false),
  ('Weeding Out Gossip', 'weeding-out-gossip', 299, false),
  ('Mastering Communication', 'mastering-communication', 349, false),
  ('Entrepreneurial Intelligence for Dentists', 'dentists', 599, true);