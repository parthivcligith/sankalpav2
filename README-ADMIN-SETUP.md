# Sankalpa Builders - Admin Panel Setup Guide

This guide will help you set up the complete CMS admin panel for the Sankalpa Builders website.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Basic knowledge of Next.js and Supabase

## Step 1: Install Dependencies

```bash
npm install
# or
pnpm install
```

## Step 2: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Run the Database Schema**
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the SQL script
   - Then run `supabase/storage-setup.sql` to set up storage buckets

3. **Set Up Storage Buckets**
   - Go to Storage in your Supabase dashboard
   - Verify these buckets exist:
     - `hero-images` (public)
     - `project-images` (public)
     - `about-images` (public)
     - `general-images` (public)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Create Admin User

1. In Supabase Dashboard, go to Authentication
2. Click "Add User" or "Invite User"
3. Create an admin user with email and password
4. Note: The admin panel uses Supabase Auth for authentication

## Step 5: Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

## Step 6: Access the Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. You'll be redirected to the dashboard

## Admin Panel Features

### Dashboard (`/admin`)
- Overview of all content
- Quick stats (projects, testimonials, submissions)
- Quick links to all sections

### Hero Section (`/admin/hero`)
- Edit main hero content (title, description, CTAs)
- Upload background image
- Manage rotating texts
- Manage stats (100+, 16+ Years, etc.)

### Projects (`/admin/projects`)
- Full CRUD for projects
- Upload multiple images per project
- Manage project categories
- Set featured projects
- Add project features and specifications

### About Section (`/admin/about`)
- Edit company story and mission
- Upload company image
- Manage achievements
- Manage core values

### Services (`/admin/services`)
- Edit services section title/subtitle
- Manage individual services
- Add/remove service features

### Why Choose Us (`/admin/why-choose-us`)
- Edit section content
- Manage advantages
- Manage testimonials
- Manage certifications

### Contact (`/admin/contact`)
- Edit contact section
- Manage contact information cards
- View contact form submissions

### Footer (`/admin/footer`)
- Edit footer content
- Manage quick links
- Manage services list
- Manage social media links

## File Structure

```
├── app/
│   ├── admin/              # Admin panel routes
│   │   ├── layout.tsx      # Admin layout with auth
│   │   ├── login/          # Login page
│   │   ├── page.tsx        # Dashboard
│   │   ├── hero/           # Hero editor
│   │   ├── projects/       # Projects manager
│   │   └── ...
│   └── actions/            # Server actions
│       ├── hero-actions.ts
│       ├── project-actions.ts
│       └── image-actions.ts
├── components/
│   └── admin/              # Admin components
│       ├── admin-sidebar.tsx
│       ├── hero-editor.tsx
│       └── projects-manager.tsx
├── lib/
│   └── supabase/           # Supabase clients
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
├── supabase/
│   ├── schema.sql          # Database schema
│   └── storage-setup.sql   # Storage setup
└── middleware.ts            # Auth middleware
```

## Image Upload

Images are uploaded to Supabase Storage and CDN URLs are saved to the database. The admin panel includes:
- Drag-and-drop image uploads
- Image preview before saving
- Automatic CDN URL generation
- Support for multiple images per project

## Security

- All admin routes are protected by authentication middleware
- Row Level Security (RLS) is enabled on all tables
- Public read access for frontend, authenticated write access for admin
- Images are stored in public buckets but upload requires authentication

## Troubleshooting

### Can't login to admin panel
- Verify your Supabase credentials in `.env.local`
- Check that you've created a user in Supabase Auth
- Ensure middleware is working correctly

### Images not uploading
- Verify storage buckets are created and public
- Check storage policies in Supabase
- Ensure you're authenticated

### Database errors
- Verify schema.sql was run successfully
- Check RLS policies are set correctly
- Ensure all tables exist

## Next Steps

1. **Populate Initial Data**: Use the admin panel to add your initial content
2. **Refactor Frontend**: Update frontend components to fetch from Supabase (see TODO)
3. **Customize**: Adjust styling and add custom fields as needed

## Support

For issues or questions, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

## Notes

- The frontend components still use hardcoded data. You'll need to refactor them to fetch from Supabase.
- Some admin pages are placeholders and need full implementation.
- Consider adding more validation and error handling as needed.

