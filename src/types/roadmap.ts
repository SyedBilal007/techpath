export interface RoadmapStep {
  name: string
  desc: string
  resources: string[]
}

export interface CareerRoadmap {
  career: string
  slug: string
  tagline: string
  steps: RoadmapStep[]
}

