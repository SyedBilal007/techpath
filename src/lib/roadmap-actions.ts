import { CareerRoadmap } from '@/types/roadmap'
import { getFullUrl } from './env'

/**
 * Copy roadmap steps to clipboard as plain text
 */
export async function copyRoadmapToClipboard(roadmap: CareerRoadmap): Promise<boolean> {
  const text = formatRoadmapAsText(roadmap)

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textarea)
      return success
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError)
      return false
    }
  }
}

/**
 * Format roadmap as plain text
 */
function formatRoadmapAsText(roadmap: CareerRoadmap): string {
  let text = `${roadmap.career} Roadmap\n`
  text += `${roadmap.tagline}\n`
  text += `\n`
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  text += `\n`

  roadmap.steps.forEach((step, index) => {
    text += `${index + 1}. ${step.name}\n`
    text += `   ${step.desc}\n`
    
    if (step.resources && step.resources.length > 0) {
      text += `   Resources:\n`
      step.resources.forEach(resource => {
        text += `   • ${resource}\n`
      })
    }
    text += `\n`
  })

  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  text += `\n`
  text += `Generated from TechPath\n`
  text += `${getFullUrl(`/roadmaps/${roadmap.slug}`)}\n`

  return text
}

/**
 * Get Twitter share URL
 */
export function getTwitterShareUrl(roadmap: CareerRoadmap): string {
  const url = getFullUrl(`/roadmaps/${roadmap.slug}`)
  const text = `Check out this ${roadmap.career} learning roadmap! 🚀`
  
  const params = new URLSearchParams({
    url,
    text,
    hashtags: 'TechPath,CareerDevelopment,Learning',
  })

  return `https://twitter.com/intent/tweet?${params.toString()}`
}

/**
 * Get LinkedIn share URL
 */
export function getLinkedInShareUrl(roadmap: CareerRoadmap): string {
  const url = getFullUrl(`/roadmaps/${roadmap.slug}`)
  
  const params = new URLSearchParams({
    url,
  })

  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`
}

/**
 * Get Facebook share URL
 */
export function getFacebookShareUrl(roadmap: CareerRoadmap): string {
  const url = getFullUrl(`/roadmaps/${roadmap.slug}`)
  
  const params = new URLSearchParams({
    u: url,
  })

  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`
}

/**
 * Copy URL to clipboard
 */
export async function copyUrlToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch (error) {
    console.error('Failed to copy URL:', error)
    return false
  }
}




