import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-10 duration-700">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-500">
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
          <Button asChild size="lg" className="min-w-[180px]">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="min-w-[180px]">
            <Link href="/roadmaps" className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Browse Roadmaps
            </Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 text-gray-400 dark:text-gray-600 animate-in fade-in duration-1000 delay-600">
          <p className="text-sm">
            Lost your way? Don't worry, everyone gets lost sometimes.
          </p>
        </div>
      </div>
    </div>
  )
}

