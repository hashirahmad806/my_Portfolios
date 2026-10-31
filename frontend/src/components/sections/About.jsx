import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold  = '#c9a84c'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

// ── Inline SVG engineering icons — no emoji, no AI-style imagery ─────────
const IconFrontend = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
)
const IconBackend = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const IconDatabase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)
const IconPerf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

const cards = [
  { Icon: IconFrontend, title: 'Frontend Dev',    desc: 'Pixel-perfect React UIs with Tailwind CSS, Framer Motion & modern component architecture.' },
  { Icon: IconBackend,  title: 'Backend APIs',    desc: 'Secure Node.js & Express servers with JWT auth, middleware pipelines & clean MVC structure.' },
  { Icon: IconDatabase, title: 'MongoDB',         desc: 'Optimized schemas with Mongoose ODM, aggregation pipelines & efficient indexing strategies.' },
  { Icon: IconPerf,     title: 'Performance',     desc: 'Code-split React builds, lazy loading, caching & production-grade deployment workflows.' },
]

function RevealDiv({ children, delay = 0, style = {} }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ padding: '120px 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <div>
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: 28, height: 1, background: gold }} />
                <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>About Me</span>
              </div>
            </RevealDiv>

            <RevealDiv delay={0.1}>
              <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 28 }}>
                Turning ideas into<br />
                <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>digital reality</em>
              </h2>
            </RevealDiv>

            {[
              <>I'm <strong style={{ color: 'var(--text)' }}>Hashir Ahmad</strong>, a MERN Stack Developer with a passion for crafting modern, high-performance web applications. My journey began with curiosity about how the web works — and evolved into deep expertise across the full JavaScript ecosystem.</>,
              <>I specialize in building <strong style={{ color: 'var(--text)' }}>full-stack applications</strong> that are fast, scalable, and beautifully designed. From RESTful APIs in <strong style={{ color: 'var(--text)' }}>Node.js & Express</strong>, to responsive interfaces in <strong style={{ color: 'var(--text)' }}>React.js</strong>, to optimized <strong style={{ color: 'var(--text)' }}>MongoDB</strong> schemas — I own the entire product lifecycle.</>,
              <>Currently deepening expertise in <strong style={{ color: gold }}>system architecture, API design patterns</strong> and scalable cloud-native deployments — building software that holds up at production scale.</>,
            ].map((text, i) => (
              <RevealDiv key={i} delay={0.15 + i * 0.1}>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text2)', marginBottom: 18 }}>{text}</p>
              </RevealDiv>
            ))}

            <RevealDiv delay={0.45}>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {['Based in Pakistan','Open to Remote','Full Stack Dev','System Design','Available Now'].map(t => (
                  <span
                    key={t}
                    className="dimensional-pill"
                    style={{ padding: '7px 14px', borderRadius: 9 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </RevealDiv>
          </div>

          {/* Right — cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <RevealDiv key={c.title} delay={0.1 + i * 0.08}>
                <div
                  onMouseEnter={ev => {
                    const el = ev.currentTarget;
                    if (motionOk) el.style.transform = 'translateY(-5px)';
                    el.style.boxShadow = `0 6px 20px rgba(0,0,0,0.55), 0 18px 48px rgba(0,0,0,0.35), 0 0 0 1px ${gold}22, 0 0 28px ${gold}10, inset 0 1px 0 rgba(255,255,255,0.07)`;
                    el.style.borderColor = `${gold}28`;
                  }}
                  onMouseLeave={ev => {
                    const el = ev.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'var(--card-shadow)';
                    el.style.borderColor = 'var(--border)';
                  }}
                  style={{
                    padding: '28px 24px',
                    borderRadius: 20,
                    border: '1px solid var(--border)',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 100%), var(--surface)',
                    boxShadow: 'var(--card-shadow)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: motionOk ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s' : 'border-color 0.3s',
                  }}
                >
                  {/* Subtle top edge highlight */}
                  <div style={{
                    position: 'absolute', top: 0, left: 20, right: 20,
                    height: 1, background: `linear-gradient(90deg, transparent, ${gold}25, transparent)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Frosted icon chip — SVG, no emoji */}
                  <div
                    className="frosted-icon-chip"
                    style={{
                      background: `linear-gradient(145deg, ${gold}20, ${gold}08)`,
                      border: `1px solid ${gold}28`,
                      boxShadow: `inset 0 1px 3px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.22)`,
                      marginBottom: 18,
                      color: gold,
                    }}
                  >
                    <c.Icon />
                  </div>

                  <div style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{c.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text3)' }}>{c.desc}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
