import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ── Constants ─────────────────────────────────────────────────────────── */
const BG        = '#0a0a0b'          // always-dark cinematic void
const GOLD      = '#ffdca1'
const GOLD_DIM  = 'rgba(201,168,76,0.18)'
const MUTED     = 'rgba(255,255,255,0.22)'
const VERY_DIM  = 'rgba(255,255,255,0.06)'

const EASE_OUT   = [0.23, 1, 0.32, 1]
const EASE_INOUT = [0.77, 0, 0.175, 1]
const SPRING     = { type: 'spring', stiffness: 260, damping: 30, mass: 0.85 }

const MSGS = [
  'Initializing runtime…',
  'Compiling components…',
  'Mounting interfaces…',
  'Build complete.',
]

/* ── Arc progress ring (SVG) ────────────────────────────────────────────── */
const R   = 82          // radius
const CX  = 90          // viewBox cx
const CY  = 90          // viewBox cy
const CIRC = 2 * Math.PI * R   // ≈ 515

function ArcRing({ progress }) {
  // progress: 0→1 spring value
  const dashOffset = useTransform(progress, [0, 1], [CIRC, 0])

  return (
    <svg
      viewBox={`0 0 ${CX * 2} ${CY * 2}`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={GOLD} stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#f5a623" stopOpacity="1" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle cx={CX} cy={CY} r={R} fill="none"
        stroke={VERY_DIM} strokeWidth="1" />
      {/* Tick marks — engineering detail */}
      {[0, 90, 180, 270].map(deg => {
        const rad = (deg - 90) * (Math.PI / 180)
        const x1 = CX + (R - 6) * Math.cos(rad)
        const y1 = CY + (R - 6) * Math.sin(rad)
        const x2 = CX + (R + 2) * Math.cos(rad)
        const y2 = CY + (R + 2) * Math.sin(rad)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={MUTED} strokeWidth="1" />
      })}
      {/* Progress arc */}
      <motion.circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke="url(#arc-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        style={{ strokeDashoffset: dashOffset, rotate: -90, transformOrigin: `${CX}px ${CY}px` }}
      />
    </svg>
  )
}

/* ── Corner crosshair marker ─────────────────────────────────────────────── */
function Crosshair({ position, delay = 0 }) {
  const SIZE = 18
  const style = {
    position: 'absolute',
    ...position,
    width: SIZE, height: SIZE,
  }
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE_OUT }}
    >
      <svg viewBox="0 0 18 18" width={SIZE} height={SIZE}>
        {/* horizontal */}
        <line x1="0" y1="9" x2="18" y2="9" stroke={MUTED} strokeWidth="0.75" />
        {/* vertical */}
        <line x1="9" y1="0" x2="9" y2="18" stroke={MUTED} strokeWidth="0.75" />
        {/* dot */}
        <circle cx="9" cy="9" r="1.2" fill={MUTED} />
      </svg>
    </motion.div>
  )
}

/* ── Blur-crossfade status message ──────────────────────────────────────── */
function StatusMsg({ msg }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={msg}
        initial={{ opacity: 0, filter: 'blur(5px)', y: 4 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{   opacity: 0, filter: 'blur(3px)', y: -3 }}
        transition={{ duration: 0.24, ease: EASE_OUT }}
        style={{ display: 'inline-block' }}
      >
        {msg}
      </motion.span>
    </AnimatePresence>
  )
}

