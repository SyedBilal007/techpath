'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCareers, getRoadmapBySlug } from '@/lib/roadmaps';
import { useProgress } from '@/hooks/useProgress';
import { CompletionRing } from '@/components/progress/CompletionRing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

// Fuzzy match function for step names
function normalizeStepName(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .split(/\s+/)
    .filter(Boolean); // Remove empty strings
}

function calculateSimilarity(nameA: string, nameB: string): number {
  const tokensA = normalizeStepName(nameA);
  const tokensB = normalizeStepName(nameB);
  
  if (tokensA.length === 0 || tokensB.length === 0) return 0;
  
  // Calculate Jaccard similarity (intersection / union)
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  
  return intersection.size / union.size;
}

function findCommonSteps(stepsA: Array<{ name: string }>, stepsB: Array<{ name: string }>): Map<string, string[]> {
  const commonMap = new Map<string, string[]>();
  const threshold = 0.3; // 30% similarity threshold
  
  stepsA.forEach((stepA) => {
    stepsB.forEach((stepB) => {
      const similarity = calculateSimilarity(stepA.name, stepB.name);
      if (similarity >= threshold) {
        if (!commonMap.has(stepA.name)) {
          commonMap.set(stepA.name, []);
        }
        commonMap.get(stepA.name)!.push(stepB.name);
      }
    });
  });
  
  return commonMap;
}

interface StepItemProps {
  step: { name: string; desc: string; resources: string[] };
  index: number;
 slug: string;
  isCommon: boolean;
}

function StepItem({ step, index, slug, isCommon }: StepItemProps) {
  const progress = useProgress(slug);
  const stepId = `step-${index}`;
  const isDone = progress.completed[stepId] || false;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
          <motion.div
            className={`
              flex items-center gap-3 p-3 rounded-lg border transition-all
              ${isDone 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' 
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step number circle */}
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold
              ${isDone 
                ? 'bg-gradient-to-r from-green-600 to-green-700' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }
            `}>
              {index + 1}
            </div>
            
            {/* Step name */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={`text-sm font-medium truncate ${
                  isDone 
                    ? 'text-green-900 dark:text-green-100 line-through' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {step.name}
                </h4>
                {isCommon && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    Common
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Completion indicator */}
            {isDone && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex-shrink-0"
              >
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold text-sm">{step.name}</p>
            <p className="text-xs text-muted-foreground">{step.desc}</p>
            {step.resources.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs font-medium mb-1">Resources:</p>
                <ul className="text-xs space-y-1">
                  {step.resources.slice(0, 3).map((resource, idx) => (
                    <li key={idx} className="text-muted-foreground">• {resource}</li>
                  ))}
                  {step.resources.length > 3 && (
                    <li className="text-muted-foreground">+{step.resources.length - 3} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
  );
}

function ComparePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const careers = getCareers();

  const [careerA, setCareerA] = useState<string>('');
  const [careerB, setCareerB] = useState<string>('');

  // Initialize from URL or preselect first two
  useEffect(() => {
    const a = searchParams.get('a');
    const b = searchParams.get('b');
    
    if (a && b && careers.some(c => c.slug === a) && careers.some(c => c.slug === b)) {
      setCareerA(a);
      setCareerB(b);
    } else if (careers.length >= 2) {
      // Preselect first two
      const first = careers[0].slug;
      const second = careers[1].slug;
      setCareerA(first);
      setCareerB(second);
      router.replace(`/compare?a=${first}&b=${second}`, { scroll: false });
    }
  }, [searchParams, careers, router]);

  // Update URL when selections change
  useEffect(() => {
    if (careerA && careerB && careerA !== careerB) {
      router.replace(`/compare?a=${careerA}&b=${careerB}`, { scroll: false });
    }
  }, [careerA, careerB, router]);

  const roadmapA = careerA ? getRoadmapBySlug(careerA) : null;
  const roadmapB = careerB ? getRoadmapBySlug(careerB) : null;

  const progressA = useProgress(careerA);
  const progressB = useProgress(careerB);

  // Find common steps
  const commonSteps = useMemo(() => {
    if (!roadmapA || !roadmapB) return new Map<string, string[]>();
    return findCommonSteps(roadmapA.steps, roadmapB.steps);
  }, [roadmapA, roadmapB]);

  const commonCount = commonSteps.size;

  if (!roadmapA || !roadmapB) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Select two careers to compare</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            Compare Career Paths
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Side-by-side comparison of different tech career roadmaps
          </p>

          {/* Career Selectors */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Career A
              </label>
              <Select value={careerA} onValueChange={setCareerA}>
                <SelectTrigger>
                  <SelectValue placeholder="Select career" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career.slug} value={career.slug}>
                      {career.career}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Career B
              </label>
              <Select value={careerB} onValueChange={setCareerB}>
                <SelectTrigger>
                  <SelectValue placeholder="Select career" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career.slug} value={career.slug}>
                      {career.career}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info Panel */}
          {commonCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
            >
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                These careers share <span className="font-semibold">{commonCount}</span> foundational skill{commonCount !== 1 ? 's' : ''}.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column A */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-4 self-start"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <CardTitle className="text-xl">{roadmapA.career}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{roadmapA.tagline}</p>
                    </div>
                  </div>
                  <CompletionRing 
                    value={progressA.percent(roadmapA.steps.length)} 
                    size={48}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {roadmapA.steps.map((step, index) => (
                    <StepItem
                      key={index}
                      step={step}
                      index={index}
                      slug={careerA}
                      isCommon={commonSteps.has(step.name)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Column B */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-4 self-start"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center text-white font-bold">
                      B
                    </div>
                    <div>
                      <CardTitle className="text-xl">{roadmapB.career}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{roadmapB.tagline}</p>
                    </div>
                  </div>
                  <CompletionRing 
                    value={progressB.percent(roadmapB.steps.length)} 
                    size={48}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {roadmapB.steps.map((step, index) => {
                    // Check if this step matches any common step from A
                    const isCommon = Array.from(commonSteps.values())
                      .some(matches => matches.includes(step.name));
                    
                    return (
                      <StepItem
                        key={index}
                        step={step}
                        index={index}
                        slug={careerB}
                        isCommon={isCommon}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading compare page...</p>
          </div>
        </div>
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  );
}
