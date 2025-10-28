'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { env } from '@/lib/env'

interface GAProps {
  measurementId?: string
}

export function GA({ measurementId }: GAProps) {
  const [isConsented, setIsConsented] = useState(false)
  const gaId = measurementId || env.gaId

  // Dev warning if GA ID is missing
  useEffect(() => {
    if (!gaId && env.isDev) {
      console.warn(
        '⚠️ Google Analytics: NEXT_PUBLIC_GA_ID not set\n' +
        'Add it to .env.local to enable analytics tracking.\n' +
        'See .env.example for reference.'
      )
    }
  }, [gaId])

  useEffect(() => {
    // Check if user has given consent
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'granted') {
      setIsConsented(true)
    }

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      if (event.detail === 'granted') {
        setIsConsented(true)
        // Initialize GA if it wasn't already loaded
        if (window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
          })
        }
      } else {
        setIsConsented(false)
        // Revoke consent
        if (window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: 'denied',
          })
        }
      }
    }

    window.addEventListener('cookie-consent-change' as any, handleConsentChange)

    return () => {
      window.removeEventListener('cookie-consent-change' as any, handleConsentChange)
    }
  }, [])

  // Don't load GA if no ID or no consent
  if (!gaId || !isConsented) {
    return null
  }

  return (
    <>
      {/* Google Analytics gtag.js */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Set default consent to denied
            gtag('consent', 'default', {
              'analytics_storage': 'granted'
            });
            
            // Initialize GA
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}

// Event tracking helper
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  // Only track if consent is granted
  const consent = localStorage.getItem('cookie-consent')
  if (consent !== 'granted' || !window.gtag) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Page view tracking helper
export const trackPageView = (url: string) => {
  const consent = localStorage.getItem('cookie-consent')
  if (consent !== 'granted' || !window.gtag || !env.gaId) {
    return
  }

  window.gtag('config', env.gaId, {
    page_path: url,
  })
}

// TypeScript declarations
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}



