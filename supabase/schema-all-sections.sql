-- =====================================================
-- Database Schema for All Website Sections
-- =====================================================
-- This schema creates tables for all editable sections
-- Run this in Supabase SQL Editor
-- =====================================================

-- Hero Section Table
-- Drop tables if they exist with wrong schema (uncomment if you need to recreate)
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
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  background_image_url TEXT,
  cta_primary_text TEXT DEFAULT 'Explore Our Projects',
  cta_secondary_text TEXT DEFAULT 'Contact Us',
  whatsapp_number TEXT DEFAULT '+919947004671',
  stats_projects_completed TEXT DEFAULT '100+',
  stats_years TEXT DEFAULT '16+',
  stats_area_built TEXT DEFAULT '1M+',
  stats_satisfaction TEXT DEFAULT '100%',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- Hero Rotating Texts (Many-to-One relationship)
CREATE TABLE IF NOT EXISTS hero_rotating_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_section_id UUID REFERENCES hero_section(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Section Table
CREATE TABLE IF NOT EXISTS about_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  journey_text TEXT,
  mission_text TEXT,
  image_url TEXT,
  recognition_title TEXT,
  recognition_text TEXT,
  years_experience TEXT DEFAULT '17+',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Achievements
CREATE TABLE IF NOT EXISTS about_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  about_section_id UUID REFERENCES about_section(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT, -- e.g., 'Award', 'Users', 'Clock', 'Target'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Core Values
CREATE TABLE IF NOT EXISTS about_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  about_section_id UUID REFERENCES about_section(id) ON DELETE CASCADE,
  letter TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT, -- e.g., 'Building2', 'Building', 'Wrench', 'Landmark'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Features (Many-to-One relationship)
CREATE TABLE IF NOT EXISTS service_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Why Choose Us Section Table
CREATE TABLE IF NOT EXISTS why_choose_us_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Why Choose Us Advantages
CREATE TABLE IF NOT EXISTS why_choose_us_advantages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  why_choose_us_section_id UUID REFERENCES why_choose_us_section(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  highlight TEXT,
  icon_name TEXT, -- e.g., 'Shield', 'Award', 'Clock', 'Users'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  project TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Section Table
CREATE TABLE IF NOT EXISTS contact_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Info Items
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_section_id UUID REFERENCES contact_section(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT, -- e.g., 'Phone', 'Mail', 'MapPin', 'Clock'
  details TEXT[], -- Array of detail strings
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Footer Table
CREATE TABLE IF NOT EXISTS footer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_description TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  copyright_text TEXT,
  registration_number TEXT,
  emergency_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Footer Quick Links
CREATE TABLE IF NOT EXISTS footer_quick_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  footer_id UUID REFERENCES footer(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Footer Services
CREATE TABLE IF NOT EXISTS footer_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  footer_id UUID REFERENCES footer(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Footer Legal Links
CREATE TABLE IF NOT EXISTS footer_legal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  footer_id UUID REFERENCES footer(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Footer Social Media
CREATE TABLE IF NOT EXISTS footer_social_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  footer_id UUID REFERENCES footer(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'Facebook', 'Instagram', 'LinkedIn', 'Twitter'
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_rotating_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us_advantages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_quick_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_legal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_social_media ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Public read access for hero_section" ON hero_section;
DROP POLICY IF EXISTS "Public read access for hero_rotating_texts" ON hero_rotating_texts;
DROP POLICY IF EXISTS "Public read access for about_section" ON about_section;
DROP POLICY IF EXISTS "Public read access for about_achievements" ON about_achievements;
DROP POLICY IF EXISTS "Public read access for about_values" ON about_values;
DROP POLICY IF EXISTS "Public read access for services" ON services;
DROP POLICY IF EXISTS "Public read access for service_features" ON service_features;
DROP POLICY IF EXISTS "Public read access for why_choose_us_section" ON why_choose_us_section;
DROP POLICY IF EXISTS "Public read access for why_choose_us_advantages" ON why_choose_us_advantages;
DROP POLICY IF EXISTS "Public read access for testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public read access for certifications" ON certifications;
DROP POLICY IF EXISTS "Public read access for contact_section" ON contact_section;
DROP POLICY IF EXISTS "Public read access for contact_info" ON contact_info;
DROP POLICY IF EXISTS "Public read access for footer" ON footer;
DROP POLICY IF EXISTS "Public read access for footer_quick_links" ON footer_quick_links;
DROP POLICY IF EXISTS "Public read access for footer_services" ON footer_services;
DROP POLICY IF EXISTS "Public read access for footer_legal_links" ON footer_legal_links;
DROP POLICY IF EXISTS "Public read access for footer_social_media" ON footer_social_media;

-- Create policies for public read access (anonymous users can read)
CREATE POLICY "Public read access for hero_section" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Public read access for hero_rotating_texts" ON hero_rotating_texts FOR SELECT USING (true);
CREATE POLICY "Public read access for about_section" ON about_section FOR SELECT USING (true);
CREATE POLICY "Public read access for about_achievements" ON about_achievements FOR SELECT USING (true);
CREATE POLICY "Public read access for about_values" ON about_values FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for service_features" ON service_features FOR SELECT USING (true);
CREATE POLICY "Public read access for why_choose_us_section" ON why_choose_us_section FOR SELECT USING (true);
CREATE POLICY "Public read access for why_choose_us_advantages" ON why_choose_us_advantages FOR SELECT USING (true);
CREATE POLICY "Public read access for testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access for certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_section" ON contact_section FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read access for footer" ON footer FOR SELECT USING (true);
CREATE POLICY "Public read access for footer_quick_links" ON footer_quick_links FOR SELECT USING (true);
CREATE POLICY "Public read access for footer_services" ON footer_services FOR SELECT USING (true);
CREATE POLICY "Public read access for footer_legal_links" ON footer_legal_links FOR SELECT USING (true);
CREATE POLICY "Public read access for footer_social_media" ON footer_social_media FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist (to avoid errors on re-run)
DROP TRIGGER IF EXISTS update_hero_section_updated_at ON hero_section;
DROP TRIGGER IF EXISTS update_about_section_updated_at ON about_section;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_why_choose_us_section_updated_at ON why_choose_us_section;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
DROP TRIGGER IF EXISTS update_contact_section_updated_at ON contact_section;
DROP TRIGGER IF EXISTS update_footer_updated_at ON footer;

-- Create triggers for updated_at
CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON hero_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_section_updated_at BEFORE UPDATE ON about_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_why_choose_us_section_updated_at BEFORE UPDATE ON why_choose_us_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_section_updated_at BEFORE UPDATE ON contact_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_footer_updated_at BEFORE UPDATE ON footer FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Initial Data Insertion
-- =====================================================

-- Insert default Hero Section
INSERT INTO hero_section (id, title, subtitle, description, background_image_url, stats_projects_completed, stats_years, stats_area_built, stats_satisfaction)
VALUES (
  gen_random_uuid(),
  'We Build Landmarks That Last a Lifetime',
  'Building landmarks that last a lifetime since 2008',
  'We deliver projects that stand the test of time. Trusted builders for homes, offices, and complexes - residential, commercial, and government projects.',
  '/images/3d-rendering-dining-set-modern-luxury-dining-room.jpg',
  '100+',
  '16+',
  '1M+',
  '100%'
) ON CONFLICT DO NOTHING;

-- Insert Hero Rotating Texts
WITH hero_id AS (
  SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1
)
INSERT INTO hero_rotating_texts (hero_section_id, text, order_index)
SELECT id, 'We are proud to be a CPWD & PWD enlisted contractor', 0 FROM hero_id
UNION ALL
SELECT id, 'Building landmarks that last a lifetime since 2008', 1 FROM hero_id
UNION ALL
SELECT id, '100+ Projects Completed with Excellence', 2 FROM hero_id
UNION ALL
SELECT id, 'Trusted builders for homes, offices, and complexes', 3 FROM hero_id
UNION ALL
SELECT id, '100% Client Satisfaction Guaranteed', 4 FROM hero_id;

-- Insert default About Section
INSERT INTO about_section (id, title, subtitle, journey_text, mission_text, image_url, recognition_title, recognition_text, years_experience)
VALUES (
  gen_random_uuid(),
  'About Sankalpa Builders',
  'Building trust through excellence since 2008. We are more than builders - we are dream makers.',
  'Founded in 2008, Sankalpa Builders has grown from a small construction company to one of Kerala''s most trusted builders. Based in Ernakulam, we have successfully completed over 100+ projects ranging from residential complexes to government institutions. Our commitment to quality, innovation, and customer satisfaction has earned us the trust of clients across Kerala. From the construction of cooperative banks to educational institutions, from residential villas to commercial complexes, we bring the same level of dedication to every project.',
  'To create lasting structures that not only meet but exceed our clients'' expectations while contributing positively to the communities we serve. We believe in building relationships as strong as the foundations we lay.',
  '/images/modern-house.jpeg',
  'Government Recognition',
  'We are proud to be a CPWD & PWD enlisted contractor, officially recognized by the Central Public Works Department and Public Works Department. This certification reflects our adherence to strict quality, safety, and compliance requirements, making us a reliable partner for both public sector and private developments.',
  '17+'
) ON CONFLICT DO NOTHING;

-- Insert About Achievements
WITH about_id AS (
  SELECT id FROM about_section ORDER BY created_at DESC LIMIT 1
)
INSERT INTO about_achievements (about_section_id, title, description, icon_name, order_index)
SELECT id, 'Quality Excellence', 'Committed to delivering superior construction quality in every project we undertake.', 'Award', 0 FROM about_id
UNION ALL
SELECT id, 'Expert Team', 'Skilled professionals with decades of combined experience in construction and engineering.', 'Users', 1 FROM about_id
UNION ALL
SELECT id, 'Timely Delivery', 'We pride ourselves on completing projects on schedule without compromising on quality.', 'Clock', 2 FROM about_id
UNION ALL
SELECT id, 'Client Focus', 'Your vision is our mission. We work closely with clients to exceed expectations.', 'Target', 3 FROM about_id;

-- Insert About Values
WITH about_id AS (
  SELECT id FROM about_section ORDER BY created_at DESC LIMIT 1
)
INSERT INTO about_values (about_section_id, letter, title, description, order_index)
SELECT id, 'I', 'Integrity', 'We conduct business with honesty, transparency, and ethical practices in all our dealings.', 0 FROM about_id
UNION ALL
SELECT id, 'Q', 'Quality', 'Excellence in craftsmanship and materials is non-negotiable in every project we undertake.', 1 FROM about_id
UNION ALL
SELECT id, 'R', 'Reliability', 'Our clients can count on us to deliver on our promises, on time and within budget.', 2 FROM about_id;

-- Insert Services
INSERT INTO services (title, description, icon_name, order_index)
VALUES
  ('Residential Buildings', 'From luxury villas to apartment complexes, we create homes that blend comfort, style, and functionality.', 'Building2', 0),
  ('Commercial Buildings', 'Modern office spaces, retail complexes, and commercial establishments built to drive business success.', 'Building', 1),
  ('Renovation', 'Transform existing spaces with our expert renovation services, breathing new life into old structures.', 'Wrench', 2),
  ('Government Projects', 'CPWD & PWD enlisted contractor delivering quality infrastructure for public institutions and facilities.', 'Landmark', 3);

-- Insert Service Features
-- Residential Buildings features
WITH residential_id AS (SELECT id FROM services WHERE title = 'Residential Buildings' LIMIT 1)
INSERT INTO service_features (service_id, feature_text, order_index)
SELECT id, 'Custom Home Design', 0 FROM residential_id
UNION ALL
SELECT id, 'Apartment Complexes', 1 FROM residential_id
UNION ALL
SELECT id, 'Villa Construction', 2 FROM residential_id
UNION ALL
SELECT id, 'Interior Finishing', 3 FROM residential_id;

-- Commercial Buildings features
WITH commercial_id AS (SELECT id FROM services WHERE title = 'Commercial Buildings' LIMIT 1)
INSERT INTO service_features (service_id, feature_text, order_index)
SELECT id, 'Office Buildings', 0 FROM commercial_id
UNION ALL
SELECT id, 'Retail Spaces', 1 FROM commercial_id
UNION ALL
SELECT id, 'Shopping Complexes', 2 FROM commercial_id
UNION ALL
SELECT id, 'Corporate Headquarters', 3 FROM commercial_id;

-- Renovation features
WITH renovation_id AS (SELECT id FROM services WHERE title = 'Renovation' LIMIT 1)
INSERT INTO service_features (service_id, feature_text, order_index)
SELECT id, 'Building Restoration', 0 FROM renovation_id
UNION ALL
SELECT id, 'Interior Remodeling', 1 FROM renovation_id
UNION ALL
SELECT id, 'Structural Upgrades', 2 FROM renovation_id
UNION ALL
SELECT id, 'Modernization', 3 FROM renovation_id;

-- Government Projects features
WITH government_id AS (SELECT id FROM services WHERE title = 'Government Projects' LIMIT 1)
INSERT INTO service_features (service_id, feature_text, order_index)
SELECT id, 'Educational Institutions', 0 FROM government_id
UNION ALL
SELECT id, 'Government Offices', 1 FROM government_id
UNION ALL
SELECT id, 'Public Infrastructure', 2 FROM government_id
UNION ALL
SELECT id, 'Community Centers', 3 FROM government_id;

-- Insert Why Choose Us Section
INSERT INTO why_choose_us_section (id, title, subtitle)
VALUES (
  gen_random_uuid(),
  'Why Choose Sankalpa Builders?',
  'With over a decade of experience and a portfolio of 50+ successful projects, we are Kerala''s trusted construction partner.'
) ON CONFLICT DO NOTHING;

-- Insert Why Choose Us Advantages
WITH why_choose_us_id AS (
  SELECT id FROM why_choose_us_section ORDER BY created_at DESC LIMIT 1
)
INSERT INTO why_choose_us_advantages (why_choose_us_section_id, title, description, highlight, icon_name, order_index)
SELECT id, 'CPWD & PWD Enlisted Contractor', 'Officially recognized and pre-qualified by Central Public Works Department (CPWD) and Public Works Department (PWD) for government projects.', 'Government Certified', 'Shield', 0 FROM why_choose_us_id
UNION ALL
SELECT id, 'Transparent Pricing', 'We provide clear, detailed estimates with no hidden costs. What we quote is what you pay.', 'No Hidden Costs', 'Award', 1 FROM why_choose_us_id
UNION ALL
SELECT id, 'On-Time Delivery', 'We respect your time and ensure all projects are completed within the agreed timeline.', 'Zero Delays Guarantee', 'Clock', 2 FROM why_choose_us_id
UNION ALL
SELECT id, '100% Client Satisfaction', 'Our commitment to excellence ensures every client is completely satisfied with our work.', 'Satisfaction Guaranteed', 'Users', 3 FROM why_choose_us_id
UNION ALL
SELECT id, 'Value Engineering', 'We optimize costs without compromising quality, delivering maximum value for your investment.', 'Cost-Effective Solutions', 'TrendingUp', 4 FROM why_choose_us_id
UNION ALL
SELECT id, 'Client-Centric Approach', 'Your satisfaction is our priority. We maintain transparent communication throughout.', '24/7 Support Available', 'Handshake', 5 FROM why_choose_us_id;

-- Insert Testimonials
INSERT INTO testimonials (name, role, project, rating, comment, order_index)
VALUES
  ('Rajesh Kumar', 'Homeowner', 'Residential Villa', 5, 'Sankalpa Builders transformed our dream into reality. The quality of work and attention to detail is exceptional. Highly recommended!', 0),
  ('Dr. Priya Nair', 'Homeowner', 'Luxury Residence', 5, 'Outstanding craftsmanship and professionalism throughout the entire project. They built our dream home exactly as we envisioned, with impeccable attention to detail.', 1),
  ('Mohammed Ali', 'Business Owner', 'Commercial Complex', 5, 'The team''s expertise in commercial construction is remarkable. They delivered exactly what we envisioned within our budget.', 2);

-- Insert Certifications
INSERT INTO certifications (name, order_index)
VALUES
  ('CPWD Enlisted Contractor', 0),
  ('PWD Enlisted Contractor', 1),
  ('Licensed Contractor', 2),
  ('Safety Standards Compliant', 3),
  ('Government Approved', 4);

-- Insert Contact Section
INSERT INTO contact_section (id, title, subtitle)
VALUES (
  gen_random_uuid(),
  'Get In Touch',
  'Ready to start your construction project? Contact us today for a free consultation and detailed quote.'
) ON CONFLICT DO NOTHING;

-- Insert Contact Info
WITH contact_id AS (
  SELECT id FROM contact_section ORDER BY created_at DESC LIMIT 1
)
INSERT INTO contact_info (contact_section_id, title, description, icon_name, details, order_index)
SELECT id, 'Call Us', 'Mon - Sat: 9:00 AM - 6:00 PM', 'Phone', ARRAY['+91 9947004671', '9961093847', '0484 2443671'], 0 FROM contact_id
UNION ALL
SELECT id, 'Email Us', 'We''ll respond within 24 hours', 'Mail', ARRAY['info@sankalpabuilders.com'], 1 FROM contact_id
UNION ALL
SELECT id, 'Visit Us', 'Our office is open for consultations', 'MapPin', ARRAY['Sankalpa Builders', 'Ernakulam, Kerala 682001'], 2 FROM contact_id
UNION ALL
SELECT id, 'Working Hours', 'Sunday: Emergency calls only', 'Clock', ARRAY['Monday - Saturday', '9:00 AM - 6:00 PM'], 3 FROM contact_id;

-- Insert Footer
INSERT INTO footer (id, company_description, phone, email, address, copyright_text, registration_number, emergency_phone)
VALUES (
  gen_random_uuid(),
  'Building dreams since 2012. We are Kerala''s trusted construction partner, delivering quality projects with excellence and integrity.',
  '+91 9876543210',
  'info@sankalpabuilders.com',
  'Ernakulam, Kerala 682001',
  '© 2025 Sankalpa Builders. All rights reserved. | Building Excellence Since 2012',
  'Kerala Registration: KB/2012/001234',
  '+91 9876543200'
) ON CONFLICT DO NOTHING;

-- Insert Footer Quick Links
WITH footer_id AS (
  SELECT id FROM footer ORDER BY created_at DESC LIMIT 1
)
INSERT INTO footer_quick_links (footer_id, name, href, order_index)
SELECT id, 'Home', '#home', 0 FROM footer_id
UNION ALL
SELECT id, 'About Us', '#about', 1 FROM footer_id
UNION ALL
SELECT id, 'Projects', '#projects', 2 FROM footer_id
UNION ALL
SELECT id, 'Why Choose Us', '#why-choose-us', 3 FROM footer_id
UNION ALL
SELECT id, 'Contact', '#contact', 4 FROM footer_id;

-- Insert Footer Services
WITH footer_id AS (
  SELECT id FROM footer ORDER BY created_at DESC LIMIT 1
)
INSERT INTO footer_services (footer_id, service_name, order_index)
SELECT id, 'Residential Construction', 0 FROM footer_id
UNION ALL
SELECT id, 'Commercial Buildings', 1 FROM footer_id
UNION ALL
SELECT id, 'Government Projects', 2 FROM footer_id
UNION ALL
SELECT id, 'Educational Institutions', 3 FROM footer_id
UNION ALL
SELECT id, 'Renovation & Remodeling', 4 FROM footer_id
UNION ALL
SELECT id, 'Interior Design', 5 FROM footer_id
UNION ALL
SELECT id, 'Project Consultation', 6 FROM footer_id
UNION ALL
SELECT id, 'Architectural Services', 7 FROM footer_id;

-- Insert Footer Legal Links
WITH footer_id AS (
  SELECT id FROM footer ORDER BY created_at DESC LIMIT 1
)
INSERT INTO footer_legal_links (footer_id, name, href, order_index)
SELECT id, 'Privacy Policy', '/privacy', 0 FROM footer_id
UNION ALL
SELECT id, 'Terms of Service', '/terms', 1 FROM footer_id
UNION ALL
SELECT id, 'Cookie Policy', '/cookies', 2 FROM footer_id
UNION ALL
SELECT id, 'Disclaimer', '/disclaimer', 3 FROM footer_id;

-- Insert Footer Social Media
WITH footer_id AS (
  SELECT id FROM footer ORDER BY created_at DESC LIMIT 1
)
INSERT INTO footer_social_media (footer_id, platform, url, order_index)
SELECT id, 'Facebook', '#', 0 FROM footer_id
UNION ALL
SELECT id, 'Instagram', '#', 1 FROM footer_id
UNION ALL
SELECT id, 'LinkedIn', '#', 2 FROM footer_id
UNION ALL
SELECT id, 'Twitter', '#', 3 FROM footer_id;

-- =====================================================
-- Done! All tables created with initial data
-- =====================================================

