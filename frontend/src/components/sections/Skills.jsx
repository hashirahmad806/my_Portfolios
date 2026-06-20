import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold  = '#c9a84c'
const muted = '#9090a8'
const dim   = '#5a5a72'

const groups = [
  {
    label: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js',       pct: 88, color: '#61DAFB' },
      { name: 'JavaScript ES6+',pct: 85, color: '#F7DF1E' },
      { name: 'HTML5 / CSS3',   pct: 92, color: '#E34F26' },
      { name: 'Tailwind CSS',   pct: 86, color: '#06B6D4' },
      { name: 'Framer Motion',  pct: 78, color: '#a855f7' },
    ],
  },
  {
    label: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js',         pct: 82, color: '#339933' },
      { name: 'Express.js',      pct: 80, color: '#888888' },
      { name: 'REST API Design', pct: 84, color: '#c9a84c' },
      { name: 'JWT Auth',        pct: 78, color: '#e74c3c' },
      { name: 'Middleware',      pct: 80, color: '#f39c12' },
    ],
  },
  {
    label: 'Database & Tools',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB',     pct: 80, color: '#47A248' },
      { name: 'Mongoose ODM',pct: 78, color: '#880000' },
      { name: 'Git & GitHub',pct: 88, color: '#F05032' },
      { name: 'VS Code',     pct: 95, color: '#007ACC' },
      { name: 'Vite',        pct: 82, color: '#646cff' },
    ],
  },
]

function SkillBar({ name, pct, color, visible, delay }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{name}</span>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--text3)' }}>{pct}%</span>
      </div>
      <div style={{ height: 3, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          width: visible ? `${pct}%` : '0%',
          transition: `width 1.3s cubic-bezier(.4,0,.2,1) ${delay}s`,
        }} />
      </div>
    </div>
  )
}

function GroupCard({ g, idx }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      style={{
        padding: '32px 28px', borderRadius: 20,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .7s ease ${idx * 0.1}s, transform .7s ease ${idx * 0.1}s, border-color .3s`,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,.2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
          {g.icon}
        </div>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{g.label}</span>
      </div>
      {g.skills.map((s, i) => (
        <SkillBar key={s.name} {...s} visible={visible} delay={0.2 + i * 0.08} />
      ))}
    </div>
  )
}

export default function Skills() {
  const { ref: hRef, visible: hVisible } = useScrollReveal()

  return (
    <section id="skills" style={{ padding: '120px 0', background: 'var(--void)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={hRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          style={{
            opacity: hVisible ? 1 : 0,
            transform: hVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 28, height: 1, background: gold }} />
              <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Technical Skills</span>
            </div>
            <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              My <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>toolkit</em>
            </h2>
          </div>
          <p style={{ maxWidth: 320, fontSize: 14, lineHeight: 1.75, color: 'var(--text3)' }}>
            Technologies I use daily to build production-grade full-stack applications.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g, i) => <GroupCard key={g.label} g={g} idx={i} />)}
        </div>

        {/* Extra tags */}
        <div
          style={{
            marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
            opacity: 1,
          }}
        >
          {['Responsive Design','RESTful APIs','CRUD Operations','State Management','Component Architecture','Deployment','MVC Pattern','API Integration','Bcrypt Security','Mongoose ODM'].map(t => (
            <span
              key={t}
              style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 11,
                fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.05em',
                border: '1px solid var(--border)',
                color: 'var(--text3)', background: 'var(--surface2)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
