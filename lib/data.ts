import wordsRaw from '@/data/words.json'

export type Word = {
  title: string
  slug: string
  pronunciation: string | null
  meaning: string | null
  audio_file: string | null
  letter: string | null
  content: string | null
}

const words = wordsRaw as Word[]

export function getAllWords(): Word[] {
  return words
}

export function getWordBySlug(slug: string): Word | null {
  return words.find((w) => w.slug === slug) ?? null
}

export function getWordsByLetter(letter: string): Word[] {
  return words
    .filter((w) => w.letter === letter)
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getAllWordSlugs(): string[] {
  return words.map((w) => w.slug)
}

export function getSearchWords(): { title: string; slug: string; pronunciation: string | null }[] {
  return words.map((w) => ({ title: w.title, slug: w.slug, pronunciation: w.pronunciation }))
}
