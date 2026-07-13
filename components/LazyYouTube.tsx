'use client'

import { useState } from 'react'

/**
 * Click-to-load YouTube embed. Shows only the thumbnail until the user clicks,
 * so the heavy YouTube player iframe/JS is never downloaded on page load.
 * This keeps the page fast (no Core Web Vitals hit) while still funneling
 * visitors to the YouTube channel.
 */
export default function LazyYouTube({ videoId, title }: { videoId: string; title: string }) {
  const [play, setPlay] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-navy">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play the ${title} video`}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={`${title} video thumbnail`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="white" className="ml-1 h-7 w-7" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
