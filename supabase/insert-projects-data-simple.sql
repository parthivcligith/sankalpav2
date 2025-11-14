-- =====================================================
-- Insert Project Data for Sankalpa Builders
-- =====================================================
-- IMPORTANT: Make sure you've run the schema.sql first!
-- This script inserts project data into your database
-- Safe to run multiple times - won't create duplicates
-- =====================================================

-- Step 1: Insert Project Categories (only if they don't exist)
INSERT INTO project_categories (name, order_index)
SELECT 'Villas', 1
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE name = 'Villas');

INSERT INTO project_categories (name, order_index)
SELECT 'Government Schools & Other Commercial Buildings', 2
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE name = 'Government Schools & Other Commercial Buildings');

INSERT INTO project_categories (name, order_index)
SELECT 'Co-operative Banks', 3
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE name = 'Co-operative Banks');

INSERT INTO project_categories (name, order_index)
SELECT 'Auditorium', 4
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE name = 'Auditorium');

INSERT INTO project_categories (name, order_index)
SELECT 'Commercial Buildings', 5
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE name = 'Commercial Buildings');

INSERT INTO project_categories (name, order_index)
SELECT 'Village Offices', 6
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE name = 'Village Offices');

-- Step 2: Insert Projects (only if they don't exist)
-- Project 1
INSERT INTO projects (title, category_id, year, description, area, units, duration, is_featured, order_index)
SELECT 'Sankalpa Villas', (SELECT id FROM project_categories WHERE name = 'Villas' LIMIT 1), '2015', 'Luxury residential villa complex with modern amenities and sustainable design.', '2500 sq ft', '12 Villas', '18 months', true, 1
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Sankalpa Villas');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Modern Architecture', 0 FROM projects p WHERE p.title = 'Sankalpa Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Architecture')
UNION ALL
SELECT p.id, 'Eco-Friendly', 1 FROM projects p WHERE p.title = 'Sankalpa Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Eco-Friendly')
UNION ALL
SELECT p.id, 'Premium Finishes', 2 FROM projects p WHERE p.title = 'Sankalpa Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Premium Finishes');

-- Project 2
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Village Office Building', (SELECT id FROM project_categories WHERE name = 'Village Offices' LIMIT 1), '2021', 'State-of-the-art village office building with modern facilities and accessibility features.', '3200 sq ft', '2 Floors', '14 months', true, 2
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Village Office Building');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Government Standards', 0 FROM projects p WHERE p.title = 'Village Office Building' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Government Standards')
UNION ALL
SELECT p.id, 'Accessible Design', 1 FROM projects p WHERE p.title = 'Village Office Building' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Accessible Design')
UNION ALL
SELECT p.id, 'Energy Efficient', 2 FROM projects p WHERE p.title = 'Village Office Building' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Energy Efficient');

-- Project 3
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Co-operative Bank', (SELECT id FROM project_categories WHERE name = 'Co-operative Banks' LIMIT 1), '2012', 'Modern banking facility with secure infrastructure and customer-friendly design.', '1800 sq ft', '1 Floor', '10 months', true, 3
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Co-operative Bank');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Security Systems', 0 FROM projects p WHERE p.title = 'Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Security Systems')
UNION ALL
SELECT p.id, 'Modern Banking', 1 FROM projects p WHERE p.title = 'Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Banking')
UNION ALL
SELECT p.id, 'Customer Comfort', 2 FROM projects p WHERE p.title = 'Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Customer Comfort');

-- Project 4
INSERT INTO projects (title, category_id, year, description, area, classrooms, duration, is_featured, order_index)
SELECT 'Government School', (SELECT id FROM project_categories WHERE name = 'Government Schools & Other Commercial Buildings' LIMIT 1), '2013', 'Educational facility designed to provide optimal learning environment for students.', '2800 sq ft', '8 Rooms', '12 months', true, 4
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Government School');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Student-Centric Design', 0 FROM projects p WHERE p.title = 'Government School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Student-Centric Design')
UNION ALL
SELECT p.id, 'Safety Standards', 1 FROM projects p WHERE p.title = 'Government School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Safety Standards')
UNION ALL
SELECT p.id, 'Modern Classrooms', 2 FROM projects p WHERE p.title = 'Government School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Classrooms');

