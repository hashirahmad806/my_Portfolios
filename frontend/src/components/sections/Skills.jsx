import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold  = '#c9a84c'
const gold2 = '#e8c97a'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

const CARD_SHADOW = '0 2px 8px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
const CARD_SHADOW_HOVER = (color) =>
  `0 6px 20px rgba(0,0,0,0.55), 0 18px 48px rgba(0,0,0,0.35), 0 0 0 1px ${color}22, 0 0 28px ${color}10, inset 0 1px 0 rgba(255,255,255,0.07)`

const groups = [
  {
    label: 'Frontend',
    icon: '🎨',
    color: '#61DAFB',
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
    color: '#339933',
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
    color: '#c9a84c',
    skills: [
      { name: 'MongoDB',     pct: 80, color: '#47A248' },
      { name: 'Mongoose ODM',pct: 78, color: '#880000' },
      { name: 'Git & GitHub',pct: 88, color: '#F05032' },
      { name: 'VS Code',     pct: 95, color: '#007ACC' },
      { name: 'Vite',        pct: 82, color: '#646cff' },
    ],
  },
]

/* ─── Frosted glass icon chip ─── */
function IconChip({ icon, color }) {
  return (
    <div style={{
      width: 38, height: 38, borderRadius: 10,
      background: `linear-gradient(145deg, ${color}20, ${color}08)`,
      border: `1px solid ${color}28`,
      boxShadow: `inset 0 1px 3px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.22)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, flexShrink: 0,
    }}>
      {icon}
    </div>
  )
}

function SkillBar({ name, pct, color, visible, delay }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{name}</span>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: color }}>{pct}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 100, background: 'rgba(255,255,255,0.06)', overflow: 'visible', position: 'relative' }}>
        <div style={{
          height: '100%', borderRadius: 100,
          background: `linear-gradient(90deg, ${color}, ${color}cc, ${color}66)`,
          boxShadow: visible ? `0 0 8px ${color}70, 0 0 16px ${color}35` : 'none',
          width: visible ? `${pct}%` : '0%',
          transition: motionOk
            ? `width 1.3s cubic-bezier(.4,0,.2,1) ${delay}s, box-shadow 1.3s ease ${delay}s`
            : 'none',
        }} />
      </div>
    </div>
  )
}

function GroupCard({ g, idx }) {
  const { ref, visible } = useScrollReveal()

  const handleEnter = (ev) => {
    const el = ev.currentTarget
    el.style.transform = motionOk ? 'translateY(-5px)' : 'none'
    el.style.boxShadow = CARD_SHADOW_HOVER(g.color)
    el.style.borderColor = `${g.color}28`
  }

  const handleLeave = (ev) => {
    const el = ev.currentTarget
    el.style.transform = 'translateY(0)'
    el.style.boxShadow = CARD_SHADOW
    el.style.borderColor = 'var(--border)'
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        padding: '32px 28px',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',

        /* Soft-depth surface */
        background: 'linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 100%), var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: CARD_SHADOW,

        /* Scroll reveal */
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',

        /* Transitions — honor prefers-reduced-motion */
        transition: motionOk
          ? `opacity .7s ease ${idx * 0.1}s, transform .7s ease ${idx * 0.1}s, box-shadow .35s ease, border-color .35s ease`
          : `opacity .7s ease ${idx * 0.1}s`,
      }}
    >
      {/* Accent gradient tint wash at the top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 80,
        background: `linear-gradient(180deg, ${g.color}0a 0%, transparent 100%)`,
        pointerEvents: 'none',
      }} />

      {/* 1px glowing line at the very top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 24, right: 24,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${g.color}35, transparent)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, position: 'relative', zIndex: 1 }}>
        <IconChip icon={g.icon} color={g.color} />
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: g.color, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {g.label}
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {g.skills.map((s, i) => (
          <SkillBar key={s.name} {...s} visible={visible} delay={0.2 + i * 0.08} />
        ))}
      </div>
    </div>
  )
}

/* ─── Dimensional Pill Chip ─── */
function TagChip({ text }) {
  return (
    <span
      style={{
        padding: '7px 15px',
        borderRadius: 9,
        fontSize: 11,
        fontFamily: 'JetBrains Mono,monospace',
        letterSpacing: '0.05em',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 5px rgba(0,0,0,0.15)',
        color: 'var(--text3)',
        transition: motionOk ? 'transform .2s ease, box-shadow .2s ease, border-color .2s, color .2s' : 'border-color .2s, color .2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        if (motionOk) e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = `${gold}55`
        e.currentTarget.style.color = gold2
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 10px rgba(0,0,0,0.25), 0 0 8px ${gold}20`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.color = 'var(--text3)'
        e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 5px rgba(0,0,0,0.15)'
      }}
    >
      {text}
    </span>
  )
}

export default function Skills() {
  const { ref: hRef, visible: hVisible } = useScrollReveal()

  return (
    <section id="skills" style={{ padding: '120px 0', background: 'var(--void)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={hVisible ? hRef : hRef}
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
            marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
            opacity: 1,
          }}
        >
          {['Responsive Design','RESTful APIs','CRUD Operations','State Management','Component Architecture','Deployment','MVC Pattern','API Integration','Bcrypt Security','Mongoose ODM'].map(t => (
            <TagChip key={t} text={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
