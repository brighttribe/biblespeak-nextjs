import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'Women of the Bible Pronunciation — Names & Audio Guide | BibleSpeak.org',
  description: "Correct pronunciation of women's names in the Bible — Mary, Ruth, Deborah, Esther, Priscilla, Lydia, and more. Audio recordings and phonetic spellings.",
  openGraph: {
    title: "Women of the Bible Pronunciation | BibleSpeak.org",
    description: "Pronunciation guide for women's names in the Bible with audio recordings.",
    url: 'https://biblespeak.org/women-of-the-bible-pronunciation/',
  },
}

export default async function WomenOfTheBiblePronunciation() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = await getAllWords()
  const TARGET_SLUGS = ['abigail-pronunciation','anna-pronunciation','bathsheba-pronunciation','deborah-pronunciation','delilah-pronunciation','elizabeth-pronunciation','esther-pronunciation','eve-pronunciation','joanna-pronunciation','jezebel-pronunciation','lydia-pronunciation','martha-pronunciation','mary-pronunciation','miriam-pronunciation','naomi-pronunciation','priscilla-pronunciation','rahab-pronunciation','ruth-pronunciation','salome-pronunciation','sarah-pronunciation','tamar-pronunciation']
  const words = allWords.filter(w => TARGET_SLUGS.includes(w.slug))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Women of the Bible Pronunciation Guide',
    description: "Correct pronunciation of women's names in the Bible with audio recordings and phonetic spellings.",
    url: `${siteUrl}/women-of-the-bible-pronunciation/`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Women of the Bible Pronunciation', item: `${siteUrl}/women-of-the-bible-pronunciation/` },
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
          <h1 className="text-4xl font-bold mb-4">Women of the Bible — Name Pronunciation Guide</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Correct pronunciation for every major woman named in Scripture — from Eve to Priscilla, with audio recordings.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Women of the Bible Pronunciation</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="prose prose-slate max-w-none mb-10">
          <h2>Women at the Heart of Scripture</h2>
          <p>From Eve in the garden to Mary at the empty tomb, women appear at every pivotal moment in the biblical narrative. Their names span Hebrew, Aramaic, Greek, and Latin — and many carry meanings that illuminate their roles: Miriam means "bitter" or "beloved," Deborah means "bee," Ruth means "friend" or "companion," and Mary (Miriam in Hebrew) was the most common Jewish name of the first century, carried by at least six different women named in the New Testament alone. Knowing these names and their meanings is essential for any serious Bible reader.</p>

          <h2>How to Pronounce Old Testament Women's Names</h2>
          <p>The women of the Hebrew Scriptures serve as warriors (Deborah), redeemers (Ruth), queens (Esther, Jezebel), mothers of covenant lines (Sarah, Naomi), and prophets (Deborah, Huldah). Their stories span the entire arc of Israelite history — from the creation narrative through the Babylonian exile and return. Many of these names have passed into general English use (Sarah, Ruth, Esther, Miriam) which can create a false sense of familiarity: the English versions may feel obvious, but the Hebrew originals carry different stress and vowel patterns worth knowing.</p>

          <h2>How to Pronounce New Testament Women's Names</h2>
          <p>The women around Jesus — Mary Magdalene, Joanna, Salome, Martha, Mary of Bethany — are named with unusual specificity in the Gospels, which scholars consider a mark of historical authenticity. Paul's letters mention Priscilla, Lydia, and other women as church leaders and patrons at a time when such roles were significant. Elizabeth, the mother of John the Baptist, carries a Hebrew name (Elisheba) meaning "my God is an oath" — the same name as the wife of Aaron in the Old Testament. These names deserve to be pronounced correctly, and the audio recordings below ensure they are.</p>

          <h2>Why Women&rsquo;s Names Are Underrepresented in Bible Pronunciation Resources</h2>
          <p>Most pronunciation guides and Bible dictionaries were written in eras when women&rsquo;s roles in Scripture received less scholarly attention. Deborah, for example, was both a prophet and the only judge described as governing Israel (Judges 4:4-5) &mdash; a detail glossed over in many older resources. Her name (DEB-uh-ruh) comes from the Hebrew for &ldquo;bee,&rdquo; possibly denoting industriousness or community leadership. Huldah (HUL-duh) &mdash; whose pronunciation is almost never covered &mdash; was the prophet consulted by King Josiah about the newly discovered Torah scroll in 2 Kings 22:14; her authentication of the text had enormous consequences for Israelite religion.</p>
          <p>Some name meanings and etymological notes for women who are often mispronounced:</p>
          <ul>
            <li><strong>Miriam</strong> (MEER-ee-um) &mdash; Hebrew name; same root as Mary. Meaning debated: possibly &ldquo;bitter sea,&rdquo; &ldquo;beloved,&rdquo; or &ldquo;wished-for child.&rdquo;</li>
            <li><strong>Deborah</strong> (DEB-uh-ruh) &mdash; &ldquo;bee.&rdquo; Judge, prophet, military commander (Judges 4&ndash;5).</li>
            <li><strong>Jezebel</strong> (JEZ-uh-bel) &mdash; Phoenician name, possibly &ldquo;Where is the prince [Baal]?&rdquo; &mdash; a ritual lament in Baal worship. Not a Hebrew name at all.</li>
            <li><strong>Priscilla</strong> (prih-SIL-uh) &mdash; Latin diminutive of Prisca; a Roman name. She and Aquila are consistently listed together in Acts and Paul&rsquo;s letters, with Priscilla&rsquo;s name often appearing first.</li>
            <li><strong>Salome</strong> (suh-LOH-may) &mdash; three syllables, not two. From Hebrew shalom (peace). The name appears for two different women in the Gospels.</li>
            <li><strong>Lydia</strong> (LID-ee-uh) &mdash; may be a place name (from Lydia in Asia Minor) rather than a personal name. The first recorded European convert to Christianity (Acts 16:14-15).</li>
          </ul>
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
