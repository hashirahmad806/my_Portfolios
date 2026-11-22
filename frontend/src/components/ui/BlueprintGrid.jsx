import { useState, useEffect, useRef } from 'react'

export default function BlueprintGrid() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const containerRef = useRef(null)

  useEffect(() => {
    let animationFrameId
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ transition: 'opacity 0.4s ease' }}
      aria-hidden="true"
    >
      {/* 1. Base Architectural Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-75"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, black 45%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, black 45%, transparent 92%)',
        }}
      >
        <defs>
          <pattern
            id="cad-blueprint-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* Grid Lines */}
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              style={{ opacity: 0.65 }}
            />
            {/* Precision Crosshair (+) at Intersections */}
            <path
              d="M 0 -3.5 L 0 3.5 M -3.5 0 L 3.5 0"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1"
              style={{ opacity: 0.45 }}
            />
            {/* Secondary diagonal micro-notch */}
            <circle
              cx="64"
              cy="64"
              r="0.8"
              fill="var(--gold)"
              style={{ opacity: 0.6 }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-blueprint-grid)" />
      </svg>

      {/* 2. Interactive Spotlight — Soft Flashlight Reveal around Cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, rgba(var(--gold-rgb), 0.08), transparent 80%)`,
        }}
      />

      {/* 3. Global Atmospheric Depth Wash */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 600px at 50% 0%, rgba(var(--gold-rgb), 0.05), transparent 75%)',
        }}
      />
    </div>
  )
}
