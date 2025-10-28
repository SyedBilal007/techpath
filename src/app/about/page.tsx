'use client'

import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Heart, Globe, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: Target,
    title: 'Clear Learning Paths',
    description: 'Structured roadmaps that guide you from beginner to professional with actionable steps'
  },
  {
    icon: Lightbulb,
    title: 'Curated Resources',
    description: 'Hand-picked learning materials vetted by industry professionals for quality and relevance'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built with feedback from learners and professionals across the tech industry'
  },
  {
    icon: Heart,
    title: 'Open & Free',
    description: 'Quality tech education should be accessible to everyone, everywhere, always'
  }
]

const stats = [
  { icon: Users, label: 'Active Learners', value: '10,000+' },
  { icon: Globe, label: 'Countries', value: '150+' },
  { icon: Award, label: 'Career Paths', value: '5' },
  { icon: TrendingUp, label: 'Success Rate', value: '92%' }
]

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & Product Lead',
    bio: 'Former Google engineer with a passion for democratizing tech education',
    avatar: '👨‍💻',
    expertise: ['Product Design', 'EdTech', 'Full-Stack Development']
  },
  {
    name: 'Sarah Mitchell',
    role: 'Curriculum Director',
    bio: 'Ex-Microsoft tech lead who designs learning experiences that work',
    avatar: '👩‍🏫',
    expertise: ['Curriculum Design', 'Learning Science', 'Technical Writing']
  },
  {
    name: 'Marcus Johnson',
    role: 'Community Manager',
    bio: 'DevOps engineer helping thousands transition into tech careers',
    avatar: '👨‍🔧',
    expertise: ['DevOps', 'Cloud Architecture', 'Community Building']
  }
]

const milestones = [
  { year: '2023', event: 'TechPath launched with first 3 career roadmaps' },
  { year: '2023', event: 'Reached 5,000 active learners in first 6 months' },
  { year: '2024', event: 'Expanded to 5 comprehensive career paths' },
  { year: '2024', event: 'Launched interactive roadmap visualizations' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            About TechPath
          </h1>
          <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make tech education accessible, structured, and effective for everyone.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                Empowering aspiring tech professionals with clear, actionable learning paths
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-3xl mx-auto">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                TechPath was born from a simple observation: talented people struggle to break into tech not because they lack ability, 
                but because they lack clear guidance on what to learn and in what order.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We've seen countless individuals overwhelmed by the sheer volume of resources, technologies, and learning paths available. 
                The paradox of choice paralyzes progress.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                That's why we created TechPath: to cut through the noise and provide structured, battle-tested roadmaps that guide you 
                from day one to your first tech job and beyond.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                  <CardContent className="pt-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What We Believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="mx-auto text-6xl mb-4">{member.avatar}</div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="font-semibold text-blue-600 dark:text-blue-400">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Journey
          </h2>
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-gray-900 dark:text-white font-medium">
                        {milestone.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white mb-2">
                Ready to Start Your Journey?
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Join thousands of learners transforming their careers with TechPath
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Link href="/roadmaps">
                    Explore Roadmaps
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link href="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}