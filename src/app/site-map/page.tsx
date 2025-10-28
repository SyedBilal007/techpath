import Link from 'next/link'
import { getCareers } from '@/lib/roadmaps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, FileText, Shield, FileCheck } from 'lucide-react'

export const metadata = {
  title: 'Site Map | TechPath',
  description: 'Complete list of all pages and career roadmaps on TechPath',
}

export default function SiteMapPage() {
  const careers = getCareers()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Site Map
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Complete overview of all pages and resources on TechPath
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main Pages */}
          <Card>
            <CardHeader>
              <FileText className="mb-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
              <CardTitle>Main Pages</CardTitle>
              <CardDescription>Core navigation and features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/roadmaps" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    All Roadmaps
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/compare" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Compare Careers
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/resources" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Learning Resources
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Career Roadmaps */}
          <Card className="md:col-span-2">
            <CardHeader>
              <MapPin className="mb-2 h-6 w-6 text-purple-600 dark:text-purple-400" />
              <CardTitle>Career Roadmaps</CardTitle>
              <CardDescription>Step-by-step paths to your dream tech career</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 sm:grid-cols-2">
                {careers.map((career) => (
                  <li key={career.slug}>
                    <Link 
                      href={`/roadmaps/${career.slug}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {career.career}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {career.tagline}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Legal Pages */}
          <Card>
            <CardHeader>
              <Shield className="mb-2 h-6 w-6 text-green-600 dark:text-green-400" />
              <CardTitle>Legal</CardTitle>
              <CardDescription>Privacy and terms</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/privacy" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Technical */}
          <Card>
            <CardHeader>
              <FileCheck className="mb-2 h-6 w-6 text-orange-600 dark:text-orange-400" />
              <CardTitle>Technical</CardTitle>
              <CardDescription>SEO and metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/sitemap.xml" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    XML Sitemap
                  </a>
                </li>
                <li>
                  <a 
                    href="/robots.txt" 
                    className="text-blue-600 hover:underline dark:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Robots.txt
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="mt-2">
            Found a broken link? <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">Let us know</Link>
          </p>
        </div>
      </div>
    </div>
  )
}





