'use client'

import { motion } from 'framer-motion'
import { RoadmapGraph } from '@/components/RoadmapGraph'
import { getCareers } from '@/lib/roadmaps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function RoadmapDemoPage() {
  const careers = getCareers()
  const selectedCareer = careers[0] // Use first career as demo

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/components">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Components
            </Link>
          </Button>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Interactive Roadmap Component
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
              RoadmapGraph Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              An interactive, animated roadmap component with Framer Motion animations. 
              Hover over nodes to see details, click to select steps, and watch the smooth animations.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎭</span>
                </div>
                Smooth Animations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Framer Motion powered animations with staggered entrance effects, 
                hover interactions, and smooth transitions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📱</span>
                </div>
                Responsive Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Vertical flow on mobile, horizontal zig-zag on desktop. 
                Automatically adapts to screen size with optimized layouts.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎯</span>
                </div>
                Interactive Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hover for quick previews, click to select steps, 
                floating tooltips with resource links, and progress tracking.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedCareer.career} Roadmap</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {selectedCareer.tagline}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {selectedCareer.steps.length} steps
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8">
                <RoadmapGraph 
                  steps={selectedCareer.steps}
                  careerSlug={selectedCareer.slug}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Hover over nodes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Hover over any numbered circle to see a quick preview of that step
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Click to select</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Click on a node to see detailed information and resource links
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Track progress</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Watch the progress indicator update as you select different steps
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Technical Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Framer Motion</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Smooth animations and transitions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">SVG Paths</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Animated connection lines between nodes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Responsive</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Mobile vertical, desktop horizontal layout
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Interactive</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Hover effects, click handlers, floating tooltips
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Fully typed with proper interfaces
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

