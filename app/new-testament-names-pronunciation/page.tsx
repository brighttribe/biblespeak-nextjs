import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'New Testament Names Pronunciation — Audio Guide | BibleSpeak.org',
  description: 'Correct pronunciation of New Testament names — apostles, disciples, and key figures from Matthew to Revelation. Audio recordings and phonetic spellings.',
  openGraph: {
    title: 'New Testament Names Pronunciation | BibleSpeak.org',
    description: 'Audio guide for New Testament names — apostles, disciples, and key figures.',
    url: 'https://biblespeak.org/new-testament-names-pronunciation/',
  },
}

export default async function NewTestamentNamesPronunciation() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = await getAllWords()
  const TARGET_SLUGS = ['agrippa-pronunciation','aquila-pronunciation','barnabas-pronunciation','bartholomew-pronunciation','cornelius-pronunciation','elizabeth-pronunciation','felix-pronunciation','festus-pronunciation','herod-pronunciation','james-pronunciation','joanna-pronunciation','john-pronunciation','joseph-pronunciation','judas-pronunciation','lazarus-pronunciation','lydia-pronunciation','mark-pronunciation','martha-pronunciation','mary-pronunciation','matthew-pronunciation','nicodemus-pronunciation','paul-pronunciation','peter-pronunciation','philip-pronunciation','priscilla-pronunciation','salome-pronunciation','silas-pronunciation','stephen-pronunciation','thaddaeus-pronunciation','thomas-pronunciation','timothy-pronunciation','titus-pronunciation','zacchaeus-pronunciation']
  const words = allWords.filter(w => TARGET_SLUGS.includes(w.slug))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'New Testament Names Pronunciation Guide',
    description: 'Correct pronunciation of New Testament names with audio recordings and phonetic spellings.',
    url: `${siteUrl}/new-testament-names-pronunciation/`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'New Testament Names Pronunciation', item: `${siteUrl}/new-testament-names-pronunciation/` },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-[#0f172a] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">New Testament Names Pronunciation</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Audio recordings and phonetic spellings for apostles, disciples, Roman officials, and women of the Gospels and Acts.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">New Testament Names Pronunciation</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="prose prose-slate max-w-none mb-10">
          <h2>How to Pronounce New Testament Names — Greek in a Roman World</h2>
          <p>The New Testament was written in Koine Greek within the Roman Empire — which means its names are drawn from three cultures simultaneously. Many are Greek forms of older Aramaic or Hebrew originals: Petros (Peter) for the Aramaic Cephas meaning "rock"; Ioannes (John) for Yochanan meaning "God is gracious"; Iakobos (James) for Yaakov (Jacob). Latin names like Felix, Festus, and Titus reflect Roman governance and the citizenship of certain figures. The result is a name pool that has passed through Hebrew, Aramaic, Greek, and Latin before arriving in your English Bible — often with the stress pattern shifted at each stop.</p>

          <h2>How to Pronounce the Apostles' Names</h2>
          <p>The twelve apostles' names range from common Jewish names (James, John, Simon) to distinctly unusual ones (Thaddaeus, Bartholomew). Most English readers know these names from childhood but have only ever read them silently. Reading silently doesn't prepare you for the moment you're asked to read Luke 6 aloud in church and encounter "Bartholomew" and "Thaddaeus" in the same sentence. Every apostle's name appears below with its phonetic breakdown and audio recording — so you can hear the correct stress pattern before you need it.</p>

          <h2>From the Gospels to Revelation</h2>
          <p>This list covers the full cast of named individuals in the New Testament: disciples, church leaders, Roman officials, and the women named with striking specificity in the Gospels and Acts. Figures like Nicodemus, Zacchaeus, and Cornelius appear only briefly in the text but carry names that readers consistently hesitate over. The audio recordings below give you a confident baseline for every one.</p>
        </div>

        <AdUnit slot="6127268085" />

        <p className="text-slate-500 text-sm mb-6">{words.length} entries</p>

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
      </main>
    </>
  )
}
