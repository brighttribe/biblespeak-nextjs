import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bible Speak — How to Pronounce Bible Words & Names',
  description:
    'Learn how to correctly pronounce Bible words, names, and places. Audio pronunciation guides for 858 biblical terms.',
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bible Speak</h1>
        <p className="text-xl text-gray-600">
          How to Pronounce Bible Words &amp; Names
        </p>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Audio pronunciation guides for 858 biblical words, names, and places —
          with phonetic spelling, meaning, and historical context.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Browse by Letter
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {LETTERS.map((letter) => (
            <Link
              key={letter}
              href={`/${letter}-words/`}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            >
              {letter.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
