-- =====================================================
-- FRESH DATABASE SCHEMA - Drops and Recreates All Tables
-- =====================================================
-- WARNING: This will DELETE all existing data in these tables!
-- Use this if you want a clean start or if tables have wrong schema
-- =====================================================

-- Drop all tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS hero_rotating_texts CASCADE;
DROP TABLE IF EXISTS hero_section CASCADE;
DROP TABLE IF EXISTS about_achievements CASCADE;
DROP TABLE IF EXISTS about_values CASCADE;
DROP TABLE IF EXISTS about_section CASCADE;
DROP TABLE IF EXISTS service_features CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS why_choose_us_advantages CASCADE;
DROP TABLE IF EXISTS why_choose_us_section CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS contact_section CASCADE;
DROP TABLE IF EXISTS footer_quick_links CASCADE;
DROP TABLE IF EXISTS footer_services CASCADE;
DROP TABLE IF EXISTS footer_legal_links CASCADE;
DROP TABLE IF EXISTS footer_social_media CASCADE;
DROP TABLE IF EXISTS footer CASCADE;

-- Drop function if exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Now run the rest of the schema-all-sections.sql file
-- (Copy everything from "Hero Section Table" onwards from schema-all-sections.sql)

