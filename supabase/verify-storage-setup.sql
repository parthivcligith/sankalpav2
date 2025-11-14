-- =====================================================
-- Verify Storage Setup
-- =====================================================
-- Run this to check if storage buckets and policies are set up correctly
-- =====================================================

-- Check if buckets exist
SELECT id, name, public, created_at 
FROM storage.buckets 
WHERE id IN ('hero-images', 'about-images', 'project-images', 'general-images')
ORDER BY id;

-- Check storage policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects'
ORDER BY policyname;

-- Check if buckets are public
SELECT 
  id,
  name,
  public,
  CASE 
    WHEN public THEN '✅ Public (accessible via CDN)'
    ELSE '❌ Private (not accessible)'
  END as status
FROM storage.buckets
WHERE id IN ('hero-images', 'about-images', 'project-images', 'general-images');

