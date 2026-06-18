import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'Bible Prophets Pronunciation — All Major & Minor Prophets | BibleSpeak.org',
  description: 'How to pronounce the names of every major and minor prophet in the Bible — Isaiah, Jeremiah, Habakkuk, Zephaniah, and more. Audio recordings included.',
  openGraph: {
    title: 'Bible Prophets Pronunciation | BibleSpeak.org',
    description: 'Pronunciation guide for all 16 biblical prophets with audio recordings.',
    url: 'https://biblespeak.org/bible-prophets-pronunciation/',
  },
}

export default async function BibleProphetsPronunciation() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = await getAllWords()
  const TARGET_SLUGS = ['isaiah-pronunciation','jeremiah-pronunciation','ezekiel-pronunciation','daniel-pronunciation','hosea-pronunciation','joel-pronunciation','amos-pronunciation','obadiah-pronunciation','jonah-pronunciation','micah-pronunciation','nahum-pronunciation','habakkuk-pronunciation','zephaniah-pronunciation','haggai-pronunciation','zechariah-pronunciation','malachi-pronunciation','elijah-pronunciation','elisha-pronunciation','samuel-pronunciation','nathan-pronunciation','agabus-pronunciation','deborah-pronunciation']
  const words = allWords.filter(w => TARGET_SLUGS.includes(w.slug))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Prophets Pronunciation Guide',
    description: 'How to pronounce the names of every major and minor prophet in the Bible with audio recordings.',
    url: `${siteUrl}/bible-prophets-pronunciation/`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Bible Prophets Pronunciation', item: `${siteUrl}/bible-prophets-pronunciation/` },
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
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-300">Bible Prophets Pronunciation</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">Bible Prophets Pronunciation Guide</h1>
          <p className="text-slate-300 text-lg max-w-2xl">How to pronounce the names of every major and minor prophet — from Isaiah to Malachi, with audio recordings.</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="prose prose-slate max-w-none mb-10">
          <h2>The Prophets of Israel and Judah</h2>
          <p>The Hebrew prophets wrote and spoke across seven centuries of biblical history, from Samuel (c. 1050 BC) to Malachi (c. 430 BC). Their names carry meanings that reflect their messages: Isaiah means "salvation of Yahweh," Amos means "burden-bearer," Habakkuk likely means "one who wrestles" or "one who embraces," and Micah means "who is like God?" Knowing the meaning makes the name more memorable — and more pronounceable. The prophets collectively represent the most theologically dense naming tradition in Scripture, with nearly every name embedding a claim about God's nature or activity.</p>

          <h2>Major vs. Minor Prophets</h2>
          <p>Isaiah, Jeremiah, Ezekiel, and Daniel are the Major Prophets — named for the length of their books, not their theological importance. The Twelve Minor Prophets (Hosea through Malachi) form a unified collection sometimes called the Book of the Twelve, which in the Hebrew canon was treated as a single scroll. All sixteen canonical prophetic books are represented below with phonetic guides and audio recordings, along with key non-writing prophets like Elijah, Elisha, Samuel, Nathan, and Deborah who shaped Israel's prophetic tradition.</p>

          <h2>The Trickiest Prophet Names</h2>
          <p>Habakkuk (huh-BAK-uhk) and Haggai (HAG-eye or HAG-ee-eye) consistently top the list of most-mispronounced prophet names. Zephaniah (zef-uh-NY-uh) surprises readers with a 'ph' they want to give more weight. Obadiah (oh-buh-DY-uh) and Zechariah (zek-uh-RY-uh) both carry stress further back than readers expect. Nahum (NAY-hum) looks like it should rhyme with "fathom," and Malachi (MAL-uh-kye) catches readers who expect a soft final syllable. The audio recordings below solve all of these instantly — one listen is worth more than any phonetic explanation.</p>

          <h2>What the Prophets&rsquo; Names Mean</h2>
          <p>Hebrew prophetic names almost always carry meaning related to their calling. Knowing the etymology makes the name memorable and easier to pronounce:</p>
          <ul>
            <li><strong>Isaiah</strong> (yeh-SHAY-yuh) &mdash; &ldquo;salvation of Yahweh.&rdquo; Written Yeshayahu in Hebrew; 66 chapters of prophecy about redemption bear out the name&rsquo;s meaning.</li>
            <li><strong>Jeremiah</strong> (jehr-uh-MY-uh) &mdash; &ldquo;Yahweh exalts&rdquo; or &ldquo;Yahweh throws.&rdquo; Written Yirmeyahu. Called as a prophet before birth (Jeremiah 1:5).</li>
            <li><strong>Ezekiel</strong> (ih-ZEE-kee-ul) &mdash; &ldquo;God strengthens.&rdquo; Written Yechezkel. Received his visions in Babylon during the exile (593&ndash;571 BC).</li>
            <li><strong>Hosea</strong> (hoh-ZAY-uh) &mdash; &ldquo;salvation&rdquo; or &ldquo;deliverance&rdquo; &mdash; same root as Yeshua and Joshua. Prophesied in Israel c. 750&ndash;722 BC.</li>
            <li><strong>Habakkuk</strong> (huh-BAK-uhk) &mdash; possibly &ldquo;embraced&rdquo; or &ldquo;wrestler.&rdquo; The name may derive from an Akkadian plant name. Prophesied c. 612&ndash;589 BC, questioning God&rsquo;s justice.</li>
            <li><strong>Malachi</strong> (MAL-uh-ky) &mdash; &ldquo;my messenger&rdquo; or &ldquo;my angel.&rdquo; May be a title rather than a personal name. The last book of the Old Testament.</li>
            <li><strong>Haggai</strong> (HAG-ee-eye) &mdash; &ldquo;festive&rdquo; or &ldquo;born on a feast day.&rdquo; Prophesied c. 520 BC, urging the returned exiles to rebuild the Temple.</li>
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
