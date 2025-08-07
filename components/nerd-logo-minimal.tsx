"use client"

import { useState } from "react"

interface MedStudyMinimalProps {
  height?: number
  iconColor?: string
  className?: string
}

export default function MedStudyMinimal({ height = 24, iconColor = "#2563eb", className = "" }: MedStudyMinimalProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer ${className}`}
      style={{
        width: height,
        height: height,
        backgroundColor: iconColor,
        boxShadow: isHovered ? "0 2px 8px rgba(37, 99, 235, 0.3)" : "0 1px 3px rgba(37, 99, 235, 0.2)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width={height * 0.6} height={height * 0.6} viewBox="0 0 24 24" fill="none">
        {/* Cruz médica simples */}
        <rect x="10" y="6" width="4" height="12" rx="1" fill="white" />
        <rect x="6" y="10" width="12" height="4" rx="1" fill="white" />
      </svg>
    </div>
  )
}

// Export named para compatibilidade
export { MedStudyMinimal }
