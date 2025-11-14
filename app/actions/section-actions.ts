'use server'

import { createClient, createPublicClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { unstable_cache } from 'next/cache'

// Cache duration: 1 hour (3600 seconds)
const CACHE_TAG = 'sections'
const CACHE_DURATION = 3600

// Helper function to create cached fetcher
function createCachedFetcher<T>(key: string, fetcher: () => Promise<T>) {
  return unstable_cache(
    fetcher,
    [key],
    {
      tags: [CACHE_TAG, key],
      revalidate: CACHE_DURATION,
    }
  )
}

// =====================================================
// HERO SECTION
// =====================================================

export async function getHeroSection() {
  const fetcher = async () => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('hero_section')
      .select('*, hero_rotating_texts(*)')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return { data, error }
  }
  
  return createCachedFetcher('hero-section', fetcher)()
}

export async function updateHeroSection(formData: FormData) {
  const supabase = await createClient()
  
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

  const { data: hero, error } = await supabase
    .from('hero_section')
    .update(data)
    .order('created_at', { ascending: false })
    .limit(1)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  // Update rotating texts
  const rotatingTexts = formData.getAll('rotating_texts[]') as string[]
  if (rotatingTexts.length > 0 && hero) {
    // Delete existing texts
    await supabase.from('hero_rotating_texts').delete().eq('hero_section_id', hero.id)
    
    // Insert new texts
    await supabase.from('hero_rotating_texts').insert(
      rotatingTexts.map((text, index) => ({
        hero_section_id: hero.id,
        text,
        order_index: index,
      }))
    )
  }

  revalidatePath('/')
  revalidatePath('/admin/hero')
  return { data: hero, error: null }
}

// =====================================================
// ABOUT SECTION
// =====================================================

export async function getAboutSection() {
  const fetcher = async () => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('about_section')
      .select('*, about_achievements(*), about_values(*)')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return { data, error }
  }
  
  return createCachedFetcher('about-section', fetcher)()
}

export async function updateAboutSection(formData: FormData) {
  const supabase = await createClient()
  
  // First, get the about section ID
  const { data: existingAbout, error: fetchError } = await supabase
    .from('about_section')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (fetchError || !existingAbout) {
    // If no about section exists, create one
    if (fetchError?.code === 'PGRST116') {
      const data = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        journey_text: formData.get('journey_text') as string,
        mission_text: formData.get('mission_text') as string,
        image_url: formData.get('image_url') as string,
        recognition_title: formData.get('recognition_title') as string,
        recognition_text: formData.get('recognition_text') as string,
        years_experience: formData.get('years_experience') as string,
      }

      const { data: newAbout, error: createError } = await supabase
        .from('about_section')
        .insert(data)
        .select()
        .single()

      if (createError) {
        return { error: createError.message, data: null }
      }

      revalidatePath('/')
      revalidatePath('/admin/about')
      return { data: newAbout, error: null }
    }
    return { error: fetchError?.message || 'About section not found', data: null }
  }

  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    journey_text: formData.get('journey_text') as string,
    mission_text: formData.get('mission_text') as string,
    image_url: formData.get('image_url') as string,
    recognition_title: formData.get('recognition_title') as string,
    recognition_text: formData.get('recognition_text') as string,
    years_experience: formData.get('years_experience') as string,
  }

  // Now update using the ID
  const { data: about, error } = await supabase
    .from('about_section')
    .update(data)
    .eq('id', existingAbout.id)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  revalidatePath('/')
  revalidatePath('/admin/about')
  return { data: about, error: null }
}

// =====================================================
// SERVICES
// =====================================================

export async function getServices() {
  const fetcher = async () => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('services')
      .select('*, service_features(*)')
      .order('order_index')
    return { data, error }
  }
  
  return createCachedFetcher('services', fetcher)()
}

export async function getService(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*, service_features(*)')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createService(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    icon_name: formData.get('icon_name') as string,
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const { data: service, error } = await supabase
    .from('services')
    .insert(data)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  // Add features
  const features = formData.getAll('features[]') as string[]
  if (features.length > 0) {
    await supabase.from('service_features').insert(
      features.map((feature, index) => ({
        service_id: service.id,
        feature_text: feature,
        order_index: index,
      }))
    )
  }

  revalidatePath('/')
  revalidatePath('/admin/services')
  return { data: service, error: null }
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    icon_name: formData.get('icon_name') as string,
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const { data: service, error } = await supabase
    .from('services')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  // Update features
  const features = formData.getAll('features[]') as string[]
  if (features.length > 0) {
    // Delete existing features
    await supabase.from('service_features').delete().eq('service_id', id)
    
    // Insert new features
    await supabase.from('service_features').insert(
      features.map((feature, index) => ({
        service_id: id,
        feature_text: feature,
        order_index: index,
      }))
    )
  }

  revalidatePath('/')
  revalidatePath('/admin/services')
  return { data: service, error: null }
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  
  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/services')
  return { error: null }
}

