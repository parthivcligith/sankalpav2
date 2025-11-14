-- =====================================================
-- Add UPDATE and INSERT Policies for Admin Access
-- =====================================================
-- Run this in Supabase SQL Editor to allow authenticated users
-- to update and insert data in the admin sections
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated update access for hero_section" ON hero_section;
DROP POLICY IF EXISTS "Authenticated insert access for hero_section" ON hero_section;
DROP POLICY IF EXISTS "Authenticated update access for hero_rotating_texts" ON hero_rotating_texts;
DROP POLICY IF EXISTS "Authenticated insert access for hero_rotating_texts" ON hero_rotating_texts;
DROP POLICY IF EXISTS "Authenticated delete access for hero_rotating_texts" ON hero_rotating_texts;

DROP POLICY IF EXISTS "Authenticated update access for about_section" ON about_section;
DROP POLICY IF EXISTS "Authenticated insert access for about_section" ON about_section;

-- Hero Section Policies
CREATE POLICY "Authenticated update access for hero_section" 
  ON hero_section FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated insert access for hero_section" 
  ON hero_section FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Hero Rotating Texts Policies
CREATE POLICY "Authenticated update access for hero_rotating_texts" 
  ON hero_rotating_texts FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated insert access for hero_rotating_texts" 
  ON hero_rotating_texts FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete access for hero_rotating_texts" 
  ON hero_rotating_texts FOR DELETE 
  USING (auth.role() = 'authenticated');

-- About Section Policies
CREATE POLICY "Authenticated update access for about_section" 
  ON about_section FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated insert access for about_section" 
  ON about_section FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Projects already have policies (assuming they work)
-- If projects work, we don't need to change them

