# BibleSpeak Next.js — Design Spec
**Date:** 2026-05-03  
**Domain:** biblespeak.org  
**Goal:** Migrate existing WordPress site to Next.js, preserving all URLs and SEO rankings, with clean Supabase-backed data and audio hosting.

---

## Background

BibleSpeak.org is a Bible word/name pronunciation reference with 858 published pages. The site currently runs on WordPress and has been penalized by Google's Helpful Content System due to templated AI content on ~407 pages. Revenue dropped from ~$1,200/month to ~$200/month in AdSense.

The WordPress site is being retired entirely. This Next.js app replaces it permanently. Content for the 407 penalized pages will be regenerated separately and imported later via a Supabase update.

---

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **File Storage:** Supabase Storage (audio bucket for 877 MP3s)
- **Hosting:** Vercel
- **Local dev port:** 3001 (port 3000 reserved for BrandBlueprint.ai)

---

## Pages

### 1. Home — `/`
- Site intro and tagline
- A–Z alphabet navigation grid linking to each letter page
- Brief explanation of what the site offers
- Google Ads placement (header/sidebar)

### 2. Alphabet Index — `/a-words/` through `/z-words/`
- Lists all words starting with that letter
- Each word links to its pronunciation page
- Shows phonetic spelling inline
- Google Ads placement

### 3. Word Page — `/[slug]/`
- Examples: `/aaron-pronunciation/`, `/zerubbabel-pronunciation/`
- Slug comes from `wp:post_name` in WordPress XML — preserves all existing URLs exactly
- Sections:
  - Word title + phonetic pronunciation (e.g. "EHR-uhn")
  - Audio player (MP3 served from Supabase Storage)
  - Word meaning
  - Content (the `easton` field — rendered as HTML)
- Google Ads placement

---

## Data Model

### Supabase Table: `words`

| Column | Type | Notes |
|---|---|---|
| id | serial primary key | |
| title | text | e.g. "Aaron" |
| slug | text unique | e.g. "aaron-pronunciation" |
| pronunciation | text | e.g. "EHR-uhn" |
| meaning | text | e.g. "mountain of strength" |
| audio_file | text | filename without extension, e.g. "bbWa1" |
| letter | char(1) | e.g. "a" — drives the /a-words/ pages |
| content | text | HTML string (the `easton` field from WordPress) |
| embedding | vector(1536) | nullable — for future pgvector search |

### Supabase Storage: `audio` bucket
- Public bucket
- One MP3 per word, named exactly as stored in WordPress uploads (e.g. `bbWa1.mp3`)
- URL pattern: `{SUPABASE_URL}/storage/v1/object/public/audio/bbWa1.mp3`

---

## Data Import

### Source files
- WordPress XML: `/Users/briandempsey/Desktop/biblespeak.WordPress.2026-05-03.xml`
- Audio files: `/Users/briandempsey/Desktop/biblespeak/public/wp-content/uploads/bbW*.mp3` (877 files)

### XML field mapping
| WordPress field | Supabase column |
|---|---|
| `<title>` | title |
| `wp:post_name` | slug |
| postmeta: `pronunciation` | pronunciation |
| postmeta: `meaning` | meaning |
| postmeta: `mp3_file_name` | audio_file |
| category nicename (a–z) | letter |
| postmeta: `easton` | content |

### Import process (Node.js scripts)
1. **`scripts/upload-audio.ts`** — uploads all 877 MP3s from local backup to Supabase Storage `audio` bucket
2. **`scripts/import-words.ts`** — parses WordPress XML, extracts all published posts, inserts into `words` table

Only import posts where `wp:status = publish` and `wp:post_type = post`.

---

## Rendering Strategy

**Static Site Generation (SSG)** — all pages generated at build time via `generateStaticParams`.

- Word pages: fetch all 858 slugs at build time, render each statically
- Letter pages: 26 static pages, one per letter
- Home: static

Content updates (e.g. after regenerating the 407 bad pages) trigger a Vercel redeploy, which rebuilds all pages in ~2 minutes.

---

## URL Preservation

All 858 word pages maintain their exact WordPress URLs. No redirects needed.

| Current WordPress URL | Next.js route |
|---|---|
| `biblespeak.org/aaron-pronunciation/` | `app/[slug]/page.tsx` where slug = `aaron-pronunciation` |
| `biblespeak.org/a-words/` | `app/[letter]-words/page.tsx` where letter = `a` |

The 26 letter pages (`/a-words/` etc.) already exist in WordPress and are preserved.

The letter pages use a **partial dynamic segment**: `app/[letter]-words/page.tsx` in Next.js App Router. This matches `/a-words/` with `params.letter = 'a'`. No conflict with `[slug]` — all word slugs end in `-pronunciation`, not `-words`.

---

## Google Ads

Google AdSense script added to the root layout. Ad unit placements on:
- Word pages: below the audio player, below the content
- Letter pages: top of listing
- Home: sidebar or below hero

Exact ad unit IDs to be configured after launch via environment variable or direct placement.

---

## Local Development

Dev server runs on port **3001** to avoid conflict with BrandBlueprint.ai on port 3000.

```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://biblespeak.org
```

---

## Out of Scope (Today)

- pgvector / semantic search (embedding column left nullable for future)
- Bible Study Resources page (currently 404 on live site — skip for now)
- Content regeneration for 407 penalized pages (separate task, will update via Supabase after launch)
- User accounts / favorites / comments
