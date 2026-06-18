import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: "How to Pronounce Bible Names With Ease — Beginner's Guide | BibleSpeak.org",
  description: "A beginner's guide to pronouncing Bible names correctly. Start with the most common names, learn the phonetic system, and build your confidence reading Scripture aloud.",
  openGraph: {
    title: "How to Pronounce Bible Names With Ease | BibleSpeak.org",
    description: "A beginner's guide to pronouncing Bible names correctly.",
    url: 'https://biblespeak.org/how-to-pronounce-bible-names-with-ease/',
  },
}

const TARGET_SLUGS = [
  'aaron-pronunciation',
  'bethlehem-pronunciation',
  'david-pronunciation',
  'elijah-pronunciation',
  'esther-pronunciation',
  'galilee-pronunciation',
  'isaiah-pronunciation',
  'jerusalem-pronunciation',
  'jonah-pronunciation',
  'joseph-pronunciation',
  'lazarus-pronunciation',
  'mary-pronunciation',
  'miriam-pronunciation',
  'moses-pronunciation',
  'nazareth-pronunciation',
  'nicodemus-pronunciation',
  'noah-pronunciation',
  'rahab-pronunciation',
  'ruth-pronunciation',
  'samson-pronunciation',
  'sarah-pronunciation',
  'solomon-pronunciation',
  'zacchaeus-pronunciation',
]

export default function HowToPronounceBibleNamesWithEasePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()
  const words = allWords.filter((w) => TARGET_SLUGS.includes(w.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'How to Pronounce Bible Names With Ease',
        description: "A beginner's guide to pronouncing Bible names correctly. Start with the most common names, learn the phonetic system, and build your confidence reading Scripture aloud.",
        url: `${siteUrl}/how-to-pronounce-bible-names-with-ease/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'How to Pronounce Bible Names With Ease', item: `${siteUrl}/how-to-pronounce-bible-names-with-ease/` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'How to Pronounce Bible Names With Ease',
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
          {/* Breadcrumb */}
          <nav className="text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">How to Pronounce Bible Names With Ease</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight leading-[1.1]">
            How to Pronounce Bible Names <span className="text-brand">With Ease</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            A beginner&rsquo;s guide to the most common Bible names — with audio recordings and phonetic spellings to build your confidence reading Scripture aloud.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-slate-600 leading-relaxed mb-6">
            Bible names can feel intimidating — especially when you&rsquo;re about to read one aloud in church or a small group. But the reality is that most of them follow predictable patterns once you know where to put the stress. This guide starts with the names you&rsquo;ll encounter most often, gives you a phonetic spelling for each, and lets you hear every one spoken correctly before you say it yourself.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Start Here If Bible Names Trip You Up</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Most people struggle with Bible names because English wasn&rsquo;t built to handle Hebrew and Greek phonics. There&rsquo;s no shame in using a pronunciation guide — even seminarians keep reference materials handy. What matters is that you look it up, hear it, and say it. That&rsquo;s the entire method.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            The goal of this page isn&rsquo;t to make you a biblical languages scholar. It&rsquo;s to give you enough confidence to read the text fluently — to keep the story moving rather than stumbling over a name and losing your train of thought. The 23 names below are exactly the ones you&rsquo;ll encounter again and again. Learn these and you&rsquo;ll handle 80% of what comes up in weekly Scripture readings.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">One Rule That Handles Most Cases</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Stress the CAPITALIZED syllable. That single rule resolves 80% of confusion. EHR-uhn (Aaron) — stress the first. nih-KOH-duh-muhs (Nicodemus) — stress the second. Once you internalize this pattern, unfamiliar names become manageable on the first read.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            The capitalized syllable in BibleSpeak&rsquo;s phonetic system is always the one that carries the most weight when spoken aloud. The surrounding syllables are typically unstressed — they&rsquo;re said quickly and lightly. Say the capitalized one a bit louder and longer, then let the rest trail naturally. You&rsquo;ll be right nearly every time.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">25 Names to Start With</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            These are the names that appear most frequently in Scripture readings, church calendars, and Bible study curricula. They&rsquo;re also the names most likely to be read aloud in public — which makes getting them right worth the five minutes it takes to practice.
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
