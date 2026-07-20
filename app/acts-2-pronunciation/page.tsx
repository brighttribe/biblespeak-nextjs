import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'How to Pronounce the Words in Acts 2 — Audio Guide | BibleSpeak.org',
  description: 'Hear the correct pronunciation of every difficult word in Acts 2 — Parthians, Medes, Elamites, Phrygia, Pamphylia, Cyrene, and more. Audio recordings and phonetic spellings.',
  openGraph: {
    title: 'How to Pronounce the Words in Acts 2 | BibleSpeak.org',
    description: 'Pronunciation guide for every place name and people group in Acts 2:5-11.',
    url: 'https://biblespeak.org/acts-2-pronunciation/',
  },
}

const TARGET_SLUGS = [
  'parthians-pronunciation',
  'mede-pronunciation',
  'elamite-pronunciation',
  'mesopotamia-pronunciation',
  'cappadocia-pronunciation',
  'pontus-pronunciation',
  'phrygia-pronunciation',
  'pamphylia-pronunciation',
  'egypt-pronunciation',
  'cyrene-pronunciation',
  'rome-pronunciation',
  'crete-pronunciation',
  'arabia-pronunciation',
  'miletus-pronunciation',
  'ephesus-pronunciation',
  'caesarea-pronunciation',
  'antioch-pronunciation',
  'corinth-pronunciation',
  'thessalonica-pronunciation',
  'philippi-pronunciation',
  'athens-pronunciation',
]

export default function Acts2PronunciationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()
  const words = allWords.filter((w) => TARGET_SLUGS.includes(w.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'How to Pronounce the Words in Acts 2',
        description: 'Hear the correct pronunciation of every difficult word in Acts 2 — Parthians, Medes, Elamites, Phrygia, Pamphylia, Cyrene, and more. Audio recordings and phonetic spellings.',
        url: `${siteUrl}/acts-2-pronunciation/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Acts 2 Pronunciation', item: `${siteUrl}/acts-2-pronunciation/` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'How to Pronounce the Words in Acts 2',
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
            How to Pronounce the Words in <span className="text-brand">Acts 2</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Audio recordings and phonetic spellings for every place name and people group in the Pentecost account — from Parthians to Arabia.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Acts 2 Pronunciation</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-slate-600 leading-relaxed mb-6">
            Acts 2 is one of the most geographically dense passages in the New Testament. In a handful of verses, Luke lists fifteen nations and regions whose people heard the disciples speaking in their own languages on the day of Pentecost. These names carry the weight of the miracle itself — and they&rsquo;re among the hardest words for modern readers to say aloud with confidence.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">The Nations of Pentecost — All 15 Names Pronounced</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Acts 2:5-11 lists fifteen nations and regions whose people heard the disciples speaking in their own languages on the day of Pentecost. These geographic names reflect the full sweep of the ancient Mediterranean world — from Mesopotamia in the east to Rome in the west, from Pontus in the north to Arabia in the south. For anyone reading Acts aloud, getting these names right matters enormously: they carry the weight of the miracle itself.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Why These Words Are Difficult</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            These are Hellenized versions of Hebrew, Persian, Latin, and Aramaic place names, rendered first into Greek and then into English. Phrygia (FRIJ-ee-uh) sounds nothing like it&rsquo;s spelled. Elamites (EE-luh-myts) catches first-time readers off guard. Pamphylia (pam-FIL-ee-uh) has five syllables and an unusual stress pattern. This guide exists precisely because these words appear in public readings and demand confident pronunciation.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">How to Pronounce Every Place Name in Acts 2:9-11</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The list below includes every nation, region, and city mentioned in the Pentecost account, along with related locations Paul visited on his missionary journeys through the same regions.
          </p>


          <div className="max-w-4xl mx-auto px-4 py-8">
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

          <blockquote className="border-l-4 border-brand pl-6 py-2 my-8 text-slate-600 italic text-lg leading-relaxed">
            <p>&ldquo;Parthians and Medes and Elamites and residents of Mesopotamia, Judea and Cappadocia, Pontus and Asia, Phrygia and Pamphylia, Egypt and the parts of Libya belonging to Cyrene, and visitors from Rome, both Jews and proselytes, Cretans and Arabians — we hear them telling in our own tongues the mighty works of God.&rdquo;</p>
            <footer className="text-sm text-slate-400 mt-2 not-italic">— Acts 2:9–11 (ESV)</footer>
          </blockquote>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">More Pronunciation Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/bible-places-pronunciation/', label: 'Bible Places Pronunciation' },
                { href: '/new-testament-names-pronunciation/', label: 'New Testament Names' },
                { href: '/how-to-pronounce-bible-names/', label: 'How to Pronounce Bible Names' },
                { href: '/hardest-bible-words-to-pronounce/', label: 'Hardest Bible Words' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block p-4 bg-white rounded-xl border border-slate-200 text-slate-700 hover:text-brand hover:border-brand/30 transition-all text-sm font-medium">
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
