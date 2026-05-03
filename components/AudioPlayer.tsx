'use client'

import { useRef, useState } from 'react'

export default function AudioPlayer({ src, dark = false }: { src: string; dark?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggle}
        className={`flex items-center justify-center w-14 h-14 rounded-full transition-all shadow-md active:scale-95 ${
          dark
            ? 'bg-white text-indigo-700 hover:bg-indigo-50'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
        aria-label={playing ? 'Pause pronunciation' : 'Play pronunciation'}
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        )}
      </button>
      <div>
        <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-slate-700'}`}>
          {playing ? 'Playing...' : 'Hear the pronunciation'}
        </p>
        <p className={`text-xs ${dark ? 'text-indigo-200' : 'text-slate-400'}`}>
          Click to play audio
        </p>
      </div>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} preload="none" />
    </div>
  )
}
