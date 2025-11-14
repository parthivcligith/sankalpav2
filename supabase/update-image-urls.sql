-- =====================================================
-- Update Image URLs in Database
-- =====================================================
-- Run this AFTER uploading images to Supabase Storage
-- Replace [YOUR-PROJECT-ID] with your actual Supabase project ID
-- Replace image filenames if you used different names
-- =====================================================

-- Find your project ID from:
-- 1. Your Supabase project URL: https://supabase.com/dashboard/project/[PROJECT-ID]
-- 2. Your .env.local file: NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co
-- Example project ID: zfmazqvccebisimswtez

-- Update hero section background image
UPDATE hero_section 
SET background_image_url = 'https://[YOUR-PROJECT-ID].supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Update about section image
UPDATE about_section 
SET image_url = 'https://[YOUR-PROJECT-ID].supabase.co/storage/v1/object/public/website-images/about/about-image.jpg'
WHERE id = (SELECT id FROM about_section ORDER BY created_at DESC LIMIT 1);

-- =====================================================
-- Example with actual project ID (replace with yours):
-- =====================================================
-- UPDATE hero_section 
-- SET background_image_url = 'https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg'
-- WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);
--
-- UPDATE about_section 
-- SET image_url = 'https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/about/about-image.jpg'
-- WHERE id = (SELECT id FROM about_section ORDER BY created_at DESC LIMIT 1);
-- =====================================================

