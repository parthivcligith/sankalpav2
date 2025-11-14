-- Supabase Storage Buckets Setup
-- Run this in your Supabase SQL Editor after creating the schema

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('hero-images', 'hero-images', true),
  ('project-images', 'project-images', true),
  ('about-images', 'about-images', true),
  ('general-images', 'general-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images'));

-- Storage policies for authenticated upload
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images')
    AND auth.role() = 'authenticated'
  );

-- Storage policies for authenticated update
CREATE POLICY "Authenticated update" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images')
    AND auth.role() = 'authenticated'
  );

-- Storage policies for authenticated delete
CREATE POLICY "Authenticated delete" ON storage.objects
  FOR DELETE
  USING (
    bucket_id IN ('hero-images', 'project-images', 'about-images', 'general-images')
    AND auth.role() = 'authenticated'
  );

