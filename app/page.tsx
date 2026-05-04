import Link from 'next/link'
import type { Metadata } from 'next'
import SearchBar from '@/components/SearchBar'

export const metadata: Metadata = {
  title: 'How to Pronounce Bible Names & Words | BibleSpeak.org',
  description:
    'Learn how to correctly pronounce Bible words, names, and places. Audio pronunciation guides for 858 biblical terms.',
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const CHALLENGE_WORDS = [
  { title: 'Zerubbabel', slug: 'zerubbabel-pronunciation' },
  { title: 'Theophilus', slug: 'theophilus-pronunciation' },
  { title: 'Rhegium', slug: 'rhegium-pronunciation' },
  { title: 'Qoheleth', slug: 'qoheleth-pronunciation' },
  { title: 'Praetorium', slug: 'praetorium-pronunciation' },
  { title: 'Pamphylia', slug: 'pamphylia-pronunciation' },
  { title: 'Onesimus', slug: 'onesimus-pronunciation' },
  { title: 'Mesopotamia', slug: 'mesopotamia-pronunciation' },
  { title: 'Lycaonian', slug: 'lycaonian-pronunciation' },
  { title: 'Kiriatharba', slug: 'kiriatharba-pronunciation' },
  { title: 'Jehoiachim', slug: 'jehoiachim-pronunciation' },
  { title: 'Jehoshaphat', slug: 'jehoshaphat-pronunciation' },
]

export default function HomePage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative bg-navy overflow-hidden text-white">
        {/* Grid texture */}
        <div className="grid-pattern absolute inset-0" />

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-dark/30 rounded-full blur-[100px] translate-y-1/4" />

        <div className="relative max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-brand/15 text-brand-light text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-brand/25 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
            858 Bible words with audio
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight leading-[1.1]">
            How to Pronounce Any<br />
            <span className="text-brand">Bible Word</span> Correctly
          </h1>

          <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Audio guides for 858 biblical words, names, and places — with phonetic spelling, meaning, and historical context.
          </p>

          <div className="w-4/5 mx-auto mt-8 md:hidden">
            <SearchBar />
          </div>
        </div>

      </section>

      {/* ── Browse by Letter ── */}
      <section className="pt-10 pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Browse Bible Words by Letter</h2>
            <p className="text-slate-500 text-sm">Select a letter to see all Bible words starting with it</p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-dark via-brand to-brand-light" />
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {LETTERS.map((letter) => (
                <Link
                  key={letter}
                  href={`/${letter}-words/`}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-base hover:bg-brand hover:text-white hover:border-brand hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0"
                >
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenge ── */}
      <section className="bg-indigo-50/60 border-y border-indigo-100 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Test Your Skills!</h2>
            <p className="text-slate-500 text-sm">Can you pronounce these Bible names &amp; words? Click to find out.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {CHALLENGE_WORDS.map((word) => (
              <Link
                key={word.slug}
                href={`/${word.slug}/`}
                className="px-5 py-2.5 bg-white border border-indigo-200 rounded-xl text-slate-700 font-medium hover:bg-brand hover:text-white hover:border-brand hover:shadow-md hover:-translate-y-0.5 transition-all text-sm shadow-sm"
              >
                {word.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="relative bg-navy overflow-hidden py-20 px-4">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">About BibleSpeak</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              Everything you need to confidently pronounce Bible words when teaching, preaching, or studying.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                ),
                title: 'Most Comprehensive',
                body: "BibleSpeak offers the most comprehensive resource on the web for Bible name pronunciation. If you're a Pastor, teacher, or student — look no further.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                ),
                title: 'Audio + Phonetics',
                body: 'Every word includes an audio recording and a phonetic spelling guide so you can both hear and understand the correct pronunciation — all for free.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                ),
                title: 'Resources for Study',
                body: 'Each word page includes meaning, historical context, and links to additional Bible study tools — commentaries and resources to deepen your understanding.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/8 border border-white/12 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/12 transition-colors">
                <div className="w-11 h-11 bg-brand/20 text-brand rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
