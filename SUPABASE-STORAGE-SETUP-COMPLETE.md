# Complete Supabase Storage Setup Guide

## Step 1: Create Storage Bucket

1. **Go to Supabase Dashboard**
   - Open https://supabase.com/dashboard
   - Select your project

2. **Navigate to Storage**
   - Click **Storage** in the left sidebar
   - You'll see the Storage page

3. **Create New Bucket**
   - Click the **"New bucket"** button (top right)
   - **Bucket name**: `website-images`
   - **Public bucket**: ✅ **Check this box** (IMPORTANT - makes images publicly accessible)
   - **File size limit**: Leave default or set to 10MB
   - **Allowed MIME types**: Leave empty (allows all types) OR enter: `image/jpeg,image/png,image/webp,image/jpg`
   - Click **"Create bucket"**

## Step 2: Create Folders Structure

1. **Inside the `website-images` bucket**, create these folders:
   - Click on the bucket name to open it
   - Click **"New folder"** or use the upload interface
   - Create folder: `hero`
   - Create folder: `about`

   *Note: If you can't create folders directly, you can upload files with paths like `hero/image.jpg` and folders will be created automatically*

## Step 3: Upload Images

### Upload Hero Background Image

1. **Navigate to `hero` folder** (or upload with path `hero/hero-background.jpg`)
2. **Click "Upload file"**
3. **Select your hero background image**
   - Recommended size: 1920x1080px or larger
   - Format: JPEG, PNG, or WebP
   - File name: `hero-background.jpg` (or your preferred name)
4. **Click "Upload"**
5. **Copy the Public URL**:
   - After upload, click on the file
   - Copy the **Public URL** (format: `https://[project-id].supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg`)

### Upload About Section Image

1. **Navigate to `about` folder** (or upload with path `about/about-image.jpg`)
2. **Click "Upload file"**
3. **Select your about section image**
   - Recommended size: 800x600px or larger
   - Format: JPEG, PNG, or WebP
   - File name: `about-image.jpg` (or your preferred name)
4. **Click "Upload"**
5. **Copy the Public URL**:
   - After upload, click on the file
   - Copy the **Public URL** (format: `https://[project-id].supabase.co/storage/v1/object/public/website-images/about/about-image.jpg`)

## Step 4: Update Database with Image URLs

After uploading images, you need to update the database with the image URLs.

1. **Go to SQL Editor** in Supabase Dashboard
2. **Run this SQL** (replace `[YOUR-PROJECT-ID]` and image paths with your actual values):

```sql
-- Update hero section background image
UPDATE hero_section 
SET background_image_url = 'https://[YOUR-PROJECT-ID].supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Update about section image
UPDATE about_section 
SET image_url = 'https://[YOUR-PROJECT-ID].supabase.co/storage/v1/object/public/website-images/about/about-image.jpg'
WHERE id = (SELECT id FROM about_section ORDER BY created_at DESC LIMIT 1);
```

**To find your project ID:**
- Look at your Supabase project URL: `https://supabase.com/dashboard/project/[PROJECT-ID]`
- Or check your `.env.local` file: `NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co`

## Step 5: Set Up Storage Policies (Optional - for Admin Uploads)

If you want to allow authenticated users (admin) to upload images from the admin panel:

1. **Go to Storage → Policies**
2. **Select `website-images` bucket**
3. **Click "New Policy"**
4. **Create policy for INSERT (Upload)**:
   - Policy name: `Allow authenticated uploads`
   - Allowed operation: `INSERT`
   - Policy definition:
   ```sql
   (bucket_id = 'website-images'::text) AND (auth.role() = 'authenticated'::text)
   ```
5. **Create policy for UPDATE**:
   - Policy name: `Allow authenticated updates`
   - Allowed operation: `UPDATE`
   - Policy definition:
   ```sql
   (bucket_id = 'website-images'::text) AND (auth.role() = 'authenticated'::text)
   ```
6. **Create policy for DELETE**:
   - Policy name: `Allow authenticated deletes`
   - Allowed operation: `DELETE`
   - Policy definition:
   ```sql
   (bucket_id = 'website-images'::text) AND (auth.role() = 'authenticated'::text)
   ```

## Step 6: Verify Images Are Accessible

1. **Test the URLs**:
   - Open the Public URL in a new browser tab
   - The image should load directly
   - If you see an error, check:
     - Bucket is set to **Public**
     - URL is correct
     - File was uploaded successfully

2. **Check in your app**:
   - Start your dev server: `npm run dev`
   - Visit `http://localhost:3000`
   - Check the hero and about sections
   - Images should load from Supabase Storage

## Troubleshooting

### Images Not Loading

1. **Check bucket is public**:
   - Go to Storage → `website-images` bucket
   - Click "Settings" (gear icon)
   - Ensure "Public bucket" is checked

2. **Verify URL format**:
   - Should be: `https://[project-id].supabase.co/storage/v1/object/public/website-images/[folder]/[filename]`
   - No authentication tokens needed for public buckets

3. **Check file exists**:
   - Go to Storage → `website-images` → check folder
   - Verify file is there and has correct name

4. **Check database**:
   - Go to Table Editor → `hero_section`
   - Verify `background_image_url` is set correctly
   - Go to Table Editor → `about_section`
   - Verify `image_url` is set correctly

### Permission Errors

- If you get permission errors, ensure:
  - Bucket is set to **Public** (for public access)
  - OR policies are set correctly (for authenticated access)

## Quick Reference: Image URLs Format

```
https://[PROJECT-ID].supabase.co/storage/v1/object/public/website-images/[folder]/[filename]
```

Example:
```
https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg
```

## Next Steps

After setting up storage:
1. ✅ Images uploaded to Supabase Storage
2. ✅ Database updated with image URLs
3. ✅ Images loading in your app
4. ✅ Ready to use in admin panel for future uploads

