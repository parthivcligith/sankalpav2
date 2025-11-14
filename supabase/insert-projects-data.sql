-- =====================================================
-- Insert Project Data for Sankalpa Builders
-- =====================================================
-- This SQL script inserts sample project data into the database
-- Run this in your Supabase SQL Editor
-- =====================================================

-- First, ensure project_categories exist
-- Insert project categories if they don't exist
INSERT INTO project_categories (id, name, slug, order_index, created_at, updated_at)
VALUES
  ('cat-villas', 'Villas', 'villas', 1, NOW(), NOW()),
  ('cat-government', 'Government Schools & Other Commercial Buildings', 'government', 2, NOW(), NOW()),
  ('cat-banks', 'Co-operative Banks', 'banks', 3, NOW(), NOW()),
  ('cat-auditorium', 'Auditorium', 'auditorium', 4, NOW(), NOW()),
  ('cat-commercial', 'Commercial Buildings', 'commercial', 5, NOW(), NOW()),
  ('cat-village-offices', 'Village Offices', 'village-offices', 6, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Insert Projects
-- =====================================================

-- Project 1: Sankalpa Villas
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, units, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-001', 
  'Sankalpa Villas', 
  'cat-villas', 
  '2015', 
  'Luxury residential villa complex with modern amenities and sustainable design.',
  '2500 sq ft', 
  '12 Villas', 
  '18 months', 
  true, 
  1, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  units = EXCLUDED.units,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

-- Features for Project 1
INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-001', 'Modern Architecture', 0, NOW(), NOW()),
  ('proj-001', 'Eco-Friendly', 1, NOW(), NOW()),
  ('proj-001', 'Premium Finishes', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 2: Village Office Building
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-002', 
  'Village Office Building', 
  'cat-village-offices', 
  '2021', 
  'State-of-the-art village office building with modern facilities and accessibility features.',
  '3200 sq ft', 
  '2 Floors', 
  '14 months', 
  true, 
  2, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-002', 'Government Standards', 0, NOW(), NOW()),
  ('proj-002', 'Accessible Design', 1, NOW(), NOW()),
  ('proj-002', 'Energy Efficient', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 3: Co-operative Bank
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-003', 
  'Co-operative Bank', 
  'cat-banks', 
  '2012', 
  'Modern banking facility with secure infrastructure and customer-friendly design.',
  '1800 sq ft', 
  '1 Floor', 
  '10 months', 
  true, 
  3, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-003', 'Security Systems', 0, NOW(), NOW()),
  ('proj-003', 'Modern Banking', 1, NOW(), NOW()),
  ('proj-003', 'Customer Comfort', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 4: Government School
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, classrooms, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-004', 
  'Government School', 
  'cat-government', 
  '2013', 
  'Educational facility designed to provide optimal learning environment for students.',
  '2800 sq ft', 
  '8 Rooms', 
  '12 months', 
  true, 
  4, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  classrooms = EXCLUDED.classrooms,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-004', 'Student-Centric Design', 0, NOW(), NOW()),
  ('proj-004', 'Safety Standards', 1, NOW(), NOW()),
  ('proj-004', 'Modern Classrooms', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 5: Community Hall & Auditorium
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, capacity, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-005', 
  'Community Hall & Auditorium', 
  'cat-auditorium', 
  '2022', 
  'Multi-purpose community hall for cultural and social events with modern acoustics.',
  '4000 sq ft', 
  '300 People', 
  '16 months', 
  true, 
  5, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  capacity = EXCLUDED.capacity,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-005', 'Acoustic Design', 0, NOW(), NOW()),
  ('proj-005', 'Multi-Purpose', 1, NOW(), NOW()),
  ('proj-005', 'Cultural Events', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 6: Smart Village Office
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-006', 
  'Smart Village Office', 
  'cat-village-offices', 
  '2021', 
  'Digital-ready village office with smart infrastructure and modern amenities.',
  '1200 sq ft', 
  '1 Floor', 
  '8 months', 
  false, 
  6, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-006', 'Smart Infrastructure', 0, NOW(), NOW()),
  ('proj-006', 'Digital Ready', 1, NOW(), NOW()),
  ('proj-006', 'Modern Amenities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 7: Modern Commercial Complex
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-007', 
  'Modern Commercial Complex', 
  'cat-commercial', 
  '2020', 
  'Contemporary commercial building with retail spaces and office facilities.',
  '5000 sq ft', 
  '3 Floors', 
  '20 months', 
  false, 
  7, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-007', 'Modern Design', 0, NOW(), NOW()),
  ('proj-007', 'Retail Spaces', 1, NOW(), NOW()),
  ('proj-007', 'Office Facilities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 8: Residential Villa Project
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, units, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-008', 
  'Residential Villa Project', 
  'cat-villas', 
  '2019', 
  'Premium villa development with landscaped gardens and modern amenities.',
  '3000 sq ft', 
  '8 Villas', 
  '15 months', 
  false, 
  8, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  units = EXCLUDED.units,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-008', 'Landscaped Gardens', 0, NOW(), NOW()),
  ('proj-008', 'Premium Finishes', 1, NOW(), NOW()),
  ('proj-008', 'Modern Amenities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 9: Lakeside Villas
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, units, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-009', 
  'Lakeside Villas', 
  'cat-villas', 
  '2018', 
  'Exclusive waterfront villa community with scenic views and luxury amenities.',
  '3500 sq ft', 
  '6 Villas', 
  '16 months', 
  false, 
  9, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  units = EXCLUDED.units,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-009', 'Waterfront Location', 0, NOW(), NOW()),
  ('proj-009', 'Luxury Interiors', 1, NOW(), NOW()),
  ('proj-009', 'Gated Community', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 10: Heritage Villas
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, units, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-010', 
  'Heritage Villas', 
  'cat-villas', 
  '2017', 
  'Traditional Kerala-style villas with modern comforts and heritage architecture.',
  '2800 sq ft', 
  '10 Villas', 
  '14 months', 
  false, 
  10, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  units = EXCLUDED.units,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-010', 'Heritage Design', 0, NOW(), NOW()),
  ('proj-010', 'Traditional Architecture', 1, NOW(), NOW()),
  ('proj-010', 'Modern Amenities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 11: Green Valley Villas
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, units, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-011', 
  'Green Valley Villas', 
  'cat-villas', 
  '2016', 
  'Eco-friendly villa project surrounded by lush greenery and natural landscapes.',
  '2200 sq ft', 
  '15 Villas', 
  '17 months', 
  false, 
  11, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  units = EXCLUDED.units,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-011', 'Eco-Friendly', 0, NOW(), NOW()),
  ('proj-011', 'Natural Setting', 1, NOW(), NOW()),
  ('proj-011', 'Sustainable Design', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 12: District Co-operative Bank
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-012', 
  'District Co-operative Bank', 
  'cat-banks', 
  '2014', 
  'Spacious banking facility with modern security systems and customer service areas.',
  '2200 sq ft', 
  '2 Floors', 
  '12 months', 
  false, 
  12, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-012', 'Advanced Security', 0, NOW(), NOW()),
  ('proj-012', 'Customer Service', 1, NOW(), NOW()),
  ('proj-012', 'Modern Infrastructure', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 13: Urban Co-operative Bank
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-013', 
  'Urban Co-operative Bank', 
  'cat-banks', 
  '2016', 
  'Contemporary bank building with digital banking facilities and secure vaults.',
  '2500 sq ft', 
  '2 Floors', 
  '13 months', 
  false, 
  13, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-013', 'Digital Banking', 0, NOW(), NOW()),
  ('proj-013', 'Secure Vaults', 1, NOW(), NOW()),
  ('proj-013', 'Modern Design', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 14: Government Higher Secondary School
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, classrooms, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-014', 
  'Government Higher Secondary School', 
  'cat-government', 
  '2015', 
  'Comprehensive educational facility with science labs, library, and sports facilities.',
  '4500 sq ft', 
  '15 Rooms', 
  '18 months', 
  false, 
  14, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  classrooms = EXCLUDED.classrooms,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-014', 'Science Labs', 0, NOW(), NOW()),
  ('proj-014', 'Library', 1, NOW(), NOW()),
  ('proj-014', 'Sports Facilities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 15: Government Primary School
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, classrooms, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-015', 
  'Government Primary School', 
  'cat-government', 
  '2014', 
  'Child-friendly school building with colorful classrooms and play areas.',
  '2000 sq ft', 
  '6 Rooms', 
  '10 months', 
  false, 
  15, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  classrooms = EXCLUDED.classrooms,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-015', 'Child-Friendly Design', 0, NOW(), NOW()),
  ('proj-015', 'Play Areas', 1, NOW(), NOW()),
  ('proj-015', 'Safety Features', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 16: Government Vocational Training Center
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, workshops, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-016', 
  'Government Vocational Training Center', 
  'cat-government', 
  '2019', 
  'Modern training facility with workshops and skill development centers.',
  '3500 sq ft', 
  '8 Units', 
  '15 months', 
  false, 
  16, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  workshops = EXCLUDED.workshops,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-016', 'Workshop Spaces', 0, NOW(), NOW()),
  ('proj-016', 'Skill Development', 1, NOW(), NOW()),
  ('proj-016', 'Modern Equipment', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 17: Cultural Center Auditorium
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, capacity, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-017', 
  'Cultural Center Auditorium', 
  'cat-auditorium', 
  '2020', 
  'State-of-the-art auditorium for cultural performances with advanced sound and lighting.',
  '5000 sq ft', 
  '500 People', 
  '18 months', 
  false, 
  17, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  capacity = EXCLUDED.capacity,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-017', 'Advanced Acoustics', 0, NOW(), NOW()),
  ('proj-017', 'Stage Lighting', 1, NOW(), NOW()),
  ('proj-017', 'Cultural Events', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 18: Convention Center
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, capacity, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-018', 
  'Convention Center', 
  'cat-auditorium', 
  '2018', 
  'Multi-purpose convention center for conferences, weddings, and large gatherings.',
  '6000 sq ft', 
  '800 People', 
  '20 months', 
  false, 
  18, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  capacity = EXCLUDED.capacity,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-018', 'Multi-Purpose', 0, NOW(), NOW()),
  ('proj-018', 'Conference Facilities', 1, NOW(), NOW()),
  ('proj-018', 'Banquet Hall', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 19: Business Park Complex
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-019', 
  'Business Park Complex', 
  'cat-commercial', 
  '2021', 
  'Modern business park with office spaces, parking, and amenities for corporate tenants.',
  '8000 sq ft', 
  '4 Floors', 
  '24 months', 
  false, 
  19, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-019', 'Office Spaces', 0, NOW(), NOW()),
  ('proj-019', 'Parking Facilities', 1, NOW(), NOW()),
  ('proj-019', 'Corporate Amenities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 20: Retail Shopping Complex
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-020', 
  'Retail Shopping Complex', 
  'cat-commercial', 
  '2019', 
  'Contemporary shopping complex with retail outlets and food court facilities.',
  '6500 sq ft', 
  '3 Floors', 
  '22 months', 
  false, 
  20, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-020', 'Retail Outlets', 0, NOW(), NOW()),
  ('proj-020', 'Food Court', 1, NOW(), NOW()),
  ('proj-020', 'Modern Design', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 21: Hospital
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-021', 
  'Hospital', 
  'cat-commercial', 
  '2017', 
  'Healthcare facility with consultation rooms, diagnostic center, and pharmacy.',
  '4000 sq ft', 
  '2 Floors', 
  '16 months', 
  false, 
  21, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-021', 'Healthcare Design', 0, NOW(), NOW()),
  ('proj-021', 'Diagnostic Center', 1, NOW(), NOW()),
  ('proj-021', 'Patient Comfort', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 22: Grama Village Office
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-022', 
  'Grama Village Office', 
  'cat-village-offices', 
  '2020', 
  'Modern village office with digital facilities and public service counters.',
  '2800 sq ft', 
  '2 Floors', 
  '12 months', 
  false, 
  22, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-022', 'Digital Facilities', 0, NOW(), NOW()),
  ('proj-022', 'Public Service', 1, NOW(), NOW()),
  ('proj-022', 'Modern Infrastructure', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 23: Block Village Office
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-023', 
  'Block Village Office', 
  'cat-village-offices', 
  '2019', 
  'Administrative building with meeting halls and office spaces for block administration.',
  '3500 sq ft', 
  '2 Floors', 
  '14 months', 
  false, 
  23, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-023', 'Meeting Halls', 0, NOW(), NOW()),
  ('proj-023', 'Administrative Spaces', 1, NOW(), NOW()),
  ('proj-023', 'Modern Amenities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Project 24: Village Office
INSERT INTO projects (
  id, title, category_id, year, description, 
  area, floors, duration, is_featured, order_index, created_at, updated_at
) VALUES (
  'proj-024', 
  'Village Office', 
  'cat-village-offices', 
  '2022', 
  'Standard village office with public service counters, accessibility, and digital amenities.',
  '2000 sq ft', 
  '1 Floor', 
  '10 months', 
  false, 
  24, 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category_id = EXCLUDED.category_id,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  floors = EXCLUDED.floors,
  duration = EXCLUDED.duration,
  is_featured = EXCLUDED.is_featured,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

INSERT INTO project_features (project_id, feature_text, order_index, created_at, updated_at)
VALUES
  ('proj-024', 'Public Service Counters', 0, NOW(), NOW()),
  ('proj-024', 'Accessible Design', 1, NOW(), NOW()),
  ('proj-024', 'Digital Facilities', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- =====================================================
-- Summary
-- =====================================================
-- This script inserts:
-- - 6 Project Categories
-- - 24 Projects with complete details
-- - 72 Project Features (3 per project)
--
-- All data is editable and updatable through the admin panel
-- The ON CONFLICT clauses ensure you can run this script multiple times
-- without creating duplicates
-- =====================================================


