'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateHeroSection(formData: FormData) {
  const supabase = await createClient()

  const data = {
    title_line1: formData.get('title_line1') as string,
    title_line2: formData.get('title_line2') as string,
    title_line3: formData.get('title_line3') as string,
    title_line4: formData.get('title_line4') as string,
    description: formData.get('description') as string,
    background_image_url: formData.get('background_image_url') as string,
    cta_primary_text: formData.get('cta_primary_text') as string,
    cta_primary_link: formData.get('cta_primary_link') as string,
    cta_secondary_text: formData.get('cta_secondary_text') as string,
    cta_secondary_link: formData.get('cta_secondary_link') as string,
  }

  const { error } = await supabase
    .from('hero_section')
    .update(data)
    .eq('id', (await supabase.from('hero_section').select('id').single()).data?.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  return { success: true }
}

export async function getHeroSection() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('hero_section').select('*').single()
  return { data, error }
}

export async function getHeroRotatingTexts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_rotating_texts')
    .select('*')
    .order('order_index')
  return { data, error }
}

export async function createHeroRotatingText(text: string, orderIndex: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_rotating_texts')
    .insert({ text, order_index: orderIndex })
    .select()
    .single()
  revalidatePath('/admin/hero')
  return { data, error }
}

export async function updateHeroRotatingText(id: string, text: string, orderIndex: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_rotating_texts')
    .update({ text, order_index: orderIndex })
    .eq('id', id)
    .select()
    .single()
  revalidatePath('/admin/hero')
  return { data, error }
}

export async function deleteHeroRotatingText(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('hero_rotating_texts').delete().eq('id', id)
  revalidatePath('/admin/hero')
  return { error }
}

export async function getHeroStats() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('hero_stats').select('*').order('order_index')
  return { data, error }
}

export async function createHeroStat(value: string, label: string, orderIndex: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_stats')
    .insert({ value, label, order_index: orderIndex })
    .select()
    .single()
  revalidatePath('/admin/hero')
  return { data, error }
}

export async function updateHeroStat(id: string, value: string, label: string, orderIndex: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_stats')
    .update({ value, label, order_index: orderIndex })
    .eq('id', id)
    .select()
    .single()
  revalidatePath('/admin/hero')
  return { data, error }
}

export async function deleteHeroStat(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('hero_stats').delete().eq('id', id)
  revalidatePath('/admin/hero')
  return { error }
}

