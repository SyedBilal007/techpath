'use client'

import { useEffect, useRef } from 'react'
import { env } from '@/lib/env'

interface AdBaseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  adLayout?: string
  adLayoutKey?: string
  fullWidthResponsive?: boolean
  className?: string
  placeholderHeight?: string
  placeholderLabel?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export function AdBase({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  fullWidthResponsive = true,
  className = '',
  placeholderHeight = '250px',
  placeholderLabel = 'Advertisement',
}: AdBaseProps) {
  const adRef = useRef<HTMLModElement>(null)
  const adClient = env.adsenseClient

  useEffect(() => {
    if (!env.isDev && adRef.current && adClient) {
      try {
        // Initialize adsbygoogle array if it doesn't exist
        window.adsbygoogle = window.adsbygoogle || []
        
        // Push ad to be loaded
        window.adsbygoogle.push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [adClient])

  // Development placeholder
  if (env.isDev || !adClient) {
    return (
      <div
        className={`w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg ${className}`}
        style={{ height: placeholderHeight, minHeight: placeholderHeight }}
      >
        <div className="text-center p-4">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {placeholderLabel}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {env.isDev ? 'Development Mode' : 'AdSense Not Configured'}
          </div>
          {!adClient && (
            <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">
              Set NEXT_PUBLIC_ADSENSE_CLIENT
            </div>
          )}
        </div>
      </div>
    )
  }

  // Production ad with reserved space to prevent CLS
  return (
    <div 
      className={`w-full ${className}`} 
      style={{ 
        minHeight: placeholderHeight,
        height: placeholderHeight,
        contain: 'layout style paint' // CSS containment for performance
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', height: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adLayout && { 'data-ad-layout': adLayout })}
        {...(adLayoutKey && { 'data-ad-layout-key': adLayoutKey })}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

