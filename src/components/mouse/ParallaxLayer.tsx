"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointer } from "./MouseProvider";

/**
 * ParallaxLayer component props
 */
export interface ParallaxLayerProps {
  /**
   * Child elements to apply parallax to
   */
  children: React.ReactNode;
  /**
   * Depth factor (0-1, default: 0.5)
   * 0 = no movement, 1 = full movement
   */
  depth?: number;
  /**
   * Maximum translation in pixels (default: 24)
   */
  maxTranslate?: number;
  /**
   * Custom className for wrapper
   */
  className?: string;
}

/**
 * ParallaxLayer - Applies subtle parallax effect to decorative backgrounds
 * 
 * Features:
 * - Parallax movement based on pointer position
 * - Smooth spring animation
 * - Transform via translate3d for GPU acceleration
 * - Respects prefers-reduced-motion (no transform)
 * - Non-intrusive (doesn't affect layout)
 * 
 * @example
 * ```tsx
 * <ParallaxLayer depth={0.5} maxTranslate={24}>
 *   <div className="decorative-bg">...</div>
 * </ParallaxLayer>
 * ```
 */
export function ParallaxLayer({
  children,
  depth = 0.5,
  maxTranslate = 24,
  className = "",
}: ParallaxLayerProps) {
  const { pointer, enabled } = usePointer();
  const ref = useRef<HTMLDivElement>(null);
  const centerX = useRef<number>(0);
  const centerY = useRef<number>(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Calculate center point on mount
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    centerX.current = window.innerWidth / 2;
    centerY.current = window.innerHeight / 2;
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  // Update parallax position
  useEffect(() => {
    if (!enabled || !ref.current || prefersReducedMotion()) {
      x.set(0);
      y.set(0);
      return;
    }

    // Calculate offset from center
    const dx = (pointer.x - centerX.current) / window.innerWidth;
    const dy = (pointer.y - centerY.current) / window.innerHeight;

    // Apply depth and maxTranslate
    const translateX = dx * depth * maxTranslate;
    const translateY = dy * depth * maxTranslate;

    x.set(translateX);
    y.set(translateY);
  }, [pointer.x, pointer.y, enabled, depth, maxTranslate, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
        transform: "translate3d(0, 0, 0)", // GPU acceleration hint - framer-motion will apply x/y as translate3d
      }}
    >
      {children}
    </motion.div>
  );
}
