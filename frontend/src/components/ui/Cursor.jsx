import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    raf.current = requestAnimationFrame(tick)

    const big = () => {
      if (dotRef.current)  { dotRef.current.style.width = '14px';  dotRef.current.style.height = '14px' }
      if (ringRef.current) { ringRef.current.style.width = '56px'; ringRef.current.style.height = '56px'; ringRef.current.style.borderColor = 'rgba(201,168,76,0.9)' }
    }
    const small = () => {
      if (dotRef.current)  { dotRef.current.style.width = '8px';   dotRef.current.style.height = '8px' }
      if (ringRef.current) { ringRef.current.style.width = '38px'; ringRef.current.style.height = '38px'; ringRef.current.style.borderColor = 'rgba(201,168,76,0.5)' }
    }

    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', big)
      el.addEventListener('mouseleave', small)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const base = {
    position: 'fixed', pointerEvents: 'none',
    borderRadius: '50%', transform: 'translate(-50%,-50%)',
    transition: 'width .25s, height .25s, border-color .25s',
    zIndex: 9999,
  }

  return (
    <>
      <div ref={dotRef} style={{ ...base, width: 8, height: 8, background: '#c9a84c', boxShadow: '0 0 8px rgba(201,168,76,0.7)' }} />
      <div ref={ringRef} style={{ ...base, width: 38, height: 38, border: '1.5px solid rgba(201,168,76,0.5)', zIndex: 9998 }} />
    </>
  )
}