/* ── Character-by-character name reveal ─────────────────────────────────── */
function CharReveal({ text, delay = 0, style: s = {} }) {
  const chars = text.split('')
  return (
    <motion.span
      style={{ display: 'inline-block', ...s }}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.038, delayChildren: delay } } }}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{
            hidden:  { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* ── Main Loader ─────────────────────────────────────────────────────────── */
export default function Loader() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [show, setShow]     = useState(true)

  // Arc progress — spring-driven
  const rawProg  = useMotionValue(0)
  const progress = useSpring(rawProg, { stiffness: 48, damping: 16, mass: 1.1 })

  const refs = useRef({})

  useEffect(() => {
    refs.current.kick  = setTimeout(() => rawProg.set(1), 350)
    refs.current.msg   = setInterval(() => setMsgIdx(i => (i + 1) % MSGS.length), 560)
    refs.current.hide  = setTimeout(() => setShow(false), 2800)
    return () => {
      clearTimeout(refs.current.kick)
      clearInterval(refs.current.msg)
      clearTimeout(refs.current.hide)
    }
  }, [rawProg])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader-v2"
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: BG,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
          // Curtain-wipe exit: clip from bottom to top + blur
          exit={{ clipPath: 'inset(0 0 100% 0)', filter: 'blur(8px)', opacity: 0 }}
          transition={{ duration: 0.62, ease: EASE_INOUT }}
        >

          {/* ── Subtle grid lines ──────────────────────────────────────────── */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(${VERY_DIM} 1px, transparent 1px),
              linear-gradient(90deg, ${VERY_DIM} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }} />

          {/* ── Scan-line sweep (once, then gone) ─────────────────────────── */}
          <motion.div
            style={{
              position: 'absolute', left: 0, right: 0, height: '1px',
              background: `linear-gradient(90deg, transparent, ${GOLD_DIM}, transparent)`,
              top: 0,
            }}
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, delay: 0.2, ease: 'linear', times: [0, 0.05, 0.95, 1] }}
          />

          {/* ── Corner crosshairs ─────────────────────────────────────────── */}
          <Crosshair position={{ top: 28, left: 28 }}  delay={0.15} />
          <Crosshair position={{ top: 28, right: 28 }} delay={0.2}  />
          <Crosshair position={{ bottom: 28, left: 28 }}  delay={0.25} />
          <Crosshair position={{ bottom: 28, right: 28 }} delay={0.3}  />

          {/* ── Version label — top left ───────────────────────────────────── */}
          <motion.div
            style={{
              position: 'absolute', top: 28, left: 56,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10, letterSpacing: '0.18em',
              color: MUTED, textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35, ease: EASE_OUT }}
          >
            v2025.10 — portfolio
          </motion.div>

          {/* ── Build status — top right ───────────────────────────────────── */}
          <motion.div
            style={{
              position: 'absolute', top: 28, right: 56,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10, letterSpacing: '0.14em',
              color: MUTED, display: 'flex', alignItems: 'center', gap: 6,
            }}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35, ease: EASE_OUT }}
          >
            <motion.span
              style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD, display: 'inline-block' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            LIVE BUILD
          </motion.div>

          {/* ══════════ MAIN CONTENT — asymmetric two-column ════════════════ */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 'clamp(40px, 5vw, 80px)',
            padding: '0 clamp(16px, 4vw, 40px)',
            maxWidth: 900, width: '100%',
          }}>

            {/* ── LEFT: Monogram + Arc ───────────────────────────────────── */}
            <motion.div
              style={{ position: 'relative', flexShrink: 0, width: 180, height: 180 }}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(16px)' }}
              animate={{ opacity: 1, scale: 1,   filter: 'blur(0px)' }}
              transition={{ ...SPRING, delay: 0.06 }}
            >
              {/* Arc progress ring */}
              <ArcRing progress={progress} />

              {/* Center content */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 2,
              }}>
                {/* Engineering bracket notation */}
                <div style={{
                  fontFamily: "'Clash Display','Cabinet Grotesk',sans-serif",
                  fontSize: 11, letterSpacing: '0.35em',
                  color: MUTED, textTransform: 'uppercase', userSelect: 'none',
                }}>
                  SYS.INIT
                </div>

                {/* HA monogram */}
                <motion.div
                  style={{
                    fontFamily: "'Clash Display','Syne',sans-serif",
                    fontSize: 48, fontWeight: 700, lineHeight: 1,
                    color: GOLD, letterSpacing: '-0.04em', userSelect: 'none',
                  }}
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
                >
                  HA
                </motion.div>

                {/* Coordinate readout */}
                <motion.div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 9, color: MUTED,
                    letterSpacing: '0.12em',
                  }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  [ 33.6°N  73.0°E ]
                </motion.div>
              </div>
            </motion.div>

            {/* ── RIGHT: Identity block ──────────────────────────────────── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Divider line — draws in */}
              <motion.div
                style={{ height: 1, background: `linear-gradient(90deg, ${GOLD_DIM}, transparent)`, marginBottom: 24 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT, transformOrigin: 'left' }}
              />

              {/* Role tag */}
              <motion.div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: GOLD, marginBottom: 10,
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.42, ease: EASE_OUT }}
              >
                MERN Stack Developer
              </motion.div>

              {/* Name — character-by-character */}
              <div style={{
                fontFamily: "'Clash Display','Cabinet Grotesk',sans-serif",
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 700, lineHeight: 1.05,
                letterSpacing: '-0.03em', color: '#e8e5e6',
                marginBottom: 8,
              }}>
                <CharReveal text="Hashir" delay={0.48} />
                <br />
                <CharReveal text="Ahmad" delay={0.72}
                  style={{ color: GOLD }} />
              </div>

              {/* Status message — blur crossfade */}
              <motion.div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: MUTED, marginTop: 18, height: 16, display: 'flex', alignItems: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6, ease: EASE_OUT }}
              >
                <span style={{ color: GOLD, marginRight: 8 }}>›</span>
                <StatusMsg msg={MSGS[msgIdx]} />
              </motion.div>

              {/* Divider line — bottom */}
              <motion.div
                style={{ height: 1, background: `linear-gradient(90deg, ${GOLD_DIM}, transparent)`, marginTop: 24 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT, transformOrigin: 'left' }}
              />

              {/* Stack tags */}
              <motion.div
                style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.75, ease: EASE_OUT }}
              >
                {['React', 'Node.js', 'MongoDB', 'Express'].map((tag, i) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: MUTED,
                      border: `1px solid rgba(255,255,255,0.07)`,
                      borderRadius: 4, padding: '3px 8px',
                      background: 'rgba(255,255,255,0.025)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

            </div>
          </div>

          {/* ── Bottom progress bar — full-width, ultra-thin ──────────────── */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1 }}>
            <motion.div
              style={{
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                scaleX: progress,
                transformOrigin: 'left center',
                width: '100%',
              }}
            />
          </div>

          {/* ── Bottom label ──────────────────────────────────────────────── */}
          <motion.div
            style={{
              position: 'absolute', bottom: 18,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: MUTED, display: 'flex', gap: 24,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
          >
            <span>hashir.dev</span>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
            <span>2025</span>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
            <span>PKT</span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}


