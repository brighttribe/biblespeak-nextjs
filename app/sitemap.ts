import { MetadataRoute } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const HUB_PAGES = [
  'how-to-pronounce-bible-names',
  'biblical-names-pronunciation',
  'how-to-pronounce-bible-names-with-ease',
  'acts-2-pronunciation',
  'bible-places-pronunciation',
  'hardest-bible-words-to-pronounce',
  'old-testament-names-pronunciation',
  'new-testament-names-pronunciation',
  'bible-prophets-pronunciation',
  'women-of-the-bible-pronunciation',
  'apostles-names-pronunciation',
  'bible-pronunciation-audio',
  'how-to-pronounce-gods-name',
]

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

  const hubPages: MetadataRoute.Sitemap = HUB_PAGES.map((slug) => ({
    url: `${siteUrl}/${slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    ...hubPages,
    ...letterPages,
    ...wordPages,
  ]
}
