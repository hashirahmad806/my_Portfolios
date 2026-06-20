import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const msgs = ['Initializing…', 'Loading assets…', 'Crafting portfolio…', 'Almost ready…']

export default function Loader() {
  const [msg, setMsg]       = useState(0)
  const [show, setShow]     = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setMsg(m => (m + 1) % msgs.length), 520)
    const t2 = setTimeout(() => { setProgress(100) }, 100)
    const t3 = setTimeout(() => setShow(false), 2400)
    return () => { clearInterval(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-8"
          style={{ background: 'var(--obsidian)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Spinning ring logo */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer spinning ring */}
            <motion.svg
              className="absolute inset-0"
              viewBox="0 0 96 96"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#f5a623" />
                </linearGradient>
              </defs>
              <circle cx="48" cy="48" r="44" stroke="var(--border)" strokeWidth="1.5" fill="none" />
              <circle cx="48" cy="48" r="44" stroke="url(#lg)" strokeWidth="2" fill="none"
                strokeDasharray="276" strokeDashoffset="200" strokeLinecap="round" />
            </motion.svg>

            {/* Inner logo */}
            <motion.div
              className="relative z-10 text-2xl font-bold tracking-tighter"
              style={{ fontFamily: "'Clash Display','Syne',sans-serif", color: '#c9a84c' }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              HA
            </motion.div>
          </div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div
              className="text-2xl font-bold tracking-tight mb-1"
              style={{ fontFamily: "'Clash Display','Syne',sans-serif", color: 'var(--text)' }}
            >
              Hashir Ahmad
            </div>
            <div className="text-xs tracking-[0.25em] uppercase" style={{ color: '#c9a84c', fontFamily: 'JetBrains Mono,monospace' }}>
              MERN Stack Developer
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-52 h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg,#c9a84c,#f5a623)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>

          {/* Status text */}
          <div
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: 'var(--text3)', fontFamily: 'JetBrains Mono,monospace' }}
          >
            {msgs[msg]}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
