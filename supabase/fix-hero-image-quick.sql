-- Quick Fix: Update Hero Section Image URL
-- Run this in Supabase SQL Editor

-- Check current value first
SELECT id, background_image_url FROM hero_section ORDER BY created_at DESC LIMIT 1;

-- Update to use the correct local image (choose one):
-- Option 1: Use hero-background.jpg.jpg
UPDATE hero_section 
SET background_image_url = '/images/hero-background.jpg.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Option 2: Use the copy file
-- UPDATE hero_section 
-- SET background_image_url = '/images/3d-rendering-dining-set-modern-luxury-dining-room - Copy.jpg'
-- WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Option 3: Use Supabase Storage (after uploading)
-- UPDATE hero_section 
-- SET background_image_url = 'https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg'
-- WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

