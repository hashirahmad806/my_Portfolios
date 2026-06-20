import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold  = '#c9a84c'
const amber = '#f5a623'
const muted = '#9090a8'
const dim   = '#5a5a72'

const items = [
  { icon: '🐍', name: 'Python',            sub: 'Core language for AI/ML',           pct: 55, color: '#3776AB' },
  { icon: '🤖', name: 'Machine Learning',  sub: 'Supervised & unsupervised learning', pct: 40, color: '#ff6b35' },
  { icon: '🧠', name: 'TensorFlow / Keras',sub: 'Deep learning & neural networks',    pct: 30, color: '#FF6F00' },
  { icon: '📊', name: 'Data Analysis',     sub: 'NumPy, Pandas, Matplotlib',          pct: 50, color: '#F37626' },
  { icon: '✨', name: 'AI Integration',    sub: 'Connecting AI APIs to web apps',     pct: 60, color: '#00d4ff' },
  { icon: '⚡', name: 'AI × MERN Stack',  sub: 'Intelligent full-stack apps',        pct: 45, color: gold    },
]

function LearnItem({ item, idx, visible }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 18,
        padding: '18px 22px', borderRadius: 16,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity .6s ease ${idx * 0.09}s, transform .6s ease ${idx * 0.09}s, border-color .3s`,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.2)'; e.currentTarget.style.transform = 'translateX(6px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)' }}
    >
      {/* Icon */}
      <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 12, background: `${item.color}14`, border: `1px solid ${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
        {item.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>{item.sub}</div>
      </div>

      {/* Progress */}
      <div style={{ width: 80, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 5 }}>
          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: item.color }}>{item.pct}%</span>
        </div>
        <div style={{ height: 2, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: `linear-gradient(90deg,${item.color},${item.color}88)`, borderRadius: 2, width: visible ? `${item.pct}%` : '0%', transition: `width 1.2s ease ${idx * 0.09 + 0.3}s` }} />
        </div>
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

        {/* Header */}
        <div ref={hRef} style={{ opacity: hVis?1:0, transform: hVis?'translateY(0)':'translateY(24px)', transition:'opacity .7s,transform .7s', marginBottom: 64 }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 1, background: gold }} />
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Growing</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Currently <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>learning</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Vision card */}
          <div>
            <div style={{ padding: 40, borderRadius: 24, border: '1px solid var(--border)', background: 'var(--surface)', position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.07), transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontSize: 22, color: 'var(--text)', lineHeight: 1.5, marginBottom: 24 }}>
                  <span style={{ display: 'block', color: gold, fontSize: 44, lineHeight: 0.6, marginBottom: 18 }}>"</span>
                  The future of web is intelligent — and I'm building towards it.
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: muted }}>
                  I'm expanding into <strong style={{ color: gold }}>AI & Machine Learning with Python</strong> to bridge
                  the gap between modern MERN stack engineering and artificial intelligence.
                  My goal: build apps that aren't just functional — but genuinely smart.
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 16 }}>
              {[['🐍','Python','In Progress'],['🤖','AI/ML','Learning'],['⚡','AI+MERN','Building']].map(([emoji,name,status]) => (
                <div key={name} style={{ flex: 1, padding: '16px 14px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{emoji}</div>
                  <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: gold, letterSpacing: '0.1em' }}>{status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning items */}
          <div ref={iRef} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item, i) => <LearnItem key={item.name} item={item} idx={i} visible={iVis} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
