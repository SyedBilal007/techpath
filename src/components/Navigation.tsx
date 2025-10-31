'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMouse } from '@/components/mouse'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Roadmaps', href: '/roadmaps' },
  { name: 'Compare', href: '/compare' },
  { name: 'Resources', href: '/resources' },
  { name: 'Components', href: '/components' },
  { name: 'Demo', href: '/roadmap-demo' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const { enabled, setEnabled } = useMouse()
  const [isMobile, setIsMobile] = useState(false)

  // Prefetch important routes on mount for faster navigation
  useEffect(() => {
    const prefetchRoutes = async () => {
      if (typeof window !== 'undefined') {
        // Prefetch critical routes
        const routes = ['/roadmaps', '/compare', '/resources', '/about']
        routes.forEach(route => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.href = route
          document.head.appendChild(link)
        })
      }
    }
    
    // Delay prefetch to not block initial load
    const timer = setTimeout(prefetchRoutes, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Check if mobile on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.matchMedia('(pointer: coarse)').matches)
      }
      checkMobile()
      const mediaQuery = window.matchMedia('(pointer: coarse)')
      mediaQuery.addEventListener('change', checkMobile)
      return () => mediaQuery.removeEventListener('change', checkMobile)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" />
              <span className="text-xl font-bold">TechPath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Effects Toggle - Hidden on mobile */}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setEnabled(!enabled)}
                className={cn(
                  'relative hidden sm:flex',
                  enabled ? 'text-green-500 hover:text-green-600' : 'text-muted-foreground'
                )}
                title={enabled ? 'Disable effects' : 'Enable effects'}
              >
                <Sparkles className={cn(
                  'h-4 w-4 transition-colors',
                  enabled ? 'text-green-500' : 'text-muted-foreground'
                )} />
                <span className="sr-only">Toggle effects</span>
                {enabled && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                )}
              </Button>
            )}
            
            <ThemeToggle />
            
            {/* Mobile Navigation Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" />
                    <span className="text-xl font-bold">TechPath</span>
                  </div>
                  
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center px-3 py-2 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-md',
                          pathname === item.href
                            ? 'text-primary bg-accent'
                            : 'text-muted-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Theme</span>
                      <ThemeToggle />
                    </div>
                    {!isMobile && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Effects</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEnabled(!enabled)}
                          className={cn(
                            enabled ? 'text-green-500 hover:text-green-600' : 'text-muted-foreground'
                          )}
                        >
                          <Sparkles className={cn(
                            'h-4 w-4 mr-2',
                            enabled ? 'text-green-500' : 'text-muted-foreground'
                          )} />
                          {enabled ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
