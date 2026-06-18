import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { audioUrl } from '@/lib/supabase'
import { getAllWordSlugs, getWordBySlug, getWordsByLetter, getAllWords } from '@/lib/data'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'
import BackToTop from '@/components/BackToTop'
import Link from 'next/link'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export async function generateStaticParams() {
  const wordSlugs = getAllWordSlugs().map((slug) => ({ slug }))
  const letterSlugs = LETTERS.map((l) => ({ slug: `${l}-words` }))
  return [...wordSlugs, ...letterSlugs]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org').trim()
  const letterMatch = slug.match(/^([a-z])-words$/)
  if (letterMatch) {
    const letter = letterMatch[1]
    const title = `Bible Words Starting with ${letter.toUpperCase()}`
    const description = `Pronunciation guides for all Bible words and names starting with the letter ${letter.toUpperCase()}.`
    return {
      title,
      description,
      openGraph: { type: 'website', title, description, url: `${siteUrl}/${letter}-words/` },
      twitter: { card: 'summary', title, description },
    }
  }

  const word = getWordBySlug(slug)
  if (!word) return {}

  const full = `How to Pronounce ${word.title} Pronunciation`
  const title = full.length <= 43 ? full : `${word.title} Pronunciation`
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

  const words = getWordsByLetter(letter)

  const count = words.length
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org').trim()

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/${letter}-words/`,
        headline: `Bible Words Starting with ${letter.toUpperCase()}`,
        name: `Bible Words Starting with ${letter.toUpperCase()} | BibleSpeak.org`,
        description: `Pronunciation guides for all Bible words and names starting with the letter ${letter.toUpperCase()}. ${count} words with audio and phonetic spelling.`,
        url: `${siteUrl}/${letter}-words/`,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${siteUrl}/#website` },
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: `${letter.toUpperCase()} Words`, item: `${siteUrl}/${letter}-words/` },
        ],
      },
      {
        '@type': 'ItemList',
        name: `Bible Words Starting with ${letter.toUpperCase()}`,
        description: `All ${count} Bible words and names starting with ${letter.toUpperCase()} — with audio pronunciation, phonetic spelling, and biblical meaning.`,
        numberOfItems: count,
        itemListElement: words.map((word, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: word.title,
          url: `${siteUrl}/${word.slug}/`,
        })),
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
        <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          {LETTERS.map((l) => (
            <Link
              key={l}
              href={`/${l}-words/`}
              className={`flex items-center justify-center w-11 h-11 rounded-lg text-base font-bold transition-all ${
                l === letter
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-slate-500 hover:bg-brand/10 hover:text-brand'
              }`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        <AdUnit slot="6127268085" className="mb-4" />

        {/* Word list */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {count === 0 ? (
            <p className="px-6 py-12 text-slate-400 text-center">No words found for this letter.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {words.map((word, i) => (
                <li key={word.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
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
      <BackToTop />
    </main>
  )
}

async function WordPage({ slug }: { slug: string }) {
  const word = getWordBySlug(slug)
  if (!word) notFound()

  const relatedWords = getAllWords()
    .filter((w) => w.slug !== slug && w.letter === word.letter)
    .slice(0, 10)

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org').trim()
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
        '@id': `${pageUrl}#article`,
        headline: `How to Pronounce ${word.title}`,
        description: `Learn the correct pronunciation of the Bible word ${word.title}${word.pronunciation ? ` (${word.pronunciation})` : ''}. Includes audio guide, phonetic spelling${word.meaning ? `, and meaning: ${word.meaning}` : ''}.`,
        url: pageUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        author: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'BibleSpeak.org',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'BibleSpeak.org',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/bible-speak.png`,
          },
        },
        inLanguage: 'en-US',
        isPartOf: { '@id': `${siteUrl}/#website` },
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
            inLanguage: 'en-US',
          },
        }),
        ...(word.meaning && {
          about: {
            '@type': 'Thing',
            name: word.title,
            description: word.meaning,
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

          <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-3">How to Pronounce</p>
          <h1 className="text-5xl font-bold mb-7">
            {word.title}
            {word.pronunciation && (
              <span className="pronunciation-speakable block text-2xl font-normal font-mono text-white/60 mt-2">{word.pronunciation}</span>
            )}
          </h1>

          {word.audio_file && <AudioPlayer src={audioUrl(word.audio_file)} dark title={word.title} />}
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
            <AdUnit slot="6127268085" />

            <details open className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
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

            <AdUnit slot="6127268085" />
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
