'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoadmapStep } from '@/types/roadmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapGraphProps {
  steps: RoadmapStep[];
  colorTheme?: 'blue' | 'green' | 'orange';
  showLineNumbers?: boolean;
  compact?: boolean;
  careerSlug: string;
  onToggleStep?: (stepId: string) => void;
  isStepDone?: (stepId: string) => boolean;
}

const colorThemes = {
  blue: {
    node: 'from-indigo-500 to-cyan-400',
    nodeHover: 'from-indigo-600 to-cyan-500',
    line: 'from-indigo-400 to-cyan-300',
    focus: 'focus:ring-indigo-500',
  },
  green: {
    node: 'from-emerald-500 to-teal-400',
    nodeHover: 'from-emerald-600 to-teal-500',
    line: 'from-emerald-400 to-teal-300',
    focus: 'focus:ring-emerald-500',
  },
  orange: {
    node: 'from-orange-500 to-amber-400',
    nodeHover: 'from-orange-600 to-amber-500',
    line: 'from-orange-400 to-amber-300',
    focus: 'focus:ring-orange-500',
  },
};

export function RoadmapGraph({ 
  steps, 
  colorTheme = 'blue',
  showLineNumbers = false,
  compact = false,
  careerSlug,
  onToggleStep,
  isStepDone,
}: RoadmapGraphProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize from sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = sessionStorage.getItem('roadmap-selected-step');
    if (stored !== null) {
      const index = parseInt(stored, 10);
      if (index >= 0 && index < steps.length) {
        setSelectedStep(index);
      }
    }
  }, [steps.length]);

  // Persist to sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (selectedStep !== null) {
      sessionStorage.setItem('roadmap-selected-step', selectedStep.toString());
    } else {
      sessionStorage.removeItem('roadmap-selected-step');
    }
  }, [selectedStep]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Scroll into view when step is selected (mobile)
  useEffect(() => {
    if (selectedStep !== null && isMobile && cardRefs.current[selectedStep]) {
      const timer = setTimeout(() => {
        cardRefs.current[selectedStep]?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedStep, isMobile, prefersReducedMotion]);

  const theme = colorThemes[colorTheme];
  const nodeSize = compact ? 'w-12 h-12' : 'w-16 h-16';
  const nodeGap = compact ? 'gap-4 md:gap-6' : 'gap-8 md:gap-12';
  const lineWidth = compact ? 'w-8 md:w-10' : 'w-12 md:w-16';

  // Generate step ID (use step.id if available, fallback to index)
  const getStepId = (index: number) => {
    const step = steps[index];
    return (step as any)?.id || `step-${index}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const nodeVariants = {
    hidden: {
      scale: prefersReducedMotion ? 1 : 0,
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50,
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: index * 0.1,
          },
    }),
    hover: {
      scale: 1.1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            type: 'spring',
            stiffness: 400,
            damping: 15,
          },
    },
  };

  const glowVariants = {
    inactive: {
      boxShadow: prefersReducedMotion 
        ? '0 0 0px rgba(59, 130, 246, 0)'
        : [
            '0 0 0px rgba(59, 130, 246, 0)',
            '0 0 20px rgba(59, 130, 246, 0.3)',
            '0 0 0px rgba(59, 130, 246, 0)',
          ],
    },
    active: {
      boxShadow: prefersReducedMotion
        ? '0 0 15px rgba(59, 130, 246, 0.4)'
        : [
            '0 0 0px rgba(59, 130, 246, 0)',
            '0 0 25px rgba(59, 130, 246, 0.6)',
            '0 0 0px rgba(59, 130, 246, 0)',
          ],
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
    },
    completed: {
      boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)',
    },
  };

  const lineVariants = {
    hidden: {
      scaleX: prefersReducedMotion ? 1 : 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.8,
            ease: 'easeInOut',
          },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.2,
          },
    },
  };

  const handleNodeClick = (index: number) => {
    setSelectedStep(selectedStep === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNodeClick(index);
    } else if (e.key === 'ArrowRight' && !isMobile) {
      e.preventDefault();
      const nextIndex = index < steps.length - 1 ? index + 1 : 0;
      nodeRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft' && !isMobile) {
      e.preventDefault();
      const prevIndex = index > 0 ? index - 1 : steps.length - 1;
      nodeRefs.current[prevIndex]?.focus();
    }
  };

  const handleCheckboxKeyDown = (e: React.KeyboardEvent, stepId: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (onToggleStep) {
        onToggleStep(stepId);
        // Analytics
        console.info('step_completed', { stepId, careerSlug });
      }
    }
  };

  const handleCheckboxChange = (stepId: string) => {
    if (onToggleStep) {
      onToggleStep(stepId);
      // Analytics
      console.info('step_completed', { stepId, careerSlug });
    }
  };

  return (
    <div className="relative w-full py-8 px-4 overflow-visible">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          'flex relative',
          nodeGap,
          isMobile ? 'flex-col items-center' : 'flex-row items-center justify-center flex-wrap'
        )}
        style={{ minHeight: '300px' }}
      >
        {steps.map((step, index) => {
          const isSelected = selectedStep === index;
          const isLast = index === steps.length - 1;
          const stepId = getStepId(index);
          const isDone = isStepDone ? isStepDone(stepId) : false;

          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Line Number (optional) */}
              {showLineNumbers && !isMobile && (
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {index + 1}
                </motion.div>
              )}

              {/* Node Circle */}
              <motion.button
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                className={cn(
                  nodeSize,
                  'rounded-full flex items-center justify-center text-sm font-medium',
                  'text-white shadow-lg hover:shadow-xl transition-all',
                  `bg-gradient-to-br ${theme.node}`,
                  `focus:outline-none focus:ring-2 ${theme.focus} focus:ring-offset-2`,
                  'relative z-10',
                  isDone && 'opacity-90'
                )}
                variants={nodeVariants}
                custom={index}
                whileHover="hover"
                onClick={() => handleNodeClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`Step ${index + 1}: ${step.name}`}
                aria-expanded={isSelected}
                tabIndex={0}
                animate={isDone ? 'completed' : isSelected ? 'active' : 'inactive'}
              >
                {/* Glow pulse effect for active node (reduced if completed) */}
                {isSelected && !isDone && (
                  <motion.div
                    className={cn(
                      'absolute inset-0 rounded-full',
                      `bg-gradient-to-br ${theme.node}`
                    )}
                    variants={glowVariants}
                    animate="active"
                    style={{ opacity: 0.5 }}
                  />
                )}
                {/* Success ring for completed steps */}
                {isDone && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-500"
                    variants={glowVariants}
                    animate="completed"
                  />
                )}
                <span className={cn(
                  'relative z-10 font-semibold',
                  compact ? 'text-base' : 'text-lg'
                )}>
                  {index + 1}
                </span>
                {/* Completed check badge */}
                {isDone && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>

              {/* Connector Line (horizontal on desktop, vertical on mobile) */}
              {!isLast && (
                <motion.div
                  className={cn(
                    'h-[2px] flex-1',
                    `bg-gradient-to-r ${theme.line}`,
                    isMobile ? 'w-[2px] h-16 my-2' : lineWidth
                  )}
                  style={isMobile ? {} : { minWidth: compact ? '32px' : '48px' }}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
              )}

              {/* Expanded Card Below Node - Use layout animation to prevent CLS */}
              <motion.div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  'mt-4 w-full max-w-sm z-50',
                  isMobile ? 'w-full' : 'w-full',
                  // Reserve space to prevent CLS
                  !isSelected && 'min-h-0'
                )}
                layout
                animate={{
                  height: isSelected ? 'auto' : 0,
                }}
                transition={prefersReducedMotion ? { duration: 0 } : {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                style={{ zIndex: 50, overflow: 'hidden' }}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                    <Card className="p-4 rounded-2xl bg-card text-card-foreground shadow-md border border-border">
                      <CardHeader className="p-0 pb-3">
                        <CardTitle className="text-xl">{step.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                          {step.desc}
                        </p>
                      </CardHeader>
                      <CardContent className="p-0 pt-3">
                        {/* Mark step complete checkbox */}
                        {onToggleStep && (
                          <div className="mb-4 pb-4 border-b border-border">
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={isDone || false}
                                onChange={() => handleCheckboxChange(stepId)}
                                onKeyDown={(e) => handleCheckboxKeyDown(e, stepId)}
                                className="w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                tabIndex={0}
                              />
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                Mark step complete
                              </span>
                            </label>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold mb-3">
                            Resources:
                          </h4>
                          <div className="space-y-2">
                            {step.resources.map((resource, resourceIndex) => (
                              <motion.a
                                key={resourceIndex}
                                href={`https://www.google.com/search?q=${encodeURIComponent(resource)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2 rounded-md bg-accent hover:bg-accent/80 transition-colors text-sm"
                                whileHover={
                                  prefersReducedMotion
                                    ? {}
                                    : { scale: 1.02, x: 4 }
                                }
                                transition={
                                  prefersReducedMotion
                                    ? { duration: 0 }
                                    : { duration: 0.2 }
                                }
                              >
                                <span className="flex-1">{resource}</span>
                                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
