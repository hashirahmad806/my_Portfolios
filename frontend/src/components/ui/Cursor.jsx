import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  
  // Position refs for 60fps/120fps GPU compositing
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  const [cursorState, setCursorState] = useState({
    visible: false,
    hovered: false,
    isText: false,
    clicked: false,
  })

  useEffect(() => {
    // 1. Never render on touch / mobile devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    if (isTouch) return

    let isMounted = true

    // 2. High-frequency mouse tracking
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      if (!cursorState.visible) {
        setCursorState((prev) => ({ ...prev, visible: true }))
      }

      // Immediate 1:1 hardware transform for center dot (zero layout reflow)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    // 3. Smooth, calibrated lerp loop for outer fluid ring
    const renderLoop = () => {
      // Snappy physics: lerp 0.24 gives fluid momentum without sluggish delay
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.24
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.24

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(renderLoop)
    }

    // 4. Delegated hover detection (works on all dynamic buttons, links, & inputs)
    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = target.closest('a, button, [role="button"], input[type="submit"], [data-cursor]')
      const isInputField = target.closest('input:not([type="submit"]):not([type="checkbox"]), textarea, select, [contenteditable]')

      if (isInputField) {
        setCursorState((prev) => ({ ...prev, isText: true, hovered: false }))
      } else if (isInteractive) {
        setCursorState((prev) => ({ ...prev, hovered: true, isText: false }))
      } else {
        setCursorState((prev) => ({ ...prev, hovered: false, isText: false }))
      }
    }

    // 5. Tactile click feedback
    const handleMouseDown = () => setCursorState((prev) => ({ ...prev, clicked: true }))
    const handleMouseUp = () => setCursorState((prev) => ({ ...prev, clicked: false }))

    // 6. Viewport boundary detection (fades out gracefully when leaving window)
    const handleMouseEnter = () => setCursorState((prev) => ({ ...prev, visible: true }))
    const handleMouseLeave = () => setCursorState((prev) => ({ ...prev, visible: false }))

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    rafId.current = requestAnimationFrame(renderLoop)

    return () => {
      isMounted = false
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const { visible, hovered, isText, clicked } = cursorState
  const opacity = visible && !isText ? 1 : 0

  return (
    <>
      {/* ── Precision Center Dot ── */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full will-change-transform"
        style={{
          width: hovered ? 12 : clicked ? 5 : 6,
          height: hovered ? 12 : clicked ? 5 : 6,
          backgroundColor: hovered ? 'var(--gold)' : 'var(--gold)',
          boxShadow: hovered
            ? '0 0 16px rgba(var(--gold-rgb), 0.9), 0 0 4px var(--gold)'
            : '0 0 8px rgba(var(--gold-rgb), 0.6)',
          opacity,
          transition: 'width 0.18s cubic-bezier(0.23, 1, 0.32, 1), height 0.18s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease, background-color 0.2s ease',
        }}
      />

      {/* ── Fluid Halo Ring ── */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full will-change-transform"
        style={{
          width: hovered ? 52 : clicked ? 28 : 34,
          height: hovered ? 52 : clicked ? 28 : 34,
          border: hovered
            ? '1.5px solid rgba(var(--gold-rgb), 0.85)'
            : '1px solid rgba(var(--gold-rgb), 0.35)',
          backgroundColor: hovered
            ? 'rgba(var(--gold-rgb), 0.08)'
            : 'transparent',
          boxShadow: hovered
            ? '0 0 20px rgba(var(--gold-rgb), 0.15)'
            : 'none',
          opacity,
          transition: 'width 0.22s cubic-bezier(0.23, 1, 0.32, 1), height 0.22s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  )
}
