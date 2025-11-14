-- =====================================================
-- Fix Hero Section Image URL
-- =====================================================
-- This will update the hero section to use the correct local image
-- OR update it to use Supabase Storage URL if you've uploaded the image
-- =====================================================

-- Option 1: Use the existing local image file (if it exists)
-- Update to use the file that actually exists in your public/images folder
UPDATE hero_section 
SET background_image_url = '/images/3d-rendering-dining-set-modern-luxury-dining-room - Copy.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- OR Option 2: Use hero-background.jpg.jpg (if that's the correct file)
-- UPDATE hero_section 
-- SET background_image_url = '/images/hero-background.jpg.jpg'
-- WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- OR Option 3: Use Supabase Storage URL (after uploading to Storage)
-- UPDATE hero_section 
-- SET background_image_url = 'https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg'
-- WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- =====================================================
-- To check current value, run:
-- SELECT id, background_image_url FROM hero_section ORDER BY created_at DESC LIMIT 1;
-- =====================================================

