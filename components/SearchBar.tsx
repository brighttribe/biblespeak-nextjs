'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase'

type Result = { title: string; slug: string; pronunciation: string | null }

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    const timer = setTimeout(async () => {
      const supabase = createSupabaseClient()
      const { data } = await supabase
        .from('words')
        .select('title, slug, pronunciation')
        .ilike('title', `${query.trim()}%`)
        .order('title')
        .limit(8)
      setResults(data ?? [])
      setOpen(true)
    }, 180)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function select(slug: string) {
    router.push(`/${slug}/`)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <svg
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${large ? 'w-5 h-5' : 'w-4 h-4'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search Bible words and names..."
          className={`w-full bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm ${
            large ? 'pl-12 pr-4 py-4 text-lg' : 'pl-10 pr-4 py-2.5 text-sm'
          }`}
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50">
          {results.map((r) => (
            <li key={r.slug}>
              <button
                className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors flex items-baseline gap-3 border-b border-slate-50 last:border-0"
                onClick={() => select(r.slug)}
              >
                <span className="font-medium text-slate-900">{r.title}</span>
                {r.pronunciation && (
                  <span className="text-sm text-slate-400 font-mono">{r.pronunciation}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
