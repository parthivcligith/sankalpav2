'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { updateAboutSection } from '@/app/actions/section-actions'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Save, Upload, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface AboutEditorProps {
  aboutData: any
  achievements: any[]
  values: any[]
}

export default function AboutEditor({ aboutData, achievements: initialAchievements, values: initialValues }: AboutEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [achievements, setAchievements] = useState(initialAchievements || [])
  const [values, setValues] = useState(initialValues || [])
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const formData = new FormData(e.currentTarget)
      const result = await updateAboutSection(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('About section updated successfully!')
        window.location.reload()
      }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB')
      return
    }

    setUploading(true)
    try {
      console.log('Starting image upload...', { field, fileName: file.name, fileSize: file.size })
      
      // Use client-side Supabase for faster uploads
      const supabase = createClient()
      
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        toast.error('You must be logged in to upload images')
        return
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${field}-${Date.now()}.${fileExt}`
      const filePath = fileName

      console.log('Uploading to bucket: about-images, path:', filePath)

      // Upload file
      console.log('Calling supabase.storage.upload...')
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('about-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      console.log('Upload response:', { uploadData, uploadError })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        console.error('Error code:', uploadError.statusCode)
        console.error('Error message:', uploadError.message)
        toast.error(`Upload failed: ${uploadError.message}`)
        return
      }

      if (!uploadData) {
        console.error('Upload failed: No data returned')
        toast.error('Upload failed: No data returned')
        return
      }

      console.log('Upload data:', uploadData)
      console.log('Uploaded path:', uploadData.path)

      // Verify the file exists in storage
      const { data: listData, error: listError } = await supabase.storage
        .from('about-images')
        .list('', {
          limit: 100,
          offset: 0,
        })

      console.log('Files in bucket:', listData)
      if (listError) {
        console.warn('Could not list files:', listError)
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('about-images')
        .getPublicUrl(filePath)

      console.log('Upload successful!')
      console.log('File path:', filePath)
      console.log('Public URL:', publicUrl)
      
      // Test if URL is accessible
      try {
        const testResponse = await fetch(publicUrl, { method: 'HEAD' })
        console.log('URL accessibility test:', {
          status: testResponse.status,
          ok: testResponse.ok,
          url: publicUrl
        })
        if (!testResponse.ok) {
          console.warn('Warning: Uploaded file may not be publicly accessible')
        }
      } catch (fetchError) {
        console.warn('Could not test URL accessibility:', fetchError)
      }

      // Update form field
      const form = document.getElementById('about-form') as HTMLFormElement
      const input = form.querySelector(`[name="${field}"]`) as HTMLInputElement
      if (input) {
        input.value = publicUrl
        toast.success('Image uploaded successfully!')
      } else {
        toast.error('Could not find input field to update')
      }
    } catch (error) {
      console.error('Upload exception:', error)
      toast.error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
      // Reset file input
      e.target.value = ''
    }
  }

  return (
    <form id="about-form" onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Main Content</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={aboutData?.title || ''}
              required
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              defaultValue={aboutData?.subtitle || ''}
            />
          </div>

          <div>
            <Label htmlFor="journey_text">Journey Text</Label>
            <Textarea
              id="journey_text"
              name="journey_text"
              defaultValue={aboutData?.journey_text || ''}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="mission_text">Mission Text</Label>
            <Textarea
              id="mission_text"
              name="mission_text"
              defaultValue={aboutData?.mission_text || ''}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="image_url">About Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="image_url"
                name="image_url"
                defaultValue={aboutData?.image_url || ''}
                placeholder="https://... or /images/..."
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'image_url')}
                  disabled={uploading}
                />
                <Button type="button" variant="outline" disabled={uploading} asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </span>
                </Button>
              </label>
            </div>
            {aboutData?.image_url && (
              <div className="mt-2">
                <Image
                  src={aboutData.image_url}
                  alt="About"
                  width={200}
                  height={150}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recognition_title">Recognition Title</Label>
              <Input
                id="recognition_title"
                name="recognition_title"
                defaultValue={aboutData?.recognition_title || ''}
              />
            </div>
            <div>
              <Label htmlFor="years_experience">Years Experience</Label>
              <Input
                id="years_experience"
                name="years_experience"
                defaultValue={aboutData?.years_experience || ''}
                placeholder="17+"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="recognition_text">Recognition Text</Label>
            <Textarea
              id="recognition_text"
              name="recognition_text"
              defaultValue={aboutData?.recognition_text || ''}
              rows={3}
            />
          </div>
        </div>
      </Card>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
      </Button>
    </form>
  )
}

