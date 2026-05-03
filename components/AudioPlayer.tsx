'use client'

export default function AudioPlayer({ src }: { src: string }) {
  return (
    <audio controls preload="none" className="w-full max-w-md">
      <source src={src} type="audio/mpeg" />
      Your browser does not support audio playback.
    </audio>
  )
}
