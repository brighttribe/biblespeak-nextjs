import { MetadataRoute } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createSupabaseClient()
  const { data: words } = await supabase.from('words').select('slug')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'

  const wordPages: MetadataRoute.Sitemap = (words ?? []).map((word) => ({
    url: `${siteUrl}/${word.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const letterPages: MetadataRoute.Sitemap = LETTERS.map((letter) => ({
    url: `${siteUrl}/${letter}-words/`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    ...letterPages,
    ...wordPages,
  ]
}
