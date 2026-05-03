import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
import Anthropic from '@anthropic-ai/sdk'

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

async function main() {
  const response = await ai.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 700,
    temperature: 0.85,
    messages: [{
      role: 'user',
      content: `You are writing a short, genuinely informative article for BibleSpeak.org — a Bible word pronunciation reference site used by pastors, teachers, and Bible students.

Write an HTML article about the biblical name: "Jehoshaphat"
Phonetic pronunciation: jih-HOSH-uh-fat
Meaning: Yahweh has judged

REQUIREMENTS:
- 280–380 words
- HTML only: use <h2>, <h3>, <p>, <strong>, <em> tags as needed
- Open with where this name first appears in scripture.
- Naturally weave in SEO phrases like "how to pronounce Jehoshaphat", "pronouncing Jehoshaphat correctly", "Jehoshaphat pronunciation" — only where they fit naturally
- Cover: biblical significance, where it appears in scripture, meaning/etymology, why it matters
- Do NOT start with "Introduction to" or "Overview of"
- Write as a knowledgeable Bible scholar talking to a curious reader

Output only the HTML, no explanation.`
    }],
  })
  console.log((response.content[0] as { text: string }).text)
}
main().catch(console.error)