-- Project 5
INSERT INTO projects (title, category_id, year, description, area, capacity, duration, is_featured, order_index)
SELECT 'Community Hall & Auditorium', (SELECT id FROM project_categories WHERE name = 'Auditorium' LIMIT 1), '2022', 'Multi-purpose community hall for cultural and social events with modern acoustics.', '4000 sq ft', '300 People', '16 months', true, 5
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Community Hall & Auditorium');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Acoustic Design', 0 FROM projects p WHERE p.title = 'Community Hall & Auditorium' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Acoustic Design')
UNION ALL
SELECT p.id, 'Multi-Purpose', 1 FROM projects p WHERE p.title = 'Community Hall & Auditorium' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Multi-Purpose')
UNION ALL
SELECT p.id, 'Cultural Events', 2 FROM projects p WHERE p.title = 'Community Hall & Auditorium' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Cultural Events');

-- Project 6
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Smart Village Office', (SELECT id FROM project_categories WHERE name = 'Village Offices' LIMIT 1), '2021', 'Digital-ready village office with smart infrastructure and modern amenities.', '1200 sq ft', '1 Floor', '8 months', false, 6
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Smart Village Office');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Smart Infrastructure', 0 FROM projects p WHERE p.title = 'Smart Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Smart Infrastructure')
UNION ALL
SELECT p.id, 'Digital Ready', 1 FROM projects p WHERE p.title = 'Smart Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Digital Ready')
UNION ALL
SELECT p.id, 'Modern Amenities', 2 FROM projects p WHERE p.title = 'Smart Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Amenities');

-- Project 7
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Modern Commercial Complex', (SELECT id FROM project_categories WHERE name = 'Commercial Buildings' LIMIT 1), '2020', 'Contemporary commercial building with retail spaces and office facilities.', '5000 sq ft', '3 Floors', '20 months', false, 7
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Modern Commercial Complex');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Modern Design', 0 FROM projects p WHERE p.title = 'Modern Commercial Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Design')
UNION ALL
SELECT p.id, 'Retail Spaces', 1 FROM projects p WHERE p.title = 'Modern Commercial Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Retail Spaces')
UNION ALL
SELECT p.id, 'Office Facilities', 2 FROM projects p WHERE p.title = 'Modern Commercial Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Office Facilities');

-- Project 8
INSERT INTO projects (title, category_id, year, description, area, units, duration, is_featured, order_index)
SELECT 'Residential Villa Project', (SELECT id FROM project_categories WHERE name = 'Villas' LIMIT 1), '2019', 'Premium villa development with landscaped gardens and modern amenities.', '3000 sq ft', '8 Villas', '15 months', false, 8
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Residential Villa Project');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Landscaped Gardens', 0 FROM projects p WHERE p.title = 'Residential Villa Project' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Landscaped Gardens')
UNION ALL
SELECT p.id, 'Premium Finishes', 1 FROM projects p WHERE p.title = 'Residential Villa Project' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Premium Finishes')
UNION ALL
SELECT p.id, 'Modern Amenities', 2 FROM projects p WHERE p.title = 'Residential Villa Project' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Amenities');

-- Project 9
INSERT INTO projects (title, category_id, year, description, area, units, duration, is_featured, order_index)
SELECT 'Lakeside Villas', (SELECT id FROM project_categories WHERE name = 'Villas' LIMIT 1), '2018', 'Exclusive waterfront villa community with scenic views and luxury amenities.', '3500 sq ft', '6 Villas', '16 months', false, 9
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Lakeside Villas');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Waterfront Location', 0 FROM projects p WHERE p.title = 'Lakeside Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Waterfront Location')
UNION ALL
SELECT p.id, 'Luxury Interiors', 1 FROM projects p WHERE p.title = 'Lakeside Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Luxury Interiors')
UNION ALL
SELECT p.id, 'Gated Community', 2 FROM projects p WHERE p.title = 'Lakeside Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Gated Community');

