'use client'

import { motion } from 'framer-motion'

interface CompletionRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  showLabel?: boolean
  className?: string
}

export function CompletionRing({
  percentage,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  className = '',
}: CompletionRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  // Color based on percentage
  const getColor = () => {
    if (percentage === 100) return 'text-green-500'
    if (percentage >= 75) return 'text-blue-500'
    if (percentage >= 50) return 'text-yellow-500'
    if (percentage >= 25) return 'text-orange-500'
    return 'text-gray-400'
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
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
          className={getColor()}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </svg>

      {/* Percentage label */}
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className={`text-2xl font-bold ${getColor()}`}>
            {percentage}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Complete
          </span>
        </motion.div>
      )}
    </div>
  )
}




