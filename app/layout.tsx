import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import SearchBar from '@/components/SearchBar'
import MobileMenu from '@/components/MobileMenu'
import PostHogProvider from '@/components/PostHogProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'BibleSpeak.org — How to Pronounce Bible Words & Names',
    template: '%s | BibleSpeak.org',
  },
  description: 'Audio pronunciation guides for 858 biblical words and names.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'),
  openGraph: {
    type: 'website',
    siteName: 'BibleSpeak.org',
    title: 'BibleSpeak.org — How to Pronounce Bible Words & Names',
    description: 'Audio pronunciation guides for 858 biblical words and names.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BibleSpeak.org' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BibleSpeak.org — How to Pronounce Bible Words & Names',
    description: 'Audio pronunciation guides for 858 biblical words and names.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <PostHogProvider>

        <header className="bg-navy sticky top-0 z-40 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
            <Link href="/" className="shrink-0">
              <Image src="/bible-speak.png" alt="BibleSpeak.org" width={165} height={43} priority />
            </Link>

            <div className="flex-1" />

            <nav className="hidden sm:flex items-center gap-7 text-base font-semibold text-white/70 shrink-0 mr-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/a-words/" className="hover:text-white transition-colors">Browse A–Z</Link>
              <Link href="/about/" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact/" className="hover:text-white transition-colors">Contact</Link>
            </nav>

            <div className="hidden sm:block w-52 shrink-0">
              <SearchBar />
            </div>

            <MobileMenu />
          </div>
        </header>

        <div className="min-h-screen">
          {children}
        </div>

        <footer className="bg-navy-dark text-white/50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8">
              <div>
                <Image src="/bible-speak.png" alt="BibleSpeak.org" width={130} height={34} />
                <p className="mt-3 text-sm text-white/40 max-w-xs leading-relaxed">
                  The most comprehensive Bible word pronunciation resource on the web — all for free.
                </p>
              </div>
              <div className="flex gap-12 text-sm">
                <div>
                  <p className="text-white/80 font-medium mb-3">Browse</p>
                  <div className="flex flex-col gap-2">
                    <Link href="/a-words/" className="hover:text-white transition-colors">A–Z Index</Link>
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/about/" className="hover:text-white transition-colors">About</Link>
                    <Link href="/contact/" className="hover:text-white transition-colors">Contact</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 text-xs text-white/30 flex flex-col sm:flex-row justify-between gap-2">
              <span>© {new Date().getFullYear()}{' '}BibleSpeak.org — Audio pronunciation guides for Bible words &amp; names</span>
              <div className="flex items-center gap-4">
                <span>Free to use and supported by advertising.</span>
                <Link href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms/" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2677571790916419"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        </PostHogProvider>
      </body>
      <GoogleAnalytics gaId="G-C4ES3L9CPJ" />
    </html>
  )
}
