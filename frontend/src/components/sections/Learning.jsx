import { useScrollReveal } from '../../hooks/useScrollReveal'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

export default function Learning() {
  const { ref: hRef, visible: hVis } = useScrollReveal()
  const { ref: gridRef, visible: gridVis } = useScrollReveal()

  const items = [
    { icon: 'code',                       name: 'Python',             pct: 55, sub: 'Core Intelligence Layer' },
    { icon: 'psychology',                 name: 'Machine Learning',   pct: 40, sub: 'Pattern Recognition' },
    { icon: 'memory',                     name: 'TensorFlow / Keras', pct: 30, sub: 'Deep Neural Networks' },
    { icon: 'analytics',                  name: 'Data Analysis',      pct: 50, sub: 'Insight Extraction' },
    { icon: 'settings_input_component',   name: 'AI Integration',     pct: 60, sub: 'Seamless API Logic' },
    { icon: 'layers',                     name: 'AI + MERN Stack',    pct: 45, sub: 'Full-Stack Intelligence' },
  ]

  return (
    <section id="learning" className="bg-[#131314] text-[#e5e2e3] py-24 relative overflow-hidden">
      {/* Atmospheric Background Element */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 blur-[120px] pointer-events-none">
        <div className="w-full h-full bg-[#ffdca1]/30 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <main className="max-w-container-max mx-auto px-margin-mobile lg:px-gutter">
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start" style={{
          opacity: gridVis ? 1 : 0,
          transform: gridVis ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity .8s ease, transform .8s ease',
        }}>
          {/* Left Side: Narrative Quote */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
            <div ref={hRef} className="flex flex-col gap-2">
              <span className="text-secondary font-label-mono uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-8 h-[1px] bg-secondary"></span>Growing
              </span>
              <h2 className="text-[40px] lg:text-[64px] text-white font-headline leading-tight">
                Strategic <br />
                <span className="amber-text-gradient">Growth</span>
              </h2>
            </div>
            
            <div className="relative mt-8">
              <p className="text-[18px] text-on-surface-variant font-body leading-relaxed italic">
                "Web intelligence is the next frontier. We aren't just building interfaces; we're crafting sentient digital ecosystems that evolve with human intent. The future belongs to those who speak the language of data."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full border border-outline-variant p-0.5">
                  <div 
                    className="h-full w-full rounded-full bg-cover bg-center" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBY0kTaiFy3vX6xvEVom3S5g3LMYNPOTrYk3Y9MMDeB_FiikqBbI3HepyXK-e6lUFuYFjLNvITOSowjkGUMbGfrjmVlfl_02DnEVE5zcJdBI-_hI1OVAP0hHC30K-I4RmHfe-CSl-nzW7MLIM9JPvGahy3SsCwZif2XDOztupsnVclI5NkQKlzLLlW9vSo1pUNZnZ0l791HDIZoMOTi7ClCp9fZk80JeMK31IInMJuQP0j23PvVX8V69u8uqg8of-GKmgKrtQlz1wI")' }}
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Hashir Ahmad</p>
                  <p className="text-secondary text-xs font-medium uppercase tracking-tighter">Full-Stack Tech Architect</p>
                </div>
              </div>
            </div>

            {/* Abstract Visual */}
            <div className="mt-12 h-64 rounded-xl overflow-hidden glass-panel relative group border border-border-glass flex flex-col justify-end p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-[#131314]/80 to-transparent -z-10"></div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffba20] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffba20]"></span>
                  </div>
                  <p className="text-xs font-label-mono text-[#ffba20] tracking-widest uppercase">System Status: Evolving</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-label-mono text-white/40 uppercase tracking-tighter">
                    <span>Neural Density</span>
                    <span>88.4%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ffba20]/40 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-label-mono text-white/40 uppercase tracking-tighter">
                    <span>Synaptic Throughput</span>
                    <span>Active</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#e6c364]/40 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4">
                <span className="material-symbols-outlined text-white/20 text-lg">sensors</span>
              </div>
            </div>
          </div>

          {/* Right Side: Learning Progress */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={item.name} className="glass-panel rounded-xl p-6 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-[#ffdca1]/10 rounded-lg text-[#ffdca1]">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-white font-label-mono text-xl">{item.pct}%</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-white font-headline text-[18px] font-semibold">{item.name}</h3>
                  <div className="glow-meter-bg">
                    <div 
                      className="glow-meter-fill" 
                      style={{ 
                        width: gridVis ? `${item.pct}%` : '0%', 
                        transition: motionOk ? 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)' : 'none' 
                      }}
                    />
                  </div>
                  <p className="text-[11px] font-label-mono text-on-surface-variant uppercase tracking-widest font-medium">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info Area */}
        <div className="mt-24 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col">
              <p className="text-on-surface-variant text-[11px] font-label-mono uppercase tracking-wider">CURRENT FOCUS</p>
              <p className="text-white font-bold">Neural Architecture Search</p>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant hidden md:block"></div>
            <div className="flex flex-col">
              <p className="text-on-surface-variant text-[11px] font-label-mono uppercase tracking-wider">NEXT UP</p>
              <p className="text-white font-bold">Reinforcement Learning</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a 
              href="#contact" 
              className="px-6 py-2.5 rounded-full bg-[#ffba20] text-[#0e0e0f] text-sm font-bold hover:shadow-[0_0_20px_rgba(255,186,32,0.4)] transition-all font-headline"
            >
              Start Project
            </a>
          </div>
        </div>
      </main>
    </section>
  )
}
