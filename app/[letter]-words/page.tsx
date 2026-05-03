import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export async function generateStaticParams() {
  return LETTERS.map((letter) => ({ letter }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string }>
}): Promise<Metadata> {
  const { letter } = await params
  if (!letter) return {}
  return {
    title: `Bible Words Starting with ${letter.toUpperCase()} | Bible Speak`,
    description: `Pronunciation guides for all Bible words and names starting with the letter ${letter.toUpperCase()}.`,
  }
}

export default async function LetterPage({
  params,
}: {
  params: Promise<{ letter: string }>
}) {
  const { letter } = await params

  if (!LETTERS.includes(letter)) notFound()

  const supabase = createSupabaseClient()
  const { data: words } = await supabase
    .from('words')
    .select('title, slug, pronunciation')
    .eq('letter', letter)
    .order('title')

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <span>Words: {letter.toUpperCase()}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Bible Words Starting with {letter.toUpperCase()}
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {LETTERS.map((l) => (
          <Link
            key={l}
            href={`/${l}-words/`}
            className={`px-3 py-1 rounded border text-sm font-medium ${
              l === letter
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-600 hover:border-blue-400'
            }`}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>

      <ul className="divide-y divide-gray-100">
        {(words ?? []).map((word) => (
          <li key={word.slug} className="py-3">
            <Link
              href={`/${word.slug}/`}
              className="text-blue-700 hover:underline font-medium"
            >
              {word.title}
            </Link>
            {word.pronunciation && (
              <span className="ml-3 text-gray-500 font-mono text-sm">
                {word.pronunciation}
              </span>
            )}
          </li>
        ))}
      </ul>

      {(!words || words.length === 0) && (
        <p className="text-gray-500">No words found for this letter.</p>
      )}
    </main>
  )
}
