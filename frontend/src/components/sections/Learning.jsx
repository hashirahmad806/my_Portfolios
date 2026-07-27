import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold  = '#c9a84c'
const gold2 = '#e8c97a'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

const CARD_SHADOW = '0 2px 8px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'

const items = [
  { icon: '🐍', name: 'Python',            sub: 'Core language for AI/ML',           pct: 55, color: '#3776AB' },
  { icon: '🤖', name: 'Machine Learning',  sub: 'Supervised & unsupervised learning', pct: 40, color: '#ff6b35' },
  { icon: '🧠', name: 'TensorFlow / Keras',sub: 'Deep learning & neural networks',    pct: 30, color: '#FF6F00' },
  { icon: '📊', name: 'Data Analysis',     sub: 'NumPy, Pandas, Matplotlib',          pct: 50, color: '#F37626' },
  { icon: '✨', name: 'AI Integration',    sub: 'Connecting AI APIs to web apps',     pct: 60, color: '#00d4ff' },
  { icon: '⚡', name: 'AI × MERN Stack',  sub: 'Intelligent full-stack apps',        pct: 45, color: gold    },
]

/* ─── Frosted glass icon chip ─── */
function IconChip({ icon, color, size = 42 }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      borderRadius: Math.round(size * 0.28),
      background: `linear-gradient(145deg, ${color}22, ${color}08)`,
      border: `1px solid ${color}28`,
      boxShadow: `inset 0 1px 3px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.22)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.44,
    }}>
      {icon}
    </div>
  )
}

/* ─── Skill row with gradient+glow progress bar ─── */
function LearnItem({ item, idx, visible }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 20px', borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.025), rgba(0,0,0,0.05)), var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: CARD_SHADOW,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-18px)',
        transition: motionOk
          ? `opacity .6s ease ${idx * 0.09}s, transform .6s ease ${idx * 0.09}s, box-shadow .3s, border-color .3s`
          : `opacity .6s ease ${idx * 0.09}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.color}28`
        e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.5), 0 16px 36px rgba(0,0,0,0.28), 0 0 16px ${item.color}10, inset 0 1px 0 rgba(255,255,255,0.07)`
        if (motionOk) e.currentTarget.style.transform = 'translateX(6px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = CARD_SHADOW
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      <IconChip icon={item.icon} color={item.color} size={42} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>
          {item.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>{item.sub}</div>

        {/* Gradient glow progress bar */}
        <div style={{ height: 3, borderRadius: 100, background: 'rgba(255,255,255,0.06)', overflow: 'visible', position: 'relative' }}>
          <div style={{
            height: '100%', borderRadius: 100,
            background: `linear-gradient(90deg, ${item.color}, ${item.color}cc, ${item.color}66)`,
            boxShadow: visible ? `0 0 8px ${item.color}70, 0 0 16px ${item.color}35` : 'none',
            width: visible ? `${item.pct}%` : '0%',
            transition: motionOk
              ? `width 1.25s cubic-bezier(.4,0,.2,1) ${idx * 0.09 + 0.3}s, box-shadow 1.25s ease ${idx * 0.09 + 0.3}s`
              : 'none',
          }} />
        </div>
      </div>

      <div style={{ width: 44, flexShrink: 0, textAlign: 'right' }}>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, color: item.color }}>
          {item.pct}%
        </span>
      </div>
    </div>
  )
}

/* ─── Mini status card (Python / AI-ML / AI×MERN) ─── */
function MiniCard({ emoji, name, status }) {
  return (
    <div
      style={{
        flex: 1, padding: '16px 12px', borderRadius: 14, textAlign: 'center',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.025), rgba(0,0,0,0.06)), var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: CARD_SHADOW,
        transition: motionOk ? 'transform .3s ease, box-shadow .3s ease, border-color .3s' : 'border-color .3s',
      }}
      onMouseEnter={e => {
        if (motionOk) e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.45), 0 0 16px ${gold}12, inset 0 1px 0 rgba(255,255,255,0.07)`
        e.currentTarget.style.borderColor = `${gold}22`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = CARD_SHADOW
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 8 }}>{emoji}</div>
      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
        {name}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: gold, letterSpacing: '0.1em' }}>
        {status}
      </div>
    </div>
  )
}

export default function Learning() {
  const { ref: hRef, visible: hVis } = useScrollReveal()
  const { ref: iRef, visible: iVis } = useScrollReveal()

  return (
    <section id="learning" style={{ padding: '120px 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <div ref={hRef} style={{
          opacity: hVis ? 1 : 0,
          transform: hVis ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity .7s, transform .7s',
          marginBottom: 64,
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 1, background: gold }} />
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Growing
            </span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Currently{' '}
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>
              learning
            </em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Vision card + mini cards ── */}
          <div>
            {/* Outer container card */}
            <div style={{
              borderRadius: 24,
              border: '1px solid var(--border)',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08)), var(--surface)',
              boxShadow: CARD_SHADOW,
              overflow: 'hidden',
              marginBottom: 16,
              position: 'relative',
            }}>
              {/* Ambient gold glow top-right */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse 55% 45% at 100% 0%, ${gold}08, transparent 60%)`,
                pointerEvents: 'none',
              }} />

              {/* Inner quote block — card-within-card */}
              <div style={{
                margin: 6,
                padding: '32px 32px 28px',
                borderRadius: 20,
                background: 'linear-gradient(145deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 100%)',
                border: '1px solid rgba(255,255,255,0.04)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.03)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Watermark quotation mark */}
                <div style={{
                  position: 'absolute', top: -20, left: 16,
                  fontFamily: "'Instrument Serif',serif",
                  fontSize: 160, lineHeight: 1,
                  color: gold, opacity: 0.055,
                  userSelect: 'none', pointerEvents: 'none',
                  zIndex: 0,
                }}>
                  "
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontSize: 20, color: 'var(--text)', lineHeight: 1.55, marginBottom: 20 }}>
                    The future of web is intelligent — and I'm building towards it.
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text2)' }}>
                    I'm expanding into{' '}
                    <strong style={{ color: gold }}>AI & Machine Learning with Python</strong>{' '}
                    to bridge the gap between modern MERN stack engineering and artificial intelligence.
                    My goal: build apps that aren't just functional — but genuinely smart.
                  </p>
                </div>
              </div>
            </div>

            {/* Mini status cards */}
            <div style={{ display: 'flex', gap: 12 }}>
              <MiniCard emoji="🐍" name="Python"   status="In Progress" />
              <MiniCard emoji="🤖" name="AI / ML"  status="Learning"    />
              <MiniCard emoji="⚡" name="AI+MERN"  status="Building"    />
            </div>
          </div>

          {/* ── Right: Learning items ── */}
          <div ref={iRef} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item, i) => (
              <LearnItem key={item.name} item={item} idx={i} visible={iVis} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
