-- =====================================================
-- Fix Hero Section Image - IMMEDIATE FIX
-- =====================================================
-- The database has the wrong image path
-- This will update it to use the file that actually exists
-- =====================================================

-- Option 1: Use the file that exists in your public/images folder
UPDATE hero_section 
SET background_image_url = '/images/hero-background.jpg.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- OR Option 2: Use the copy file
-- UPDATE hero_section 
-- SET background_image_url = '/images/3d-rendering-dining-set-modern-luxury-dining-room - Copy.jpg'
-- WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- OR Option 3: Use another image that exists
-- UPDATE hero_section 
-- SET background_image_url = '/images/modern-house.jpeg'
-- WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Verify the update worked:
SELECT id, title, background_image_url FROM hero_section ORDER BY created_at DESC LIMIT 1;

