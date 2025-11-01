import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRoadmapBySlug, getCareerSlugs } from '@/lib/roadmaps'
import { getSiteMetadata } from '@/lib/env'
import RoadmapPageClient from './RoadmapPageClient'

interface RoadmapPageProps {
  params: {
    career: string
  }
}

// Generate static params for all careers
export async function generateStaticParams() {
  const slugs = getCareerSlugs()
  return slugs.map((slug) => ({
    career: slug,
  }))
}

// Generate metadata for each career page
export async function generateMetadata({ params }: RoadmapPageProps): Promise<Metadata> {
  const roadmap = getRoadmapBySlug(params.career)
  const siteMetadata = getSiteMetadata()
  const pageUrl = `${siteMetadata.url}/roadmaps/${params.career}`
  const ogImage = siteMetadata.ogImage || `${siteMetadata.url}/og-image.png`

  if (!roadmap) {
    return {
      title: 'Career Not Found',
      description: 'The requested career roadmap could not be found.',
    }
  }

  return {
    title: `${roadmap.career} Roadmap | ${siteMetadata.name}`,
    description: `${roadmap.tagline} - Learn ${roadmap.career} with our comprehensive ${roadmap.steps.length}-step roadmap and curated resources.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${roadmap.career} Roadmap | ${siteMetadata.name}`,
      description: roadmap.tagline,
      type: 'website',
      url: pageUrl,
      siteName: siteMetadata.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${roadmap.career} Roadmap`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${roadmap.career} Roadmap | ${siteMetadata.name}`,
      description: roadmap.tagline,
      images: [ogImage],
    },
    keywords: [
      roadmap.career,
      'learning path',
      'tech career',
      'roadmap',
      ...roadmap.steps.map(step => step.name),
    ],
  }
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const roadmap = getRoadmapBySlug(params.career)

  if (!roadmap) {
    notFound()
  }

  return <RoadmapPageClient roadmap={roadmap} />
}
