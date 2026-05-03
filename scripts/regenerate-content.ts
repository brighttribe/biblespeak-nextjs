import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const PROGRESS_FILE = path.resolve(process.cwd(), 'scripts/.regenerate-progress.json')
const CONCURRENCY = 3
const REAL_CONTENT_MIN_LENGTH = 200

// Varied opening styles so Claude doesn't always start the same way
const OPENERS = [
  'Begin with the etymology and original language meaning.',
  'Open with where this word or name first appears in scripture.',
  'Start with the historical or cultural context of this biblical term.',
  'Lead with what makes this name or word significant in the biblical narrative.',
  'Begin with the role this person, place, or term played in biblical history.',
]

function isTemplated(content: string | null): boolean {
  if (!content) return true
  const text = content.replace(/<[^>]+>/g, '').trim()
  if (text.length < REAL_CONTENT_MIN_LENGTH) return true
  return /^(Introduction to|Overview and Name Meaning)/i.test(text)
}

function buildPrompt(word: { title: string; pronunciation: string | null; meaning: string | null }, opener: string): string {
  return `You are writing a short, genuinely informative article for BibleSpeak.org — a Bible word pronunciation reference site used by pastors, teachers, and Bible students.

Write an HTML article about the biblical word or name: "${word.title}"
${word.pronunciation ? `Phonetic pronunciation: ${word.pronunciation}` : ''}
${word.meaning ? `Meaning: ${word.meaning}` : ''}

REQUIREMENTS:
- 280–380 words
- HTML only: use <h2>, <h3>, <p>, <strong>, <em> tags as needed
- ${opener}
- Naturally weave in SEO phrases like "how to pronounce ${word.title}", "pronouncing ${word.title} correctly", "${word.title} pronunciation" — but only where they fit naturally in the text, not forced
- Cover: biblical significance, where it appears in scripture (book/chapter/verse if known), meaning or etymology, why it matters for Bible readers
- Vary your structure — don't always use the same heading pattern
- Do NOT start with "Introduction to" or "Overview of"
- Do NOT use a generic opener like "In the Bible, [word] is..."
- Write as if you're a knowledgeable Bible scholar talking to a curious reader
- No filler, no padding — every sentence should add value

Output only the HTML content, no surrounding \`\`\`html or explanation.`
}

async function generate(word: { title: string; pronunciation: string | null; meaning: string | null }, attempt = 0): Promise<string> {
  const opener = OPENERS[attempt % OPENERS.length]
  const response = await ai.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 700,
    temperature: 0.85,
    messages: [{ role: 'user', content: buildPrompt(word, opener) }],
  })
  const raw = (response.content[0] as { text: string }).text.trim()
  // Strip any ```html ... ``` fences Claude occasionally adds
  return raw.replace(/^```html?\n?/i, '').replace(/\n?```$/, '').trim()
}

async function processWord(
  word: { id: number; title: string; slug: string; pronunciation: string | null; meaning: string | null },
  done: Set<number>
): Promise<void> {
  if (done.has(word.id)) return

  try {
    const html = await generate(word)
    await sb.from('words').update({ content: html }).eq('id', word.id)
    done.add(word.id)
    saveProgress(done)
    process.stdout.write(`✓ ${word.title}\n`)
  } catch (err) {
    process.stdout.write(`✗ ${word.title}: ${(err as Error).message}\n`)
  }
}

function loadProgress(): Set<number> {
  try {
    const raw = fs.readFileSync(PROGRESS_FILE, 'utf8')
    return new Set(JSON.parse(raw))
  } catch {
    return new Set()
  }
}

function saveProgress(done: Set<number>) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify([...done]))
}

async function main() {
  const { data: allWords } = await sb
    .from('words')
    .select('id, title, slug, pronunciation, meaning, content')
    .order('title')

  if (!allWords) { console.error('No words found'); process.exit(1) }

  const toProcess = allWords.filter(w => isTemplated(w.content))
  const done = loadProgress()
  const remaining = toProcess.filter(w => !done.has(w.id))

  console.log(`Total: ${allWords.length} | Need regeneration: ${toProcess.length} | Already done: ${done.size} | Remaining: ${remaining.length}`)
  if (remaining.length === 0) { console.log('All done!'); return }

  // Process in batches of CONCURRENCY
  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY)
    await Promise.all(batch.map(w => processWord(w, done)))
    const pct = Math.round(((done.size) / toProcess.length) * 100)
    console.log(`Progress: ${done.size}/${toProcess.length} (${pct}%)`)
  }

  console.log('\nDone! All content regenerated.')
  fs.unlinkSync(PROGRESS_FILE)
}

main().catch(err => { console.error(err); process.exit(1) })
