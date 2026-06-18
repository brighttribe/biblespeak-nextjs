import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'Biblical Names Pronunciation — Phonetic Guide with Audio | BibleSpeak.org',
  description: 'Correct pronunciation of biblical names with phonetic spellings and audio recordings. From Aaron to Zacchaeus — hear every name spoken aloud.',
  openGraph: {
    title: 'Biblical Names Pronunciation — Phonetic Guide with Audio | BibleSpeak.org',
    description: 'Correct pronunciation of biblical names with phonetic spellings and audio recordings.',
    url: 'https://biblespeak.org/biblical-names-pronunciation/',
  },
}

const TARGET_SLUGS = [
  'aaron-pronunciation',
  'abigail-pronunciation',
  'abraham-pronunciation',
  'bartholomew-pronunciation',
  'bathsheba-pronunciation',
  'boaz-pronunciation',
  'cornelius-pronunciation',
  'deborah-pronunciation',
  'eli-pronunciation',
  'elijah-pronunciation',
  'elisha-pronunciation',
  'esther-pronunciation',
  'ezekiel-pronunciation',
  'isaiah-pronunciation',
  'jeremiah-pronunciation',
  'jonah-pronunciation',
  'joseph-pronunciation',
  'joshua-pronunciation',
  'lazarus-pronunciation',
  'lydia-pronunciation',
  'malachi-pronunciation',
  'mary-pronunciation',
  'miriam-pronunciation',
  'mordecai-pronunciation',
  'naomi-pronunciation',
  'nicodemus-pronunciation',
  'obadiah-pronunciation',
  'ruth-pronunciation',
  'samson-pronunciation',
  'solomon-pronunciation',
  'thaddaeus-pronunciation',
  'timothy-pronunciation',
  'zacchaeus-pronunciation',
  'zechariah-pronunciation',
]

export default function BiblicalNamesPronunciationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()
  const words = allWords.filter((w) => TARGET_SLUGS.includes(w.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Biblical Names Pronunciation Guide',
        description: 'Correct pronunciation of biblical names with phonetic spellings and audio recordings. From Aaron to Zacchaeus — hear every name spoken aloud.',
        url: `${siteUrl}/biblical-names-pronunciation/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Biblical Names Pronunciation', item: `${siteUrl}/biblical-names-pronunciation/` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Biblical Names Pronunciation Guide',
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
            Biblical Names <span className="text-brand">Pronunciation Guide</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Phonetic spellings and audio recordings for 34 of the most-referenced biblical names — from Aaron to Zechariah.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Biblical Names Pronunciation</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-slate-600 leading-relaxed mb-6">
            Biblical names carry centuries of history, theology, and narrative weight — but English spelling rarely does them justice. The same name can have been transliterated through Hebrew, Greek, Latin, and then Early Modern English before arriving in the Bible you hold today. Each handoff introduced new spelling conventions that don&rsquo;t match how the name was actually spoken. The result: names that look pronounceable but routinely catch readers off guard.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Why Biblical Names Are Hard to Pronounce</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Many biblical names come from Hebrew, Aramaic, and Greek originals that don&rsquo;t map cleanly onto English phonics. Silent letters, unexpected stress patterns, and centuries of transliteration produce spellings that routinely mislead English readers. &ldquo;Bartholomew&rdquo; looks like it should stress the first syllable. It doesn&rsquo;t. &ldquo;Nicodemus&rdquo; reads as four equal syllables but the third carries the stress. These patterns are learnable — they just require a guide.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            The issue isn&rsquo;t limited to obscure names. Even common figures like Miriam, Malachi, and Mordecai get stressed differently than they look. Mordecai, for instance, is commonly read as &ldquo;more-duh-KYE&rdquo; when the standard English pronunciation is &ldquo;MOR-duh-ky.&rdquo; These small differences matter when you&rsquo;re reading aloud in front of a congregation or a class.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Reading the Phonetic Spellings</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            BibleSpeak uses a simple system: the stressed syllable is written in ALL CAPS or with a capitalized first letter. Hyphens separate syllables. So &ldquo;THAD-ee-uhs&rdquo; tells you to hit the first syllable hard — THAD — and let the rest fall away. When in doubt, play the audio: it settles every question instantly.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">The Names People Mispronounce Most</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Bartholomew (bar-THOL-oh-myoo, not BARTH-oh-loo), Thaddaeus (THAD-ee-uhs), Nicodemus (nik-oh-DEE-muhs), Zacchaeus (za-KEE-uhs), Zechariah (zek-uh-RY-uh), Obadiah (oh-buh-DY-uh). All of them have the stress further back than readers expect. The full list below covers 34 of the most-referenced biblical names with audio for each.
          </p>

          <AdUnit slot="6127268085" className="my-8" />

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
