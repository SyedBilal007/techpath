'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Download, GitCompare, Share2, Star, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CareerRoadmap } from '@/types/roadmap'
import { Separator } from '@/components/ui/separator'
import { BreadcrumbSchema, CourseSchema } from '@/components/JsonLd'

// Lazy load heavy components
const RoadmapGraph = dynamic(() => import('@/components/RoadmapGraph').then(mod => ({ default: mod.RoadmapGraph })), {
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading interactive roadmap...</p>
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for interactive graph
})

const AdTop = dynamic(() => import('@/components/ads').then(mod => ({ default: mod.AdTop })), {
  loading: () => <div className="w-full h-[90px] bg-gray-100 dark:bg-gray-800"></div>,
})

const AdInContent = dynamic(() => import('@/components/ads').then(mod => ({ default: mod.AdInContent })), {
  loading: () => <div className="w-full h-[280px] bg-gray-100 dark:bg-gray-800"></div>,
})

const AdStickyMobile = dynamic(() => import('@/components/ads').then(mod => ({ default: mod.AdStickyMobile })), {
  ssr: false, // Mobile-only, don't SSR
})

interface RoadmapPageClientProps {
  roadmap: CareerRoadmap
}

export default function RoadmapPageClient({ roadmap }: RoadmapPageClientProps) {
  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    alert(`PDF download for ${roadmap.career} roadmap coming soon!`)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${roadmap.career} Roadmap | TechPath`,
        text: roadmap.tagline,
        url: window.location.href,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const siteUrl = 'https://techpath.dev'

  return (
    <>
      {/* JSON-LD Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Roadmaps', url: `${siteUrl}/roadmaps` },
          { name: roadmap.career, url: `${siteUrl}/roadmaps/${roadmap.slug}` },
        ]}
      />
      <CourseSchema
        name={`${roadmap.career} Learning Path`}
        description={roadmap.tagline}
        provider="TechPath"
        url={`${siteUrl}/roadmaps/${roadmap.slug}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Top Ad - Below Header */}
        <AdTop />

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/roadmaps" prefetch={true}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Roadmaps
            </Link>
          </Button>

          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6"
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Interactive Roadmap
              </span>
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
              {roadmap.career}
            </h1>
            <p className="text-xl leading-8 text-gray-600 dark:text-gray-300">
              {roadmap.tagline}
            </p>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="text-sm">
                {roadmap.steps.length} learning steps
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Beginner friendly
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Interactive Roadmap Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">Interactive Learning Path</CardTitle>
                  <CardDescription>
                    Hover over or click the nodes to explore each step in detail
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <RoadmapGraph steps={roadmap.steps} />
                </CardContent>
              </Card>
            </motion.div>

            {/* In-Content Ad - After RoadmapGraph */}
            <AdInContent />

            {/* Steps Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Learning Steps Overview</CardTitle>
                  <CardDescription>
                    Detailed breakdown of each step in your learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {roadmap.steps.map((step, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {step.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {step.desc}
                          </p>
                          
                          {/* Resources */}
                          {step.resources && step.resources.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">
                                Recommended Resources:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {step.resources.map((resource, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {resource}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {index < roadmap.steps.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleDownloadPDF}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button 
                    onClick={handleShare}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Roadmap
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Link href="/compare" prefetch={true}>
                      <GitCompare className="mr-2 h-4 w-4" />
                      Compare Paths
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Explore curated resources for each step in this roadmap.
                  </p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/resources" prefetch={true}>
                      View All Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Roadmap Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Total Steps
                    </span>
                    <Badge variant="secondary">{roadmap.steps.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Difficulty
                    </span>
                    <Badge variant="outline">Beginner friendly</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      Popular Choice
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Community Verified
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-white">Ready to Start?</CardTitle>
                  <CardDescription className="text-blue-100">
                    Begin your {roadmap.career} journey today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    size="lg"
                  >
                    Start Learning Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

    {/* Sticky Mobile Ad */}
    <AdStickyMobile />
    </>
  )
}

