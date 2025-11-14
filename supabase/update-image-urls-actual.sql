-- =====================================================
-- Update Image URLs in Database
-- =====================================================
-- Run this AFTER uploading images to Supabase Storage
-- Your project ID: zfmazqvccebisimswtez
-- =====================================================

-- Update hero section background image
-- Replace 'hero-background.jpg' with your actual filename
UPDATE hero_section 
SET background_image_url = 'https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Update about section image
-- Replace 'about-image.jpg' with your actual filename
UPDATE about_section 
SET image_url = 'https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/about/about-image.jpg'
WHERE id = (SELECT id FROM about_section ORDER BY created_at DESC LIMIT 1);

-- =====================================================
-- After running this, verify the URLs are correct:
-- 1. Go to Table Editor → hero_section → check background_image_url
-- 2. Go to Table Editor → about_section → check image_url
-- 3. Open the URLs in a browser to verify images load
-- =====================================================

