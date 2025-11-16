import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Debug: Log if environment variables are missing (only in development)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    if (!supabaseUrl || !supabaseKey) {
      console.error('⚠️ Missing Supabase environment variables:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      })
    }
  }

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}

