import { useScrollReveal } from '../../hooks/useScrollReveal'

// ── Inline SVG icons — no external icon font dependency ──────────────────
const IconToken = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
)
const IconTerminal = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)
const IconDatabase = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)
const IconBrain = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 0-4 4c0 1.1.4 2.1 1.2 2.8A4.5 4.5 0 0 0 7 13.5c0 1.2.5 2.3 1.3 3.1A4.5 4.5 0 0 0 12 22a4.5 4.5 0 0 0 3.7-5.4c.8-.8 1.3-1.9 1.3-3.1 0-2-1.3-3.7-3.2-4.3.8-.7 1.2-1.7 1.2-2.8a4 4 0 0 0-4-4Z"/>
    <path d="M12 2v20"/>
  </svg>
)

const ICON_MAP = { token: IconToken, terminal: IconTerminal, database: IconDatabase, brain: IconBrain }

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

const groups = [
  {
    label: 'Agentic AI & LLMs',
    icon: 'brain',
    color: '#38bdf8',
    skills: [
      { name: 'LangChain & LangGraph', pct: 94, color: '#38bdf8' },
      { name: 'RAG & Vector Search (Atlas)', pct: 95, color: '#47A248' },
      { name: 'Multi-Agent Orchestration', pct: 90, color: '#818cf8' },
      { name: 'OpenAI, Groq & Open LLMs', pct: 92, color: '#f59e0b' },
      { name: 'Python AI Stack (PyTorch/ML)', pct: 88, color: '#3776AB' },
    ],
  },
  {
    label: 'Frontend',
    icon: 'token',
    color: '#ffdea8',
    skills: [
      { name: 'React.js',       pct: 95, color: '#61DAFB' },
      { name: 'JavaScript ES6+',pct: 90, color: '#F7DF1E' },
      { name: 'HTML5 / CSS3',   pct: 98, color: '#E34F26' },
      { name: 'Tailwind CSS',   pct: 92, color: '#06B6D4' },
      { name: 'Framer Motion',  pct: 85, color: '#0055FF' },
    ],
  },
  {
    label: 'Backend',
    icon: 'terminal',
    color: '#e6c364',
    skills: [
      { name: 'Node.js',         pct: 88, color: '#339933' },
      { name: 'Express.js',      pct: 92, color: '#ffffff' },
      { name: 'REST API Design', pct: 95, color: '#e6c364' },
      { name: 'JWT Auth',        pct: 84, color: '#D63AFF' },
      { name: 'Middleware Architecture', pct: 80, color: '#FF6B6B' },
    ],
  },
  {
    label: 'Data & Tooling',
    icon: 'database',
    color: '#b0ecff',
    skills: [
      { name: 'MongoDB',     pct: 85, color: '#47A248' },
      { name: 'Mongoose ODM',pct: 88, color: '#880000' },
      { name: 'Git & GitHub',pct: 94, color: '#F05032' },
      { name: 'VS Code',     pct: 98, color: '#007ACC' },
      { name: 'Vite / Build Tools', pct: 90, color: '#646CFF' },
    ],
  },
]

function SkillRow({ name, pct, color, visible, delay }) {
  return (
    <div className="group cursor-default">
      <div className="flex justify-between items-center mb-2">
        <span className="text-on-surface font-medium">{name}</span>
        <span className="font-label-mono text-xs" style={{ color: 'var(--gold)' }}>{pct}%</span>
      </div>
      <div className="skill-progress-bg rounded-full overflow-hidden">
        <div 
          className="skill-progress-fill" 
          style={{ 
            backgroundColor: color, 
            color: color, 
            width: visible ? `${pct}%` : '0%', 
            transition: motionOk ? `width 1.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s` : 'none' 
          }}
        />
      </div>
    </div>
  )
}

function GroupPanel({ g, idx }) {
  const { ref, visible } = useScrollReveal()

  const handleMouseMove = (e) => {
    const panel = e.currentTarget
    const rect = panel.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    panel.style.setProperty('--mouse-x', `${x}px`)
    panel.style.setProperty('--mouse-y', `${y}px`)
    
    if (motionOk) {
      panel.style.transform = 'scale(1.01)'
    }
  }

  const handleMouseLeave = (e) => {
    const panel = e.currentTarget
    panel.style.transform = 'scale(1)'
  }

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel rounded-xl p-8 flex flex-col gap-8 duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity .65s ease, transform .65s ease, transform .3s ease',
      }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary-container/10" style={{ color: g.color }}>
          {(() => { const Ic = ICON_MAP[g.icon] || IconToken; return <Ic />; })()}
        </div>
        <h3 className="font-headline text-2xl font-bold" style={{ color: 'var(--text)' }}>{g.label}</h3>
      </div>
      
      <div className="space-y-6">
        {g.skills.map((s, i) => (
          <SkillRow 
            key={s.name} 
            {...s} 
            visible={visible} 
            delay={0.1 + i * 0.05} 
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref: hRef, visible: hVis } = useScrollReveal()

  return (
    <section id="skills" className="py-20 relative overflow-hidden" style={{ background: 'var(--void)', color: 'var(--text)' }}>
      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div ref={hRef} className="mb-16" style={{
          opacity: hVis ? 1 : 0,
          transform: hVis ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity .7s ease, transform .7s ease',
        }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--gold)' }}></div>
            <span className="font-label-mono uppercase tracking-widest text-xs" style={{ color: 'var(--gold)' }}>Full Stack Mastery</span>
          </div>
          <h2 className="font-headline text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--text)' }}>Technical Ecosystem</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed font-body">
            A meticulously curated selection of my core professional stack, reflecting years of specialized development in building scalable, modern web applications.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {groups.map((g, i) => (
            <GroupPanel key={g.label} g={g} idx={i} />
          ))}
        </div>

        {/* Core Competencies Tag Pills */}
        <div className="mt-20">
          <h4 className="font-headline text-xl font-bold mb-8 text-center" style={{ color: 'var(--text)' }}>Core Competencies</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Responsive Design', 'Microservices', 'WebSockets', 'Unit Testing', 
              'CI/CD Pipelines', 'SEO Optimization', 'Accessibility (A11y)', 'State Management'
            ].map(tag => (
              <span 
                key={tag} 
                className="glass-panel px-6 py-3 rounded-full text-sm font-medium cursor-default transition-colors font-label-mono"
                style={{ color: 'var(--gold)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Flare Banner */}
        <div className="mt-32 relative h-[300px] rounded-2xl overflow-hidden glass-panel group">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--void) 0%, transparent 70%)' }}></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h3 className="text-3xl font-headline font-bold mb-4" style={{ color: 'var(--text)' }}>Continuously Evolving</h3>
            <p className="text-on-surface-variant max-w-lg font-body leading-relaxed text-sm md:text-base">
              Committed to lifelong learning and adopting emerging technologies that drive business value and exceptional user experiences.
            </p>
          </div>
        </div>

      </main>
    </section>
  )
}
