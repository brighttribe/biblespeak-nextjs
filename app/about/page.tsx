import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About BibleSpeak.org | Bible Word Pronunciation Guide',
  description: 'BibleSpeak.org is the most comprehensive Bible word pronunciation resource on the web — audio guides, phonetic spelling, and biblical context for 858 words and names.',
  openGraph: {
    title: 'About BibleSpeak.org | Bible Word Pronunciation Guide',
    description: 'BibleSpeak.org is the most comprehensive Bible word pronunciation resource on the web — audio guides, phonetic spelling, and biblical context for 858 words and names.',
  },
}

const STATS = [
  { value: '858', label: 'Biblical words & names' },
  { value: '858', label: 'Audio recordings' },
  { value: '26', label: 'Letter indexes' },
  { value: '100%', label: 'Free, always' },
]

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About BibleSpeak.org',
    description: 'BibleSpeak.org is the most comprehensive Bible word pronunciation resource on the web.',
    url: `${siteUrl}/about/`,
    publisher: {
      '@type': 'Organization',
      name: 'BibleSpeak.org',
      url: siteUrl,
      description: 'Audio pronunciation guides for biblical words, names, and places.',
    },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div className="relative bg-navy overflow-hidden text-white">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute right-0 top-0 w-72 h-72 bg-brand/15 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 py-14">
          <nav className="mb-4 text-sm text-white/40 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/70">About</span>
          </nav>
          <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-3">About BibleSpeak.org</p>
          <h1 className="text-4xl font-bold mb-5">The Bible Pronunciation Resource Pastors and Bible Teachers Trust</h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            BibleSpeak.org exists to help pastors, Bible teachers, Sunday school leaders, seminary students, and anyone who studies or preaches from Scripture pronounce biblical words with total confidence — completely free.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
              <div className="text-3xl font-bold text-brand mb-1">{s.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-brand rounded-full" />
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Our Mission</h2>
          </div>
          <div className="px-6 py-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Have you ever been reading aloud in a Bible study or preaching from the pulpit and stumbled over a name like <strong>Mephibosheth</strong>, <strong>Zerubbabel</strong>, or <strong>Jehoshaphat</strong>? You're not alone. Biblical names come from ancient Hebrew, Aramaic, and Greek — languages most modern readers have never studied.
            </p>
            <p>
              Mispronouncing a word mid-sermon is distracting. It can undermine your confidence and pull listeners out of the moment. BibleSpeak.org removes that barrier entirely.
            </p>
            <p>
              Every word on this site includes a clear phonetic spelling, an audio recording, the word's biblical meaning, and historical context — everything you need to walk into any teaching or study session prepared.
            </p>
          </div>
        </div>

        {/* What we cover */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-brand rounded-full" />
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">What We Cover</h2>
          </div>
          <div className="px-6 py-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Personal Names', body: 'Patriarchs, kings, prophets, apostles, and every named figure across both Testaments.' },
                { title: 'Places & Geography', body: 'Cities, regions, mountains, rivers, and nations mentioned in Scripture.' },
                { title: 'Hebrew & Greek Terms', body: 'Theological words, titles, and terms transliterated directly from the original languages.' },
                { title: 'Historical Context', body: 'Each entry includes the word\'s meaning, origin, and where it appears in the Bible.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">{item.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who uses it */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-brand rounded-full" />
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Who Uses BibleSpeak.org</h2>
          </div>
          <div className="px-6 py-6">
            <div className="flex flex-wrap gap-2">
              {['Pastors & Preachers', 'Bible Teachers', 'Sunday School Leaders', 'Seminary Students', 'Small Group Leaders', 'Personal Bible Study', 'Worship Leaders', 'Youth Ministers', 'New Believers', 'Homeschool Families'].map((role) => (
                <span key={role} className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Partner / credibility */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-brand rounded-full" />
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Trusted Partner</h2>
          </div>
          <div className="px-6 py-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              BibleSpeak.org is a proud partner of{' '}
              <a href="https://www.GraceOnlineLibrary.org" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">
                GraceOnlineLibrary.org
              </a>
              {' '}— a trusted Bible study resource that has served Christians online for over 25 years. That depth of biblical scholarship informs the content and standards you'll find throughout this site.
            </p>
            <p>
              Pronunciations follow established scholarly and traditional conventions used in seminaries and Bible colleges. Where pronunciations vary across traditions, we use the most widely accepted English rendering.
            </p>
            <p>
              Audio recordings are clear, deliberate, and designed for easy repetition. Each word is spoken at a natural teaching pace so you can hear every syllable distinctly.
            </p>
          </div>
        </div>

        {/* Advertising disclosure */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-brand rounded-full" />
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Advertising</h2>
          </div>
          <div className="px-6 py-6 text-slate-700 leading-relaxed">
            <p>
              BibleSpeak.org is free to use and supported by advertising. Ads help cover the costs of hosting, audio production, and ongoing development so the site can remain available at no charge to everyone.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="relative bg-navy overflow-hidden rounded-2xl p-8 text-center">
          <div className="grid-pattern absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to look up a word?</h2>
            <p className="text-white/60 mb-6 text-sm">Use the search bar at the top of the page or browse by letter below.</p>
            <Link
              href="/a-words/"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
            >
              Browse A–Z Index
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
