import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Bible Speak — How to Pronounce Bible Words & Names',
    template: '%s | Bible Speak',
  },
  description: 'Audio pronunciation guides for 858 biblical words and names.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/">
              <Image
                src="/bible-speak-logo.png"
                alt="Bible Speak"
                width={200}
                height={52}
                priority
              />
            </a>
            <nav className="flex gap-4 text-sm">
              <a href="/a-words/" className="text-gray-600 hover:text-blue-600">
                Bible Name Pronunciation
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Bible Speak — How to Pronounce Bible Words &amp; Names</p>
        </footer>

        {/* Google AdSense — uncomment and add your publisher ID after launch */}
        {/*
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
        */}
      </body>
    </html>
  )
}
