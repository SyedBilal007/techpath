'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCareers } from '@/lib/roadmaps'

const roadmaps = getCareers().map(roadmap => ({
  ...roadmap,
  href: `/roadmaps/${roadmap.slug}`,
  difficulty: roadmap.steps.length <= 4 ? 'Beginner' : 
             roadmap.steps.length <= 6 ? 'Intermediate' : 'Advanced'
}))

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Career Roadmaps
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
            Choose your path and start your journey to becoming a tech professional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {roadmaps.map((roadmap, index) => (
            <motion.div
              key={roadmap.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {roadmap.career.charAt(0)}
                      </span>
                    </div>
                    <Badge variant={roadmap.difficulty === 'Advanced' ? 'destructive' : 'default'}>
                      {roadmap.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{roadmap.career}</CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    {roadmap.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      {roadmap.steps.length} steps
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Users className="h-4 w-4" />
                      {roadmap.steps.length} learning steps
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Learning Path:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {roadmap.steps.slice(0, 3).map((step, stepIndex) => (
                        <Badge key={stepIndex} variant="secondary" className="text-xs">
                          {step.name}
                        </Badge>
                      ))}
                      {roadmap.steps.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{roadmap.steps.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button asChild className="w-full group">
                    <Link href={roadmap.href}>
                      Start Learning Path
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Not sure which path to choose?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Use our comparison tool to see the differences between career paths
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/compare">Compare Career Paths</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
