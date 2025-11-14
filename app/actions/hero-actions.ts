'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateHeroSection(formData: FormData) {
  try {
    const supabase = await createClient()

    // First, get the hero section ID
    const { data: existingHero, error: fetchError } = await supabase
      .from('hero_section')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !existingHero) {
      // If no hero section exists, create one
      if (fetchError?.code === 'PGRST116') {
        const data = {
          title: formData.get('title') as string,
          subtitle: formData.get('subtitle') as string,
          description: formData.get('description') as string,
          background_image_url: formData.get('background_image_url') as string,
          cta_primary_text: formData.get('cta_primary_text') as string,
          cta_secondary_text: formData.get('cta_secondary_text') as string,
          whatsapp_number: formData.get('whatsapp_number') as string,
          stats_projects_completed: formData.get('stats_projects_completed') as string,
          stats_years: formData.get('stats_years') as string,
          stats_area_built: formData.get('stats_area_built') as string,
          stats_satisfaction: formData.get('stats_satisfaction') as string,
        }

        const { data: newHero, error: createError } = await supabase
          .from('hero_section')
          .insert(data)
          .select()
          .single()

        if (createError) {
          console.error('Create error:', createError)
          return { error: createError.message, data: null }
        }

        // Add rotating texts for new hero
        const rotatingTexts = formData.getAll('rotating_texts[]') as string[]
        if (rotatingTexts.length > 0 && newHero) {
          await supabase.from('hero_rotating_texts').insert(
            rotatingTexts.map((text, index) => ({
              hero_section_id: newHero.id,
              text,
              order_index: index,
            }))
          )
        }

        revalidatePath('/')
        revalidatePath('/admin/hero')
        return { data: newHero, error: null }
      }
      console.error('Fetch error:', fetchError)
      return { error: fetchError?.message || 'Hero section not found', data: null }
    }

    const data = {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      description: formData.get('description') as string,
      background_image_url: formData.get('background_image_url') as string,
      cta_primary_text: formData.get('cta_primary_text') as string,
      cta_secondary_text: formData.get('cta_secondary_text') as string,
      whatsapp_number: formData.get('whatsapp_number') as string,
      stats_projects_completed: formData.get('stats_projects_completed') as string,
      stats_years: formData.get('stats_years') as string,
      stats_area_built: formData.get('stats_area_built') as string,
      stats_satisfaction: formData.get('stats_satisfaction') as string,
    }

    console.log('Updating hero section with ID:', existingHero.id)
    console.log('Update data:', data)

    // Now update using the ID - don't use .single() as it might fail if RLS blocks or returns 0 rows
    const { data: heroArray, error } = await supabase
      .from('hero_section')
      .update(data)
      .eq('id', existingHero.id)
      .select()

    if (error) {
      console.error('Update error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return { error: error.message || 'Failed to update hero section. Check RLS policies.', data: null }
    }

    if (!heroArray || heroArray.length === 0) {
      console.error('No rows updated - possible RLS issue or row not found')
      console.error('Existing hero ID:', existingHero.id)
      return { error: 'Update failed: No rows were updated. This usually means RLS policies are blocking the update. Please run the add-update-policies.sql script in Supabase.', data: null }
    }

    const hero = heroArray[0]
    console.log('Hero updated successfully:', hero)

    // Update rotating texts
    const rotatingTexts = formData.getAll('rotating_texts[]') as string[]
    if (rotatingTexts.length > 0 && hero) {
      // Delete existing texts
      const { error: deleteError } = await supabase
        .from('hero_rotating_texts')
        .delete()
        .eq('hero_section_id', hero.id)
      
      if (deleteError) {
        console.error('Delete rotating texts error:', deleteError)
      }
      
      // Insert new texts
      const { error: insertError } = await supabase
        .from('hero_rotating_texts')
        .insert(
          rotatingTexts.map((text, index) => ({
            hero_section_id: hero.id,
            text,
            order_index: index,
          }))
        )
      
      if (insertError) {
        console.error('Insert rotating texts error:', insertError)
      }
    }

    revalidatePath('/')
    revalidatePath('/admin/hero')
    return { data: hero, error: null }
  } catch (error) {
    console.error('Unexpected error in updateHeroSection:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error occurred', data: null }
  }
}

export async function getHeroSection() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_section')
    .select('*, hero_rotating_texts(*)')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
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
  
  // Get the hero section ID first
  const { data: hero } = await supabase
    .from('hero_section')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!hero) {
    return { data: null, error: { message: 'Hero section not found' } }
  }

  const { data, error } = await supabase
    .from('hero_rotating_texts')
    .insert({ hero_section_id: hero.id, text, order_index: orderIndex })
    .select()
    .single()
  revalidatePath('/admin/hero')
  revalidatePath('/')
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

// Stats are stored directly in hero_section table, not a separate table
export async function getHeroStats() {
  const supabase = await createClient()
  const { data: hero, error } = await supabase
    .from('hero_section')
    .select('stats_projects_completed, stats_years, stats_area_built, stats_satisfaction')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  
  if (error || !hero) {
    return { data: [], error }
  }

  // Transform to array format for compatibility
  const stats = [
    { id: 'stats_projects_completed', value: hero.stats_projects_completed || '', label: 'Projects Completed', order_index: 0 },
    { id: 'stats_years', value: hero.stats_years || '', label: 'Years Experience', order_index: 1 },
    { id: 'stats_area_built', value: hero.stats_area_built || '', label: 'Area Built', order_index: 2 },
    { id: 'stats_satisfaction', value: hero.stats_satisfaction || '', label: 'Satisfaction', order_index: 3 },
  ]
  
  return { data: stats, error: null }
}

// Stats are updated via updateHeroSection, these functions are kept for compatibility but update the main section
export async function createHeroStat(value: string, label: string, orderIndex: number) {
  // Stats are part of hero_section, not a separate table
  return { data: null, error: { message: 'Use updateHeroSection to update stats' } }
}

export async function updateHeroStat(id: string, value: string, label: string, orderIndex: number) {
  const supabase = await createClient()
  const { data: hero } = await supabase
    .from('hero_section')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!hero) {
    return { data: null, error: { message: 'Hero section not found' } }
  }

  // Map label to field name
  const fieldMap: Record<string, string> = {
    'Projects Completed': 'stats_projects_completed',
    'Years Experience': 'stats_years',
    'Area Built': 'stats_area_built',
    'Satisfaction': 'stats_satisfaction',
  }

  const fieldName = fieldMap[label]
  if (!fieldName) {
    return { data: null, error: { message: 'Invalid stat label' } }
  }

  const updateData: any = { [fieldName]: value }
  const { data, error } = await supabase
    .from('hero_section')
    .update(updateData)
    .eq('id', hero.id)
    .select()
    .single()

  revalidatePath('/admin/hero')
  return { data: { id, value, label, order_index: orderIndex }, error }
}

export async function deleteHeroStat(id: string) {
  // Stats can't be deleted, only updated
  return { error: { message: 'Stats cannot be deleted, only updated' } }
}

