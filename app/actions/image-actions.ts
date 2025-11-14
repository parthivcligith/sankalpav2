'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadImage(bucket: string, file: File, path: string) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('Auth error:', authError)
      return { error: 'You must be logged in to upload images', url: null }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${path}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    console.log('Uploading to bucket:', bucket)
    console.log('File path:', filePath)
    console.log('File size:', file.size, 'bytes')

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

    if (error) {
      console.error('Upload error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return { error: error.message || 'Failed to upload image. Check storage bucket and policies.', url: null }
    }

    if (!data) {
      return { error: 'Upload succeeded but no data returned', url: null }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath)

    console.log('Upload successful, public URL:', publicUrl)
    return { url: publicUrl, error: null }
  } catch (error) {
    console.error('Unexpected upload error:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error occurred during upload', url: null }
  }
}

export async function deleteImage(bucket: string, path: string) {
  const supabase = await createClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  return { error }
}