-- Project 10
INSERT INTO projects (title, category_id, year, description, area, units, duration, is_featured, order_index)
SELECT 'Heritage Villas', (SELECT id FROM project_categories WHERE name = 'Villas' LIMIT 1), '2017', 'Traditional Kerala-style villas with modern comforts and heritage architecture.', '2800 sq ft', '10 Villas', '14 months', false, 10
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Heritage Villas');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Heritage Design', 0 FROM projects p WHERE p.title = 'Heritage Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Heritage Design')
UNION ALL
SELECT p.id, 'Traditional Architecture', 1 FROM projects p WHERE p.title = 'Heritage Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Traditional Architecture')
UNION ALL
SELECT p.id, 'Modern Amenities', 2 FROM projects p WHERE p.title = 'Heritage Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Amenities');

-- Project 11
INSERT INTO projects (title, category_id, year, description, area, units, duration, is_featured, order_index)
SELECT 'Green Valley Villas', (SELECT id FROM project_categories WHERE name = 'Villas' LIMIT 1), '2016', 'Eco-friendly villa project surrounded by lush greenery and natural landscapes.', '2200 sq ft', '15 Villas', '17 months', false, 11
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Green Valley Villas');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Eco-Friendly', 0 FROM projects p WHERE p.title = 'Green Valley Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Eco-Friendly')
UNION ALL
SELECT p.id, 'Natural Setting', 1 FROM projects p WHERE p.title = 'Green Valley Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Natural Setting')
UNION ALL
SELECT p.id, 'Sustainable Design', 2 FROM projects p WHERE p.title = 'Green Valley Villas' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Sustainable Design');

-- Project 12
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'District Co-operative Bank', (SELECT id FROM project_categories WHERE name = 'Co-operative Banks' LIMIT 1), '2014', 'Spacious banking facility with modern security systems and customer service areas.', '2200 sq ft', '2 Floors', '12 months', false, 12
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'District Co-operative Bank');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Advanced Security', 0 FROM projects p WHERE p.title = 'District Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Advanced Security')
UNION ALL
SELECT p.id, 'Customer Service', 1 FROM projects p WHERE p.title = 'District Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Customer Service')
UNION ALL
SELECT p.id, 'Modern Infrastructure', 2 FROM projects p WHERE p.title = 'District Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Infrastructure');

-- Project 13
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Urban Co-operative Bank', (SELECT id FROM project_categories WHERE name = 'Co-operative Banks' LIMIT 1), '2016', 'Contemporary bank building with digital banking facilities and secure vaults.', '2500 sq ft', '2 Floors', '13 months', false, 13
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Urban Co-operative Bank');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Digital Banking', 0 FROM projects p WHERE p.title = 'Urban Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Digital Banking')
UNION ALL
SELECT p.id, 'Secure Vaults', 1 FROM projects p WHERE p.title = 'Urban Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Secure Vaults')
UNION ALL
SELECT p.id, 'Modern Design', 2 FROM projects p WHERE p.title = 'Urban Co-operative Bank' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Design');

-- Project 14
INSERT INTO projects (title, category_id, year, description, area, classrooms, duration, is_featured, order_index)
SELECT 'Government Higher Secondary School', (SELECT id FROM project_categories WHERE name = 'Government Schools & Other Commercial Buildings' LIMIT 1), '2015', 'Comprehensive educational facility with science labs, library, and sports facilities.', '4500 sq ft', '15 Rooms', '18 months', false, 14
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Government Higher Secondary School');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Science Labs', 0 FROM projects p WHERE p.title = 'Government Higher Secondary School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Science Labs')
UNION ALL
SELECT p.id, 'Library', 1 FROM projects p WHERE p.title = 'Government Higher Secondary School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Library')
UNION ALL
SELECT p.id, 'Sports Facilities', 2 FROM projects p WHERE p.title = 'Government Higher Secondary School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Sports Facilities');

