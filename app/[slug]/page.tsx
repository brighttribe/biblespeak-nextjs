import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createSupabaseClient, audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import Link from 'next/link'

export async function generateStaticParams() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from('words').select('slug')
  return (data ?? []).map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = createSupabaseClient()
  const { data: word } = await supabase
    .from('words')
    .select('title, pronunciation')
    .eq('slug', slug)
    .single()

  if (!word) return {}

  return {
    title: `How to Pronounce ${word.title} | Bible Speak`,
    description: `Learn the correct pronunciation of ${word.title}${word.pronunciation ? ` (${word.pronunciation})` : ''} with an audio guide.`,
  }
}

export default async function WordPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = createSupabaseClient()
  const { data: word } = await supabase
    .from('words')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!word) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        {word.letter && (
          <>
            <span className="mx-2">›</span>
            <Link
              href={`/${word.letter}-words/`}
              className="text-blue-600 hover:underline"
            >
              {word.letter.toUpperCase()} Words
            </Link>
          </>
        )}
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        How to Pronounce {word.title}
      </h1>

      {word.pronunciation && (
        <p className="text-xl text-gray-600 mb-4 font-mono">{word.pronunciation}</p>
      )}

      {word.audio_file && (
        <div className="mb-6">
          <AudioPlayer src={audioUrl(word.audio_file)} />
        </div>
      )}

      {word.meaning && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold text-gray-700 mb-1">Meaning</h2>
          <p className="text-gray-800">{word.meaning}</p>
        </div>
      )}

      {word.content && (
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: word.content }}
        />
      )}
    </main>
  )
}
