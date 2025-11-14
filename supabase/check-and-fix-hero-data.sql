-- =====================================================
-- Check and Fix Hero Section Data
-- =====================================================
-- Run this to check if hero_section has data and fix it
-- =====================================================

-- 1. Check if hero_section has any data
SELECT id, title, background_image_url, created_at 
FROM hero_section 
ORDER BY created_at DESC;

-- 2. If no data exists, insert it:
INSERT INTO hero_section (title, subtitle, description, background_image_url, stats_projects_completed, stats_years, stats_area_built, stats_satisfaction)
VALUES (
  'We Build Landmarks That Last a Lifetime',
  'Building landmarks that last a lifetime since 2008',
  'We deliver projects that stand the test of time. Trusted builders for homes, offices, and complexes - residential, commercial, and government projects.',
  '/images/hero-background.jpg.jpg',  -- Using the file that exists
  '100+',
  '16+',
  '1M+',
  '100%'
)
ON CONFLICT DO NOTHING;

-- 3. If data exists but background_image_url is NULL, update it:
UPDATE hero_section 
SET background_image_url = '/images/hero-background.jpg.jpg'
WHERE background_image_url IS NULL OR background_image_url = '';

-- 4. Verify the update:
SELECT id, title, background_image_url FROM hero_section ORDER BY created_at DESC LIMIT 1;

