-- =====================================================
-- Check Storage Policies
-- =====================================================
-- Run this to verify storage policies are set up correctly
-- =====================================================

-- Check if policies exist on storage.objects
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
ORDER BY policyname;

-- Check buckets
SELECT 
  id,
  name,
  public,
  CASE 
    WHEN public THEN '✅ Public'
    ELSE '❌ Private'
  END as status
FROM storage.buckets
WHERE id IN ('hero-images', 'about-images', 'project-images', 'general-images')
ORDER BY id;

