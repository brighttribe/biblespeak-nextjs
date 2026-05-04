import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function audioUrl(audioFile: string): string {
  const base = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
  return `${base}/storage/v1/object/public/audio/${audioFile}.mp3`
}
