import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'The Hardest Bible Words to Pronounce — Audio Guide | BibleSpeak.org',
  description: 'Think you can pronounce Nebuchadnezzar? Zerubbabel? Mephibosheth? These are the most difficult words in the Bible — with audio recordings and phonetic spellings to help.',
  openGraph: {
    title: 'The Hardest Bible Words to Pronounce | BibleSpeak.org',
    description: 'Audio pronunciation guide for the most difficult words in the Bible.',
    url: 'https://biblespeak.org/hardest-bible-words-to-pronounce/',
  },
}

const PRIORITY = [
  'nebuchadnezzar-pronunciation',
  'laodicea-pronunciation',
  'caesarea-philippi-pronunciation',
  'ecclesiastes-pronunciation',
  'mephibosheth-pronunciation',
  'zerubbabel-pronunciation',
  'epaphroditus-pronunciation',
  'ahasuerus-pronunciation',
  'bartholomew-pronunciation',
  'thessalonica-pronunciation',
  'cappadocia-pronunciation',
  'mesopotamia-pronunciation',
  'pamphylia-pronunciation',
  'thaddaeus-pronunciation',
  'theophilus-pronunciation',
  'jehoshaphat-pronunciation',
  'nicodemus-pronunciation',
  'zacchaeus-pronunciation',
  'habakkuk-pronunciation',
  'zephaniah-pronunciation',
  'obadiah-pronunciation',
  'nebat-pronunciation',
  'onesimus-pronunciation',
  'zaphnathpaaneah-pronunciation',
  'tilgathpilneser-pronunciation',
]

export default function HardestBibleWordsPronunciationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()

  // Priority list first
  const priorityWords = allWords.filter((w) => PRIORITY.includes(w.slug))
  // Add any long-pronunciation words not already included
  const extraHard = allWords.filter(
    (w) =>
      !PRIORITY.includes(w.slug) &&
      w.pronunciation &&
      w.pronunciation.split('-').length >= 4
  )
  // Combine and cap at 25
  const words = [...priorityWords, ...extraHard].slice(0, 25)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'The Hardest Bible Words to Pronounce',
        description: 'Think you can pronounce Nebuchadnezzar? Zerubbabel? Mephibosheth? These are the most difficult words in the Bible — with audio recordings and phonetic spellings to help.',
        url: `${siteUrl}/hardest-bible-words-to-pronounce/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Hardest Bible Words to Pronounce', item: `${siteUrl}/hardest-bible-words-to-pronounce/` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'The Hardest Bible Words to Pronounce',
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
            The Hardest Bible Words <span className="text-brand">to Pronounce</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Nebuchadnezzar. Mephibosheth. Zerubbabel. Audio recordings and phonetic spellings for the most tongue-twisting names in Scripture.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Hardest Bible Words to Pronounce</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-slate-600 leading-relaxed mb-6">
            Every Bible reader has a list of names they quietly dread. The ones that make you slow down mid-sentence and lose your place. The ones you&rsquo;ve heard a dozen times but still can&rsquo;t reproduce on demand. This page is for those names — the ones that require actual practice, not just a quick glance.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">The Bible&rsquo;s Most Tongue-Twisting Words</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The Bible was composed in Hebrew, Aramaic, and Greek — three languages with phonetic systems radically different from English. When scholars translated these texts, they often preserved the original language&rsquo;s structure in the spelling, producing words that defy English reading habits. Nebuchadnezzar (neb-uh-kud-NEZ-er) has six syllables. Mephibosheth (meh-FIB-oh-sheth) looks like someone sneezed on the keyboard. Zerubbabel (ze-RUB-uh-bel) is three vowels and a double-B trying to be a name. They&rsquo;re all learnable.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">How to Pronounce Hard Bible Words — A 5-Step Method</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The system below works on every word on this list:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 mb-6">
            <li><strong>Find the phonetic spelling</strong> — it&rsquo;s the syllable-by-syllable breakdown next to each entry.</li>
            <li><strong>Locate the stressed syllable</strong> — it&rsquo;s the one shown in capital letters.</li>
            <li><strong>Say each syllable separately</strong>, then connect them slowly.</li>
            <li><strong>Play the audio.</strong> Once you&rsquo;ve heard it spoken correctly, your brain can replicate it.</li>
            <li><strong>Say it three times without looking.</strong> Repetition is the entire trick.</li>
          </ol>
          <p className="text-slate-600 leading-relaxed mb-6">
            Most people get any word on this list right within two minutes of focused practice. The difficulty isn&rsquo;t the words themselves — it&rsquo;s that most readers have never seen them broken down before.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">The 25 That Will Separate You From the Crowd</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Master these and you can read any passage in Scripture aloud without hesitation. Preachers who&rsquo;ve wrestled with this list know it well.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">The Linguistic Reasons These Words Are Hard</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Several patterns explain why Bible words reliably trip up English readers:
          </p>
          <ul className="list-disc list-inside space-y-3 text-slate-600 mb-6 pl-2">
            <li><strong>Stress falls further back than English expects.</strong> English typically stresses the first or second syllable. Hebrew names often stress the final syllable (Jehovah: jih-HOH-vuh; Obadiah: oh-buh-DY-uh), which feels counterintuitive.</li>
            <li><strong>Silent initial consonants.</strong> Hebrew had consonants with no English equivalent. When transliterated, they produced spellings like &ldquo;Mephibosheth&rdquo; and &ldquo;Zerubbabel&rdquo; that look nothing like they sound.</li>
            <li><strong>Greek compound names.</strong> New Testament names often combine Greek roots: Bartholomew = Bar (Aramaic &ldquo;son of&rdquo;) + Ptolemy (a Greek/Egyptian name). The compound structure shifts the stress in unexpected ways.</li>
            <li><strong>Latin double consonants changed to English vowels.</strong> Words like &ldquo;Ecclesiastes&rdquo; passed through Latin (Ecclesiastes), then Old French, then Middle English &mdash; accumulating spelling conventions at each stage.</li>
            <li><strong>The &ldquo;ch&rdquo; problem.</strong> In Greek transcriptions, &ldquo;ch&rdquo; represents the letter chi (&chi;) &mdash; a hard &lsquo;k&rsquo; sound, not the English &ldquo;ch&rdquo; in &ldquo;church.&rdquo; Melchizedek, Achaia, and Chloe all use this pattern. Every &ldquo;ch&rdquo; in a biblical name is pronounced as a hard &lsquo;k&rsquo;.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            Understanding these five patterns resolves the majority of pronunciation confusion. The hardest words aren&rsquo;t arbitrary &mdash; they&rsquo;re hard for reasons that, once learned, apply across hundreds of biblical terms.
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
                { href: '/bible-places-pronunciation/', label: 'Bible Places Pronunciation' },
                { href: '/how-to-pronounce-bible-names/', label: 'How to Pronounce Bible Names' },
                { href: '/new-testament-names-pronunciation/', label: 'New Testament Names' },
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