-- Project 15
INSERT INTO projects (title, category_id, year, description, area, classrooms, duration, is_featured, order_index)
SELECT 'Government Primary School', (SELECT id FROM project_categories WHERE name = 'Government Schools & Other Commercial Buildings' LIMIT 1), '2014', 'Child-friendly school building with colorful classrooms and play areas.', '2000 sq ft', '6 Rooms', '10 months', false, 15
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Government Primary School');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Child-Friendly Design', 0 FROM projects p WHERE p.title = 'Government Primary School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Child-Friendly Design')
UNION ALL
SELECT p.id, 'Play Areas', 1 FROM projects p WHERE p.title = 'Government Primary School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Play Areas')
UNION ALL
SELECT p.id, 'Safety Features', 2 FROM projects p WHERE p.title = 'Government Primary School' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Safety Features');

-- Project 16
INSERT INTO projects (title, category_id, year, description, area, workshops, duration, is_featured, order_index)
SELECT 'Government Vocational Training Center', (SELECT id FROM project_categories WHERE name = 'Government Schools & Other Commercial Buildings' LIMIT 1), '2019', 'Modern training facility with workshops and skill development centers.', '3500 sq ft', '8 Units', '15 months', false, 16
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Government Vocational Training Center');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Workshop Spaces', 0 FROM projects p WHERE p.title = 'Government Vocational Training Center' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Workshop Spaces')
UNION ALL
SELECT p.id, 'Skill Development', 1 FROM projects p WHERE p.title = 'Government Vocational Training Center' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Skill Development')
UNION ALL
SELECT p.id, 'Modern Equipment', 2 FROM projects p WHERE p.title = 'Government Vocational Training Center' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Equipment');

-- Project 17
INSERT INTO projects (title, category_id, year, description, area, capacity, duration, is_featured, order_index)
SELECT 'Cultural Center Auditorium', (SELECT id FROM project_categories WHERE name = 'Auditorium' LIMIT 1), '2020', 'State-of-the-art auditorium for cultural performances with advanced sound and lighting.', '5000 sq ft', '500 People', '18 months', false, 17
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Cultural Center Auditorium');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Advanced Acoustics', 0 FROM projects p WHERE p.title = 'Cultural Center Auditorium' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Advanced Acoustics')
UNION ALL
SELECT p.id, 'Stage Lighting', 1 FROM projects p WHERE p.title = 'Cultural Center Auditorium' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Stage Lighting')
UNION ALL
SELECT p.id, 'Cultural Events', 2 FROM projects p WHERE p.title = 'Cultural Center Auditorium' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Cultural Events');

-- Project 18
INSERT INTO projects (title, category_id, year, description, area, capacity, duration, is_featured, order_index)
SELECT 'Convention Center', (SELECT id FROM project_categories WHERE name = 'Auditorium' LIMIT 1), '2018', 'Multi-purpose convention center for conferences, weddings, and large gatherings.', '6000 sq ft', '800 People', '20 months', false, 18
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Convention Center');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Multi-Purpose', 0 FROM projects p WHERE p.title = 'Convention Center' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Multi-Purpose')
UNION ALL
SELECT p.id, 'Conference Facilities', 1 FROM projects p WHERE p.title = 'Convention Center' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Conference Facilities')
UNION ALL
SELECT p.id, 'Banquet Hall', 2 FROM projects p WHERE p.title = 'Convention Center' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Banquet Hall');

-- Project 19
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Business Park Complex', (SELECT id FROM project_categories WHERE name = 'Commercial Buildings' LIMIT 1), '2021', 'Modern business park with office spaces, parking, and amenities for corporate tenants.', '8000 sq ft', '4 Floors', '24 months', false, 19
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Business Park Complex');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Office Spaces', 0 FROM projects p WHERE p.title = 'Business Park Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Office Spaces')
UNION ALL
SELECT p.id, 'Parking Facilities', 1 FROM projects p WHERE p.title = 'Business Park Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Parking Facilities')
UNION ALL
SELECT p.id, 'Corporate Amenities', 2 FROM projects p WHERE p.title = 'Business Park Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Corporate Amenities');

