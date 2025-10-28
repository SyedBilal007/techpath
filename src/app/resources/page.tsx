'use client'

import { motion } from 'framer-motion'
import { ExternalLink, BookOpen, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { getCareers } from '@/lib/roadmaps'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ResourcesPage() {
  const careers = getCareers()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter careers based on search
  const filteredCareers = careers.filter(career =>
    career.career.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.steps.some(step => 
      step.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      step.resources.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  )

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
            Learning Resources
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl max-w-3xl mx-auto">
            Curated resources for every step of your learning journey, organized by career path
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources by career, topic, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Resources by Career */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tabs defaultValue={careers[0]?.slug} className="w-full">
            <TabsList className="w-full flex-wrap h-auto mb-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
              {careers.map((career) => (
                <TabsTrigger 
                  key={career.slug} 
                  value={career.slug}
                  className="flex-grow"
                >
                  {career.career}
                </TabsTrigger>
              ))}
            </TabsList>

            {filteredCareers.map((career, careerIndex) => (
              <TabsContent key={career.slug} value={career.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Career Overview */}
                  <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{career.career}</CardTitle>
                          <CardDescription className="text-base">
                            {career.tagline}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {career.steps.length} steps
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <BookOpen className="h-4 w-4" />
                        <span>
                          {career.steps.reduce((acc, step) => acc + step.resources.length, 0)} total resources
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Steps with Resources */}
                  <div className="space-y-6">
                    {career.steps.map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stepIndex * 0.1 }}
                      >
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {stepIndex + 1}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-1">{step.name}</CardTitle>
                                <CardDescription>{step.desc}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Resources ({step.resources.length})
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {step.resources.map((resource, resourceIndex) => (
                                  <motion.div
                                    key={resourceIndex}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Button
                                      variant="outline"
                                      className="w-full justify-between h-auto p-3 group/btn"
                                      onClick={() => window.open(
                                        `https://www.google.com/search?q=${encodeURIComponent(resource)}`,
                                        '_blank'
                                      )}
                                    >
                                      <span className="text-sm truncate">{resource}</span>
                                      <ExternalLink className="h-3 w-3 ml-2 flex-shrink-0 transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search query
              </p>
            </div>
          </motion.div>
        )}

        {/* Additional Resources Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">
                Want to suggest a resource?
              </CardTitle>
              <CardDescription className="text-blue-100">
                Help us improve our curated list by suggesting valuable learning resources
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Submit a Resource
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}