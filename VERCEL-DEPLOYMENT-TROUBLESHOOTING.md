# Vercel Deployment - Login 400 Error Troubleshooting Guide

## Understanding the Error

The `400 Bad Request` error from Supabase auth (`/auth/v1/token?grant_type=password`) typically occurs due to one of these issues:

1. **Missing or incorrect environment variables in Vercel**
2. **Email confirmation required in Supabase**
3. **Invalid credentials**
4. **Supabase project settings misconfiguration**

## Step-by-Step Fix

### 1. Verify Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (`ssssesw` or your project name)
3. Go to **Settings** → **Environment Variables**
4. Verify these variables exist and are correct:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://zfmazqvccebisimswtez.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

5. **Important**: Make sure:
   - Variable names are EXACTLY as shown (case-sensitive)
   - No extra spaces or quotes around the values
   - Values are from your Supabase project (Settings → API)

### 2. Redeploy After Adding Variables

After adding/updating environment variables:
1. Go to **Deployments** tab in Vercel
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for the deployment to complete

**OR** push a new commit to trigger a redeploy.

### 3. Check Supabase Auth Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `zfmazqvccebisimswtez`
3. Go to **Authentication** → **Settings**
4. Check these settings:

   **Email Auth:**
   - ✅ Enable Email provider should be ON
   - ⚠️ **"Confirm email"** setting:
     - If enabled: Users must confirm email before login
     - If disabled: Users can login immediately
   
   **For production, you likely want "Confirm email" DISABLED for admin users:**
   - Go to **Authentication** → **Users**
   - Find your admin user
   - Check if email is confirmed (green checkmark)
   - If not confirmed, click the user → **"Confirm Email"** button

### 4. Verify User Exists and is Confirmed

1. In Supabase Dashboard → **Authentication** → **Users**
2. Verify your admin user exists
3. Check the **"Confirmed"** column - it should show ✅
4. If not confirmed:
   - Click on the user
   - Click **"Confirm Email"** button
   - Or recreate the user with "Auto Confirm User" checked

### 5. Test Credentials

Try logging in with:
- Email: `sankalpa@gmail.com` (or your admin email)
- Password: `Sajan@sankalpa123` (or your admin password)

If credentials are wrong:
1. In Supabase Dashboard → **Authentication** → **Users**
2. Click on your user
3. Click **"Reset Password"** or **"Update Password"**

### 6. Check Browser Console for Detailed Errors

After the improved error handling, check the browser console (F12) for:
- Detailed error messages
- Missing environment variable warnings
- Specific Supabase error codes

### 7. Verify Supabase Project URL and Key

1. Go to Supabase Dashboard → **Settings** → **API**
2. Copy the exact values:
   - **Project URL**: Should be `https://zfmazqvccebisimswtez.supabase.co`
   - **anon/public key**: Copy the full key (starts with `eyJ...`)

3. In Vercel, make sure these match exactly

### 8. Common Issues and Solutions

#### Issue: Environment variables not accessible
**Solution**: 
- Ensure variables are added to **Production**, **Preview**, and **Development** environments in Vercel
- Redeploy after adding variables

#### Issue: Email confirmation required
**Solution**:
- Disable email confirmation in Supabase Auth settings
- OR confirm the user's email manually in Supabase Dashboard

#### Issue: Wrong Supabase project
**Solution**:
- Verify you're using the correct project URL and anon key
- Check that the project is active (not paused)

#### Issue: CORS errors
**Solution**:
- Supabase handles CORS automatically
- If you see CORS errors, check your Supabase project settings

## Quick Checklist

- [ ] Environment variables added to Vercel (both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] Variables are correct (no typos, no extra spaces)
- [ ] Redeployed after adding variables
- [ ] User exists in Supabase Authentication → Users
- [ ] User email is confirmed (green checkmark)
- [ ] Email confirmation is disabled OR user is confirmed
- [ ] Using correct credentials (email and password)
- [ ] Supabase project is active (not paused)

## Still Not Working?

1. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Your Project → **Functions** tab
   - Look for any errors during deployment

2. **Check Supabase Logs**:
   - Go to Supabase Dashboard → **Logs** → **Auth Logs**
   - Look for failed login attempts and error messages

3. **Test Locally First**:
   - Make sure login works on `localhost:3000`
   - If it works locally but not on Vercel, it's an environment variable issue

4. **Contact Support**:
   - If all else fails, check the browser console for the exact error message
   - The improved error handling will now show more specific errors

## Testing After Fix

1. Clear browser cache and cookies for `sankalpabuilders.com`
2. Try logging in again
3. Check browser console (F12) for any errors
4. Check the toast notifications for specific error messages

