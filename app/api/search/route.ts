import { NextRequest, NextResponse } from 'next/server'
import { getSearchWords } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (q.trim().length < 2) return NextResponse.json([])

  const lower = q.trim().toLowerCase()
  const results = getSearchWords()
    .filter((w) => w.title.toLowerCase().startsWith(lower))
    .slice(0, 8)

  return NextResponse.json(results)
}
