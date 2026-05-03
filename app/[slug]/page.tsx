import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createSupabaseClient, audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'
import Link from 'next/link'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export async function generateStaticParams() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from('words').select('slug')
  const wordSlugs = (data ?? []).map((w) => ({ slug: w.slug }))
  const letterSlugs = LETTERS.map((l) => ({ slug: `${l}-words` }))
  return [...wordSlugs, ...letterSlugs]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const letterMatch = slug.match(/^([a-z])-words$/)
  if (letterMatch) {
    const letter = letterMatch[1]
    const title = `Bible Words Starting with ${letter.toUpperCase()} | Bible Speak`
    const description = `Pronunciation guides for all Bible words and names starting with the letter ${letter.toUpperCase()}.`
    return {
      title,
      description,
      openGraph: { type: 'website', title, description, url: `${siteUrl}/${letter}-words/` },
      twitter: { card: 'summary', title, description },
    }
  }

  const supabase = createSupabaseClient()
  const { data: word } = await supabase
    .from('words')
    .select('title, pronunciation')
    .eq('slug', slug)
    .single()

  if (!word) return {}

  const title = `How to Pronounce ${word.title} | Bible Speak`
  const description = `Learn the correct pronunciation of ${word.title}${word.pronunciation ? ` (${word.pronunciation})` : ''} with an audio guide, phonetic spelling, and biblical context.`
  return {
    title,
    description,
    openGraph: { type: 'article', title, description, url: `${siteUrl}/${slug}/` },
    twitter: { card: 'summary', title, description },
  }
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const letterMatch = slug.match(/^([a-z])-words$/)
  if (letterMatch) return <LetterPage letter={letterMatch[1]} />
  return <WordPage slug={slug} />
}

