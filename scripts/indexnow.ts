import dotenv from 'dotenv'
import path from 'path'
import words from '../data/words.json'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org').trim()
const INDEXNOW_KEY = 'b5f8a2c1d4e7f0b3a6c9d2e5'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const HUB_PAGES = [
  'how-to-pronounce-bible-names',
  'biblical-names-pronunciation',
  'how-to-pronounce-bible-names-with-ease',
  'acts-2-pronunciation',
  'bible-places-pronunciation',
  'hardest-bible-words-to-pronounce',
  'old-testament-names-pronunciation',
  'new-testament-names-pronunciation',
  'bible-prophets-pronunciation',
  'women-of-the-bible-pronunciation',
  'apostles-names-pronunciation',
  'bible-pronunciation-audio',
  'how-to-pronounce-gods-name',
]

async function main() {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/about/`,
    `${SITE_URL}/contact/`,
    ...HUB_PAGES.map((slug) => `${SITE_URL}/${slug}/`),
    ...LETTERS.map((l) => `${SITE_URL}/${l}-words/`),
    ...words.map((w) => `${SITE_URL}/${w.slug}/`),
  ]

  console.log(`Submitting ${urls.length} URLs to IndexNow...`)

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })

  if (res.ok || res.status === 202) {
    console.log(`✓ IndexNow accepted ${urls.length} URLs (status ${res.status})`)
  } else {
    const text = await res.text()
    console.error(`✗ IndexNow returned ${res.status}: ${text}`)
    process.exit(1)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
