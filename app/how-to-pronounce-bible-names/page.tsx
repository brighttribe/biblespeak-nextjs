import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'How to Pronounce Bible Names — Audio Guide | BibleSpeak.org',
  description: 'Learn how to pronounce Bible names correctly with audio recordings, phonetic spellings, and biblical context. Free pronunciation guide for 857 Bible words and names.',
  openGraph: {
    title: 'How to Pronounce Bible Names — Audio Guide | BibleSpeak.org',
    description: 'Learn how to pronounce Bible names correctly with audio recordings, phonetic spellings, and biblical context.',
    url: 'https://biblespeak.org/how-to-pronounce-bible-names/',
  },
}

const TARGET_SLUGS = [
  'aaron-pronunciation',
  'moses-pronunciation',
  'elijah-pronunciation',
  'isaiah-pronunciation',
  'jeremiah-pronunciation',
  'ezekiel-pronunciation',
  'bethlehem-pronunciation',
  'jerusalem-pronunciation',
  'nazareth-pronunciation',
  'galilee-pronunciation',
  'gethsemane-pronunciation',
  'nicodemus-pronunciation',
  'lazarus-pronunciation',
  'bartholomew-pronunciation',
  'thaddaeus-pronunciation',
  'phrygia-pronunciation',
  'cyrene-pronunciation',
  'pamphylia-pronunciation',
  'cappadocia-pronunciation',
  'nebat-pronunciation',
  'miletus-pronunciation',
  'nebuchadnezzar-pronunciation',
  'laodicea-pronunciation',
  'zacchaeus-pronunciation',
  'ecclesiastes-pronunciation',
]

export default function HowToPronouncebiblenamesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()
  const words = allWords.filter((w) => TARGET_SLUGS.includes(w.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'How to Pronounce Bible Names',
        description: 'Learn how to pronounce Bible names correctly with audio recordings, phonetic spellings, and biblical context. Free pronunciation guide for 857 Bible words and names.',
        url: `${siteUrl}/how-to-pronounce-bible-names/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'How to Pronounce Bible Names', item: `${siteUrl}/how-to-pronounce-bible-names/` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'How to Pronounce Bible Names',
        numberOfItems: words.length,
        itemListElement: words.map((w, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: w.title,
          url: `${siteUrl}/${w.slug}/`,
        })),
      },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative bg-navy overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-dark/30 rounded-full blur-[100px] translate-y-1/4" />

        <div className="relative max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight leading-[1.1]">
            How to Pronounce <span className="text-brand">Bible Names</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Audio recordings, phonetic spellings, and biblical context for 857 Bible names and words — free, no account required, works on any device.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">How to Pronounce Bible Names</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-slate-600 leading-relaxed mb-6">
            Whether you&rsquo;re preparing a sermon, leading a Bible study, or reading Scripture aloud for the first time, Bible name pronunciation is one of those skills that quietly separates confident readers from hesitant ones. BibleSpeak.org exists to close that gap — with audio recordings you can play directly in your browser and phonetic spellings that make the stress pattern obvious at a glance.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Why Bible Pronunciation Matters</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Mispronouncing a name in a sermon, Bible study, or reading aloud can break momentum and create self-consciousness. More importantly, getting names right connects readers more deeply to the people and places they&rsquo;re encountering. When you can say &ldquo;Nebuchadnezzar&rdquo; or &ldquo;Bartholomew&rdquo; without hesitation, the text flows naturally and the narrative comes alive. Pronunciation is a bridge between the ancient world and the reader&rsquo;s voice.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            The difficulty isn&rsquo;t a knowledge problem — it&rsquo;s a reference problem. Most people have never heard these names spoken in isolation, and English spelling rules don&rsquo;t apply cleanly to words transliterated from Hebrew, Aramaic, and Greek. A name like &ldquo;Thaddaeus&rdquo; reads as four syllables of equal weight to most English speakers. It isn&rsquo;t. The stress lands on the first syllable, and the rest follows easily once you know that. That&rsquo;s exactly the kind of guidance a pronunciation guide provides.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">How BibleSpeak Works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Each of the 857 words in our database includes a phonetic spelling broken into syllables, a free audio recording you can play directly in your browser, the biblical meaning of the word, and historical context explaining who or where the word refers to. No account needed. No downloads. Works on any device.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            The phonetic system uses capitalization to indicate the stressed syllable — so &ldquo;THAD-ee-uhs&rdquo; tells you at a glance where the emphasis falls. If you&rsquo;re still unsure after reading the phonetics, click play and hear it spoken aloud. The combination of visual and audio cues means most people get the pronunciation right on their first or second try.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">25 Bible Names to Pronounce First</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            This list covers a mix of well-known names and the trickier ones that catch readers off guard — places from Paul&rsquo;s journeys, figures from the prophets, and names from the Gospels that appear in readings year-round.
          </p>


          <div className="mt-6">
            {words.map((word) => (
              <div key={word.slug} className="bg-white rounded-2xl border border-slate-200 p-6 mb-4 shadow-sm">
                <div className="flex items-center flex-wrap gap-3 mb-2">
                  <Link href={`/${word.slug}/`} className="text-xl font-bold text-slate-800 hover:text-brand transition-colors">
                    {word.title}
                  </Link>
                  {word.pronunciation && (
                    <span className="text-sm font-mono bg-brand/10 text-brand px-3 py-1 rounded-lg">
                      {word.pronunciation}
                    </span>
                  )}
                </div>
                {word.meaning && <p className="text-slate-600 text-sm mb-3">{word.meaning}</p>}
                {word.audio_file && (
                  <AudioPlayer src={audioUrl(word.audio_file)} title={word.title} />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
