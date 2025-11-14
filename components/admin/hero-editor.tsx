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
import { uploadImage } from '@/app/actions/image-actions'
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
      const formData = new FormData(e.currentTarget)
      const result = await updateHeroSection(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Hero section updated successfully!')
      }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const result = await uploadImage('hero-images', file, field)
      if (result.error) {
        toast.error(result.error)
      } else {
        const form = document.getElementById('hero-form') as HTMLFormElement
        const input = form.querySelector(`[name="${field}"]`) as HTMLInputElement
        if (input) input.value = result.url || ''
        toast.success('Image uploaded successfully!')
      }
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleAddRotatingText = async () => {
    const text = prompt('Enter rotating text:')
    if (!text) return

    startTransition(async () => {
      const result = await createHeroRotatingText(text, rotatingTexts.length)
      if (result.error) {
        toast.error(result.error.message)
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title_line1">Title Line 1</Label>
              <Input
                id="title_line1"
                name="title_line1"
                defaultValue={heroData?.title_line1 || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="title_line2">Title Line 2</Label>
              <Input
                id="title_line2"
                name="title_line2"
                defaultValue={heroData?.title_line2 || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="title_line3">Title Line 3</Label>
              <Input
                id="title_line3"
                name="title_line3"
                defaultValue={heroData?.title_line3 || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="title_line4">Title Line 4</Label>
              <Input
                id="title_line4"
                name="title_line4"
                defaultValue={heroData?.title_line4 || ''}
                required
              />
            </div>
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
                placeholder="https://..."
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
              <Label htmlFor="cta_primary_link">Primary CTA Link</Label>
              <Input
                id="cta_primary_link"
                name="cta_primary_link"
                defaultValue={heroData?.cta_primary_link || ''}
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
              <Label htmlFor="cta_secondary_link">Secondary CTA Link</Label>
              <Input
                id="cta_secondary_link"
                name="cta_secondary_link"
                defaultValue={heroData?.cta_secondary_link || ''}
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

      {/* Stats */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Stats</h2>
          <Button type="button" onClick={handleAddStat} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Stat
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={stat.id} className="flex gap-2 items-center">
              <Input
                placeholder="Value"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...stats]
                  newStats[index].value = e.target.value
                  setStats(newStats)
                }}
                onBlur={() => handleUpdateStat(stat.id, stat.value, stat.label, stat.order_index)}
              />
              <Input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...stats]
                  newStats[index].label = e.target.value
                  setStats(newStats)
                }}
                onBlur={() => handleUpdateStat(stat.id, stat.value, stat.label, stat.order_index)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteStat(stat.id)}
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
      </Button>
    </form>
  )
}

