-- listing_submissions table
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS listing_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name text NOT NULL,
  city text NOT NULL,
  street text,
  phone text,
  email text,
  website text,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS policies
ALTER TABLE listing_submissions ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own submissions
CREATE POLICY "Users can submit listings"
  ON listing_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = submitted_by);

-- Users can read their own submissions
CREATE POLICY "Users can read own submissions"
  ON listing_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = submitted_by);

-- Service role (admin) can do everything (handled by service key bypassing RLS)
