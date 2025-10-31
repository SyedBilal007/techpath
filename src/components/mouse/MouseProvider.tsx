'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

interface MouseContextValue {
  x: number;
  y: number;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const MouseContext = createContext<MouseContextValue | undefined>(undefined);

interface MouseProviderProps {
  children: React.ReactNode;
}

export function MouseProvider({ children }: MouseProviderProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [enabled, setEnabledState] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  // Initialize enabled state from localStorage and system preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if mobile (coarse pointer)
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // Check localStorage
    const stored = localStorage.getItem('techpath-effects');
    let shouldEnable = false;

    if (stored !== null) {
      try {
        const parsed = JSON.parse(stored);
        shouldEnable = parsed.enabled === true && !prefersReducedMotion && !isMobile;
      } catch {
        // Invalid JSON, ignore
      }
    }

    // Only enable if not reduced motion and not mobile
    if (shouldEnable && !prefersReducedMotion && !isMobile) {
      setEnabledState(true);
    }
  }, []);

  // Persist enabled state to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('techpath-effects', JSON.stringify({ enabled }));
    } catch (error) {
      // localStorage might be unavailable (private browsing, etc.)
      console.warn('Failed to save effects preference to localStorage:', error);
    }
  }, [enabled]);

  // Manual toggle function
  const setEnabled = useCallback((newEnabled: boolean) => {
    if (typeof window === 'undefined') return;

    // Check system preferences before allowing manual enable
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    if (newEnabled && (prefersReducedMotion || isMobile)) {
      console.warn('Effects disabled due to system preferences or mobile device');
      return;
    }

    setEnabledState(newEnabled);
  }, []);

  // Track mouse position with requestAnimationFrame
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!enabled) return;

    let frameScheduled = false;

    const updatePosition = () => {
      setX(lastPosRef.current.x);
      setY(lastPosRef.current.y);
      frameScheduled = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisibleRef.current) return;
      
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      if (!frameScheduled) {
        frameScheduled = true;
        rafIdRef.current = requestAnimationFrame(updatePosition);
      }
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      
      if (document.hidden && rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
        frameScheduled = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [enabled]);

  const value: MouseContextValue = {
    x,
    y,
    enabled,
    setEnabled,
  };

  return <MouseContext.Provider value={value}>{children}</MouseContext.Provider>;
}

export function useMouse(): MouseContextValue {
  const context = useContext(MouseContext);
  
  if (context === undefined) {
    throw new Error('useMouse must be used within a MouseProvider');
  }
  
  return context;
}

/**
 * usePointer - Alias for useMouse with pointer object format
 * Returns { pointer: { x, y }, enabled } for compatibility
 */
export function usePointer() {
  const { x, y, enabled } = useMouse();
  return {
    pointer: { x, y },
    enabled,
  };
}
