'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, BookOpen, Download, GitCompare, Share2, Star, Users, Sparkles, Copy, Check, Twitter } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CareerRoadmap } from '@/types/roadmap'
import { Separator } from '@/components/ui/separator'
import { BreadcrumbSchema, CourseSchema } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CompletionRing } from '@/components/CompletionRing'
import { useRoadmapProgress } from '@/hooks/useRoadmapProgress'
import { 
  copyRoadmapToClipboard, 
  getTwitterShareUrl, 
  getLinkedInShareUrl 
} from '@/lib/roadmap-actions'
import { env, getSiteMetadata } from '@/lib/env'

// Lazy load heavy components
const RoadmapGraph = dynamic(() => import('@/components/RoadmapGraph').then(mod => ({ default: mod.RoadmapGraph })), {
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading interactive roadmap...</p>
      </div>
    </div>
  ),
  ssr: false
})

const AdTop = dynamic(() => import('@/components/ads').then(mod => ({ default: mod.AdTop })), { ssr: false })
const AdInContent = dynamic(() => import('@/components/ads').then(mod => ({ default: mod.AdInContent })), { ssr: false })
const AdStickyMobile = dynamic(() => import('@/components/ads').then(mod => ({ default: mod.AdStickyMobile })), { ssr: false })

interface RoadmapPageClientProps {
  roadmap: CareerRoadmap
}

export default function RoadmapPageClient({ roadmap }: RoadmapPageClientProps) {
  const [copied, setCopied] = useState(false)
  const siteMetadata = getSiteMetadata()
  
  // Progress tracking
  const {
    progress,
    toggleStep,
    completionPercentage,
    completedCount,
    totalSteps,
    resetProgress,
    isLoaded,
  } = useRoadmapProgress(roadmap.slug, roadmap.steps.length)

  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    alert(`PDF download for ${roadmap.career} roadmap coming soon!`)
  }

  const handleCopyRoadmap = async () => {
    const success = await copyRoadmapToClipboard(roadmap)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      alert('Failed to copy roadmap. Please try again.')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${roadmap.career} Roadmap | ${siteMetadata.name}`,
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

  return (
    <>
      {/* JSON-LD Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteMetadata.url },
          { name: 'Roadmaps', url: `${siteMetadata.url}/roadmaps` },
          { name: roadmap.career, url: `${siteMetadata.url}/roadmaps/${roadmap.slug}` },
        ]}
      />
      <CourseSchema
        name={`${roadmap.career} Learning Path`}
        description={roadmap.tagline}
        provider={siteMetadata.name}
        url={`${siteMetadata.url}/roadmaps/${roadmap.slug}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Top Ad - Below Header */}
        <AdTop />

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Roadmaps', href: '/roadmaps' },
              { label: roadmap.career, href: `/roadmaps/${roadmap.slug}` },
            ]}
          />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >

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
                    A complete breakdown of your learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roadmap.steps.map((step, index) => {
                      const isCompleted = progress[index] || false
                      
                      return (
                        <div
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-lg transition-all cursor-pointer ${
                            isCompleted
                              ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                              : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent'
                          }`}
                          onClick={() => isLoaded && toggleStep(index)}
                        >
                          {/* Checkbox */}
                          <div className="flex-shrink-0">
                            <button
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                if (isLoaded) toggleStep(index)
                              }}
                            >
                              {isCompleted && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </button>
                          </div>

                          {/* Step number badge */}
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            isCompleted
                              ? 'bg-gradient-to-r from-green-600 to-green-700'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600'
                          }`}>
                            {index + 1}
                          </div>

                          {/* Step content */}
                          <div className="flex-1">
                            <h4 className={`font-semibold mb-1 ${
                              isCompleted
                                ? 'text-green-900 dark:text-green-100 line-through'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {step.name}
                            </h4>
                            <p className={`text-sm mb-2 ${
                              isCompleted
                                ? 'text-green-700 dark:text-green-300'
                                : 'text-gray-600 dark:text-gray-300'
                            }`}>
                              {step.desc}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {step.resources.map((resource, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Progress Card */}
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Your Progress</CardTitle>
                    <CardDescription>
                      {completedCount} of {totalSteps} steps completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <CompletionRing 
                      percentage={completionPercentage} 
                      size={140}
                      strokeWidth={10}
                    />
                    <div className="mt-4 w-full space-y-2">
                      {completedCount > 0 && (
                        <Button
                          onClick={resetProgress}
                          variant="ghost"
                          size="sm"
                          className="w-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        >
                          Reset Progress
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="default"
                    onClick={handleCopyRoadmap}
                    disabled={copied}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Roadmap
                      </>
                    )}
                  </Button>

                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                  </Button>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Share on Social
                    </h4>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a 
                        href={getTwitterShareUrl(roadmap)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Twitter className="mr-2 h-4 w-4" />
                        Share on Twitter
                      </a>
                    </Button>

                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a 
                        href={getLinkedInShareUrl(roadmap)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        Share on LinkedIn
                      </a>
                    </Button>
                  </div>

                  <Separator className="my-4" />
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    asChild
                  >
                    <Link href="/compare">
                      <GitCompare className="mr-2 h-4 w-4" />
                      Compare Paths
                    </Link>
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href="/resources">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Learning Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Roadmap Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <BookOpen className="h-4 w-4" />
                      <span>Total Steps</span>
                    </div>
                    <span className="font-semibold">{roadmap.steps.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Users className="h-4 w-4" />
                      <span>Resources</span>
                    </div>
                    <span className="font-semibold">
                      {roadmap.steps.reduce((acc, step) => acc + step.resources.length, 0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Star className="h-4 w-4" />
                      <span>Difficulty</span>
                    </div>
                    <Badge variant="secondary">
                      {roadmap.steps.length <= 4 ? 'Beginner' : 
                       roadmap.steps.length <= 6 ? 'Intermediate' : 'Advanced'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Ready to Start?</CardTitle>
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
