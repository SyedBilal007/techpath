'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { env } from '@/lib/env'

/**
 * AdSense script loader
 * Only loads in production when NEXT_PUBLIC_ADSENSE_CLIENT is set
 */
export function AdSenseScript() {
  const adClient = env.adsenseClient

  // Dev warning if AdSense client is missing
  useEffect(() => {
    if (!adClient && env.isDev) {
      console.warn(
        '⚠️ Google AdSense: NEXT_PUBLIC_ADSENSE_CLIENT not set\n' +
        'Ad placeholders will be shown instead of real ads.\n' +
        'Add your AdSense client ID to .env.local after approval.\n' +
        'See .env.example for reference.'
      )
    }
  }, [adClient])

  // Don't load AdSense script in development or without client ID
  if (env.isDev || !adClient) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}



