import { useScrollReveal } from '../../hooks/useScrollReveal'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

const groups = [
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
    <section 
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
          <span className="material-symbols-outlined text-3xl">{g.icon}</span>
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
    </section>
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
            <div className="h-1 w-12 bg-primary-container rounded-full"></div>
            <span className="text-secondary-fixed font-label-mono uppercase tracking-widest text-xs">Full Stack Mastery</span>
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
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADwyKT8J23nZYbyiTli3YVgunT223w9fHb_Szh-XDGzYmFPcux-KgCQGBcOYQEzMtYpxMYkhthWvn07Vb9CYVmCCS-ThSjkIkl-GB459KfJXy-JCW0RgElNMJVEDQzMYojh9yDfrOtasUZnrqO1g9TVUGikSnTcbHx5M73wSMj2yWjQqkN5BVvlOjLda51522fQjQspw60ig9kFXhdtUGx79DOGigo7NUamjKER6OWIiNPYpCB0yRucOWYBT0sjtJpQJGAECkfCcc")' }}
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
