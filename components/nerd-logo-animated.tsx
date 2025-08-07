"use client"

import { useEffect, useState } from "react"

interface MedStudyAnimatedProps {
  height?: number
  width?: number
  iconColor?: string
  textColor?: string
  className?: string
}

export default function MedStudyAnimated({
  height = 40,
  width,
  iconColor = "#2563eb",
  textColor = "#1f2937",
  className = "",
}: MedStudyAnimatedProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true)
      setTimeout(() => setIsPulsing(false), 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${className}`}
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        @keyframes medicalPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes heartbeat {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .medical-pulse {
          animation: medicalPulse 1s ease-in-out;
        }
        
        .heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Ícone Profissional Animado */}
      <div className="relative" style={{ width: `${height}px`, height: `${height}px` }}>
        <svg
          width={height}
          height={height}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isPulsing ? "medical-pulse" : ""}
        >
          <defs>
            <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={iconColor} />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Escudo/Badge profissional */}
          <path
            d="M24 4 L36 10 L36 24 C36 32 30 38 24 44 C18 38 12 32 12 24 L12 10 L24 4 Z"
            fill="url(#animatedGradient)"
            stroke={iconColor}
            strokeWidth="1"
            filter={isHovered ? "url(#glow)" : "none"}
          />

          {/* Cruz médica central */}
          <rect x="21" y="16" width="6" height="16" rx="1" fill="white" className={isPulsing ? "heartbeat" : ""} />
          <rect x="16" y="21" width="16" height="6" rx="1" fill="white" className={isPulsing ? "heartbeat" : ""} />

          {/* Símbolo de graduação/conhecimento */}
          <circle cx="30" cy="14" r="3" fill="white" opacity="0.9" />
          <rect x="28" y="11" width="4" height="2" rx="1" fill={iconColor} />

          {/* Partículas flutuantes */}
          {isHovered && (
            <>
              <circle cx="12" cy="12" r="1" fill="white" opacity="0.6">
                <animate attributeName="cy" values="12;8;12" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="36" r="1" fill="white" opacity="0.6">
                <animate attributeName="cy" values="36;32;36" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>
      </div>

      {/* Texto MEDSTUDY */}
      <span
        className="font-bold tracking-wide transition-all duration-300"
        style={{
          fontSize: `${height * 0.45}px`,
          color: isHovered ? iconColor : textColor,
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          letterSpacing: "0.03em",
          fontWeight: "700",
          textShadow: isHovered ? `0 2px 8px ${iconColor}40` : "none",
        }}
      >
        MEDSTUDY
      </span>
    </div>
  )
}

// Export named para compatibilidade
export { MedStudyAnimated }
