'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search, BarChart3, Code, Brain, Shield, Cloud, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { WebSiteSchema, OrganizationSchema } from '@/components/JsonLd'

import { getCareers } from '@/lib/roadmaps'

const careerRoles = getCareers().map(roadmap => ({
  title: roadmap.career,
  description: roadmap.tagline,
  icon: roadmap.slug === 'data-analyst' ? BarChart3 :
        roadmap.slug === 'web-developer' ? Code :
        roadmap.slug === 'ai-engineer' ? Brain :
        roadmap.slug === 'cybersecurity-analyst' ? Shield : Cloud,
  href: `/roadmaps/${roadmap.slug}`,
  duration: `${roadmap.steps.length} steps`,
  difficulty: roadmap.steps.length <= 4 ? 'Beginner' : 
             roadmap.steps.length <= 6 ? 'Intermediate' : 'Advanced',
  color: roadmap.slug === 'data-analyst' ? 'from-blue-500 to-cyan-500' :
         roadmap.slug === 'web-developer' ? 'from-green-500 to-emerald-500' :
         roadmap.slug === 'ai-engineer' ? 'from-purple-500 to-pink-500' :
         roadmap.slug === 'cybersecurity-analyst' ? 'from-red-500 to-orange-500' :
         'from-indigo-500 to-blue-500',
  demand: roadmap.slug === 'web-developer' || roadmap.slug === 'ai-engineer' ? 'Very High' : 'High'
}))

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/roadmaps/${searchQuery.toLowerCase().replace(/\s+/g, '-')}`)
    }
  }

  const handleCardClick = (href: string) => {
    router.push(href)
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebSiteSchema
        url="https://techpath.dev"
        name="TechPath"
        description="Interactive, step-by-step paths for Data Analyst, Web Dev, AI, Cybersecurity, Cloud & more."
        searchUrl="https://techpath.dev"
      />
      <OrganizationSchema
        name="TechPath"
        url="https://techpath.dev"
        logo="https://techpath.dev/logo.png"
        description="Empowering aspiring tech professionals with clear, actionable learning paths"
        sameAs={[
          'https://twitter.com/techpath',
          'https://github.com/techpath',
          'https://linkedin.com/company/techpath'
        ]}
      />

      <div className="relative min-h-screen overflow-hidden">
        {/* Futuristic Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-30" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} />
          
          {/* Animated floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-80"
          animate={{
            y: [0, -30, 0],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-70"
          animate={{
            y: [0, -25, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        </div>

      {/* Hero Section */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white/90">Interactive Learning Paths</span>
            </motion.div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
              Find your roadmap{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                into tech
              </span>
          </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl leading-8 text-white/80 sm:text-2xl max-w-4xl mx-auto mb-12"
            >
              Interactive, step-by-step paths for Data Analyst, Web Dev, AI, Cybersecurity, Cloud & more.
            </motion.p>

            {/* Search/Choose UI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for a career path..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-32 h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-2 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Career Role Cards */}
      <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-lg text-white/70">
              Click on a role to start your journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {careerRoles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="group relative overflow-hidden border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/30"
                  onClick={() => handleCardClick(role.href)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <CardHeader className="relative text-center pb-4">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${role.color} mb-4 mx-auto shadow-lg`}
                    >
                      <role.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <CardTitle className="text-xl font-bold text-white mb-2">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-white/70 text-sm">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative text-center space-y-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {role.duration}
                      </Badge>
                      <Badge 
                        variant={role.difficulty === 'Advanced' ? 'destructive' : 'default'}
                        className="bg-white/20 text-white border-white/30"
                      >
                        {role.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                      <span>Demand:</span>
                      <span className="font-semibold text-green-400">{role.demand}</span>
                    </div>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-center gap-2 text-white/80 group-hover:text-white transition-colors"
                    >
                      <span className="text-sm font-medium">Start Learning</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Why Choose TechPath?
            </h2>
            <p className="text-lg text-white/70">
              Everything you need to succeed in your tech career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Interactive Learning',
                description: 'Step-by-step roadmaps with hands-on projects',
                icon: '🎯'
              },
              {
                title: 'Real-World Skills',
                description: 'Build portfolio-worthy projects as you learn',
                icon: '🚀'
              },
              {
                title: 'Community Driven',
                description: 'Join thousands of learners on similar journeys',
                icon: '👥'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-5xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}