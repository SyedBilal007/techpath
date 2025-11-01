'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ProgressState {
  completed: Record<string, boolean>; // stepId -> done
  toggle: (stepId: string) => void;
  set: (stepId: string, value: boolean) => void;
  reset: () => void;
  percent: (totalSteps: number) => number; // 0..100
}

export function useProgress(careerSlug: string): ProgressState {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Storage key
  const storageKey = `techpath-progress:${careerSlug}`;

  // Hydrate from localStorage on mount (SSR-safe)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate it's an object
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
          setCompleted(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load progress from localStorage:', error);
    } finally {
      setIsHydrated(true);
    }
  }, [storageKey]);

  // Persist to localStorage on change (only after hydration)
  useEffect(() => {
    if (typeof window === 'undefined' || !isHydrated) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(completed));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
  }, [completed, storageKey, isHydrated]);

  const toggle = useCallback((stepId: string) => {
    setCompleted((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  }, []);

  const set = useCallback((stepId: string, value: boolean) => {
    setCompleted((prev) => ({
      ...prev,
      [stepId]: value,
    }));
  }, []);

  const reset = useCallback(() => {
    setCompleted({});
  }, []);

  const percent = useCallback((totalSteps: number): number => {
    if (totalSteps === 0) return 0;
    const completedCount = Object.values(completed).filter(Boolean).length;
    return Math.round((completedCount / totalSteps) * 100);
  }, [completed]);

  return {
    completed,
    toggle,
    set,
    reset,
    percent,
  };
}

