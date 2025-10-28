'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { AdBase } from './AdBase'

interface AdStickyMobileProps {
  className?: string
}

/**
 * Sticky mobile ad - fixed at bottom on mobile devices
 * Dismissible with smooth animations
 * Only shows on mobile screens (< 768px)
 */
export function AdStickyMobile({ className = '' }: AdStickyMobileProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('sticky-ad-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    } else {
      // Show ad after a delay for better UX
      setTimeout(() => {
        setIsVisible(true)
      }, 3000)
    }

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsDismissed(true)
      // Remember dismissal for 24 hours
      localStorage.setItem('sticky-ad-dismissed', 'true')
      setTimeout(() => {
        localStorage.removeItem('sticky-ad-dismissed')
      }, 24 * 60 * 60 * 1000) // 24 hours
    }, 300)
  }

  // Don't render if dismissed or not mobile
  if (isDismissed || !isMobile) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed bottom-0 left-0 right-0 z-40 md:hidden ${className}`}
        >
          <div className="relative bg-white dark:bg-gray-900 shadow-2xl border-t-2 border-gray-200 dark:border-gray-700">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-1 right-1 z-50 p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Close advertisement"
            >
              <X className="h-3 w-3 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Ad content */}
            <div className="px-2 py-2">
              <AdBase
                adSlot="5555555555" // Replace with your actual ad slot ID
                adFormat="auto"
                fullWidthResponsive={true}
                placeholderHeight="60px"
                placeholderLabel="Mobile Banner"
                className="rounded"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}