// =====================================================
// WHY CHOOSE US
// =====================================================

export async function getWhyChooseUsSection() {
  const fetcher = async () => {
    const supabase = createPublicClient()
    const { data: section, error: sectionError } = await supabase
      .from('why_choose_us_section')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (sectionError) {
      return { data: null, error: sectionError }
    }

    const { data: advantages, error: advantagesError } = await supabase
      .from('why_choose_us_advantages')
      .select('*')
      .eq('why_choose_us_section_id', section.id)
      .order('order_index')

    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index')

    const { data: certifications, error: certificationsError } = await supabase
      .from('certifications')
      .select('*')
      .order('order_index')

    return {
      data: {
        ...section,
        advantages: advantages || [],
        testimonials: testimonials || [],
        certifications: certifications || [],
      },
      error: advantagesError || testimonialsError || certificationsError || null,
    }
  }
  
  return createCachedFetcher('why-choose-us-section', fetcher)()
}

export async function updateWhyChooseUsSection(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
  }

  const { data: section, error } = await supabase
    .from('why_choose_us_section')
    .update(data)
    .order('created_at', { ascending: false })
    .limit(1)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  revalidatePath('/')
  revalidatePath('/admin/why-choose-us')
  return { data: section, error: null }
}

// =====================================================
// TESTIMONIALS
// =====================================================

export async function getTestimonials() {
  const fetcher = async () => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index')
    return { data, error }
  }
  
  return createCachedFetcher('testimonials', fetcher)()
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    project: formData.get('project') as string,
    rating: parseInt(formData.get('rating') as string) || 5,
    comment: formData.get('comment') as string,
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .insert(data)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { data: testimonial, error: null }
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    project: formData.get('project') as string,
    rating: parseInt(formData.get('rating') as string) || 5,
    comment: formData.get('comment') as string,
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { data: testimonial, error: null }
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  
  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { error: null }
}

// =====================================================
// CONTACT SECTION
// =====================================================

export async function getContactSection() {
  const fetcher = async () => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('contact_section')
      .select('*, contact_info(*)')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return { data, error }
  }
  
  return createCachedFetcher('contact-section', fetcher)()
}

export async function updateContactSection(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
  }

  const { data: contact, error } = await supabase
    .from('contact_section')
    .update(data)
    .order('created_at', { ascending: false })
    .limit(1)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  revalidatePath('/')
  revalidatePath('/admin/contact')
  return { data: contact, error: null }
}

// =====================================================
// FOOTER
// =====================================================

export async function getFooter() {
  const fetcher = async () => {
    const supabase = createPublicClient()
    const { data: footer, error: footerError } = await supabase
      .from('footer')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (footerError) {
      return { data: null, error: footerError }
    }

    const { data: quickLinks } = await supabase
      .from('footer_quick_links')
      .select('*')
      .eq('footer_id', footer.id)
      .order('order_index')

    const { data: services } = await supabase
      .from('footer_services')
      .select('*')
      .eq('footer_id', footer.id)
      .order('order_index')

    const { data: legalLinks } = await supabase
      .from('footer_legal_links')
      .select('*')
      .eq('footer_id', footer.id)
      .order('order_index')

    const { data: socialMedia } = await supabase
      .from('footer_social_media')
      .select('*')
      .eq('footer_id', footer.id)
      .order('order_index')

    return {
      data: {
        ...footer,
        quick_links: quickLinks || [],
        services: services || [],
        legal_links: legalLinks || [],
        social_media: socialMedia || [],
      },
      error: null,
    }
  }
  
  return createCachedFetcher('footer', fetcher)()
}

export async function updateFooter(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    company_description: formData.get('company_description') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    copyright_text: formData.get('copyright_text') as string,
    registration_number: formData.get('registration_number') as string,
    emergency_phone: formData.get('emergency_phone') as string,
  }

  const { data: footer, error } = await supabase
    .from('footer')
    .update(data)
    .order('created_at', { ascending: false })
    .limit(1)
    .select()
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  revalidatePath('/')
  revalidatePath('/admin/footer')
  return { data: footer, error: null }
}

