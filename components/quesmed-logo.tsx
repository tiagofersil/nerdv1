"use client"

import React from "react"
import { useState } from "react"

interface NerdLogoProps {
  className?: string
  height?: number
  width?: number
  textColor?: string
  iconColor?: string
  triggerSuccessAnimation?: boolean
  onAnimationComplete?: () => void
}

export default function NerdLogo({
  className = "",
  height = 40,
  width = 160,
  textColor = "#1f2937",
  iconColor = "#4285f4",
  triggerSuccessAnimation = false,
  onAnimationComplete,
}: NerdLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const elementSize = height * 0.8
  const spacing = height * 0.1

  // Trigger success animation
  React.useEffect(() => {
    if (triggerSuccessAnimation && !isAnimating) {
      setIsAnimating(true)
      // Complete animation after 3 seconds
      setTimeout(() => {
        setIsAnimating(false)
        onAnimationComplete?.()
      }, 3000)
    }
  }, [triggerSuccessAnimation, isAnimating, onAnimationComplete])

  if (triggerSuccessAnimation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div
          className="relative"
          style={{
            width: "120px",
            height: "120px",
            filter: "drop-shadow(0 10px 25px rgba(66, 133, 244, 0.6))",
          }}
        >
          <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="nGradientFullscreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285f4" />
                <stop offset="50%" stopColor="#3367d6" />
                <stop offset="100%" stopColor="#2c5aa0" />
              </linearGradient>
            </defs>
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="4"
              fill="url(#nGradientFullscreen)"
              stroke="white"
              strokeWidth="1.5"
              style={{
                filter: "brightness(1.4)",
              }}
            />
            <text x="6" y="10" fill="white" fontSize="5" fontFamily="Inter, sans-serif" fontWeight="600">
              7
            </text>
            <g
              style={{
                transformOrigin: "24px 24px",
                animation: "acceleratingSpin 3s ease-in infinite",
              }}
            >
              <text
                x="24"
                y="24"
                fill="white"
                fontSize="16"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="central"
              >
                N
              </text>
            </g>
            <text
              x="42"
              y="42"
              fill="white"
              fontSize="4"
              fontFamily="Inter, sans-serif"
              fontWeight="400"
              textAnchor="end"
            >
              14.01
            </text>
            <rect
              x="4"
              y="4"
              width="40"
              height="40"
              rx="2"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        <style jsx>{`
          @keyframes acceleratingSpin {
            0% { 
              transform: rotate(0deg);
              animation-timing-function: ease-out;
            }
            25% { 
              transform: rotate(360deg);
              animation-timing-function: ease-in;
            }
            50% { 
              transform: rotate(1080deg);
              animation-timing-function: ease-in;
            }
            75% { 
              transform: rotate(2160deg);
              animation-timing-function: ease-in;
            }
            100% { 
              transform: rotate(3600deg);
              animation-timing-function: ease-in;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-1 cursor-pointer transition-all duration-200 ${className}`}
      style={{ height: `${height}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Elemento N */}
      <div
        className="relative"
        style={{
          width: `${elementSize}px`,
          height: `${elementSize}px`,
          filter: "drop-shadow(0 3px 6px rgba(66, 133, 244, 0.3))",
        }}
      >
        <svg
          width={elementSize}
          height={elementSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285f4" />
              <stop offset="50%" stopColor="#3367d6" />
              <stop offset="100%" stopColor="#2c5aa0" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="4" fill="url(#nGradient)" stroke="white" strokeWidth="1.5" />
          <text x="6" y="10" fill="white" fontSize="5" fontFamily="Inter, sans-serif" fontWeight="600">
            7
          </text>
          <g style={{ transformOrigin: "24px 24px", animation: "spinLetter 5s infinite" }}>
            <text
              x="24"
              y="24"
              fill="white"
              fontSize="16"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
            >
              N
            </text>
          </g>
          <text
            x="42"
            y="42"
            fill="white"
            fontSize="4"
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            textAnchor="end"
          >
            14.01
          </text>
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Elemento E */}
      <div
        className="relative"
        style={{
          width: `${elementSize}px`,
          height: `${elementSize}px`,
          filter: "drop-shadow(0 3px 6px rgba(34, 197, 94, 0.3))",
        }}
      >
        <svg
          width={elementSize}
          height={elementSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="eGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="4" fill="url(#eGradient)" stroke="white" strokeWidth="1.5" />
          <text x="6" y="10" fill="white" fontSize="5" fontFamily="Inter, sans-serif" fontWeight="600">
            99
          </text>
          <g style={{ transformOrigin: "24px 24px", animation: "spinLetter 5s infinite 1s" }}>
            <text
              x="24"
              y="24"
              fill="white"
              fontSize="16"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
            >
              E
            </text>
          </g>
          <text
            x="42"
            y="42"
            fill="white"
            fontSize="4"
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            textAnchor="end"
          >
            252
          </text>
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Elemento R */}
      <div
        className="relative"
        style={{
          width: `${elementSize}px`,
          height: `${elementSize}px`,
          filter: "drop-shadow(0 3px 6px rgba(239, 68, 68, 0.3))",
        }}
      >
        <svg
          width={elementSize}
          height={elementSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="4" fill="url(#rGradient)" stroke="white" strokeWidth="1.5" />
          <text x="6" y="10" fill="white" fontSize="5" fontFamily="Inter, sans-serif" fontWeight="600">
            86
          </text>
          <g style={{ transformOrigin: "24px 24px", animation: "spinLetter 5s infinite 2s" }}>
            <text
              x="24"
              y="24"
              fill="white"
              fontSize="16"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
            >
              R
            </text>
          </g>
          <text
            x="42"
            y="42"
            fill="white"
            fontSize="4"
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            textAnchor="end"
          >
            222
          </text>
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Elemento D */}
      <div
        className="relative"
        style={{
          width: `${elementSize}px`,
          height: `${elementSize}px`,
          filter: "drop-shadow(0 3px 6px rgba(168, 85, 247, 0.3))",
        }}
      >
        <svg
          width={elementSize}
          height={elementSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="4" fill="url(#dGradient)" stroke="white" strokeWidth="1.5" />
          <text x="6" y="10" fill="white" fontSize="5" fontFamily="Inter, sans-serif" fontWeight="600">
            110
          </text>
          <g style={{ transformOrigin: "24px 24px", animation: "spinLetter 5s infinite 3s" }}>
            <text
              x="24"
              y="24"
              fill="white"
              fontSize="16"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
            >
              D
            </text>
          </g>
          <text
            x="42"
            y="42"
            fill="white"
            fontSize="4"
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            textAnchor="end"
          >
            281
          </text>
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spinLetter {
          0% { transform: rotate(0deg); }
          8% { transform: rotate(0deg); }
          20% { transform: rotate(360deg); }
          28% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
