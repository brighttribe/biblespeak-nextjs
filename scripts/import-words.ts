import xml2js from 'xml2js'
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

// Load .env.local from the project root (two levels up from scripts/)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const XML_PATH = '/Users/briandempsey/Desktop/biblespeak.WordPress.2026-05-03.xml'
const BATCH_SIZE = 50

type WordRow = {
  title: string
  slug: string
  pronunciation: string | null
  meaning: string | null
  audio_file: string | null
  letter: string | null
  content: string | null
}

function getMeta(item: any, key: string): string | null {
  const metas: any[] = item['wp:postmeta'] || []
  const found = metas.find((m) => m['wp:meta_key']?.[0] === key)
  return found?.['wp:meta_value']?.[0] ?? null
}

export async function extractWordsFromXml(xml: string): Promise<WordRow[]> {
  const parsed = await xml2js.parseStringPromise(xml)
  const items: any[] = parsed.rss.channel[0].item || []

  return items
    .filter(
      (item) =>
        item['wp:post_type']?.[0] === 'post' &&
        item['wp:status']?.[0] === 'publish'
    )
    .map((item) => ({
      title: item.title?.[0] ?? '',
      slug: item['wp:post_name']?.[0] ?? '',
      pronunciation: getMeta(item, 'pronunciation'),
      meaning: getMeta(item, 'meaning'),
      audio_file: getMeta(item, 'mp3_file_name'),
      letter:
        item.category
          ?.find((c: any) => c.$?.domain === 'category')
          ?.$?.nicename?.charAt(0) ?? null,
      content: getMeta(item, 'easton'),
    }))
}

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  console.log('Reading XML...')
  const xml = fs.readFileSync(XML_PATH, 'utf-8')
  const words = await extractWordsFromXml(xml)
  console.log(`Extracted ${words.length} published posts`)

  let imported = 0
  for (let i = 0; i < words.length; i += BATCH_SIZE) {
    const batch = words.slice(i, i + BATCH_SIZE)
    const { error } = await supabase
      .from('words')
      .upsert(batch, { onConflict: 'slug' })

    if (error) {
      console.error(`Batch ${i}–${i + BATCH_SIZE} failed:`, error.message)
      process.exit(1)
    }
    imported += batch.length
    console.log(`Imported ${imported}/${words.length}`)
  }

  console.log('Done.')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
