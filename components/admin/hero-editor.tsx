'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { updateHeroSection } from '@/app/actions/hero-actions'
import {
  createHeroRotatingText,
  updateHeroRotatingText,
  deleteHeroRotatingText,
  createHeroStat,
  updateHeroStat,
  deleteHeroStat,
} from '@/app/actions/hero-actions'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, Trash2, Save, Upload } from 'lucide-react'
import Image from 'next/image'

interface HeroEditorProps {
  heroData: any
  rotatingTexts: any[]
  stats: any[]
}

export default function HeroEditor({ heroData, rotatingTexts: initialTexts, stats: initialStats }: HeroEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [rotatingTexts, setRotatingTexts] = useState(initialTexts || [])
  const [stats, setStats] = useState(initialStats || [])
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        const formData = new FormData(e.currentTarget)
        
        // Debug: Log form data
        console.log('Form Data:', {
          title: formData.get('title'),
          subtitle: formData.get('subtitle'),
          description: formData.get('description'),
          background_image_url: formData.get('background_image_url'),
          cta_primary_text: formData.get('cta_primary_text'),
          cta_secondary_text: formData.get('cta_secondary_text'),
          whatsapp_number: formData.get('whatsapp_number'),
          stats_projects_completed: formData.get('stats_projects_completed'),
          stats_years: formData.get('stats_years'),
          stats_area_built: formData.get('stats_area_built'),
          stats_satisfaction: formData.get('stats_satisfaction'),
        })
        
        // Add rotating texts to form data
        rotatingTexts.forEach((text) => {
          formData.append('rotating_texts[]', text.text)
        })
        
        console.log('Calling updateHeroSection...')
        const result = await updateHeroSection(formData)
        console.log('Update result:', result)
        
        if (result.error) {
          console.error('Update error:', result.error)
          toast.error(`Error: ${result.error}`)
        } else {
          toast.success('Hero section updated successfully!')
          // Refresh page to show updated data
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      } catch (error) {
        console.error('Form submission error:', error)
        toast.error(`Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`)
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

      console.log('Uploading to bucket: hero-images, path:', filePath)

      // Upload file
      console.log('Calling supabase.storage.upload...')
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('hero-images')
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
        .from('hero-images')
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
        .from('hero-images')
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
      const form = document.getElementById('hero-form') as HTMLFormElement
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

  const handleAddRotatingText = async () => {
    const text = prompt('Enter rotating text:')
    if (!text) return

    startTransition(async () => {
      const result = await createHeroRotatingText(text, rotatingTexts.length)
      if (result.error) {
        toast.error(result.error.message || 'Failed to add rotating text')
      } else {
        setRotatingTexts([...rotatingTexts, result.data])
        toast.success('Rotating text added!')
      }
    })
  }

  const handleUpdateRotatingText = async (id: string, text: string, orderIndex: number) => {
    startTransition(async () => {
      const result = await updateHeroRotatingText(id, text, orderIndex)
      if (result.error) {
        toast.error(result.error.message)
      } else {
        setRotatingTexts(rotatingTexts.map((t) => (t.id === id ? result.data : t)))
        toast.success('Updated!')
      }
    })
  }

  const handleDeleteRotatingText = async (id: string) => {
    if (!confirm('Delete this rotating text?')) return

    startTransition(async () => {
      const result = await deleteHeroRotatingText(id)
      if (result.error) {
        toast.error(result.error.message)
      } else {
        setRotatingTexts(rotatingTexts.filter((t) => t.id !== id))
        toast.success('Deleted!')
      }
    })
  }

  const handleAddStat = async () => {
    const value = prompt('Enter stat value (e.g., 100+):')
    const label = prompt('Enter stat label:')
    if (!value || !label) return

    startTransition(async () => {
      const result = await createHeroStat(value, label, stats.length)
      if (result.error) {
        toast.error(result.error.message)
      } else {
        setStats([...stats, result.data])
        toast.success('Stat added!')
      }
    })
  }

  const handleUpdateStat = async (id: string, value: string, label: string, orderIndex: number) => {
    startTransition(async () => {
      const result = await updateHeroStat(id, value, label, orderIndex)
      if (result.error) {
        toast.error(result.error.message)
      } else {
        setStats(stats.map((s) => (s.id === id ? result.data : s)))
        toast.success('Updated!')
      }
    })
  }

  const handleDeleteStat = async (id: string) => {
    if (!confirm('Delete this stat?')) return

    startTransition(async () => {
      const result = await deleteHeroStat(id)
      if (result.error) {
        toast.error(result.error.message)
      } else {
        setStats(stats.filter((s) => s.id !== id))
        toast.success('Deleted!')
      }
    })
  }

  return (
    <form id="hero-form" onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Main Content</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={heroData?.title || ''}
              required
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              defaultValue={heroData?.subtitle || ''}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={heroData?.description || ''}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="background_image_url">Background Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="background_image_url"
                name="background_image_url"
                defaultValue={heroData?.background_image_url || ''}
                placeholder="https://... or /images/..."
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'background_image_url')}
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
            {heroData?.background_image_url && (
              <div className="mt-2">
                <Image
                  src={heroData.background_image_url}
                  alt="Background"
                  width={200}
                  height={100}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cta_primary_text">Primary CTA Text</Label>
              <Input
                id="cta_primary_text"
                name="cta_primary_text"
                defaultValue={heroData?.cta_primary_text || ''}
              />
            </div>
            <div>
              <Label htmlFor="cta_secondary_text">Secondary CTA Text</Label>
              <Input
                id="cta_secondary_text"
                name="cta_secondary_text"
                defaultValue={heroData?.cta_secondary_text || ''}
              />
            </div>
            <div>
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input
                id="whatsapp_number"
                name="whatsapp_number"
                defaultValue={heroData?.whatsapp_number || ''}
                placeholder="+919947004671"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Rotating Texts */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Rotating Texts</h2>
          <Button type="button" onClick={handleAddRotatingText} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Text
          </Button>
        </div>
        <div className="space-y-2">
          {rotatingTexts.map((text, index) => (
            <div key={text.id} className="flex gap-2 items-center">
              <Input
                value={text.text}
                onChange={(e) => {
                  const newTexts = [...rotatingTexts]
                  newTexts[index].text = e.target.value
                  setRotatingTexts(newTexts)
                }}
                onBlur={() => handleUpdateRotatingText(text.id, text.text, text.order_index)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteRotatingText(text.id)}
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Stats - These are part of the main form now */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stats_projects_completed">Projects Completed</Label>
            <Input
              id="stats_projects_completed"
              name="stats_projects_completed"
              defaultValue={heroData?.stats_projects_completed || ''}
              placeholder="100+"
            />
          </div>
          <div>
            <Label htmlFor="stats_years">Years Experience</Label>
            <Input
              id="stats_years"
              name="stats_years"
              defaultValue={heroData?.stats_years || ''}
              placeholder="16+"
            />
          </div>
          <div>
            <Label htmlFor="stats_area_built">Area Built</Label>
            <Input
              id="stats_area_built"
              name="stats_area_built"
              defaultValue={heroData?.stats_area_built || ''}
              placeholder="1M+"
            />
          </div>
          <div>
            <Label htmlFor="stats_satisfaction">Satisfaction</Label>
            <Input
              id="stats_satisfaction"
              name="stats_satisfaction"
              defaultValue={heroData?.stats_satisfaction || ''}
              placeholder="100%"
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

