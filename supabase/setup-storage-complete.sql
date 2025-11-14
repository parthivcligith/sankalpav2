-- =====================================================
-- Complete Storage Setup for Image Uploads
-- =====================================================
-- Run this in Supabase SQL Editor to set up storage buckets
-- and policies for hero-images, about-images, and project-images
-- =====================================================

-- Create storage buckets (if they don't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('hero-images', 'hero-images', true),
  ('project-images', 'project-images', true),
  ('about-images', 'about-images', true),
  ('general-images', 'general-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete" ON storage.objects;

-- Storage policies for public read access (anyone can view images)
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images'));

-- Storage policies for authenticated upload (logged-in users can upload)
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images')
    AND auth.role() = 'authenticated'
  );

-- Storage policies for authenticated update (logged-in users can update)
CREATE POLICY "Authenticated update" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images')
    AND auth.role() = 'authenticated'
  );

-- Storage policies for authenticated delete (logged-in users can delete)
CREATE POLICY "Authenticated delete" ON storage.objects
  FOR DELETE
  USING (
    bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images')
    AND auth.role() = 'authenticated'
  );

-- Verify buckets were created
SELECT id, name, public FROM storage.buckets 
WHERE id IN ('hero-images', 'project-images', 'about-images', 'general-images');

