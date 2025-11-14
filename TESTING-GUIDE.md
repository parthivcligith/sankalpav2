# Testing Guide - All Endpoints

## ✅ Fixed Issues

1. **Hero Section Actions** - Fixed to match database schema (title, subtitle vs title_line1, etc.)
2. **Hero Stats** - Fixed to use hero_section table fields instead of non-existent hero_stats table
3. **Table Names** - Fixed admin pages to use correct table names:
   - `footer` (not `footer_section`)
   - `about_values` (not `about_core_values`)
   - `why_choose_us_advantages` (not `advantages`)
   - `footer_social_media` (not `footer_social_links`)
4. **Missing Functions** - Added `updateWhyChooseUsSection` function
5. **Hero Rotating Texts** - Fixed to properly link to hero_section_id

## 🧪 Test Checklist

### 1. Hero Section (`/admin/hero`)
- [ ] **Update Hero Section**
  - Fill in: title, subtitle, description, background_image_url, cta_primary_text, cta_secondary_text, whatsapp_number
  - Fill in stats: stats_projects_completed, stats_years, stats_area_built, stats_satisfaction
  - Click "Save Changes"
  - ✅ Should show success toast
  - ✅ Should refresh page
  - ✅ Changes should appear on homepage

- [ ] **Add Rotating Text**
  - Click "Add Text"
  - Enter text in prompt
  - ✅ Should add to list immediately
  - ✅ Should appear on homepage

- [ ] **Update Rotating Text**
  - Edit text in input field
  - Click outside (blur)
  - ✅ Should save automatically
  - ✅ Should show success toast

- [ ] **Delete Rotating Text**
  - Click trash icon
  - Confirm deletion
  - ✅ Should remove from list
  - ✅ Should disappear from homepage

- [ ] **Upload Background Image**
  - Click "Upload" button
  - Select image file
  - ✅ Should upload to Supabase Storage
  - ✅ Should populate URL field
  - ✅ Should show preview

### 2. Projects (`/admin/projects`)
- [ ] **Create Project**
  - Click "Add New Project"
  - Fill in all fields (title, category, year, description, etc.)
  - Add features
  - Click "Save"
  - ✅ Should create project
  - ✅ Should appear in list
  - ✅ Should appear on homepage

- [ ] **Update Project**
  - Click "Edit" on a project
  - Modify fields
  - Click "Save"
  - ✅ Should update project
  - ✅ Changes should appear on homepage

- [ ] **Delete Project**
  - Click "Delete" on a project
  - Confirm deletion
  - ✅ Should remove project
  - ✅ Should disappear from homepage

- [ ] **Add Project Image**
  - Click "Add Image" on a project
  - Upload image
  - ✅ Should upload to Supabase Storage
  - ✅ Should appear in project images

### 3. Services (`/admin/services`)
- [ ] **Create Service**
  - Use `createService` action
  - Fill in: title, description, icon_name, order_index
  - Add features
  - ✅ Should create service
  - ✅ Should appear on homepage

- [ ] **Update Service**
  - Use `updateService` action
  - Modify fields
  - ✅ Should update service
  - ✅ Changes should appear on homepage

- [ ] **Delete Service**
  - Use `deleteService` action
  - ✅ Should remove service
  - ✅ Should disappear from homepage

### 4. About Section (`/admin/about`)
- [ ] **Update About Section**
  - Use `updateAboutSection` action
  - Fill in: title, subtitle, journey_text, mission_text, image_url, recognition_title, recognition_text, years_experience
  - ✅ Should update about section
  - ✅ Changes should appear on homepage

### 5. Why Choose Us (`/admin/why-choose-us`)
- [ ] **Update Why Choose Us Section**
  - Use `updateWhyChooseUsSection` action
  - Fill in: title, subtitle
  - ✅ Should update section
  - ✅ Changes should appear on homepage

- [ ] **Create Testimonial**
  - Use `createTestimonial` action
  - Fill in: name, role, project, rating, comment, order_index
  - ✅ Should create testimonial
  - ✅ Should appear on homepage

- [ ] **Update Testimonial**
  - Use `updateTestimonial` action
  - Modify fields
  - ✅ Should update testimonial
  - ✅ Changes should appear on homepage

- [ ] **Delete Testimonial**
  - Use `deleteTestimonial` action
  - ✅ Should remove testimonial
  - ✅ Should disappear from homepage

### 6. Contact Section (`/admin/contact`)
- [ ] **Update Contact Section**
  - Use `updateContactSection` action
  - Fill in: title, subtitle
  - ✅ Should update contact section
  - ✅ Changes should appear on homepage

### 7. Footer (`/admin/footer`)
- [ ] **Update Footer**
  - Use `updateFooter` action
  - Fill in: company_description, phone, email, address, copyright_text, registration_number, emergency_phone
  - ✅ Should update footer
  - ✅ Changes should appear on homepage

## 🔍 Common Issues to Check

1. **Form Validation**
   - Required fields should show errors if empty
   - Invalid data should show error messages

2. **Error Handling**
   - Network errors should show user-friendly messages
   - Database errors should be logged and displayed

3. **Cache Invalidation**
   - After updates, homepage should show new data
   - No stale data should appear

4. **Image Uploads**
   - Images should upload to correct Supabase Storage bucket
   - URLs should be properly formatted
   - Images should display correctly

5. **Data Relationships**
   - Rotating texts should link to hero_section
   - Service features should link to services
   - Project features should link to projects

## 📝 Notes

- All update functions use `revalidatePath('/')` to clear cache
- All get functions use `unstable_cache` for 1-hour caching
- Public read operations use `createPublicClient()` (no cookies)
- Update operations use `createClient()` (with auth cookies)

## 🚀 Ready for Testing

All endpoints have been fixed and are ready for testing. Start with Hero Section as it's the most complex, then move through each section systematically.

