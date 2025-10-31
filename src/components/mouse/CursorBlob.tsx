'use client';

import { motion } from 'framer-motion';
import { useMouse } from './MouseProvider';
import { useEffect, useState } from 'react';

export function CursorBlob() {
  const { x, y, enabled } = useMouse();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    setShouldRender(enabled && !prefersReducedMotion);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldRender(enabled && !e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [enabled]);

  if (!shouldRender || typeof window === 'undefined') {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[5]"
      style={{
        left: 0,
        top: 0,
        width: '280px',
        height: '280px',
        marginLeft: '-140px',
        marginTop: '-140px',
      }}
      animate={{
        x: x,
        y: y,
      }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, #6EE7F9 0%, #A78BFA 100%)',
          filter: 'blur(60px)',
          opacity: 0.2,
        }}
      />
    </motion.div>
  );
}
