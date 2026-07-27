import { useScrollReveal } from '../../hooks/useScrollReveal'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

const items = [
  { icon: 'code',                     name: 'Python',             pct: 55, sub: 'Core Intelligence Layer' },
  { icon: 'psychology',               name: 'Machine Learning',   pct: 40, sub: 'Pattern Recognition' },
  { icon: 'memory',                   name: 'TensorFlow / Keras', pct: 30, sub: 'Deep Neural Networks' },
  { icon: 'analytics',               name: 'Data Analysis',      pct: 50, sub: 'Insight Extraction' },
  { icon: 'settings_input_component', name: 'AI Integration',     pct: 60, sub: 'Seamless API Logic' },
  { icon: 'layers',                   name: 'AI + MERN Stack',    pct: 45, sub: 'Full-Stack Intelligence' },
]

function ProgressCard({ item, visible }) {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="p-2.5 rounded-lg" style={{ background: 'rgba(var(--gold-rgb, 138,100,25), 0.12)', color: 'var(--gold)' }}>
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {item.icon}
          </span>
        </div>
        <span className="font-label-mono text-lg" style={{ color: 'var(--gold)' }}>{item.pct}%</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-headline text-base font-semibold" style={{ color: 'var(--text)' }}>{item.name}</h3>
        <div className="glow-meter-bg">
          <div
            className="glow-meter-fill"
            style={{
              width: visible ? `${item.pct}%` : '0%',
              transition: motionOk ? 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
            }}
          />
        </div>
        <p className="text-[10px] font-label-mono text-on-surface-variant uppercase tracking-widest">
          {item.sub}
        </p>
      </div>
    </div>
  )
}

export default function Learning() {
  const { ref: sectionRef, visible: sectionVis } = useScrollReveal()

  return (
    <section
      id="learning"
      className="py-20 relative overflow-hidden"
      style={{ background: 'var(--void)', color: 'var(--text)' }}
    >
      {/* Atmospheric glow */}
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 opacity-15 blur-[100px] pointer-events-none">
        <div className="w-full h-full bg-[#ffdca1] rounded-full" />
      </div>

      <div
        ref={sectionRef}
        className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12"
        style={{
          opacity: sectionVis ? 1 : 0,
          transform: sectionVis ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity .8s ease, transform .8s ease',
        }}
      >
        {/* ── Header ── */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 font-label-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
            Growing
          </span>
          <h2 className="font-headline font-bold leading-tight mb-2"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text)' }}>
            Strategic{' '}
            <span className="amber-text-gradient">Growth</span>
          </h2>
          <p className="font-body text-sm leading-relaxed max-w-xl" style={{ color: 'var(--text3)' }}>
            A focused journey from full-stack to AI-augmented development — building skills
            in Python, ML, and intelligent system integrations.
          </p>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — Quote + Status */}
          <div className="flex flex-col gap-6">
            {/* Quote block */}
            <div className="glass-panel rounded-xl p-6 border border-border-glass">
              <p className="font-body text-sm leading-relaxed italic mb-6" style={{ color: 'var(--text3)' }}>
                "Web intelligence is the next frontier. We aren't just building interfaces;
                we're crafting sentient digital ecosystems that evolve with human intent."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-outline-variant p-0.5 flex-shrink-0">
                  <div
                    className="h-full w-full rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBY0kTaiFy3vX6xvEVom3S5g3LMYNPOTrYk3Y9MMDeB_FiikqBbI3HepyXK-e6lUFuYFjLNvITOSowjkGUMbGfrjmVlfl_02DnEVE5zcJdBI-_hI1OVAP0hHC30K-I4RmHfe-CSl-nzW7MLIM9JPvGahy3SsCwZif2XDOztupsnVclI5NkQKlzLLlW9vSo1pUNZnZ0l791HDIZoMOTi7ClCp9fZk80JeMK31IInMJuQP0j23PvVX8V69u8uqg8of-GKmgKrtQlz1wI")',
                    }}
                  />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Hashir Ahmad</p>
                  <p className="font-label-mono text-xs uppercase tracking-tight" style={{ color: 'var(--gold)' }}>Full-Stack Tech Architect</p>
                </div>
              </div>
            </div>

            {/* System status panel */}
            <div className="glass-panel rounded-xl p-6 border border-border-glass flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffba20] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffba20]" />
                </div>
                <p className="text-xs font-label-mono text-[#ffba20] tracking-widest uppercase">
                  System Status: Evolving
                </p>
              </div>
              <div className="space-y-3">
              {[
                { label: 'Neural Density',    value: '88.4%', pct: 88 },
                { label: 'Synaptic Throughput', value: 'Active', pct: 62 },
              ].map(bar => (
                <div key={bar.label} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-label-mono uppercase tracking-tight" style={{ color: 'var(--text3)' }}>
                    <span>{bar.label}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'var(--border2)' }}>
                    <div className="h-full glow-meter-fill rounded-full" style={{ width: `${bar.pct}%`, background: 'var(--gold)' }} />
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Focus footer */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div>
                <p className="text-on-surface-variant text-[10px] font-label-mono uppercase tracking-wider mb-0.5">
                  CURRENT FOCUS
                </p>
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Neural Architecture Search</p>
              </div>
              <div className="w-px bg-outline-variant self-stretch hidden sm:block" />
              <div>
                <p className="text-on-surface-variant text-[10px] font-label-mono uppercase tracking-wider mb-0.5">
                  NEXT UP
                </p>
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Reinforcement Learning</p>
              </div>
            </div>
          </div>

          {/* Right — Progress cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map(item => (
              <ProgressCard key={item.name} item={item} visible={sectionVis} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center sm:justify-end">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all font-headline"
            style={{ background: 'var(--gold)', color: 'var(--void)', boxShadow: '0 0 0 0 transparent' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(163,125,36,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 0 transparent'}
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  )
}
