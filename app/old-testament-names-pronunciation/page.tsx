import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'Old Testament Names Pronunciation — Audio Guide | BibleSpeak.org',
  description: 'Correct pronunciation of Old Testament names — from Abraham to Zechariah. Audio recordings, phonetic spellings, and biblical context for every name.',
  openGraph: {
    title: 'Old Testament Names Pronunciation | BibleSpeak.org',
    description: 'Audio pronunciation guide for Old Testament names from Abraham to Zechariah.',
    url: 'https://biblespeak.org/old-testament-names-pronunciation/',
  },
}

export default async function OldTestamentNamesPronunciation() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = await getAllWords()
  const TARGET_SLUGS = ['aaron-pronunciation','abigail-pronunciation','abraham-pronunciation','balak-pronunciation','barak-pronunciation','bathsheba-pronunciation','boaz-pronunciation','daniel-pronunciation','david-pronunciation','deborah-pronunciation','eli-pronunciation','elijah-pronunciation','elisha-pronunciation','esther-pronunciation','eve-pronunciation','ezekiel-pronunciation','ezra-pronunciation','gideon-pronunciation','goliath-pronunciation','habakkuk-pronunciation','haggai-pronunciation','hosea-pronunciation','isaiah-pronunciation','jacob-pronunciation','jeremiah-pronunciation','job-pronunciation','joel-pronunciation','jonah-pronunciation','joseph-pronunciation','joshua-pronunciation','malachi-pronunciation','micah-pronunciation','miriam-pronunciation','mordecai-pronunciation','moses-pronunciation','naomi-pronunciation','nahum-pronunciation','nebuchadnezzar-pronunciation','nehemiah-pronunciation','noah-pronunciation','obadiah-pronunciation','rahab-pronunciation','ruth-pronunciation','samson-pronunciation','samuel-pronunciation','sarah-pronunciation','solomon-pronunciation','zechariah-pronunciation','zephaniah-pronunciation']
  const words = allWords.filter(w => TARGET_SLUGS.includes(w.slug))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Old Testament Names Pronunciation Guide',
    description: 'Correct pronunciation of Old Testament names with audio recordings and phonetic spellings.',
    url: `${siteUrl}/old-testament-names-pronunciation/`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Old Testament Names Pronunciation', item: `${siteUrl}/old-testament-names-pronunciation/` },
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
          <h1 className="text-4xl font-bold mb-4">Old Testament Names Pronunciation</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Audio recordings and phonetic spellings for major Old Testament figures — patriarchs, judges, kings, and prophets.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Old Testament Names Pronunciation</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="prose prose-slate max-w-none mb-10">
          <h2>How to Pronounce Old Testament Names — Hebrew Roots Explained</h2>
          <p>Old Testament names were originally Hebrew, and Hebrew uses sounds that don't exist in English. The guttural 'ch' in Habakkuk, the emphatic consonants, the vowel patterns — all of these were simplified during the Greek Septuagint and Latin Vulgate translations before reaching English. The name you encounter in your Bible may be three translations removed from what the person was actually called. For most readers, the Old Testament is a landscape of names they've seen for years but never quite trusted themselves to say aloud. This guide removes that uncertainty by giving you both a phonetic spelling and an audio recording for every major figure.</p>
          <p>The Masoretes &mdash; Jewish scribes working between the 6th and 10th centuries AD &mdash; added vowel marks (nikud) to the Hebrew consonantal text to preserve pronunciation traditions. This system is responsible for the phonetic backbone of most OT name pronunciations we use today. Before the Masoretes, readers relied entirely on oral tradition to know how words sounded.</p>

          <h2>Compound Names and Their Meanings</h2>
          <p>Many Old Testament names combine divine elements: El (God), YHWH (Yahweh), Ab (father), Ben (son). Isaiah = Yeshayahu (salvation of Yahweh). Elijah = Eliyahu (my God is Yahweh). Jeremiah = Yirmeyahu (Yahweh exalts). Recognizing these components makes the names easier to decode phonetically and gives them richer theological meaning. When you know that "iah" or "yahu" at the end of a name signals "Yahweh," you can work through dozens of unfamiliar prophetic names using that one rule. Similarly, names ending in "-el" (like Daniel, Ezekiel, Samuel) all carry the divine name El, meaning "God has judged," "God will strengthen," and "heard by God" respectively.</p>

          <h2>From Abraham to Zechariah</h2>
          <p>This list spans the patriarchs, judges, kings, prophets, and key figures of the Old Testament narrative — arranged not by canonical order but by familiarity, so you can find the names you most need quickly. Every entry includes a phonetic spelling in the pronunciation pill and an audio guide recorded by a fluent biblical reader. Whether you're preparing a sermon, leading a Bible study, or simply want to read aloud with confidence, these recordings give you the authoritative standard.</p>

          <h2>Names That Changed Between Old and New Testaments</h2>
          <p>Several OT names appear in the NT in Greek transliterations that differ significantly from their Hebrew originals:</p>
          <ul>
            <li><strong>Joshua &rarr; Jesus.</strong> Hebrew Yehoshua (&ldquo;Yahweh saves&rdquo;) became Greek Iesous, then Latin Iesus, then English &ldquo;Jesus.&rdquo; The NT&rsquo;s Joshua (Jesus son of Nun) and Jesus of Nazareth share the same name.</li>
            <li><strong>Elijah &rarr; Elias.</strong> In KJV passages, the NT prophet appears as &ldquo;Elias&rdquo; &mdash; the Greek form of Eliyahu. Modern translations usually standardize to &ldquo;Elijah.&rdquo;</li>
            <li><strong>Noah &rarr; Noe.</strong> The KJV uses the Greek &ldquo;Noe&rdquo; (Luke 3:36, Hebrews 11:7). Same person, two pronunciation traditions.</li>
            <li><strong>Isaiah &rarr; Esaias.</strong> Paul quotes Isaiah in Romans 9:27 as &ldquo;Esaias&rdquo; (KJV) &mdash; the Greek form Esaias reflects the Septuagint rendering.</li>
          </ul>
        </div>


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
