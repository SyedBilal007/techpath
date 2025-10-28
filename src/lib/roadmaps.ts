import { CareerRoadmap } from '@/types/roadmap'
import roadmapsData from '@/data/roadmaps.json'

// Type assertion to ensure the imported data matches our interface
const roadmaps: CareerRoadmap[] = roadmapsData as CareerRoadmap[]

/**
 * Get all available careers
 * @returns Array of all career roadmaps
 */
export function getCareers(): CareerRoadmap[] {
  return roadmaps
}

/**
 * Get a specific roadmap by its slug
 * @param slug - The career slug (e.g., 'data-analyst')
 * @returns The roadmap if found, undefined otherwise
 */
export function getRoadmapBySlug(slug: string): CareerRoadmap | undefined {
  return roadmaps.find(roadmap => roadmap.slug === slug)
}

/**
 * Search for careers by query (case-insensitive)
 * @param query - The search query
 * @returns Array of matching career roadmaps
 */
export function searchCareer(query: string): CareerRoadmap[] {
  if (!query.trim()) {
    return roadmaps
  }

  const lowercaseQuery = query.toLowerCase()
  
  return roadmaps.filter(roadmap => 
    roadmap.career.toLowerCase().includes(lowercaseQuery) ||
    roadmap.tagline.toLowerCase().includes(lowercaseQuery) ||
    roadmap.steps.some(step => 
      step.name.toLowerCase().includes(lowercaseQuery) ||
      step.desc.toLowerCase().includes(lowercaseQuery)
    )
  )
}

/**
 * Get career slugs for navigation
 * @returns Array of career slugs
 */
export function getCareerSlugs(): string[] {
  return roadmaps.map(roadmap => roadmap.slug)
}

/**
 * Get a random career for featured content
 * @returns A random career roadmap
 */
export function getRandomCareer(): CareerRoadmap {
  const randomIndex = Math.floor(Math.random() * roadmaps.length)
  return roadmaps[randomIndex]
}

/**
 * Get careers by difficulty level (based on step count and complexity)
 * @param level - The difficulty level ('beginner', 'intermediate', 'advanced')
 * @returns Array of careers matching the difficulty level
 */
export function getCareersByDifficulty(level: 'beginner' | 'intermediate' | 'advanced'): CareerRoadmap[] {
  return roadmaps.filter(roadmap => {
    const stepCount = roadmap.steps.length
    const hasAdvancedTerms = roadmap.steps.some(step => 
      step.name.toLowerCase().includes('advanced') ||
      step.name.toLowerCase().includes('mlops') ||
      step.name.toLowerCase().includes('architecture') ||
      step.name.toLowerCase().includes('certifications')
    )
    
    switch (level) {
      case 'beginner':
        return stepCount <= 4 && !hasAdvancedTerms
      case 'intermediate':
        return stepCount >= 5 && stepCount <= 6 && !hasAdvancedTerms
      case 'advanced':
        return hasAdvancedTerms || stepCount > 6
      default:
        return true
    }
  })
}

