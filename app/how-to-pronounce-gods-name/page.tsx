import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords } from '@/lib/data'
import { audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: "How to Pronounce God's Name — Yahweh, Jehovah, Yeshua | BibleSpeak.org",
  description:
    "How to correctly pronounce the names of God in the Bible — YHWH, Yahweh, Jehovah, Elohim, Adonai, Yeshua, El Shaddai, and more. Phonetic guides and biblical context.",
  openGraph: {
    title: "How to Pronounce God's Name | BibleSpeak.org",
    description:
      "Pronounce the names of God: Yahweh, Jehovah, Elohim, Adonai, Yeshua, El Shaddai, and more.",
    url: 'https://biblespeak.org/how-to-pronounce-gods-name/',
  },
}

const DB_SLUGS = [
  'yahweh-pronunciation',
  'jehovah-pronunciation',
  'yeshua-pronunciation',
  'elohim-pronunciation',
  'adonai-pronunciation',
  'immanuel-pronunciation',
  'messiah-pronunciation',
  'jesus-pronunciation',
  'holy-spirit-pronunciation',
  'yahweh-shalom-pronunciation',
  'yahweh-yireh-pronunciation',
]

export default function HowToPronounceGodsNamePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
  const allWords = getAllWords()
  const dbWords = allWords.filter((w) => DB_SLUGS.includes(w.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        name: "How to Pronounce God's Names",
        headline: "How to Pronounce God's Names",
        description:
          "How to correctly pronounce the names of God in the Bible — YHWH, Yahweh, Jehovah, Elohim, Adonai, Yeshua, El Shaddai, and more. Phonetic guides and biblical context.",
        url: `${siteUrl}/how-to-pronounce-gods-name/`,
        publisher: { '@type': 'Organization', name: 'BibleSpeak.org', url: siteUrl },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: "How to Pronounce God's Name",
            item: `${siteUrl}/how-to-pronounce-gods-name/`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you pronounce YHWH?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The exact pronunciation of YHWH (the Tetragrammaton) is unknown because ancient Hebrew was written without vowels and Jewish tradition held the name too holy to speak aloud. Most modern scholars believe "Yahweh" (YAH-way) is closest to the original.',
            },
          },
          {
            '@type': 'Question',
            name: "What is the difference between Yahweh and Jehovah?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: '"Yahweh" (YAH-way) is the scholarly reconstruction of the original Hebrew pronunciation of YHWH. "Jehovah" (jih-HOH-vuh) is a hybrid form created by medieval Christian scholars who combined the consonants of YHWH with the vowels of Adonai. Most scholars consider Yahweh the more historically accurate form.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you pronounce Elohim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Elohim is pronounced "eh-loh-HEEM" — three syllables with the stress on the final syllable. It is the generic Hebrew word for God, grammatically plural but used with singular verbs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you pronounce Yeshua?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yeshua is pronounced "yeh-SHOO-ah" — three syllables with stress on the second. It is the Hebrew and Aramaic form of Jesus\' name, meaning "salvation" or "God saves."',
            },
          },
          {
            '@type': 'Question',
            name: 'What does Adonai mean and how is it pronounced?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Adonai is pronounced "ah-doh-NYE" — three syllables with stress on the final syllable. It means "My Lord" in Hebrew and is used as the spoken substitute whenever YHWH appears in the written text.',
            },
          },
        ],
      },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative bg-navy overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-dark/30 rounded-full blur-[100px] translate-y-1/4" />

        <div className="relative max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight leading-[1.1]">
            How to Pronounce <span className="text-brand">God&rsquo;s Names</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Yahweh, Jehovah, Elohim, Adonai, Yeshua, El Shaddai — phonetic guides and biblical
            context
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="text-sm text-slate-400">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">How to Pronounce God&rsquo;s Name</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-slate-600 leading-relaxed mb-6">
            If you&rsquo;ve ever wondered how to pronounce God&rsquo;s name — whether that&rsquo;s Yahweh, Jehovah, Elohim, or Adonai — you&rsquo;re not alone. These names appear throughout the Bible but rarely come with pronunciation guides. This page covers every major name and title of God in Scripture, with phonetic spellings and any available audio.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-3">
            How to Pronounce YHWH — The Unpronounceable Name
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The most sacred name in the Bible consists of four Hebrew consonants: Yod, He, Vav, He
            — written in English as YHWH. This is called the Tetragrammaton (from the Greek for
            &ldquo;four letters&rdquo;). Ancient Hebrew was written without vowels, so the exact
            original pronunciation is lost. Jewish tradition taught that the name was too holy to
            speak aloud — when readers encountered YHWH in the text, they substituted Adonai (Lord)
            instead. This is why most English Bibles print LORD in small capitals wherever YHWH
            appears: it represents the spoken substitute, not the written name.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">
            How to Pronounce Yahweh vs. Jehovah
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            To pronounce Yahweh: say <strong>YAH-way</strong> — two syllables, stress on the first.
            To pronounce Jehovah: say <strong>jih-HOH-vuh</strong> — three syllables, stress on the second.
            The difference matters because they come from completely different historical traditions.
            In the 6th&ndash;10th centuries AD, Jewish scholars called Masoretes added vowel
            markings (nikud) to the Hebrew text to preserve pronunciation. When they reached YHWH,
            they wrote the vowels of Adonai as a reading cue — a reminder to say Adonai instead.
            Medieval Christian scholars, unfamiliar with this convention, read the vowels as part of
            the name itself, producing the hybrid form &ldquo;Jehovah&rdquo; (YHWH&rsquo;s
            consonants + Adonai&rsquo;s vowels). Most modern scholars believe Yahweh is closer to
            the original pronunciation. Jehovah remains in wide use in traditional Christian
            contexts and hymns.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3">
            How to Pronounce Every Name of God in the Bible
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Hebrew Scripture uses multiple names and titles for God, each carrying distinct meaning and each with its own pronunciation:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm mb-6 pl-2">
            <li>
              <strong>Elohim</strong> — the generic word for God, used in Genesis 1; plural in form,
              suggesting divine majesty
            </li>
            <li>
              <strong>Adonai</strong> — &ldquo;My Lord,&rdquo; used as the spoken substitute for
              YHWH
            </li>
            <li>
              <strong>El Shaddai</strong> — &ldquo;God Almighty,&rdquo; prominent in the
              Patriarchal narratives
            </li>
            <li>
              <strong>El Elyon</strong> — &ldquo;God Most High,&rdquo; used by Melchizedek in
              Genesis 14:18
            </li>
            <li>
              <strong>Yeshua</strong> — the Hebrew/Aramaic form of Jesus&rsquo; name, meaning
              &ldquo;salvation&rdquo; or &ldquo;God saves&rdquo;
            </li>
            <li>
              <strong>Immanuel</strong> — &ldquo;God with us,&rdquo; from Isaiah 7:14, applied to
              Jesus in Matthew 1:23
            </li>
          </ul>

          <AdUnit slot="6127268085" className="my-8" />

          {/* Static word entries */}
          <div className="mt-6">
            {[
              {
                name: 'YHWH / Yahweh',
                pronunciation: 'YAH-way',
                desc: 'The personal name of God in the Old Testament, used over 6,800 times in the Hebrew Bible. Translated as LORD (in small capitals) in most English Bibles. Original vowels are uncertain due to the Jewish tradition of not speaking the name aloud.',
              },
              {
                name: 'Jehovah',
                pronunciation: 'jih-HOH-vuh',
                desc: 'A hybrid form combining the consonants of YHWH with the vowels of Adonai, created by medieval Christian scholars. Still widely used in traditional hymns and some denominations.',
              },
              {
                name: 'Elohim',
                pronunciation: 'eh-loh-HEEM',
                desc: 'The generic Hebrew word for God. Grammatically plural but used with singular verbs — understood as a "plural of majesty." The primary name used in Genesis 1.',
              },
              {
                name: 'Adonai',
                pronunciation: 'ah-doh-NYE',
                desc: 'Hebrew for "My Lord." Used in Jewish reading tradition as the spoken substitute whenever YHWH appears in the written text. Also used independently as a divine title.',
              },
              {
                name: 'El Shaddai',
                pronunciation: 'el sha-DYE',
                desc: 'Usually translated "God Almighty." Used especially in the Patriarchal narratives (Genesis, Exodus). The exact meaning of Shaddai is debated — possibilities include "mountain," "breast," or "sufficient one."',
              },
              {
                name: 'El Elyon',
                pronunciation: 'el el-YOHN',
                desc: '"God Most High." First used by Melchizedek in Genesis 14:18-20. Appears frequently in the Psalms to emphasize God\'s sovereignty over all other powers.',
              },
              {
                name: 'Yeshua',
                pronunciation: 'yeh-SHOO-ah',
                desc: 'The Hebrew and Aramaic form of the name Jesus. Derived from the Hebrew root y-sh-a meaning "to save." Jesus was called Yeshua by his contemporaries; the Greek form Iesous became Jesus in English.',
              },
              {
                name: 'Immanuel',
                pronunciation: 'ih-MAN-yoo-el',
                desc: 'Hebrew for "God with us." From Isaiah 7:14, applied to Jesus in Matthew 1:23. Three syllables with stress on the second: ih-MAN-yoo-el.',
              },
              {
                name: 'Messiah / Christ',
                pronunciation: 'meh-SY-uh / KRYST',
                desc: "Hebrew (Mashiach) and Greek (Christos) words both meaning \"anointed one.\" Christ is not Jesus's last name but his title — the promised one who would deliver God's people.",
              },
            ].map((entry) => (
              <div
                key={entry.name}
                className="bg-white rounded-2xl border border-slate-200 p-6 mb-4 shadow-sm"
              >
                <div className="flex items-center flex-wrap gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{entry.name}</h3>
                  <span className="text-sm font-mono bg-brand/10 text-brand px-3 py-1 rounded-lg">
                    {entry.pronunciation}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{entry.desc}</p>
              </div>
            ))}
          </div>

          {/* Database words */}
          {dbWords.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Also in Our Audio Database
              </h2>
              {dbWords.map((word) => (
                <div
                  key={word.slug}
                  className="bg-white rounded-2xl border border-slate-200 p-6 mb-4 shadow-sm"
                >
                  <div className="flex items-center flex-wrap gap-3 mb-2">
                    <Link
                      href={`/${word.slug}/`}
                      className="text-xl font-bold text-slate-800 hover:text-brand transition-colors"
                    >
                      {word.title}
                    </Link>
                    {word.pronunciation && (
                      <span className="text-sm font-mono bg-brand/10 text-brand px-3 py-1 rounded-lg">
                        {word.pronunciation}
                      </span>
                    )}
                  </div>
                  {word.meaning && (
                    <p className="text-slate-600 text-sm mb-3">{word.meaning}</p>
                  )}
                  {word.audio_file && (
                    <AudioPlayer src={audioUrl(word.audio_file)} title={word.title} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Related pages */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4">More Pronunciation Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/how-to-pronounce-bible-names/', label: 'How to Pronounce Bible Names' },
                { href: '/biblical-names-pronunciation/', label: 'Biblical Names Pronunciation' },
                { href: '/old-testament-names-pronunciation/', label: 'Old Testament Names' },
                { href: '/bible-prophets-pronunciation/', label: 'Bible Prophets Pronunciation' },
                { href: '/hardest-bible-words-to-pronounce/', label: 'Hardest Bible Words' },
                { href: '/acts-2-pronunciation/', label: 'Acts 2 Word Pronunciation' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block p-4 bg-white rounded-xl border border-slate-200 text-slate-700 hover:text-brand hover:border-brand/30 transition-all text-sm font-medium"
                >
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
