'use client'

import { AdBase } from './AdBase'

interface AdTopProps {
  className?: string
}

/**
 * Top banner ad - appears below header on career pages
 * Responsive horizontal banner format
 */
export function AdTop({ className = '' }: AdTopProps) {
  return (
    <div className={`w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 ${className}`}>
      <AdBase
        adSlot="1234567890" // Replace with your actual ad slot ID
        adFormat="horizontal"
        fullWidthResponsive={true}
        placeholderHeight="90px"
        placeholderLabel="Top Banner Ad"
        className="max-w-full"
      />
    </div>
  )
}






