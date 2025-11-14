# Setup Instructions - Database-Driven Sections

## Step 1: Run Database Schema

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste the entire contents of `supabase/schema-all-sections.sql`
3. Click "Run" to create all tables and insert initial data
4. Verify tables were created in the "Table Editor"

## Step 2: Set Up Supabase Storage

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `website-images` (set to Public)
3. Create folders: `hero` and `about`
4. Upload your images:
   - Hero background image → `hero/hero-background.jpg`
   - About section image → `about/about-image.jpg`
5. Copy the public URLs (format: `https://[project-id].supabase.co/storage/v1/object/public/website-images/...`)

## Step 3: Update Image URLs in Database

Run this SQL in Supabase SQL Editor (replace with your actual URLs):

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

## Step 4: Test the Implementation

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Check that all sections are displaying data from the database
4. Check browser console for any errors

## Step 5: Update Remaining Components (Optional)

If you want to complete the remaining components (Why Choose Us, Contact, Footer), follow the pattern in `REMAINING-COMPONENTS-GUIDE.md`.

## Step 6: Admin Panel Updates

The admin panels need to be updated to use the new server actions. Each admin page should:
- Use the new actions from `app/actions/section-actions.ts`
- Call `revalidatePath('/')` after updates to refresh the cache

## How It Works

1. **Caching**: All data is cached for 1 hour using Next.js `unstable_cache`
2. **Revalidation**: When admin makes changes, `revalidatePath` clears the cache
3. **Fallbacks**: Components have default data if database fetch fails
4. **Real-time Updates**: Changes in admin panel reflect on homepage after cache revalidation

## Troubleshooting

- **No data showing**: Check browser console for errors, verify database has data
- **Images not loading**: Verify Storage bucket is public and URLs are correct
- **Changes not reflecting**: Clear Next.js cache or wait for cache expiration (1 hour)

