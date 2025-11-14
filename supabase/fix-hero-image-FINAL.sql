-- =====================================================
-- FINAL FIX: Update Hero Section Image URL
-- =====================================================
-- Run this in Supabase SQL Editor to fix the 404 error
-- =====================================================

-- Update to use hero-background.jpg.jpg (the file that exists)
UPDATE hero_section 
SET background_image_url = '/images/hero-background.jpg.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Verify it worked:
SELECT id, title, background_image_url FROM hero_section ORDER BY created_at DESC LIMIT 1;

-- After running this, refresh your browser page
-- The image should load from /images/hero-background.jpg.jpg

