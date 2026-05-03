# BibleSpeak Next.js — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate biblespeak.org from WordPress to a Next.js + Supabase + Vercel stack, preserving all 858 word page URLs exactly, with audio files hosted in Supabase Storage.

**Architecture:** Statically generated Next.js App Router site. All 858 word pages and 26 letter index pages are baked at build time via `generateStaticParams`. Data lives in a single Supabase `words` table; 877 MP3s live in a Supabase Storage `audio` bucket. Content updates trigger a Vercel redeploy (~2 min).

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS, Supabase (PostgreSQL + Storage), Vercel, xml2js (WordPress XML parsing), tsx (TypeScript script runner)

---

## File Map

```
biblespeak-nextjs/
├── app/
│   ├── layout.tsx                  # Root layout, global metadata, Google Ads script
│   ├── globals.css                 # Tailwind imports
│   ├── page.tsx                    # Home page — tagline + A–Z nav grid
│   ├── [letter]-words/
│   │   └── page.tsx                # Letter index — /a-words/ through /z-words/
│   └── [slug]/
│       └── page.tsx                # Word page — /aaron-pronunciation/ etc.
├── components/
│   └── AudioPlayer.tsx             # 'use client' audio element
├── lib/
│   └── supabase.ts                 # createSupabaseClient() + audioUrl() helper
├── types/
│   └── index.ts                    # Word type matching Supabase schema
├── scripts/
│   ├── import-words.ts             # Parse WP XML → upsert into Supabase words table
│   ├── upload-audio.ts             # Upload 877 MP3s → Supabase Storage audio bucket
│   └── __tests__/
│       └── import-words.test.ts    # Node built-in test for XML extraction logic
├── public/
│   └── bible-speak-logo.png        # Copied from Desktop before first commit
├── .env.local                      # Supabase keys (gitignored)
├── .gitignore
├── next.config.ts
├── package.json                    # dev: "next dev -p 3001"
└── tsconfig.json
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `biblespeak-nextjs/` (project root — all other files live here)
- Modify: `package.json` (change dev port to 3001)

- [ ] **Step 1: Scaffold the project**

Run from `/Users/briandempsey/Desktop/`:
```bash
npx create-next-app@latest biblespeak-nextjs \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```
Answer the prompts: Yes to all defaults if asked.

- [ ] **Step 2: Enter the project directory**

```bash
cd /Users/briandempsey/Desktop/biblespeak-nextjs
```

- [ ] **Step 3: Change the dev port to 3001**

Open `package.json` and change the `dev` script from `"next dev"` to `"next dev -p 3001"`:

```json
"scripts": {
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

- [ ] **Step 4: Install additional dependencies**

```bash
npm install @supabase/supabase-js xml2js dotenv
npm install --save-dev @types/xml2js tsx
```

- [ ] **Step 5: Verify dev server starts on port 3001**

```bash
npm run dev
```
Expected: `ready - started server on 0.0.0.0:3001`
Open `http://localhost:3001` — should show default Next.js page.
Stop with Ctrl+C.

- [ ] **Step 6: Copy the logo into the project**

```bash
cp /Users/briandempsey/Desktop/bible-speak-logo.png /Users/briandempsey/Desktop/biblespeak-nextjs/public/bible-speak-logo.png
```

- [ ] **Step 7: Delete default boilerplate**

Remove the contents of `app/page.tsx` (replace with placeholder):
```tsx
export default function Home() {
  return <main><h1>BibleSpeak</h1></main>
}
```

Delete `app/globals.css` content except the Tailwind imports. The file should contain only:
```css
@import "tailwindcss";
```
(If using Tailwind v3, keep the existing `@tailwind base/components/utilities` lines instead.)

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with port 3001 and logo"
```

---

## Task 2: Create GitHub Repo and Push

**Files:** None (git remote only)

- [ ] **Step 1: Create public GitHub repo**

```bash
gh repo create biblespeak-nextjs --public --source=. --remote=origin --push
```

If you don't have `gh` CLI, create the repo at github.com, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/biblespeak-nextjs.git
git push -u origin main
```

Expected: repo appears at `github.com/YOUR_USERNAME/biblespeak-nextjs`

- [ ] **Step 2: Verify push**

```bash
git status
```
Expected: `nothing to commit, working tree clean`

---

## Task 3: Set Up Supabase

**Files:**
- Create: `.env.local`

- [ ] **Step 1: Create a new Supabase project**

Go to `supabase.com` → New project. Name it `biblespeak`. Choose a region close to your users (e.g. US East). Save the database password somewhere safe.

- [ ] **Step 2: Create the words table**

In the Supabase dashboard → SQL Editor, run:

```sql
-- Enable pgvector for future semantic search
create extension if not exists vector;

-- Main words table
create table words (
  id serial primary key,
  title text not null,
  slug text unique not null,
  pronunciation text,
  meaning text,
  audio_file text,
  letter char(1),
  content text,
  embedding vector(1536)
);

-- Indexes for page queries
create index words_letter_idx on words(letter);
create index words_slug_idx on words(slug);

-- Enable Row Level Security
alter table words enable row level security;

-- Allow public read access (no auth needed for a reference site)
create policy "words are publicly readable"
  on words for select
  to anon
  using (true);
```

Expected: "Success. No rows returned"

- [ ] **Step 3: Create the audio storage bucket**

In Supabase dashboard → Storage → New bucket:
- Name: `audio`
- Public: **yes** (toggle on)

Then in SQL Editor, create the public access policy:
```sql
create policy "Public audio read"
  on storage.objects for select
  to public
  using (bucket_id = 'audio');
```

- [ ] **Step 4: Get your Supabase keys**

In Supabase dashboard → Settings → API:
- Copy `Project URL` (looks like `https://abcdefgh.supabase.co`)
- Copy `anon public` key (long JWT starting with `eyJ`)
- Copy `service_role` key (different long JWT — keep this secret)

- [ ] **Step 5: Create .env.local**

Create `/Users/briandempsey/Desktop/biblespeak-nextjs/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key...
NEXT_PUBLIC_SITE_URL=https://biblespeak.org
```

- [ ] **Step 6: Verify .env.local is gitignored**

```bash
cat .gitignore | grep .env
```
Expected: `.env*.local` is listed. If not, add it manually to `.gitignore`.

---

## Task 4: Core Types and Supabase Client

**Files:**
- Create: `types/index.ts`
- Create: `lib/supabase.ts`

- [ ] **Step 1: Create the Word type**

Create `types/index.ts`:
```typescript
export type Word = {
  id: number
  title: string
  slug: string
  pronunciation: string | null
  meaning: string | null
  audio_file: string | null
  letter: string | null
  content: string | null
  embedding: null
}
```

- [ ] **Step 2: Create the Supabase client and audio URL helper**

Create `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function audioUrl(audioFile: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audio/${audioFile}.mp3`
}
```

- [ ] **Step 3: Commit**

```bash
git add types/index.ts lib/supabase.ts
git commit -m "feat: add Word type and Supabase client"
```

---

## Task 5: XML Import Script (TDD)

**Files:**
- Create: `scripts/import-words.ts`
- Create: `scripts/__tests__/import-words.test.ts`

The XML parser is the riskiest piece — wrong field mappings mean bad data. We test the extraction logic before running it against 858 real posts.

- [ ] **Step 1: Write the failing test**

Create `scripts/__tests__/import-words.test.ts`:
```typescript
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { extractWordsFromXml } from '../import-words.js'

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:wp="http://wordpress.org/export/1.2/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/">
<channel>
<item>
  <title><![CDATA[Aaron]]></title>
  <wp:post_name><![CDATA[aaron-pronunciation]]></wp:post_name>
  <wp:status><![CDATA[publish]]></wp:status>
  <wp:post_type><![CDATA[post]]></wp:post_type>
  <category domain="category" nicename="a"><![CDATA[A]]></category>
  <wp:postmeta>
    <wp:meta_key><![CDATA[mp3_file_name]]></wp:meta_key>
    <wp:meta_value><![CDATA[bbWa1]]></wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key><![CDATA[pronunciation]]></wp:meta_key>
    <wp:meta_value><![CDATA[EHR-uhn]]></wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key><![CDATA[meaning]]></wp:meta_key>
    <wp:meta_value><![CDATA[mountain of strength]]></wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key><![CDATA[easton]]></wp:meta_key>
    <wp:meta_value><![CDATA[<h3>Overview</h3><p>Aaron was Moses' brother.</p>]]></wp:meta_value>
  </wp:postmeta>
</item>
<item>
  <title><![CDATA[Draft Post]]></title>
  <wp:post_name><![CDATA[draft-pronunciation]]></wp:post_name>
  <wp:status><![CDATA[draft]]></wp:status>
  <wp:post_type><![CDATA[post]]></wp:post_type>
</item>
<item>
  <title><![CDATA[A Page]]></title>
  <wp:post_name><![CDATA[some-page]]></wp:post_name>
  <wp:status><![CDATA[publish]]></wp:status>
  <wp:post_type><![CDATA[page]]></wp:post_type>
</item>
</channel>
</rss>`

describe('extractWordsFromXml', () => {
  test('extracts only published posts (not drafts or pages)', async () => {
    const words = await extractWordsFromXml(SAMPLE_XML)
    assert.equal(words.length, 1)
  })

  test('maps WordPress fields to Word shape', async () => {
    const [word] = await extractWordsFromXml(SAMPLE_XML)
    assert.equal(word.title, 'Aaron')
    assert.equal(word.slug, 'aaron-pronunciation')
    assert.equal(word.pronunciation, 'EHR-uhn')
    assert.equal(word.meaning, 'mountain of strength')
    assert.equal(word.audio_file, 'bbWa1')
    assert.equal(word.letter, 'a')
    assert.equal(word.content, '<h3>Overview</h3><p>Aaron was Moses\' brother.</p>')
  })
})
```

- [ ] **Step 2: Run the test — verify it fails**

```bash
npx tsx --test scripts/__tests__/import-words.test.ts
```
Expected: Error like `Cannot find module '../import-words.js'`

- [ ] **Step 3: Implement the import script**

Create `scripts/import-words.ts`:
```typescript
import xml2js from 'xml2js'
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

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

import { fileURLToPath } from 'url'
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
```

- [ ] **Step 4: Run the test — verify it passes**

```bash
npx tsx --test scripts/__tests__/import-words.test.ts
```
Expected:
```
✔ extractWordsFromXml > extracts only published posts (not drafts or pages)
✔ extractWordsFromXml > maps WordPress fields to Word shape
ℹ tests 2, pass 2, fail 0
```

- [ ] **Step 5: Run the real import against Supabase**

Make sure `.env.local` is set, then:
```bash
npx tsx scripts/import-words.ts
```
Expected output:
```
Reading XML...
Extracted 858 published posts
Imported 50/858
Imported 100/858
...
Imported 858/858
Done.
```

- [ ] **Step 6: Verify the import in Supabase**

In Supabase dashboard → Table Editor → words. Should show 858 rows. Spot-check Aaron: slug = `aaron-pronunciation`, pronunciation = `EHR-uhn`, audio_file = `bbWa1`.

- [ ] **Step 7: Commit**

```bash
git add scripts/
git commit -m "feat: add XML import script with passing tests"
```

---

## Task 6: Audio Upload Script

**Files:**
- Create: `scripts/upload-audio.ts`

- [ ] **Step 1: Create the upload script**

Create `scripts/upload-audio.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const AUDIO_DIR = '/Users/briandempsey/Desktop/biblespeak/public/wp-content/uploads'
const BUCKET = 'audio'

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

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

main()
```

- [ ] **Step 2: Run the upload script**

```bash
npx tsx scripts/upload-audio.ts
```

This uploads 877 files and will take 5–10 minutes. Expected final line:
```
Done: 877 uploaded, 0 failed
```

If any files fail, re-run — the `upsert: true` flag skips already-uploaded files.

- [ ] **Step 3: Verify in Supabase**

Supabase dashboard → Storage → audio bucket. Should show 877 `.mp3` files. Click one to get a public URL and verify it plays in a browser.

- [ ] **Step 4: Commit**

```bash
git add scripts/upload-audio.ts
git commit -m "feat: add audio upload script"
```

---

## Task 7: AudioPlayer Component

**Files:**
- Create: `components/AudioPlayer.tsx`

- [ ] **Step 1: Create the AudioPlayer client component**

Create `components/AudioPlayer.tsx`:
```tsx
'use client'

export default function AudioPlayer({ src }: { src: string }) {
  return (
    <audio controls preload="none" className="w-full max-w-md">
      <source src={src} type="audio/mpeg" />
      Your browser does not support audio playback.
    </audio>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/AudioPlayer.tsx
git commit -m "feat: add AudioPlayer client component"
```

---

## Task 8: Word Page (`/[slug]/`)

**Files:**
- Create: `app/[slug]/page.tsx`

- [ ] **Step 1: Create the word page**

Create `app/[slug]/page.tsx`:
```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createSupabaseClient, audioUrl } from '@/lib/supabase'
import AudioPlayer from '@/components/AudioPlayer'
import Link from 'next/link'

export async function generateStaticParams() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from('words').select('slug')
  return (data ?? []).map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = createSupabaseClient()
  const { data: word } = await supabase
    .from('words')
    .select('title, pronunciation')
    .eq('slug', slug)
    .single()

  if (!word) return {}

  return {
    title: `How to Pronounce ${word.title} | Bible Speak`,
    description: `Learn the correct pronunciation of ${word.title}${word.pronunciation ? ` (${word.pronunciation})` : ''} with an audio guide.`,
  }
}

export default async function WordPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = createSupabaseClient()
  const { data: word } = await supabase
    .from('words')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!word) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        {word.letter && (
          <>
            <span className="mx-2">›</span>
            <Link
              href={`/${word.letter}-words/`}
              className="text-blue-600 hover:underline"
            >
              {word.letter.toUpperCase()} Words
            </Link>
          </>
        )}
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        How to Pronounce {word.title}
      </h1>

      {word.pronunciation && (
        <p className="text-xl text-gray-600 mb-4 font-mono">{word.pronunciation}</p>
      )}

      {word.audio_file && (
        <div className="mb-6">
          <AudioPlayer src={audioUrl(word.audio_file)} />
        </div>
      )}

      {word.meaning && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold text-gray-700 mb-1">Meaning</h2>
          <p className="text-gray-800">{word.meaning}</p>
        </div>
      )}

      {word.content && (
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: word.content }}
        />
      )}
    </main>
  )
}
```

- [ ] **Step 2: Test a word page locally**

```bash
npm run dev
```
Open `http://localhost:3001/aaron-pronunciation/`

Expected: Page shows "How to Pronounce Aaron", phonetic "EHR-uhn", audio player, meaning, and content sections.

- [ ] **Step 3: Commit**

```bash
git add app/[slug]/
git commit -m "feat: add word pronunciation page with static generation"
```

---

## Task 9: Letter Index Pages (`/a-words/` etc.)

**Files:**
- Create: `app/[letter]-words/page.tsx`

- [ ] **Step 1: Create the letter index page**

Create `app/[letter]-words/page.tsx`:
```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export async function generateStaticParams() {
  return LETTERS.map((letter) => ({ letter }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string }>
}): Promise<Metadata> {
  const { letter } = await params
  return {
    title: `Bible Words Starting with ${letter.toUpperCase()} | Bible Speak`,
    description: `Pronunciation guides for all Bible words and names starting with the letter ${letter.toUpperCase()}.`,
  }
}

export default async function LetterPage({
  params,
}: {
  params: Promise<{ letter: string }>
}) {
  const { letter } = await params

  if (!LETTERS.includes(letter)) notFound()

  const supabase = createSupabaseClient()
  const { data: words } = await supabase
    .from('words')
    .select('title, slug, pronunciation')
    .eq('letter', letter)
    .order('title')

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <span>Words: {letter.toUpperCase()}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Bible Words Starting with {letter.toUpperCase()}
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {LETTERS.map((l) => (
          <Link
            key={l}
            href={`/${l}-words/`}
            className={`px-3 py-1 rounded border text-sm font-medium ${
              l === letter
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-600 hover:border-blue-400'
            }`}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>

      <ul className="divide-y divide-gray-100">
        {(words ?? []).map((word) => (
          <li key={word.slug} className="py-3">
            <Link
              href={`/${word.slug}/`}
              className="text-blue-700 hover:underline font-medium"
            >
              {word.title}
            </Link>
            {word.pronunciation && (
              <span className="ml-3 text-gray-500 font-mono text-sm">
                {word.pronunciation}
              </span>
            )}
          </li>
        ))}
      </ul>

      {(!words || words.length === 0) && (
        <p className="text-gray-500">No words found for this letter.</p>
      )}
    </main>
  )
}
```

- [ ] **Step 2: Test a letter page locally**

```bash
npm run dev
```
Open `http://localhost:3001/a-words/`

Expected: Page shows list of all A words with phonetic spellings. Alphabet nav at top with A highlighted.

- [ ] **Step 3: Commit**

```bash
git add "app/[letter]-words/"
git commit -m "feat: add letter index pages (/a-words/ through /z-words/)"
```

---

## Task 10: Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the placeholder home page**

Replace `app/page.tsx`:
```tsx
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
```

- [ ] **Step 2: Test the home page locally**

```bash
npm run dev
```
Open `http://localhost:3001/`

Expected: "Bible Speak" heading, description, and A–Z letter grid. Each letter links to its index page.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add home page with A-Z navigation"
```

---

## Task 11: Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the root layout**

Replace `app/layout.tsx`:
```tsx
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

        {/* Google AdSense — add your publisher ID below when ready */}
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
```

Note: The AdSense script is commented out. Uncomment and add your publisher ID (`ca-pub-XXXXXXXXXX`) after launch.

- [ ] **Step 2: Test the full layout locally**

```bash
npm run dev
```
Check `http://localhost:3001/` — header, footer, nav all present.
Check `http://localhost:3001/aaron-pronunciation/` — same header/footer wraps the word page.

- [ ] **Step 3: Run a full build to catch any errors**

```bash
npm run build
```
Expected: Build completes with no errors. Should show `858 pages` generated for `[slug]` and `26 pages` for `[letter]-words`.

If build fails, fix the errors before continuing.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with header, footer, and AdSense placeholder"
```

---

## Task 12: Deploy to Vercel and DNS Cutover

**Files:** None (Vercel config is automatic from Next.js)

- [ ] **Step 1: Connect the GitHub repo to Vercel**

Go to `vercel.com` → Add New Project → Import Git Repository.
Select `biblespeak-nextjs` from your GitHub account.

If the repo doesn't appear, click "Adjust GitHub App Permissions" and grant Vercel access to the `biblespeak-nextjs` repo.

Framework preset: **Next.js** (should be auto-detected).

- [ ] **Step 2: Add environment variables in Vercel**

Before clicking Deploy, expand "Environment Variables" and add all four:
```
NEXT_PUBLIC_SUPABASE_URL        = https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = eyJ...
SUPABASE_SERVICE_ROLE_KEY       = eyJ...
NEXT_PUBLIC_SITE_URL            = https://biblespeak.org
```

Set each for **Production**, **Preview**, and **Development**.

- [ ] **Step 3: Deploy**

Click Deploy. Watch the build logs.

Expected: Build completes. Vercel shows a `.vercel.app` preview URL. Open it and verify:
- Home page loads with A–Z grid
- `/aaron-pronunciation/` loads with audio player
- `/a-words/` loads with word list

- [ ] **Step 4: Add your domain in Vercel**

Vercel project → Settings → Domains → Add `biblespeak.org` and `www.biblespeak.org`.

Vercel will show you the DNS records to update.

- [ ] **Step 5: Update DNS at your domain registrar**

Log in to wherever biblespeak.org is registered (GoDaddy, Namecheap, etc.).

Update the DNS records as shown by Vercel. Typically:
- Type: `A`, Name: `@`, Value: `76.76.21.21`
- Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

DNS propagation takes 5–30 minutes.

- [ ] **Step 6: Verify the live site**

Once DNS propagates, open `https://biblespeak.org` in an incognito window.

Check:
- [ ] Home page loads
- [ ] `/aaron-pronunciation/` loads with correct content and audio plays
- [ ] `/a-words/` lists all A words
- [ ] HTTPS is active (padlock in browser)
- [ ] Old WordPress URL structure is preserved (spot-check 3–4 pages)

- [ ] **Step 7: Final commit and push**

```bash
git push origin main
```

---

## Post-Launch: Re-enable Google AdSense

Once the site is live and indexed:

1. Log into your Google AdSense account
2. Add `biblespeak.org` as a site if it's not already there
3. Copy your publisher ID (`ca-pub-XXXXXXXXXX`)
4. In `app/layout.tsx`, uncomment the AdSense script block and replace `ca-pub-XXXXXXXXXX` with your publisher ID
5. Push to trigger a Vercel redeploy

---

## Out of Scope (Future Tasks)

- Content regeneration for 407 penalized pages (update via Supabase directly, then redeploy)
- pgvector semantic search (embedding column is nullable — add later)
- Bible Study Resources page
- `@tailwindcss/typography` plugin for `prose` class styling (install with `npm install @tailwindcss/typography` if prose classes aren't working)
