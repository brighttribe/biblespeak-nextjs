'use client'

import { useEffect } from 'react'

declare global {
  interface Window { adsbygoogle: unknown[] }
}

type AdUnitProps = {
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
}

export default function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2677571790916419"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
