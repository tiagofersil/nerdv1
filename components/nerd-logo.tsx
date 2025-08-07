"use client"

import { useState } from "react"

interface MedStudyLogoProps {
  height?: number
  width?: number
  iconColor?: string
  textColor?: string
  className?: string
}

export default function MedStudyLogo({
  height = 40,
  width,
  iconColor = "#2563eb",
  textColor = "#1f2937",
  className = "",
}: MedStudyLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex items-center gap-3 cursor-pointer transition-all duration-200 ${className}`}
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ícone Profissional */}
      <div className="relative" style={{ width: `${height}px`, height: `${height}px` }}>
        <svg width={height} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="professionalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={iconColor} />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>

          {/* Escudo/Badge profissional */}
          <path
            d="M24 4 L36 10 L36 24 C36 32 30 38 24 44 C18 38 12 32 12 24 L12 10 L24 4 Z"
            fill="url(#professionalGradient)"
            stroke={iconColor}
            strokeWidth="1"
          />

          {/* Cruz médica central */}
          <rect x="21" y="16" width="6" height="16" rx="1" fill="white" />
          <rect x="16" y="21" width="16" height="6" rx="1" fill="white" />

          {/* Símbolo de graduação/conhecimento */}
          <circle cx="30" cy="14" r="3" fill="white" opacity="0.9" />
          <rect x="28" y="11" width="4" height="2" rx="1" fill={iconColor} />
        </svg>
      </div>

      {/* Texto MEDSTUDY */}
      <span
        className="font-bold tracking-wide transition-colors duration-200"
        style={{
          fontSize: `${height * 0.45}px`,
          color: isHovered ? iconColor : textColor,
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          letterSpacing: "0.03em",
          fontWeight: "700",
        }}
      >
        MEDSTUDY
      </span>
    </div>
  )
}

// Export named para compatibilidade
export { MedStudyLogo }
