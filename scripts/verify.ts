import dotenv from 'dotenv'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function main() {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { count } = await sb.from('words').select('*', { count: 'exact', head: true })
  console.log('Row count:', count)
  const { data } = await sb.from('words').select('title,slug,pronunciation,audio_file').eq('slug','aaron-pronunciation').single()
  console.log('Aaron:', JSON.stringify(data))
}
main()
