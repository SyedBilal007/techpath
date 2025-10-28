'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCareers } from '@/lib/roadmaps'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

export default function ComparePage() {
  const careers = getCareers()
  const [career1, setCareer1] = useState<string>('')
  const [career2, setCareer2] = useState<string>('')

  const selectedCareer1 = careers.find(c => c.slug === career1)
  const selectedCareer2 = careers.find(c => c.slug === career2)

  const showComparison = selectedCareer1 && selectedCareer2

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
            Compare Career Paths
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl max-w-3xl mx-auto">
            Select two career paths to compare their learning steps, resources, and requirements side-by-side
          </p>
        </motion.div>

        {/* Career Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Select Careers to Compare</CardTitle>
              <CardDescription>
                Choose two different career paths to see a detailed comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    First Career
                  </label>
                  <Select value={career1} onValueChange={setCareer1}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select first career..." />
                    </SelectTrigger>
                    <SelectContent>
                      {careers.map((career) => (
                        <SelectItem 
                          key={career.slug} 
                          value={career.slug}
                          disabled={career.slug === career2}
                        >
                          {career.career}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Second Career
                  </label>
                  <Select value={career2} onValueChange={setCareer2}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select second career..." />
                    </SelectTrigger>
                    <SelectContent>
                      {careers.map((career) => (
                        <SelectItem 
                          key={career.slug} 
                          value={career.slug}
                          disabled={career.slug === career1}
                        >
                          {career.career}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {career1 && career2 && (
                <div className="mt-4 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCareer1('')
                      setCareer2('')
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Selection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Results */}
        {showComparison && selectedCareer1 && selectedCareer2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Overview Comparison */}
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Overview Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedCareer1.career}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {selectedCareer1.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          {selectedCareer1.steps.length} steps
                        </Badge>
                        <Badge variant="secondary">
                          {selectedCareer1.steps.reduce((acc, s) => acc + s.resources.length, 0)} resources
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedCareer2.career}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {selectedCareer2.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          {selectedCareer2.steps.length} steps
                        </Badge>
                        <Badge variant="secondary">
                          {selectedCareer2.steps.reduce((acc, s) => acc + s.resources.length, 0)} resources
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Side-by-Side Steps Comparison */}
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Learning Steps Comparison</CardTitle>
                <CardDescription>
                  Compare the learning path step-by-step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Career 1 Steps */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-2 -mx-4 px-4">
                      {selectedCareer1.career} Steps
                    </h4>
                    {selectedCareer1.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {step.name}
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                              {step.desc}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {step.resources.slice(0, 2).map((resource, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                              {step.resources.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{step.resources.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Career 2 Steps */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-2 -mx-4 px-4">
                      {selectedCareer2.career} Steps
                    </h4>
                    {selectedCareer2.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {step.name}
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                              {step.desc}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {step.resources.slice(0, 2).map((resource, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                              {step.resources.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{step.resources.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href={`/roadmaps/${selectedCareer1.slug}`}>
                  View {selectedCareer1.career} Roadmap
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link href={`/roadmaps/${selectedCareer2.slug}`}>
                  View {selectedCareer2.career} Roadmap
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* No Selection State */}
        {!showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-12"
          >
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select two careers to compare
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose careers from the dropdowns above to see a detailed side-by-side comparison
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}