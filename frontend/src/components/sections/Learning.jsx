import { useScrollReveal } from '../../hooks/useScrollReveal'
import hashirPhoto from '../../assets/hashir.jpg'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

const items = [
  { icon: 'smart_toy',                name: 'Multi-Agent Workflows', pct: 92, sub: 'LangGraph & ReAct Reasoning Loops' },
  { icon: 'database',                 name: 'Production RAG Systems', pct: 94, sub: 'MongoDB Atlas Vector Search & Cosine Indexing' },
  { icon: 'memory',                   name: 'LLM Context Orchestration', pct: 90, sub: 'Dynamic Windows & Memory Compaction' },
  { icon: 'bolt',                     name: 'Event-Driven Ingestion', pct: 88, sub: 'Real-Time Change Data Capture & Vectorization' },
  { icon: 'integration_instructions', name: 'Tool Use & Function Calling', pct: 95, sub: 'Structured Computation & API Execution' },
  { icon: 'psychology',               name: 'Applied Machine Learning', pct: 86, sub: 'UET Peshawar Data Science Foundations' },
]

function ProgressCard({ item, visible }) {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 border border-[var(--border)] transition-all duration-300 hover:border-[var(--gold)]/40 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="p-2.5 rounded-lg" style={{ background: 'rgba(201, 168, 76, 0.12)', color: 'var(--gold)' }}>
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {item.icon}
          </span>
        </div>
        <span className="font-label-mono text-lg font-bold" style={{ color: 'var(--gold)' }}>{item.pct}%</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-headline text-base font-semibold" style={{ color: 'var(--text)' }}>{item.name}</h3>
        <div className="glow-meter-bg">
          <div
            className="glow-meter-fill"
            style={{
              width: visible ? `${item.pct}%` : '0%',
              transition: motionOk ? 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
              background: 'linear-gradient(90deg, #c9a84c, #38bdf8)',
            }}
          />
        </div>
        <p className="text-[11px] font-label-mono text-on-surface-variant tracking-wider text-slate-400">
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
      <div className="absolute top-0 right-0 -z-10 w-80 h-80 opacity-20 blur-[110px] pointer-events-none">
        <div className="w-full h-full bg-[#38bdf8] rounded-full" />
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
            Autonomous Frontier
          </span>
          <h2 className="font-headline font-bold leading-tight mb-2"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text)' }}>
            The Journey into{' '}
            <span className="amber-text-gradient bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Agentic AI</span>
          </h2>
          <p className="font-body text-sm leading-relaxed max-w-xl" style={{ color: 'var(--text2)' }}>
            Transitioning from deterministic full-stack engineering to self-directed cognitive systems — building autonomous agent swarms, vector pipelines, and real-time RAG.
          </p>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — Quote + Status */}
          <div className="flex flex-col gap-6">
            {/* Quote block */}
            <div className="glass-panel rounded-xl p-6 border border-border-glass shadow-lg">
              <p className="font-body text-sm leading-relaxed italic mb-6" style={{ color: 'var(--text)' }}>
                "We have moved beyond static chatbots into autonomous cognitive architectures. The real challenge is designing agents that plan, reason, invoke tools, and gracefully self-correct in complex environments."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-[var(--border2)] p-0.5 flex-shrink-0 overflow-hidden">
                  <img
                    src={hashirPhoto}
                    alt="Hashir Ahmad"
                    className="h-full w-full object-cover rounded-full"
                    onError={(e) => { e.currentTarget.src = "https://github.com/hashirahmad806.png"; }}
                  />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Hashir Ahmad</p>
                  <p className="font-label-mono text-xs uppercase tracking-tight" style={{ color: 'var(--gold)' }}>Agentic Systems Architect · UET Peshawar</p>
                </div>
              </div>
            </div>

            {/* System status panel */}
            <div className="glass-panel rounded-xl p-6 border border-border-glass flex flex-col gap-4 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </div>
                <p className="text-xs font-label-mono text-emerald-500 dark:text-emerald-400 tracking-widest uppercase font-semibold">
                  Agentic Runtime: Active & Ingesting
                </p>
              </div>
              <div className="space-y-3">
              {[
                { label: 'Reasoning Loop Fidelity (ReAct)',    value: '94.2%', pct: 94 },
                { label: 'Vector Retrieval Precision (Cosine)', value: '96.8%', pct: 97 },
                { label: 'Context Window Utilization',        value: 'Dynamic', pct: 85 },
              ].map(bar => (
                <div key={bar.label} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-label-mono uppercase tracking-tight" style={{ color: 'var(--text3)' }}>
                    <span>{bar.label}</span>
                    <span className="font-bold" style={{ color: 'var(--gold)' }}>{bar.value}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--border2)' }}>
                    <div className="h-full glow-meter-fill rounded-full" style={{ width: `${bar.pct}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold2))' }} />
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Focus footer */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm flex-1">
                <p className="text-[10px] font-label-mono uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--gold)' }}>
                  CURRENT RESEARCH FOCUS
                </p>
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Event-Driven Ingestion Pipelines with Atlas Vector Search</p>
              </div>
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm flex-1">
                <p className="text-[10px] font-label-mono uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--gold)' }}>
                  NEXT MILESTONE
                </p>
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Autonomous Multi-Agent Networks with LangGraph</p>
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
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all font-headline bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg hover:shadow-sky-500/25 hover:scale-105"
          >
            Collaborate on AI Agents →
          </a>
        </div>
      </div>
    </section>
  )
}
