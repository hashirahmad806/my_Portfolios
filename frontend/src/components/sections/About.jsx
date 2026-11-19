import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold  = '#c9a84c'
const sky   = '#38bdf8'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

// ── Inline SVG precision engineering icons — zero emoji, pure tactile craft ─────────
const IconAgent = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <line x1="12" y1="15" x2="12" y2="17" />
  </svg>
)
const IconVector = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)
const IconFullstack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
)
const IconML = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 0-4 4c0 1.1.4 2.1 1.2 2.8A4.5 4.5 0 0 0 7 13.5c0 1.2.5 2.3 1.3 3.1A4.5 4.5 0 0 0 12 22a4.5 4.5 0 0 0 3.7-5.4c.8-.8 1.3-1.9 1.3-3.1 0-2-1.3-3.7-3.2-4.3.8-.7 1.2-1.7 1.2-2.8a4 4 0 0 0-4-4Z"/>
  </svg>
)

const cards = [
  { Icon: IconAgent,    title: 'Autonomous Agents', desc: 'LangGraph state machines, ReAct loops, deterministic tool calling, and self-evaluating workflows.' },
  { Icon: IconVector,   title: 'Production RAG',    desc: 'MongoDB Atlas Vector Search, semantic chunking, dynamic context windows, and real-time CDC ingestion.' },
  { Icon: IconFullstack,title: 'Full-Stack Systems',desc: 'High-performance React/Next.js interfaces, Node.js microservices, and end-to-end product delivery.' },
  { Icon: IconML,       title: 'Data Science @ UET',desc: 'Rigorous foundation in statistical modeling, neural representations, and machine learning pipelines.' },
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
                <div style={{ width: 28, height: 1, background: sky }} />
                <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: sky, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Philosophy & Background</span>
              </div>
            </RevealDiv>

            <RevealDiv delay={0.1}>
              <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 28 }}>
                Architecting systems that<br />
                <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: sky }}>think and execute</em>
              </h2>
            </RevealDiv>

            {[
              <>I am <strong style={{ color: 'var(--text)' }}>Hashir Ahmad</strong>, a Data Science scholar at <strong style={{ color: 'var(--text)' }}>UET Peshawar</strong> and an autonomous systems builder. My work bridges disciplined software engineering with cognitive agent architectures.</>,
              <>Rather than treating LLMs as standalone chat interfaces, I build <strong style={{ color: 'var(--text)' }}>deterministic agent environments</strong>: wiring language models to sandboxed code execution, live database indices via <strong style={{ color: 'var(--text)' }}>MongoDB Atlas Vector Search</strong>, and structured tool workflows via <strong style={{ color: 'var(--text)' }}>LangChain & LangGraph</strong>.</>,
              <>With a deep grounding in the modern JavaScript and Python ecosystems, I engineer software that is fast, resilient, and capable of operating autonomously under real-world conditions.</>,
            ].map((text, i) => (
              <RevealDiv key={i} delay={0.15 + i * 0.1}>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text2)', marginBottom: 18 }}>{text}</p>
              </RevealDiv>
            ))}

            <RevealDiv delay={0.45}>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {['UET Peshawar', 'Agentic Workflows', 'Vector Databases', 'LangChain', 'Production RAG', 'Full-Stack TypeScript'].map(t => (
                  <span
                    key={t}
                    className="dimensional-pill"
                    style={{
                      padding: '6px 14px',
                      borderRadius: 100,
                      fontSize: 12,
                      fontFamily: 'JetBrains Mono, monospace',
                      background: 'rgba(56,189,248,0.06)',
                      border: '1px solid rgba(56,189,248,0.2)',
                      color: 'var(--text2)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </RevealDiv>
          </div>

          {/* Right — cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <RevealDiv key={c.title} delay={0.1 + i * 0.08}>
                <div
                  onMouseEnter={ev => {
                    const el = ev.currentTarget;
                    if (motionOk) el.style.transform = 'translateY(-5px)';
                    el.style.boxShadow = `0 12px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,189,248,0.25)`;
                    el.style.borderColor = 'rgba(56,189,248,0.3)';
                  }}
                  onMouseLeave={ev => {
                    const el = ev.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'var(--card-shadow)';
                    el.style.borderColor = 'var(--border)';
                  }}
                  style={{
                    padding: '26px 22px',
                    borderRadius: 18,
                    border: '1px solid var(--border)',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.1) 100%), var(--surface)',
                    boxShadow: 'var(--card-shadow)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: motionOk ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s' : 'border-color 0.3s',
                  }}
                >
                  {/* Subtle top edge highlight */}
                  <div style={{
                    position: 'absolute', top: 0, left: 16, right: 16,
                    height: 1, background: `linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Frosted icon chip */}
                  <div
                    style={{
                      width: 40, height: 40,
                      borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(56,189,248,0.1)',
                      border: '1px solid rgba(56,189,248,0.2)',
                      marginBottom: 16,
                      color: sky,
                    }}
                  >
                    <c.Icon />
                  </div>

                  <div style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text3)' }}>{c.desc}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
