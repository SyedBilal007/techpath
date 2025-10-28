'use client'

import { useState, useEffect } from 'react'

export interface StepProgress {
  [stepIndex: number]: boolean
}

export function useRoadmapProgress(roadmapSlug: string, totalSteps: number) {
  const [progress, setProgress] = useState<StepProgress>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storageKey = `roadmap-progress-${roadmapSlug}`
    const savedProgress = localStorage.getItem(storageKey)

    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress))
      } catch (error) {
        console.error('Failed to load progress:', error)
      }
    }

    setIsLoaded(true)
  }, [roadmapSlug])

  // Save progress to localStorage
  const saveProgress = (newProgress: StepProgress) => {
    if (typeof window === 'undefined') return

    const storageKey = `roadmap-progress-${roadmapSlug}`
    localStorage.setItem(storageKey, JSON.stringify(newProgress))
    setProgress(newProgress)
  }

  // Toggle step completion
  const toggleStep = (stepIndex: number) => {
    const newProgress = {
      ...progress,
      [stepIndex]: !progress[stepIndex],
    }
    saveProgress(newProgress)
  }

  // Calculate completion percentage
  const completedCount = Object.values(progress).filter(Boolean).length
  const completionPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0

  // Reset all progress
  const resetProgress = () => {
    saveProgress({})
  }

  return {
    progress,
    toggleStep,
    resetProgress,
    completedCount,
    totalSteps,
    completionPercentage,
    isLoaded,
  }
}




