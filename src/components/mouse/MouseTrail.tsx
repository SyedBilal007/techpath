'use client';

import { motion } from 'framer-motion';
import { useMouse } from './MouseProvider';
import { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  delay: number; // Random delay for natural movement
}

const TRAIL_LENGTH = 7; // 6-8 dots for natural movement

export function MouseTrail() {
  const { x, y, enabled } = useMouse();
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const pointIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) {
      setTrail([]);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const updateTrail = (timestamp: number) => {
      // Throttle updates to ~60fps (every ~16ms)
      if (timestamp - lastUpdateRef.current < 16) {
        rafIdRef.current = requestAnimationFrame(updateTrail);
        return;
      }

      lastUpdateRef.current = timestamp;

      setTrail((prev) => {
        // Add slight random delay for natural trailing effect
        const delay = Math.random() * 0.05; // 0-50ms variation
        const newTrail = [
          { x, y, id: pointIdRef.current++, delay },
          ...prev.slice(0, TRAIL_LENGTH - 1),
        ];
        return newTrail;
      });

      rafIdRef.current = requestAnimationFrame(updateTrail);
    };

    rafIdRef.current = requestAnimationFrame(updateTrail);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [x, y, enabled]);

  if (!enabled || typeof window === 'undefined' || trail.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[4]">
      {trail.map((point, index) => {
        // Size varies from 8px (newest) to 2px (oldest)
        const size = 8 - (index * (6 / (TRAIL_LENGTH - 1)));
        const clampedSize = Math.max(2, Math.min(8, size));
        
        // Opacity decreases from 0.4 to 0
        const opacity = 0.4 * (1 - index / TRAIL_LENGTH);

        return (
          <motion.div
            key={point.id}
            className="bg-cyan-400/30 rounded-full fixed pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: `${clampedSize}px`,
              height: `${clampedSize}px`,
              marginLeft: `-${clampedSize / 2}px`,
              marginTop: `-${clampedSize / 2}px`,
            }}
            animate={{
              x: point.x,
              y: point.y,
              opacity: opacity,
            }}
            transition={{
              duration: 0.15 + point.delay,
              ease: 'easeOut',
              delay: point.delay * index, // Stagger delay for natural trailing
            }}
          />
        );
      })}
    </div>
  );
}
