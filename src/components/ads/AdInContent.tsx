'use client'

import { AdBase } from './AdBase'

interface AdInContentProps {
  className?: string
}

/**
 * In-content ad - appears after RoadmapGraph
 * Medium rectangle format for better content integration
 */
export function AdInContent({ className = '' }: AdInContentProps) {
  return (
    <div className={`w-full my-8 flex justify-center ${className}`}>
      <div className="w-full max-w-2xl">
        <AdBase
          adSlot="9876543210" // Replace with your actual ad slot ID
          adFormat="auto"
          fullWidthResponsive={true}
          placeholderHeight="280px"
          placeholderLabel="In-Content Ad"
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  )
}






