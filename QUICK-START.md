# Quick Start Guide - Your Supabase is Configured! 🎉

Your Supabase credentials have been set up. Follow these steps to get your admin panel running:

## ✅ Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including `@supabase/ssr` and `@supabase/supabase-js`.

## ✅ Step 2: Set Up Your Supabase Database

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard/project/zfmazqvccebisimswtez

2. **Run the Database Schema:**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"
   - Open the file `supabase/schema.sql` from this project
   - Copy ALL the contents and paste into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)
   - Wait for "Success. No rows returned" message

3. **Set Up Storage Buckets:**
   - Still in SQL Editor, create a new query
   - Open the file `supabase/storage-setup.sql`
   - Copy ALL the contents and paste into the SQL Editor
   - Click "Run"
   - Wait for success message

4. **Verify Storage Buckets:**
   - Go to "Storage" in the left sidebar
   - You should see 4 buckets:
     - `hero-images` (public)
     - `project-images` (public)
     - `about-images` (public)
     - `general-images` (public)

## ✅ Step 3: Create Your Admin User

1. **Go to Authentication:**
   - Click "Authentication" in the left sidebar
   - Click "Users" tab
   - Click "Add User" or "Invite User"

2. **Create Admin Account:**
   - Enter your email address
   - Enter a secure password
   - Click "Create User"
   - **Important:** Note down your email and password - you'll need it to login!

## ✅ Step 4: Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## ✅ Step 5: Access the Admin Panel

1. **Open your browser:**
   - Go to: `http://localhost:3000/admin/login`

2. **Login:**
   - Enter the email you created in Step 3
   - Enter the password you created in Step 3
   - Click "Login"

3. **You're in!** 🎉
   - You'll be redirected to the dashboard
   - Start managing your content!

## 🎯 What You Can Do Now

### Hero Section (`/admin/hero`)
- Edit hero title, description, and CTAs
- Upload background image
- Manage rotating texts
- Manage stats (100+, 16+ Years, etc.)

### Projects (`/admin/projects`)
- Add new projects
- Upload multiple images per project
- Edit project details
- Set featured projects
- Delete projects

### Other Sections
- View data for About, Services, Why Choose Us, Contact, Footer
- Full editors coming soon (you can edit directly in Supabase for now)

## 🔧 Troubleshooting

### "Invalid credentials" error
- Make sure you created the user in Supabase Authentication
- Check that you're using the correct email/password

### "Failed to fetch" or connection errors
- Verify your `.env.local` file exists and has the correct values
- Check that your Supabase project is active
- Restart your dev server: `npm run dev`

### Database errors
- Make sure you ran `schema.sql` completely
- Check the SQL Editor for any error messages
- Verify all tables exist in the "Table Editor"

### Images not uploading
- Verify storage buckets exist (Step 2.4)
- Check that buckets are set to "Public"
- Make sure you're logged in as admin

## 📚 Next Steps

1. **Populate Initial Content:**
   - Use the admin panel to add your hero content
   - Add your projects with images
   - Fill in other sections

2. **Refactor Frontend (Optional):**
   - The frontend still uses hardcoded data
   - You can refactor components to fetch from Supabase
   - See `ADMIN-PANEL-SUMMARY.md` for details

## 🆘 Need Help?

- Check `README-ADMIN-SETUP.md` for detailed setup instructions
- Check `ADMIN-PANEL-SUMMARY.md` for implementation details
- Check Supabase Dashboard for database/storage issues

---

**Your Supabase Project:** https://zfmazqvccebisimswtez.supabase.co  
**Admin Panel:** http://localhost:3000/admin/login

Happy managing! 🚀

