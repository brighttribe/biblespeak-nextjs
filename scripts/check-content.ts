import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
import { createClient } from '@supabase/supabase-js'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const { data, count } = await sb.from('words').select('content', { count: 'exact' })

  let noContent = 0
  let templateContent = 0
  let otherContent = 0

  for (const w of data ?? []) {
    if (!w.content) { noContent++; continue }
    const text = w.content.replace(/<[^>]+>/g, '')
    if (text.match(/^(Introduction to|Overview and Name Meaning)/i)) {
      templateContent++
    } else {
      otherContent++
      console.log('NON-TEMPLATE:', text.substring(0, 100))
    }
  }

  console.log(`\nTotal: ${count}`)
  console.log(`No content: ${noContent}`)
  console.log(`Template (AI): ${templateContent}`)
  console.log(`Other/real content: ${otherContent}`)
}
main().catch(console.error)
