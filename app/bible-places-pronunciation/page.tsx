import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'Bible Places Pronunciation — Cities, Regions & Lands | BibleSpeak.org',
  description: 'Learn how to pronounce the cities, regions, mountains, and lands of the Bible. Audio recordings and phonetic guides for 30+ biblical place names.',
  openGraph: {
    title: 'Bible Places Pronunciation | BibleSpeak.org',
    description: 'Pronunciation guide for biblical cities, regions, mountains, and lands with audio.',
    url: 'https://biblespeak.org/bible-places-pronunciation/',
  },
}

const TARGET_SLUGS = [
  'alexandria-pronunciation',
  'antioch-pronunciation',
  'arabia-pronunciation',
  'aram-pronunciation',
  'athens-pronunciation',
  'babylon-pronunciation',
  'bethany-pronunciation',
  'bethlehem-pronunciation',
  'bethsaida-pronunciation',
  'caesarea-pronunciation',
  'caesarea-philippi-pronunciation',
  'capernaum-pronunciation',
  'cappadocia-pronunciation',
  'corinth-pronunciation',
  'crete-pronunciation',
  'cyrene-pronunciation',
  'egypt-pronunciation',
  'ephesus-pronunciation',
  'galilee-pronunciation',
  'gethsemane-pronunciation',
  'golgotha-pronunciation',
  'jericho-pronunciation',
  'jerusalem-pronunciation',
  'miletus-pronunciation',
  'nazareth-pronunciation',
  'pamphylia-pronunciation',
  'philippi-pronunciation',
  'phrygia-pronunciation',
  'pontus-pronunciation',
  'rome-pronunciation',
  'sinai-pronunciation',
  'thessalonica-pronunciation',
]

export default function BiblePlacesPronunciationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()
  const words = allWords.filter((w) => TARGET_SLUGS.includes(w.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Bible Places Pronunciation Guide',
        description: 'Learn how to pronounce the cities, regions, mountains, and lands of the Bible. Audio recordings and phonetic guides for 30+ biblical place names.',
        url: `${siteUrl}/bible-places-pronunciation/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Bible Places Pronunciation', item: `${siteUrl}/bible-places-pronunciation/` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Bible Places Pronunciation Guide',
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
            <span className="text-white/80">Bible Places Pronunciation</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight leading-[1.1]">
            Bible Places <span className="text-brand">Pronunciation Guide</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Audio recordings and phonetic spellings for 30+ biblical cities, regions, mountains, and lands — from Bethlehem to Thessalonica.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-slate-600 leading-relaxed mb-6">
            Biblical geography is not easy reading. The Bible spans three continents and draws its place names from at least six different languages. When those names passed through layers of translation, spellings were preserved that now confound English readers who encounter them for the first time — often in front of a congregation.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Why Biblical Geography Is Hard to Pronounce</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The Bible spans three continents and draws its place names from Hebrew, Aramaic, Greek, Latin, Persian, and Egyptian. When those names passed through Septuagint Greek, then Latin Vulgate, then English, the spellings often preserved the original structure rather than making the word phonetically accessible. Gethsemane (geth-SEM-uh-nee) looks like it should rhyme with &ldquo;Germany.&rdquo; It doesn&rsquo;t. Golgotha (GOL-guh-thuh) looks like &ldquo;Goliath&rdquo; was involved somehow. It wasn&rsquo;t.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Translation Variants and Alternative Names</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Some biblical places appear under different names in different translations. Calvary (from the Latin <em>calvaria</em>, &ldquo;skull&rdquo;) and Golgotha (from the Aramaic <em>gulgalta</em>, also &ldquo;skull&rdquo;) refer to the same location. Cyrene in Acts corresponds to the modern Libyan coast. Where significant variants exist, the BibleSpeak entry notes them.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            Place names in the Old Testament sometimes shift in the New Testament due to changes in political control or population. Aram in the Old Testament overlaps with Syria and parts of modern Iraq. Caesarea Philippi — often distinguished from Caesarea on the coast — was a city at the foot of Mount Hermon that appears in Peter&rsquo;s famous confession. The distinctions matter, and this guide notes them where they arise.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">From Bethlehem to Thessalonica</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The places below span the Old and New Testaments: the cities where Jesus was born, taught, and died; the regions Paul traveled through on his missionary journeys; and the ancient kingdoms whose names echo through prophecy and history. Each entry includes a phonetic spelling and an audio recording you can play directly in your browser.
          </p>

          <AdUnit slot="6127268085" className="my-8" />

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

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">More Pronunciation Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/acts-2-pronunciation/', label: 'Acts 2 Pronunciation' },
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
