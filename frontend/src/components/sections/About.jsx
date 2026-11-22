import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { FiCpu, FiDatabase, FiLayout, FiCheckCircle, FiArrowRight, FiActivity, FiZap } from 'react-icons/fi'

const PILLARS = [
  {
    id: 'agents',
    title: 'Autonomous AI Agents',
    subtitle: 'AI that plans and takes real action',
    tag: 'LangGraph & LangChain',
    badge: 'Self-Correcting',
    simpleExplain: 'Most AI only generates text. I build agents that can think through multi-step plans, call real software tools, and fix their own mistakes automatically.',
    highlights: ['Multi-step task planning', 'Automated tool & API calling', 'Self-evaluating error recovery'],
    icon: FiCpu,
  },
  {
    id: 'rag',
    title: 'Production RAG Systems',
    subtitle: 'Connecting AI to real business data',
    tag: 'MongoDB Atlas Vector Search',
    badge: '< 20ms Search',
    simpleExplain: 'I connect language models to private databases using vector search. The AI reads company documents and answers questions with 100% accuracy and zero guessing.',
    highlights: ['Sub-20ms semantic vector search', 'Zero-hallucination factual grounding', 'Real-time database sync'],
    icon: FiDatabase,
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Engineering',
    subtitle: 'From frontend UI to cloud backend',
    tag: 'MERN Stack & Vite',
    badge: 'Production Ready',
    simpleExplain: 'I create complete, fast web applications from scratch. Clean interactive screens in React, secure API backends in Node.js, and scalable database schemas in MongoDB.',
    highlights: ['Fast responsive React interfaces', 'Secure Node.js & Express REST APIs', 'Production deployments on cloud'],
    icon: FiLayout,
  },
  {
    id: 'datascience',
    title: 'Data Science Foundations',
    subtitle: 'Understanding the math behind AI',
    tag: 'UET Peshawar CS',
    badge: 'Deep Learning',
    simpleExplain: 'Studying Data Science at UET Peshawar gave me deep mathematical and neural network training. I understand how AI learns from data under the hood.',
    highlights: ['Neural network architectures', 'Statistical modeling & metrics', 'PyTorch & Python ML stacks'],
    icon: FiActivity,
  },
]

