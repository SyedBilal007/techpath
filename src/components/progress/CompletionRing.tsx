'use client';

import { motion } from 'framer-motion';

interface CompletionRingProps {
  value: number; // 0..100
  size?: number;
}

export function CompletionRing({ value, size = 56 }: CompletionRingProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  const percentRounded = Math.round(clampedValue);

  return (
    <div
      role="img"
      aria-label={`Progress: ${percentRounded} percent complete`}
      className="relative inline-flex items-center justify-center"
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-600 dark:text-blue-400"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>

      {/* Percentage label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
          {percentRounded}%
        </span>
      </div>
    </div>
  );
}

