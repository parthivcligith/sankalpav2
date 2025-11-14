# Quick Start: Supabase Storage Setup

## 🚀 Quick Steps (5 minutes)

### 1. Create Bucket (1 min)
- Go to Supabase Dashboard → **Storage**
- Click **"New bucket"**
- Name: `website-images`
- ✅ **Check "Public bucket"** (IMPORTANT!)
- Click **"Create bucket"**

### 2. Upload Images (2 min)

**Hero Image:**
- Open `website-images` bucket
- Upload file → Select your hero background image
- Name it: `hero-background.jpg` (or keep original name)
- **Copy the Public URL** after upload

**About Image:**
- In same bucket, upload your about section image
- Name it: `about-image.jpg` (or keep original name)
- **Copy the Public URL** after upload

### 3. Update Database (1 min)
- Go to **SQL Editor**
- Open file: `supabase/update-image-urls-actual.sql`
- **Replace filenames** if you used different names
- Click **"Run"**

### 4. Verify (1 min)
- Open the Public URLs in a new browser tab
- Images should load directly
- Check your app at `http://localhost:3000`
- Hero and About sections should show images

## 📝 Your Project Details

- **Project ID**: `zfmazqvccebisimswtez`
- **Storage URL Format**: `https://zfmazqvccebisimswtez.supabase.co/storage/v1/object/public/website-images/[folder]/[filename]`

## 🔍 Where to Find Public URLs

After uploading:
1. Click on the uploaded file in Storage
2. Look for **"Public URL"** field
3. Copy that URL
4. Use it in the SQL update script

## ⚠️ Common Issues

**Images not loading?**
- ✅ Check bucket is **Public** (not private)
- ✅ Verify URL is correct (no typos)
- ✅ Check file exists in Storage

**Can't see Public URL?**
- Make sure bucket is set to **Public**
- Go to bucket Settings → Enable "Public bucket"

## 📚 Full Guide

For detailed instructions, see: `SUPABASE-STORAGE-SETUP-COMPLETE.md`

