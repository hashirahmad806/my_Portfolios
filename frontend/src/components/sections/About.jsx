import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold  = '#c9a84c'
const muted = '#9090a8'
const dim   = '#5a5a72'

const cards = [
  { icon: '🎨', title: 'Frontend Dev',    desc: 'Pixel-perfect React UIs with Tailwind CSS, Framer Motion & modern component architecture.' },
  { icon: '⚙️', title: 'Backend APIs',    desc: 'Secure Node.js & Express servers with JWT auth, middleware pipelines & clean MVC structure.' },
  { icon: '🗄️', title: 'MongoDB',         desc: 'Optimized schemas with Mongoose ODM, aggregation pipelines & efficient indexing strategies.' },
  { icon: '🚀', title: 'Performance',     desc: 'Code-split React builds, lazy loading, caching & production-grade deployment workflows.' },
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
              <>Currently expanding into <strong style={{ color: gold }}>AI & Machine Learning with Python</strong>, aiming to build the next generation of intelligent web applications that combine modern UX with smart, adaptive systems.</>,
            ].map((text, i) => (
              <RevealDiv key={i} delay={0.15 + i * 0.1}>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text2)', marginBottom: 18 }}>{text}</p>
              </RevealDiv>
            ))}

            <RevealDiv delay={0.45}>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {['Based in Pakistan 🇵🇰','Open to Remote 🌍','Full Stack Dev 💻','AI Enthusiast 🤖','Available Now ✅'].map(t => (
                  <span
                    key={t}
                    style={{
                      padding: '7px 14px', borderRadius: 8,
                      border: '1px solid var(--border)',
                      fontFamily: 'JetBrains Mono,monospace', fontSize: 11,
                      color: 'var(--text2)', background: 'var(--surface2)',
                      transition: 'all .2s', cursor: 'default',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)'; e.currentTarget.style.color = gold }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
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
                <motion.div
                  whileHover={{ y: -5, borderColor: 'rgba(201,168,76,0.25)' }}
                  style={{
                    padding: '28px 24px', borderRadius: 18,
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all .3s',
                  }}
                >
                  {/* hover bg glow */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(201,168,76,0.04),transparent)', opacity: 0, transition: 'opacity .3s', pointerEvents: 'none' }}
                    className="hover-glow" />

                  <div style={{ fontSize: 28, marginBottom: 18 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{c.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text3)' }}>{c.desc}</div>
                </motion.div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
