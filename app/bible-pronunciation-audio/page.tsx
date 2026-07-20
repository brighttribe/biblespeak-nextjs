import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'Bible Pronunciation Audio — Free Recordings for 857 Words | BibleSpeak.org',
  description: 'Free audio recordings for 857 Bible words and names. Click to hear the correct pronunciation of any biblical word — no signup, no download required.',
  openGraph: {
    title: 'Bible Pronunciation Audio — Free Recordings | BibleSpeak.org',
    description: 'Free audio recordings for 857 Bible words and names. No signup required.',
    url: 'https://biblespeak.org/bible-pronunciation-audio/',
  },
}

const TARGET_SLUGS = [
  'aaron-pronunciation',
  'elijah-pronunciation',
  'isaiah-pronunciation',
  'moses-pronunciation',
  'phrygia-pronunciation',
  'cyrene-pronunciation',
  'pamphylia-pronunciation',
  'cappadocia-pronunciation',
  'bartholomew-pronunciation',
  'thaddaeus-pronunciation',
  'nicodemus-pronunciation',
  'lazarus-pronunciation',
  'nebuchadnezzar-pronunciation',
  'laodicea-pronunciation',
  'thessalonica-pronunciation',
  'jeremiah-pronunciation',
  'ezekiel-pronunciation',
  'bethlehem-pronunciation',
  'gethsemane-pronunciation',
  'jerusalem-pronunciation',
  'nazareth-pronunciation',
  'galilee-pronunciation',
  'miletus-pronunciation',
  'ephesus-pronunciation',
  'habakkuk-pronunciation',
]

export default async function BiblePronunciationAudioPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = await getAllWords()
  const words = allWords.filter((w) => TARGET_SLUGS.includes(w.slug) && w.audio_file)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Bible Pronunciation Audio', item: `${siteUrl}/bible-pronunciation-audio/` },
        ],
      },
      {
        '@type': 'Article',
        name: 'Bible Pronunciation Audio Guide',
        description: 'Free audio recordings for 857 Bible words and names. Click to hear the correct pronunciation of any biblical word — no signup, no download required.',
        url: `${siteUrl}/bible-pronunciation-audio/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ItemList',
        name: 'Bible Pronunciation Audio',
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
            Bible Pronunciation <span className="text-brand">Audio Guide</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Free audio recordings for 857 biblical words and names — click to hear, no signup required
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Bible Pronunciation Audio</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Why Audio Makes Pronunciation Stick</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Phonetic spellings help, but hearing a word spoken is what makes it permanent. Language researchers call this &ldquo;auditory encoding&rdquo; — the brain stores spoken words in a different memory system than written words, and auditory memories are retrieved faster and more accurately during speech. Hear &ldquo;Bartholomew&rdquo; spoken once, say it twice, and you&rsquo;ll have it. That&rsquo;s the entire method BibleSpeak is built on.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Free, Instant, No Account Needed</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Every audio recording on BibleSpeak plays directly in your browser with one click. No account, no app, no ads between you and the audio. The recordings are served from a fast CDN so they load instantly on mobile and desktop alike. The audio files are professionally recorded and free to use for personal study.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Sample Recordings — Click to Hear</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The entries below include some of the most-searched and most-challenging words in our database, selected to give you a representative sample of what&rsquo;s available. Every word in the full database has an audio recording.
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
                {word.audio_file && <AudioPlayer src={audioUrl(word.audio_file)} title={word.title} />}
              </div>
            ))}
          </div>

          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-8 mt-8 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Browse All 857 Words with Audio</h2>
            <p className="text-slate-600 mb-5">Every word in our database includes a phonetic spelling and audio recording. Browse by letter to find any biblical word or name.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => (
                <Link key={l} href={`/${l}-words/`} className="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold text-slate-500 hover:bg-brand/10 hover:text-brand transition-all border border-slate-200 bg-white">
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
