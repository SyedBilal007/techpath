import { MetadataRoute } from 'next'
import { getCareerSlugs } from '@/lib/roadmaps'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techpath.dev'
  
  // Get all career slugs dynamically
  const careerSlugs = getCareerSlugs()
  
  // Static routes
  const staticRoutes = [
    '',
    '/roadmaps',
    '/compare',
    '/resources',
    '/about',
    '/contact',
    '/site-map',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : route === '/roadmaps' ? 0.9 : 0.7,
  }))

  // Dynamic roadmap routes
  const roadmapRoutes = careerSlugs.map(slug => ({
    url: `${baseUrl}/roadmaps/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...roadmapRoutes]
}

