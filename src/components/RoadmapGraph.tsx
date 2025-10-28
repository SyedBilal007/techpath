'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoadmapStep } from '@/types/roadmap'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, CheckCircle, Clock, BookOpen } from 'lucide-react'

interface RoadmapGraphProps {
  steps: RoadmapStep[]
}

interface NodePosition {
  x: number
  y: number
}

export function RoadmapGraph({ steps }: RoadmapGraphProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Check if mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate container size
  useEffect(() => {
    const updateSize = () => {
      const container = document.getElementById('roadmap-container')
      if (container) {
        setContainerSize({
          width: container.offsetWidth,
          height: container.offsetHeight
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Calculate node positions
  const getNodePositions = (): NodePosition[] => {
    if (isMobile) {
      // Vertical flow for mobile
      return steps.map((_, index) => ({
        x: containerSize.width / 2,
        y: 100 + (index * 200)
      }))
    } else {
      // Horizontal/zig-zag flow for desktop
      return steps.map((_, index) => {
        const isEven = index % 2 === 0
        const x = 100 + (index * 200)
        const y = isEven ? 150 : 350
        return { x, y }
      })
    }
  }

  const nodePositions = getNodePositions()

  // Generate SVG path for connections
  const getConnectionPath = (): string => {
    if (nodePositions.length < 2) return ''

    let path = `M ${nodePositions[0].x} ${nodePositions[0].y}`
    
    for (let i = 1; i < nodePositions.length; i++) {
      const current = nodePositions[i]
      const previous = nodePositions[i - 1]
      
      if (isMobile) {
        // Straight vertical lines for mobile
        path += ` L ${current.x} ${current.y}`
      } else {
        // Curved lines for desktop
        const midX = (previous.x + current.x) / 2
        const midY = (previous.y + current.y) / 2
        const controlY = Math.abs(current.y - previous.y) > 100 ? midY + 50 : midY
        
        path += ` Q ${midX} ${controlY} ${current.x} ${current.y}`
      }
    }
    
    return path
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const nodeVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      y: 50
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        delay: index * 0.1
      }
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut" as const,
        delay: 0.5
      }
    }
  }

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25
      }
    }
  }

  return (
    <div className="relative w-full min-h-[600px] p-4">
      <motion.div
        id="roadmap-container"
        className="relative w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* SVG Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <motion.path
            d={getConnectionPath()}
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Roadmap Nodes */}
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: nodePositions[index]?.x - 30,
              top: nodePositions[index]?.y - 30,
              zIndex: 10
            }}
            variants={nodeVariants}
            custom={index}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredStep(index)}
            onHoverEnd={() => setHoveredStep(null)}
            onClick={() => setSelectedStep(selectedStep === index ? null : index)}
          >
            {/* Node Circle */}
            <motion.div
              className={`
                w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
                shadow-lg border-4 border-white dark:border-gray-800
                ${selectedStep === index 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }
              `}
              whileHover={{
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
            >
              <span className="text-white font-bold text-lg">
                {index + 1}
              </span>
            </motion.div>

            {/* Step Label */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {step.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">
                {step.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}

        {/* Floating Tooltip/Card */}
        <AnimatePresence>
          {(hoveredStep !== null || selectedStep !== null) && (
            <motion.div
              className="absolute z-50"
              style={{
                left: nodePositions[hoveredStep ?? selectedStep ?? 0]?.x + 50,
                top: nodePositions[hoveredStep ?? selectedStep ?? 0]?.y - 50,
                transform: 'translateX(-50%)'
              }}
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Card className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {(hoveredStep ?? selectedStep ?? 0) + 1}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      {steps[hoveredStep ?? selectedStep ?? 0]?.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {steps[hoveredStep ?? selectedStep ?? 0]?.desc}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <BookOpen className="h-4 w-4" />
                      <span>Resources ({steps[hoveredStep ?? selectedStep ?? 0]?.resources.length})</span>
                    </div>
                    
                    <div className="space-y-2">
                      {steps[hoveredStep ?? selectedStep ?? 0]?.resources.map((resource, resourceIndex) => (
                        <motion.div
                          key={resourceIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: resourceIndex * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(resource)}`, '_blank')}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <span className="text-sm flex-1 truncate">{resource}</span>
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Step {(hoveredStep ?? selectedStep ?? 0) + 1} of {steps.length}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Click to select</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <motion.div
          className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-medium">
              {selectedStep !== null ? selectedStep + 1 : 0} / {steps.length} completed
            </span>
          </div>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${selectedStep !== null ? ((selectedStep + 1) / steps.length) * 100 : 0}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

