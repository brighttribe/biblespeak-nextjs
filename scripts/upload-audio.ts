import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const AUDIO_DIR = '/Users/Shared/Previously Relocated Items/Security/Backups/BibleSpeak/BibleSpeak MP3s'
const BUCKET = 'audio'

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error: bucketError } = await supabase.storage.createBucket(BUCKET, { public: true })
  if (bucketError && !bucketError.message.includes('already exists')) {
    console.error('Failed to create bucket:', bucketError.message)
    process.exit(1)
  }
  console.log('Bucket ready.')

  const files = fs.readdirSync(AUDIO_DIR).filter((f) => f.endsWith('.mp3'))
  console.log(`Found ${files.length} MP3 files`)

  let uploaded = 0
  let failed = 0

  for (const file of files) {
    const filePath = path.join(AUDIO_DIR, file)
    const buffer = fs.readFileSync(filePath)

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, buffer, { contentType: 'audio/mpeg', upsert: true })

    if (error) {
      console.error(`Failed: ${file} — ${error.message}`)
      failed++
    } else {
      uploaded++
    }

    if ((uploaded + failed) % 50 === 0) {
      console.log(`Progress: ${uploaded + failed}/${files.length} (${failed} failed)`)
    }
  }

  console.log(`Done: ${uploaded} uploaded, ${failed} failed`)
}

main().catch(err => { console.error(err); process.exit(1) })
