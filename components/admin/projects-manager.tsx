'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { createProject, updateProject, deleteProject, addProjectImage } from '@/app/actions/project-actions'
import { uploadImage } from '@/app/actions/image-actions'
import { toast } from 'sonner'
import { Plus, Edit, Trash2, Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

interface ProjectsManagerProps {
  projects: any[]
  categories: any[]
}

export default function ProjectsManager({ projects: initialProjects, categories }: ProjectsManagerProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [features, setFeatures] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const handleCreate = () => {
    setEditingProject(null)
    setFeatures([])
    setIsDialogOpen(true)
  }

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setFeatures(project.project_features?.map((f: any) => f.feature_text) || [])
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    startTransition(async () => {
      const result = await deleteProject(id)
      if (result.error) {
        toast.error(result.error)
      } else {
        setProjects(projects.filter((p) => p.id !== id))
        toast.success('Project deleted!')
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const formData = new FormData(e.currentTarget)
      features.forEach((feature) => {
        formData.append('features[]', feature)
      })

      let result
      if (editingProject) {
        result = await updateProject(editingProject.id, formData)
      } else {
        result = await createProject(formData)
      }

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(editingProject ? 'Project updated!' : 'Project created!')
        setIsDialogOpen(false)
        // Refresh the page to get updated data
        window.location.reload()
      }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const result = await uploadImage('project-images', file, `project-${projectId}`)
      if (result.error) {
        toast.error(result.error)
      } else {
        const imageResult = await addProjectImage(projectId, result.url || '', false)
        if (imageResult.error) {
          toast.error(imageResult.error.message)
        } else {
          toast.success('Image uploaded!')
          window.location.reload()
        }
      }
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const addFeature = () => {
    setFeatures([...features, ''])
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-600">Total Projects: {projects.length}</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-slate-900">{project.title}</h3>
                <Badge variant="outline" className="mt-2">
                  {project.project_categories?.name || 'Uncategorized'}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>

            {project.project_images && project.project_images.length > 0 && (
              <div className="mb-4">
                <Image
                  src={project.project_images[0].image_url}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(project)}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(project.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update project details' : 'Add a new project to the portfolio'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={editingProject?.title || ''}
                required
              />
            </div>

            <div>
              <Label htmlFor="category_id">Category *</Label>
              <select
                id="category_id"
                name="category_id"
                defaultValue={editingProject?.category_id || ''}
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  name="year"
                  defaultValue={editingProject?.year || ''}
                  required
                />
              </div>
              <div>
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  id="order_index"
                  name="order_index"
                  type="number"
                  defaultValue={editingProject?.order_index || 0}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingProject?.description || ''}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="area">Area</Label>
                <Input id="area" name="area" defaultValue={editingProject?.area || ''} />
              </div>
              <div>
                <Label htmlFor="units">Units</Label>
                <Input id="units" name="units" defaultValue={editingProject?.units || ''} />
              </div>
              <div>
                <Label htmlFor="floors">Floors</Label>
                <Input id="floors" name="floors" defaultValue={editingProject?.floors || ''} />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" defaultValue={editingProject?.duration || ''} />
              </div>
              <div>
                <Label htmlFor="classrooms">Classrooms</Label>
                <Input
                  id="classrooms"
                  name="classrooms"
                  defaultValue={editingProject?.classrooms || ''}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  defaultValue={editingProject?.capacity || ''}
                />
              </div>
            </div>

            <div>
              <Label>Features</Label>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Feature text"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFeature} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                name="is_featured"
                defaultChecked={editingProject?.is_featured || false}
              />
              <Label htmlFor="is_featured">Featured Project</Label>
            </div>

            {editingProject && (
              <div>
                <Label>Project Images</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {editingProject.project_images?.map((img: any) => (
                    <div key={img.id} className="relative">
                      <Image
                        src={img.image_url}
                        alt="Project"
                        width={100}
                        height={100}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
                <label className="cursor-pointer mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, editingProject.id)}
                    disabled={uploading}
                  />
                  <Button type="button" variant="outline" disabled={uploading} asChild>
                    <span>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Add Image'}
                    </span>
                  </Button>
                </label>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? 'Saving...' : editingProject ? 'Update' : 'Create'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