export default function About() {
  const { ref: headRef, visible: headVis } = useScrollReveal()
  const [activePillarId, setActivePillarId] = useState('agents')
  const [activeMode, setActiveMode] = useState('think') // 'think' | 'execute'

  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0]

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--obsidian)', color: 'var(--text)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Tag */}
        <div
          ref={headRef}
          className="mb-14"
          style={{
            opacity: headVis ? 1 : 0,
            transform: headVis ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)]">
              PHILOSOPHY & SYSTEMS ARCHITECTURE
            </span>
          </div>

          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: "'Clash Display','Cabinet Grotesk',sans-serif",
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            Architecting systems that{' '}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--gold)',
              }}
            >
              think and execute
            </span>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--text2)' }}
          >
            I am <strong style={{ color: 'var(--text)' }}>Hashir Ahmad</strong>, a Full-Stack and AI Systems Engineer studying Data Science at <strong style={{ color: 'var(--text)' }}>UET Peshawar</strong>. I build software that bridges human intent with autonomous machine execution.
          </p>
        </div>

        {/* Interactive Dual-Mode Showcase: "How It Thinks" vs "How It Executes" */}
        <div
          className="p-6 md:p-8 rounded-2xl border mb-14"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 mb-6" style={{ borderColor: 'var(--border2)' }}>
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--gold)]">
                CORE OPERATING PRINCIPLE
              </div>
              <h3 className="font-bold text-lg md:text-xl text-[var(--text)] mt-0.5">
                What does &quot;Think and Execute&quot; actually mean?
              </h3>
            </div>

            <div
              className="flex items-center gap-1 p-1 rounded-xl border font-mono text-xs self-start sm:self-auto"
              style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}
            >
              <button
                onClick={() => setActiveMode('think')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMode === 'think'
                    ? 'bg-[var(--gold)] text-black font-bold'
                    : 'text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                <FiCpu size={12} />
                <span>1. How It Thinks</span>
              </button>
              <button
                onClick={() => setActiveMode('execute')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMode === 'execute'
                    ? 'bg-[var(--gold)] text-black font-bold'
                    : 'text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                <FiZap size={12} />
                <span>2. How It Executes</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeMode === 'think' ? (
              <motion.div
                key="think"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                  <div className="font-mono text-xs text-[var(--gold)] font-bold">01 // Understanding Intent</div>
                  <div className="font-semibold text-sm text-[var(--text)]">Breaking Down the Goal</div>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">
                    Instead of guessing, the agent splits your high-level goal into logical, step-by-step tasks using LangChain and LangGraph.
                  </p>
                </div>
                <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                  <div className="font-mono text-xs text-[var(--gold)] font-bold">02 // Finding Truth</div>
                  <div className="font-semibold text-sm text-[var(--text)]">Searching Private Data</div>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">
                    Queries MongoDB Atlas Vector Search to pull exact facts, past user context, and relevant business documents in sub-20ms.
                  </p>
                </div>
                <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                  <div className="font-mono text-xs text-[var(--gold)] font-bold">03 // Self-Checking</div>
                  <div className="font-semibold text-sm text-[var(--text)]">Preventing Hallucinations</div>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">
                    The agent evaluates its own plan. If a step looks uncertain, it self-corrects the reasoning path before taking any action.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="execute"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                  <div className="font-mono text-xs text-emerald-400 font-bold">01 // Tool Calling</div>
                  <div className="font-semibold text-sm text-[var(--text)]">Invoking Real Software</div>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">
                    The agent calls real APIs, databases, calculations, and internal tools with structured, validated inputs.
                  </p>
                </div>
                <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                  <div className="font-mono text-xs text-emerald-400 font-bold">02 // Handling Errors</div>
                  <div className="font-semibold text-sm text-[var(--text)]">Automatic Self-Healing</div>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">
                    If an API fails or a tool returns an error, the agent catches it, analyzes what went wrong, and retries with a new plan.
                  </p>
                </div>
                <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                  <div className="font-mono text-xs text-emerald-400 font-bold">03 // Full-Stack Delivery</div>
                  <div className="font-semibold text-sm text-[var(--text)]">Real Product Integration</div>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">
                    Results are delivered directly through fast React web interfaces, email, or database updates that users can interact with.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 4 Pillars Architecture Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PILLARS.map((p) => {
            const isSelected = p.id === activePillarId
            const Icon = p.icon
            return (
              <div
                key={p.id}
                onClick={() => setActivePillarId(p.id)}
                className="p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 cursor-pointer relative"
                style={{
                  background: isSelected ? 'var(--surface2)' : 'var(--surface)',
                  borderColor: isSelected ? 'var(--gold)' : 'var(--border)',
                  boxShadow: isSelected
                    ? '0 0 25px rgba(var(--gold-rgb), 0.18)'
                    : 'var(--card-shadow)',
                  transform: isSelected ? 'translateY(-3px)' : 'none',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        background: 'rgba(var(--gold-rgb), 0.1)',
                        borderColor: 'rgba(var(--gold-rgb), 0.25)',
                        color: 'var(--gold)',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded border font-semibold"
                      style={{
                        background: 'var(--obsidian)',
                        borderColor: 'var(--border2)',
                        color: 'var(--gold)',
                      }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[var(--text)] mb-1">
                    {p.title}
                  </h3>
                  <div className="font-mono text-xs text-[var(--gold)] mb-3">
                    {p.subtitle}
                  </div>

                  <p className="text-xs md:text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
                    {p.simpleExplain}
                  </p>
                </div>

                <div className="pt-3 border-t space-y-1.5" style={{ borderColor: 'var(--border2)' }}>
                  {p.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text2)' }}>
                      <FiCheckCircle size={12} className="text-emerald-400 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-14">
          {[
            'MERN Stack',
            'LangGraph State Machines',
            'MongoDB Atlas Vector Search',
            'UET Peshawar Data Science',
            'Python ML',
            'Autonomous ReAct Loops',
            'Tailwind CSS & React 18',
          ].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border font-mono text-xs font-medium"
              style={{
                background: 'var(--surface2)',
                borderColor: 'var(--border2)',
                color: 'var(--text2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
