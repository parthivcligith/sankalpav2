'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_categories(*), project_features(*), project_images(*)')
    .order('order_index')
  return { data, error }
}

export async function getProject(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_categories(*), project_features(*), project_images(*)')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function getProjectCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('project_categories')
    .select('*')
    .order('order_index')
  return { data, error }
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  const data = {
    title: formData.get('title') as string,
    category_id: formData.get('category_id') as string,
    year: formData.get('year') as string,
    description: formData.get('description') as string,
    area: formData.get('area') as string,
    units: formData.get('units') as string,
    floors: formData.get('floors') as string,
    duration: formData.get('duration') as string,
    classrooms: formData.get('classrooms') as string,
    capacity: formData.get('capacity') as string,
    workshops: formData.get('workshops') as string,
    is_featured: formData.get('is_featured') === 'on',
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const { data: project, error } = await supabase
    .from('projects')
    .insert(data)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  // Add features
  const features = formData.getAll('features[]') as string[]
  if (features.length > 0) {
    await supabase.from('project_features').insert(
      features.map((feature, index) => ({
        project_id: project.id,
        feature_text: feature,
        order_index: index,
      }))
    )
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { data: project, error: null }
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()

  const data = {
    title: formData.get('title') as string,
    category_id: formData.get('category_id') as string,
    year: formData.get('year') as string,
    description: formData.get('description') as string,
    area: formData.get('area') as string,
    units: formData.get('units') as string,
    floors: formData.get('floors') as string,
    duration: formData.get('duration') as string,
    classrooms: formData.get('classrooms') as string,
    capacity: formData.get('capacity') as string,
    workshops: formData.get('workshops') as string,
    is_featured: formData.get('is_featured') === 'on',
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const { error } = await supabase.from('projects').update(data).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  // Update features
  await supabase.from('project_features').delete().eq('project_id', id)
  const features = formData.getAll('features[]') as string[]
  if (features.length > 0) {
    await supabase.from('project_features').insert(
      features.map((feature, index) => ({
        project_id: id,
        feature_text: feature,
        order_index: index,
      }))
    )
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { error: null }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { error }
}

export async function addProjectImage(projectId: string, imageUrl: string, isPrimary: boolean = false) {
  const supabase = await createClient()

  // If this is primary, unset other primary images
  if (isPrimary) {
    await supabase
      .from('project_images')
      .update({ is_primary: false })
      .eq('project_id', projectId)
  }

  const { data, error } = await supabase
    .from('project_images')
    .insert({
      project_id: projectId,
      image_url: imageUrl,
      is_primary: isPrimary,
    })
    .select()
    .single()

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { data, error }
}

export async function deleteProjectImage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('project_images').delete().eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { error }
}

