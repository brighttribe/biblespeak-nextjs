import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the BibleSpeak.org team.',
  openGraph: {
    title: 'Contact | BibleSpeak.org',
    description: 'Get in touch with the BibleSpeak.org team.',
  },
}

export default function ContactPage() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org').trim()

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${siteUrl}/contact/`,
        name: 'Contact BibleSpeak.org',
        url: `${siteUrl}/contact/`,
        description: 'Get in touch with the BibleSpeak.org team with questions, word suggestions, or pronunciation corrections.',
        inLanguage: 'en-US',
        isPartOf: { '@id': `${siteUrl}/#website` },
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'BibleSpeak.org',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/bible-speak.png`,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'hello@biblespeak.org',
          availableLanguage: 'English',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact/` },
        ],
      },
    ],
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
            <span className="text-white/70">Contact</span>
          </nav>
          <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="text-4xl font-bold mb-5">Contact BibleSpeak.org</h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl">
            Have a question, a word suggestion, or a correction? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-brand rounded-full" />
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Email Us</h2>
          </div>
          <div className="px-6 py-8 text-center">
            <p className="text-slate-600 mb-6 leading-relaxed">
              The best way to reach us is by email. We read every message and do our best to respond promptly.
            </p>
            <a
              href="mailto:hello@biblespeak.org"
              className="inline-flex items-center gap-3 bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              hello@biblespeak.org
            </a>
            <p className="mt-6 text-sm text-slate-400">
              Suggestions for new words, pronunciation corrections, and general questions are all welcome.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