async function LetterPage({ letter }: { letter: string }) {
  if (!LETTERS.includes(letter)) notFound()

  const supabase = createSupabaseClient()
  const { data: words } = await supabase
    .from('words')
    .select('title, slug, pronunciation')
    .eq('letter', letter)
    .order('title')

  const count = (words ?? []).length
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        headline: `Bible Words Starting with ${letter.toUpperCase()}`,
        description: `Pronunciation guides for all Bible words and names starting with the letter ${letter.toUpperCase()}. ${count} words with audio and phonetic spelling.`,
        url: `${siteUrl}/${letter}-words/`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: `${letter.toUpperCase()} Words`, item: `${siteUrl}/${letter}-words/` },
        ],
      },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Page header */}
      <div className="relative bg-navy overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute right-0 top-0 w-72 h-72 bg-brand/15 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 py-10">
          <nav className="mb-3 text-sm text-white/40 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/70">Words: {letter.toUpperCase()}</span>
          </nav>
          <div className="flex items-end justify-between">
            <h1 className="text-3xl font-bold">
              Bible Words Starting with{' '}
              <span className="text-brand">{letter.toUpperCase()}</span>
            </h1>
            <span className="text-sm text-white/40 mb-1">{count} words</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* A–Z nav */}
        <div className="flex flex-wrap gap-1.5 mb-8 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          {LETTERS.map((l) => (
            <Link
              key={l}
              href={`/${l}-words/`}
              className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                l === letter
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-slate-500 hover:bg-brand/10 hover:text-brand'
              }`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        <AdUnit slot="5253930888" className="mb-4" />

        {/* Word list */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {count === 0 ? (
            <p className="px-6 py-12 text-slate-400 text-center">No words found for this letter.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {(words ?? []).map((word) => (
                <li key={word.slug}>
                  <Link
                    href={`/${word.slug}/`}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-brand/5 transition-colors group"
                  >
                    <span className="font-medium text-slate-800 group-hover:text-brand transition-colors">
                      {word.title}
                    </span>
                    {word.pronunciation && (
                      <span className="text-sm text-slate-400 font-mono bg-slate-50 group-hover:bg-brand/10 group-hover:text-brand px-2.5 py-1 rounded-lg transition-colors shrink-0 ml-4">
                        {word.pronunciation}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}

async function WordPage({ slug }: { slug: string }) {
  const supabase = createSupabaseClient()
  const [{ data: word }, { data: related }] = await Promise.all([
    supabase.from('words').select('*').eq('slug', slug).single(),
    supabase.from('words').select('title, slug, pronunciation').order('title'),
  ])

  if (!word) notFound()

  const relatedWords = (related ?? [])
    .filter((w) => w.slug !== slug && w.slug.charAt(0) === word.letter)
    .slice(0, 10)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const pageUrl = `${siteUrl}/${word.slug}/`

  const syllables = word.pronunciation ? word.pronunciation.split('-').join(' · ') : null
  const syllableCount = word.pronunciation ? word.pronunciation.split('-').length : null

  const faqItems = [
    {
      '@type': 'Question',
      name: `How do you pronounce ${word.title}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${word.title} is pronounced ${word.pronunciation ?? word.title}${syllables ? ` (${syllables})` : ''}. Use the audio guide on this page to hear the correct pronunciation.`,
      },
    },
    {
      '@type': 'Question',
      name: `How do you say ${word.title} in English?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `In English, ${word.title} is said as "${word.pronunciation ?? word.title}"${syllableCount ? ` — ${syllableCount} syllable${syllableCount !== 1 ? 's' : ''}` : ''}. Stress the capitalized syllable when speaking it aloud.`,
      },
    },
    ...(word.meaning ? [{
      '@type': 'Question',
      name: `What does ${word.title} mean in the Bible?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: word.meaning,
      },
    }] : []),
    {
      '@type': 'Question',
      name: `Is ${word.title} hard to pronounce?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${word.title} can be tricky for modern readers. The phonetic spelling is ${word.pronunciation ?? word.title}${syllables ? `, broken into syllables: ${syllables}` : ''}. Listening to the audio recording on this page is the fastest way to get it right.`,
      },
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `How to Pronounce ${word.title}`,
        description: `Learn the correct pronunciation of the Bible word ${word.title}${word.pronunciation ? ` (${word.pronunciation})` : ''}. Includes audio guide, phonetic spelling${word.meaning ? `, and meaning: ${word.meaning}` : ''}.`,
        url: pageUrl,
        publisher: {
          '@type': 'Organization',
          name: 'Bible Speak',
          url: siteUrl,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.pronunciation-speakable'],
        },
        ...(word.audio_file && {
          audio: {
            '@type': 'AudioObject',
            name: `${word.title} Pronunciation`,
            description: `Audio pronunciation of the Bible word or name ${word.title}`,
            contentUrl: audioUrl(word.audio_file),
            encodingFormat: 'audio/mpeg',
          },
        }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          ...(word.letter ? [{ '@type': 'ListItem', position: 2, name: `${word.letter.toUpperCase()} Words`, item: `${siteUrl}/${word.letter}-words/` }] : []),
          { '@type': 'ListItem', position: word.letter ? 3 : 2, name: word.title, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems,
      },
      {
        '@type': 'HowTo',
        name: `How to Pronounce ${word.title}`,
        description: `Step-by-step guide to correctly pronouncing the biblical word or name ${word.title}`,
        step: [
          {
            '@type': 'HowToStep',
            name: 'Learn the syllables',
            text: syllables
              ? `Break ${word.title} into syllables: ${syllables}`
              : `Study the phonetic spelling of ${word.title}: ${word.pronunciation ?? word.title}`,
          },
          {
            '@type': 'HowToStep',
            name: 'Listen to the audio',
            text: `Use the audio player on this page to hear ${word.title} pronounced correctly by a native speaker.`,
          },
          {
            '@type': 'HowToStep',
            name: 'Practice aloud',
            text: `Say ${word.title} aloud following the phonetic guide: ${word.pronunciation ?? word.title}. Repeat until it feels natural.`,
          },
        ],
      },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Word hero */}
      <div className="relative bg-navy overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" />
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-dark/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="relative max-w-3xl mx-auto px-4 pt-5 pb-10">
          <nav className="mb-6 text-sm text-white/40 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {word.letter && (
              <>
                <span>›</span>
                <Link href={`/${word.letter}-words/`} className="hover:text-white transition-colors">
                  {word.letter.toUpperCase()} Words
                </Link>
              </>
            )}
            <span>›</span>
            <span className="text-white/70">{word.title}</span>
          </nav>

          <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-3">Pronunciation Guide</p>
          <h1 className="text-5xl font-bold mb-5">{word.title}</h1>

          {word.pronunciation && (
            <div className="pronunciation-speakable inline-flex items-center gap-2.5 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-full font-mono text-xl mb-7 backdrop-blur-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
              {word.pronunciation}
            </div>
          )}

          {word.audio_file && <AudioPlayer src={audioUrl(word.audio_file)} dark />}
        </div>

      </div>

      {/* Content cards */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {word.meaning && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-brand rounded-full" />
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Meaning</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-slate-700 text-lg leading-relaxed">{word.meaning}</p>
            </div>
          </div>
        )}

        {word.content && (
          <>
            <AdUnit slot="5253930888" />

            <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
              <summary className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 cursor-pointer list-none select-none hover:bg-slate-100 transition-colors">
                <div className="w-1.5 h-4 bg-brand rounded-full shrink-0" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex-1">Historical Context</span>
                <svg
                  className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="px-6 py-5">
                <div
                  className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-brand prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: word.content }}
                />
              </div>
            </details>

            <AdUnit slot="5253930888" />
          </>
        )}

        {relatedWords.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-brand rounded-full" />
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                More {word.letter?.toUpperCase()} Words
              </h2>
            </div>
            <div className="px-6 py-4 flex flex-wrap gap-2">
              {relatedWords.map((w) => (
                <Link
                  key={w.slug}
                  href={`/${w.slug}/`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-brand hover:text-white hover:border-brand transition-all"
                >
                  <span className="font-medium">{w.title}</span>
                  {w.pronunciation && (
                    <span className="text-xs font-mono opacity-60">{w.pronunciation}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
