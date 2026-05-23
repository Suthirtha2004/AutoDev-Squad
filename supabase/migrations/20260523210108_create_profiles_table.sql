/*
  # AutoDev Squad - Projects Table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `idea` (text) - the user's project idea input
      - `pm_output` (text) - Product Manager AI output
      - `uiux_output` (text) - UI/UX AI output
      - `architect_output` (text) - System Architect AI output
      - `backend_output` (text) - Backend Developer AI output
      - `qa_output` (text) - QA Tester AI output
      - `mode` (text) - 'full' or agent name for individual mode
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `projects` table
    - Public insert and select allowed (no auth required for this app)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea text NOT NULL,
  pm_output text DEFAULT '',
  uiux_output text DEFAULT '',
  architect_output text DEFAULT '',
  backend_output text DEFAULT '',
  qa_output text DEFAULT '',
  mode text DEFAULT 'full',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert projects"
  ON projects FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read projects"
  ON projects FOR SELECT
  TO anon
  USING (true);
