'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('phc_tsuhAHjvFPgi3SQWHRp4X7YvGP5fnnhUF8hfUenpyPuk', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      opt_out_capturing_by_default: true,
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
