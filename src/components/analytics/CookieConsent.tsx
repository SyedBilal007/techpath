'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Delay showing the banner for better UX
      setTimeout(() => {
        setShowBanner(true)
        setIsVisible(true)
      }, 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'granted')
    
    // Dispatch custom event for GA to initialize
    const event = new CustomEvent('cookie-consent-change', { detail: 'granted' })
    window.dispatchEvent(event)
    
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'denied')
    
    // Dispatch custom event
    const event = new CustomEvent('cookie-consent-change', { detail: 'denied' })
    window.dispatchEvent(event)
    
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  if (!showBanner) {
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
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <Card className="mx-auto max-w-4xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Cookie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Cookie Consent
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    We use cookies to enhance your browsing experience and analyze our traffic. 
                    By clicking "Accept", you consent to our use of cookies for analytics purposes. 
                    You can learn more in our{' '}
                    <a 
                      href="/privacy" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Privacy Policy
                    </a>.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleAccept}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Accept Cookies
                    </Button>
                    <Button
                      onClick={handleDecline}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600"
                    >
                      Decline
                    </Button>
                    <Button
                      onClick={handleClose}
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      Close
                    </Button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Settings component for managing cookie preferences
export function CookieSettings() {
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent')
    setConsent(storedConsent)
  }, [])

  const handleToggle = (value: 'granted' | 'denied') => {
    localStorage.setItem('cookie-consent', value)
    setConsent(value)
    
    const event = new CustomEvent('cookie-consent-change', { detail: value })
    window.dispatchEvent(event)
  }

  const handleReset = () => {
    localStorage.removeItem('cookie-consent')
    setConsent(null)
    
    // Reload page to show banner again
    window.location.reload()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Cookie Preferences
      </h3>
      
      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            Analytics Cookies
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Help us improve by collecting anonymous usage data
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleToggle('granted')}
            variant={consent === 'granted' ? 'default' : 'outline'}
            size="sm"
          >
            Allow
          </Button>
          <Button
            onClick={() => handleToggle('denied')}
            variant={consent === 'denied' ? 'default' : 'outline'}
            size="sm"
          >
            Deny
          </Button>
        </div>
      </div>

      {consent && (
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Current setting: <strong>{consent === 'granted' ? 'Allowed' : 'Denied'}</strong>
        </div>
      )}

      <Button onClick={handleReset} variant="outline" size="sm">
        Reset Cookie Preferences
      </Button>
    </div>
  )
}



