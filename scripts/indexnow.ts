import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biblespeak.org'
const INDEXNOW_KEY = 'b5f8a2c1d4e7f0b3a6c9d2e5'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

async function main() {
  const { data: words } = await sb.from('words').select('slug')
  if (!words) { console.error('No words found'); process.exit(1) }

  const urls = [
    `${SITE_URL}/`,
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
    console.log('  Google, Bing, and Yandex will crawl these shortly.')
  } else {
    const text = await res.text()
    console.error(`✗ IndexNow returned ${res.status}: ${text}`)
    process.exit(1)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
