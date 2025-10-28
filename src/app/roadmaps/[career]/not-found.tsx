import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Search, Home } from 'lucide-react'

export default function RoadmapNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 text-center">
        <CardHeader className="pt-12">
          <div className="mx-auto mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Search className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2">Career Roadmap Not Found</CardTitle>
          <CardDescription className="text-lg">
            The career roadmap you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-12">
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Don't worry! We have plenty of other career paths for you to explore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/roadmaps">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View All Roadmaps
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

