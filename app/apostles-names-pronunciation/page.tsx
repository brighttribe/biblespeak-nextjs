import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: "How to Pronounce the Apostles' Names — Audio Guide | BibleSpeak.org",
  description: "Correct pronunciation of all 12 apostles' names plus Paul — Peter, Andrew, Bartholomew, Thaddaeus, and more. Audio recordings and phonetic spellings.",
  openGraph: {
    title: "The Apostles' Names Pronunciation Guide | BibleSpeak.org",
    description: "Audio guide for all 12 apostles' names plus Paul.",
    url: 'https://biblespeak.org/apostles-names-pronunciation/',
  },
}

const TARGET_SLUGS = [
  'peter-pronunciation',
  'andrew-pronunciation',
  'james-pronunciation',
  'john-pronunciation',
  'philip-pronunciation',
  'bartholomew-pronunciation',
  'matthew-pronunciation',
  'thomas-pronunciation',
  'thaddaeus-pronunciation',
  'simon-pronunciation',
  'judas-pronunciation',
  'paul-pronunciation',
  'matthias-pronunciation',
]

export default function ApostlesNamesPronunciationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()
  const words = allWords.filter((w) => TARGET_SLUGS.includes(w.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: "Apostles Names Pronunciation", item: `${siteUrl}/apostles-names-pronunciation/` },
        ],
      },
      {
        '@type': 'Article',
        name: "The Apostles' Names — Pronunciation Guide",
        description: "Correct pronunciation of all 12 apostles' names plus Paul — Peter, Andrew, Bartholomew, Thaddaeus, and more. Audio recordings and phonetic spellings.",
        url: `${siteUrl}/apostles-names-pronunciation/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ItemList',
        name: "The Apostles' Names Pronunciation Guide",
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
            The Apostles&rsquo; Names &mdash; <span className="text-brand">Pronunciation Guide</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Audio recordings and phonetic spellings for all twelve apostles plus Paul and Matthias
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Apostles Names Pronunciation</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-3">How to Pronounce the Twelve Apostles' Names</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Jesus called twelve disciples to be his apostles, and their names have echoed through two thousand years of Christian history. Most English speakers know these names from childhood &mdash; but many have only ever read them on a page, never heard them spoken confidently at full speed. Bartholomew (bar-THOL-oh-myoo) is not &ldquo;Barth-uh-loo.&rdquo; Thaddaeus (THAD-ee-uhs) trips readers mid-sentence. Even &ldquo;Thomas&rdquo; carries a nuance: his Aramaic name meant &ldquo;twin,&rdquo; and his Greek name Didymus means exactly the same thing.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Greek Names, Aramaic Roots</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Most of the apostles were Galilean Jews who spoke Aramaic as their first language. Their names come down to us in Greek transliterations: Petros (Peter) for the Aramaic Cephas, Iakobos (James) for the Hebrew Ya&rsquo;akov (Jacob), Ioannes (John) for Yochanan (God is gracious). Philip and Andrew are actually Greek names &mdash; not unusual in first-century Galilee, which had been under Greek cultural influence for 300 years.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Matthias and Paul</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            After Judas Iscariot, the disciples chose Matthias by lot to restore the number to twelve (Acts 1:26). Paul &mdash; originally Saul of Tarsus &mdash; became the apostle to the Gentiles and wrote nearly half the New Testament. Both appear below.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">Why the Four Lists of Apostles Don&rsquo;t Quite Match</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The four NT lists of the twelve apostles (Matthew 10:2-4, Mark 3:16-19, Luke 6:14-16, Acts 1:13) all give different orderings and occasionally different names &mdash; which has caused centuries of debate. The clearest case: &ldquo;Lebbaeus whose surname was Thaddaeus&rdquo; (Matthew 10:3 KJV) appears as &ldquo;Judas the son of James&rdquo; in Luke 6:16 and Acts 1:13. Most scholars conclude these are the same person under different names or appellations. Simon is distinguished in every list as &ldquo;the Zealot&rdquo; or &ldquo;Simon Zelotes&rdquo; &mdash; he was either a member of the Jewish Zealot movement or someone with a zealous temperament; scholars disagree. Understanding these variants matters when reading Acts aloud: &ldquo;Judas son of James&rdquo; is not Judas Iscariot, and the text always distinguishes them.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Name variant quick reference:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6 pl-2">
            <li><strong>Thaddaeus</strong> (Matthew/Mark) = <strong>Judas son of James</strong> (Luke/Acts) &mdash; same apostle</li>
            <li><strong>Simon Peter</strong> = <strong>Cephas</strong> (Aramaic for &ldquo;rock&rdquo;) &mdash; Greek Petros = Aramaic Kepha</li>
            <li><strong>Matthew</strong> (Matthew 10:3) = <strong>Levi son of Alphaeus</strong> (Mark 2:14) &mdash; the tax collector</li>
            <li><strong>Bartholomew</strong> = possibly <strong>Nathanael</strong> (John 1:45-49) &mdash; &ldquo;bar Ptolemy&rdquo; may be a patronymic, Nathanael a given name</li>
          </ul>


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
