"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointer } from "./MouseProvider";

/**
 * Magnetic component props
 */
export interface MagneticProps {
  /**
   * Child element to apply magnetic effect to
   */
  children: React.ReactElement;
  /**
   * Maximum shift distance in pixels (default: 16)
   */
  strength?: number;
  /**
   * Spring configuration for smooth animation
   */
  spring?: {
    stiffness: number;
    damping: number;
  };
  /**
   * Custom className for wrapper
   */
  className?: string;
}

/**
 * Magnetic - Wrapper component that adds magnetic hover effect to children
 * 
 * Features:
 * - Child shifts toward pointer on hover (up to max distance)
 * - Smooth spring animation
 * - Returns to origin on leave
 * - No layout shift (transform only)
 * - Accessible: applies transform on keyboard focus
 * 
 * @example
 * ```tsx
 * <Magnetic strength={16} spring={{ stiffness: 180, damping: 20 }}>
 *   <button>Click me</button>
 * </Magnetic>
 * ```
 */
export function Magnetic({
  children,
  strength = 16,
  spring = { stiffness: 180, damping: 20 },
  className = "",
}: MagneticProps) {
  const { pointer, enabled } = usePointer();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  // Calculate magnetic offset
  useEffect(() => {
    if (!enabled || (!isHovered && !isFocused) || !ref.current) {
      x.set(0);
      y.set(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = pointer.x - centerX;
    const dy = pointer.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate magnetic pull (inverse square, capped at strength)
    let pullX = 0;
    let pullY = 0;

    if (distance > 0 && distance < strength * 3) {
      const force = Math.min(strength / distance, 1);
      pullX = dx * force;
      pullY = dy * force;
    }

    // For keyboard focus, apply a small consistent transform
    if (isFocused && !isHovered) {
      pullX = strength * 0.3;
      pullY = strength * 0.3;
    }

    x.set(pullX);
    y.set(pullY);
  }, [pointer.x, pointer.y, isHovered, isFocused, enabled, strength, x, y]);

  // Clone child and add event handlers
  const childProps = children.props as any;
  const childWithProps = React.cloneElement(
    children,
    {
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        setIsHovered(true);
        if (typeof childProps.onMouseEnter === "function") {
          childProps.onMouseEnter(e);
        }
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        setIsHovered(false);
        if (typeof childProps.onMouseLeave === "function") {
          childProps.onMouseLeave(e);
        }
      },
      onFocus: (e: React.FocusEvent<HTMLElement>) => {
        setIsFocused(true);
        if (typeof childProps.onFocus === "function") {
          childProps.onFocus(e);
        }
      },
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        setIsFocused(false);
        if (typeof childProps.onBlur === "function") {
          childProps.onBlur(e);
        }
      },
    } as any
  );

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {childWithProps}
    </motion.div>
  );
}
