# Supabase Storage Setup for Images

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Create a bucket named: `website-images`
5. Set it to **Public** (so images can be accessed via URL)
6. Click **Create bucket**

## Step 2: Upload Images

### Hero Section Background Image
1. In the `website-images` bucket, create a folder: `hero`
2. Upload your hero background image (e.g., `hero-background.jpg`)
3. Copy the public URL (format: `https://[project-id].supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg`)

### About Section Image
1. In the `website-images` bucket, create a folder: `about`
2. Upload your about section image (e.g., `about-image.jpg`)
3. Copy the public URL (format: `https://[project-id].supabase.co/storage/v1/object/public/website-images/about/about-image.jpg`)

## Step 3: Update Database with Image URLs

After uploading images, update the database:

```sql
-- Update hero section background image
UPDATE hero_section 
SET background_image_url = 'https://[your-project-id].supabase.co/storage/v1/object/public/website-images/hero/hero-background.jpg'
WHERE id = (SELECT id FROM hero_section ORDER BY created_at DESC LIMIT 1);

-- Update about section image
UPDATE about_section 
SET image_url = 'https://[your-project-id].supabase.co/storage/v1/object/public/website-images/about/about-image.jpg'
WHERE id = (SELECT id FROM about_section ORDER BY created_at DESC LIMIT 1);
```

Replace `[your-project-id]` with your actual Supabase project ID (found in your project URL).

## Step 4: Storage Policies (Optional - for authenticated uploads)

If you want to allow authenticated uploads from the admin panel:

1. Go to **Storage** > **Policies**
2. Select the `website-images` bucket
3. Create a new policy:
   - Policy name: `Allow authenticated uploads`
   - Allowed operation: `INSERT`, `UPDATE`, `DELETE`
   - Policy definition: `auth.role() = 'authenticated'`

## Image Optimization Tips

- Recommended formats: WebP or JPEG
- Hero background: 1920x1080px or larger
- About image: 800x600px or larger
- Compress images before uploading to reduce load times