-- Project 20
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Retail Shopping Complex', (SELECT id FROM project_categories WHERE name = 'Commercial Buildings' LIMIT 1), '2019', 'Contemporary shopping complex with retail outlets and food court facilities.', '6500 sq ft', '3 Floors', '22 months', false, 20
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Retail Shopping Complex');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Retail Outlets', 0 FROM projects p WHERE p.title = 'Retail Shopping Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Retail Outlets')
UNION ALL
SELECT p.id, 'Food Court', 1 FROM projects p WHERE p.title = 'Retail Shopping Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Food Court')
UNION ALL
SELECT p.id, 'Modern Design', 2 FROM projects p WHERE p.title = 'Retail Shopping Complex' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Design');

-- Project 21
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Hospital', (SELECT id FROM project_categories WHERE name = 'Commercial Buildings' LIMIT 1), '2017', 'Healthcare facility with consultation rooms, diagnostic center, and pharmacy.', '4000 sq ft', '2 Floors', '16 months', false, 21
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Hospital');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Healthcare Design', 0 FROM projects p WHERE p.title = 'Hospital' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Healthcare Design')
UNION ALL
SELECT p.id, 'Diagnostic Center', 1 FROM projects p WHERE p.title = 'Hospital' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Diagnostic Center')
UNION ALL
SELECT p.id, 'Patient Comfort', 2 FROM projects p WHERE p.title = 'Hospital' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Patient Comfort');

-- Project 22
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Grama Village Office', (SELECT id FROM project_categories WHERE name = 'Village Offices' LIMIT 1), '2020', 'Modern village office with digital facilities and public service counters.', '2800 sq ft', '2 Floors', '12 months', false, 22
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Grama Village Office');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Digital Facilities', 0 FROM projects p WHERE p.title = 'Grama Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Digital Facilities')
UNION ALL
SELECT p.id, 'Public Service', 1 FROM projects p WHERE p.title = 'Grama Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Public Service')
UNION ALL
SELECT p.id, 'Modern Infrastructure', 2 FROM projects p WHERE p.title = 'Grama Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Infrastructure');

-- Project 23
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Block Village Office', (SELECT id FROM project_categories WHERE name = 'Village Offices' LIMIT 1), '2019', 'Administrative building with meeting halls and office spaces for block administration.', '3500 sq ft', '2 Floors', '14 months', false, 23
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Block Village Office');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Meeting Halls', 0 FROM projects p WHERE p.title = 'Block Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Meeting Halls')
UNION ALL
SELECT p.id, 'Administrative Spaces', 1 FROM projects p WHERE p.title = 'Block Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Administrative Spaces')
UNION ALL
SELECT p.id, 'Modern Amenities', 2 FROM projects p WHERE p.title = 'Block Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Modern Amenities');

-- Project 24
INSERT INTO projects (title, category_id, year, description, area, floors, duration, is_featured, order_index)
SELECT 'Village Office', (SELECT id FROM project_categories WHERE name = 'Village Offices' LIMIT 1), '2022', 'Standard village office with public service counters, accessibility, and digital amenities.', '2000 sq ft', '1 Floor', '10 months', false, 24
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Village Office');

INSERT INTO project_features (project_id, feature_text, order_index)
SELECT p.id, 'Public Service Counters', 0 FROM projects p WHERE p.title = 'Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Public Service Counters')
UNION ALL
SELECT p.id, 'Accessible Design', 1 FROM projects p WHERE p.title = 'Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Accessible Design')
UNION ALL
SELECT p.id, 'Digital Facilities', 2 FROM projects p WHERE p.title = 'Village Office' AND NOT EXISTS (SELECT 1 FROM project_features WHERE project_id = p.id AND feature_text = 'Digital Facilities');

-- =====================================================
-- Done! 
-- You now have 24 projects with their features
-- All data is editable through the admin panel
-- Safe to run multiple times - won't create duplicates
-- =====================================================
