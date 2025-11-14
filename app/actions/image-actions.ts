'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadImage(bucket: string, file: File, path: string) {
  const supabase = await createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${path}-${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    return { error: error.message, url: null }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath)

  return { url: publicUrl, error: null }
}

export async function deleteImage(bucket: string, path: string) {
  const supabase = await createClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  return { error }
}

