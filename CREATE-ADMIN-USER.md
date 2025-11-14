# Create Admin User - Quick Guide

## Method 1: Using Supabase Dashboard (Recommended - Easiest)

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project (zfmazqvccebisimswtez)

2. **Navigate to Authentication:**
   - Click on **"Authentication"** in the left sidebar
   - Click on **"Users"** tab

3. **Create New User:**
   - Click the **"Add User"** or **"Invite User"** button
   - Select **"Create User"** (not Invite)
   - Fill in the form:
     - **Email:** `sankalpa@gmail.com`
     - **Password:** `Sajan@sankalpa123`
     - **Auto Confirm User:** ✅ Check this box (so you can login immediately)
   - Click **"Create User"**

4. **Done!** You can now login at `/admin/login`

---

## Method 2: Using Script (Advanced)

If you prefer to use a script:

1. **Get your Service Role Key:**
   - Go to Supabase Dashboard > Settings > API
   - Copy the **service_role** key (⚠️ Keep this secret!)

2. **Run the script:**
   ```bash
   # Set the service role key temporarily
   $env:SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
   
   # Install tsx if needed
   npm install -g tsx
   
   # Run the script
   npx tsx scripts/create-admin-user.ts
   ```

   Or create a temporary `.env.setup` file:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

---

## After Creating the User

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Login to admin panel:**
   - Go to: http://localhost:3000/admin/login
   - Email: `sankalpa@gmail.com`
   - Password: `Sajan@sankalpa123`

3. **You're all set!** 🎉

---

## Troubleshooting

**Can't login?**
- Make sure you checked "Auto Confirm User" when creating the user
- Verify the email and password are correct
- Check that your `.env.local` has the correct Supabase URL and anon key

**User already exists?**
- That's fine! You can use the existing user or reset the password in Supabase Dashboard

