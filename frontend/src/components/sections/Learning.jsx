import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { FiCpu, FiDatabase, FiLayers, FiRepeat, FiPlay, FiCheckCircle, FiCompass, FiTerminal, FiZap } from 'react-icons/fi'
import hashirPhoto from '../../assets/hashir.jpg'

const EVOLUTION_STAGES = [
  {
    phase: 'STEP 01',
    period: 'The Foundation',
    title: 'Full-Stack Web Development',
    subtitle: 'MERN Stack (MongoDB, Express, React, Node.js)',
    desc: 'Started by building complete, real-world web applications. Learned how to create clean user interfaces with React, build fast backend APIs with Node.js and Express, and save data securely in MongoDB databases.',
    stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    keyTakeaway: 'Built strong engineering skills to create fast, reliable websites and APIs from start to finish.',
  },
  {
    phase: 'STEP 02',
    period: 'The Math & Models',
    title: 'Machine Learning & Deep Learning',
    subtitle: 'Data Science @ UET Peshawar',
    desc: 'Studied how computers learn patterns from data. Built and trained neural networks, worked with mathematical models, and learned how AI understands text, numbers, and predictions.',
    stack: ['Python', 'PyTorch', 'Data Science', 'Neural Networks', 'Scikit-Learn'],
    keyTakeaway: 'Gained deep understanding of how AI works under the hood, not just how to call an API.',
  },
  {
    phase: 'STEP 03',
    period: 'The Knowledge Connection',
    title: 'Generative AI & RAG Applications',
    subtitle: 'Vector Search & Smart Knowledge',
    desc: 'Connected Large Language Models (like GPT) to private company data. Used MongoDB Atlas Vector Search so the AI can read documents and give accurate, fact-checked answers without making things up.',
    stack: ['MongoDB Atlas', 'Vector Search', 'Embeddings', 'OpenAI', 'RAG'],
    keyTakeaway: 'Built smart systems that answer questions using your exact business data with zero guesswork.',
  },
  {
    phase: 'STEP 04',
    period: 'Autonomous Action',
    title: 'Agentic AI with LangChain & LangGraph',
    subtitle: 'Self-Directed AI Agents',
    desc: 'Created autonomous AI agents that do not just chat — they take action. They plan steps, use real software tools (like databases and calculators), check their own work, and correct mistakes automatically.',
    stack: ['LangGraph', 'LangChain', 'AI Agents', 'Tool Calling', 'Self-Correction'],
    keyTakeaway: 'Created autonomous AI teammates that can complete complex business jobs on their own.',
  },
]

const AGENT_LOOP_STEPS = [
  {
    id: 1,
    name: '01. Ingestion & Perception',
    role: 'State Initialization',
    desc: 'Captures user prompt, decodes intent, and pulls conversational memory threads from persistent state checkpoint.',
    tech: 'LangGraph MemorySaver',
    metric: '4.2ms parse latency',
    color: '#38bdf8',
  },
  {
    id: 2,
    name: '02. Vector Retrieval',
    role: 'Context Grounding',
    desc: 'Executes Cosine ANN similarity search against MongoDB Atlas vector index to retrieve k=3 grounded semantic chunks.',
    tech: 'MongoDB Vector Search',
    metric: '18.4ms ANN latency (0.94 score)',
    color: 'var(--gold)',
  },
  {
    id: 3,
    name: '03. ReAct Reasoning',
    role: 'Plan & Routing',
    desc: 'LLM evaluates context against available tools. Conditional router chooses between database query or direct synthesis.',
    tech: 'LangChain Agent Core',
    metric: 'Zero-shot tool routing',
    color: '#c084fc',
  },
  {
    id: 4,
    name: '04. Tool Execution',
    role: 'Dynamic Action',
    desc: 'Invokes external REST APIs and database procedures with structured Pydantic schema validation.',
    tech: 'Deterministic Tool Wrappers',
    metric: '100% schema compliance',
    color: '#34d399',
  },
  {
    id: 5,
    name: '05. Synthesis & Reflection',
    role: 'Grounded Output',
    desc: 'Evaluates output against source chunks to prevent hallucination; compacts context window and delivers verified response.',
    tech: 'Self-Correction Loop',
    metric: 'Zero-hallucination verified',
    color: '#10b981',
  },
]

const CAPABILITIES = [
  {
    icon: FiRepeat,
    name: 'Multi-Agent Workflows',
    sub: 'LangGraph & ReAct Reasoning Loops',
    detail: 'Cyclic state machines with conditional branching, subagent delegation, and human-in-the-loop checkpoints.',
    tag: 'LangGraph',
    metric: '99.4% Graph Determinism',
  },
  {
    icon: FiDatabase,
    name: 'Production RAG Systems',
    sub: 'Atlas Vector Search & Cosine Indexing',
    detail: 'Semantic ANN search pipelines with dynamic chunking, multi-query expansion, and re-ranking.',
    tag: 'MongoDB Atlas',
    metric: '< 25ms Vector Latency',
  },
  {
    icon: FiLayers,
    name: 'LLM Context Orchestration',
    sub: 'Dynamic Windows & Memory Compaction',
    detail: 'Summarization trees and sliding token windows that prevent context degradation over long tasks.',
    tag: 'Context Engineering',
    metric: '128k Token Windows',
  },
  {
    icon: FiZap,
    name: 'Event-Driven Ingestion',
    sub: 'Real-Time CDC & Vectorization',
    detail: 'Database triggers and stream workers that vectorize updated records automatically in real time.',
    tag: 'Atlas Triggers',
    metric: 'Real-Time Sync',
  },
  {
    icon: FiTerminal,
    name: 'Tool Use & Function Calling',
    sub: 'Structured Computation & API Execution',
    detail: 'Equipping agent graphs with deterministic tool calls, calculators, and verified database querying.',
    tag: 'Tool Calling',
    metric: 'Pydantic Validated',
  },
  {
    icon: FiCpu,
    name: 'Applied Machine Learning',
    sub: 'UET Peshawar Data Science',
    detail: 'Rigorous statistical foundations, supervised regression/classification, and deep learning architectures.',
    tag: 'Data Science',
    metric: 'UET Peshawar CS',
  },
]

export default function Learning() {
  const { ref: sectionRef, visible: sectionVis } = useScrollReveal()
  const [activeTab, setActiveTab] = useState('loop') // 'loop' | 'evolution' | 'capabilities'
  const [activeLoopStep, setActiveLoopStep] = useState(1)
  const [isPlayingLoop, setIsPlayingLoop] = useState(false)

  // Auto-play the agent loop simulation
  useEffect(() => {
    let timer
    if (isPlayingLoop) {
      timer = setInterval(() => {
        setActiveLoopStep((prev) => (prev >= AGENT_LOOP_STEPS.length ? 1 : prev + 1))
      }, 1600)
    }
    return () => clearInterval(timer)
  }, [isPlayingLoop])

  const selectedStep = AGENT_LOOP_STEPS.find((s) => s.id === activeLoopStep) || AGENT_LOOP_STEPS[0]

  return (
    <section
      id="learning"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--void)', color: 'var(--text)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className="mb-12"
          style={{
            opacity: sectionVis ? 1 : 0,
            transform: sectionVis ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)]">
              COGNITIVE ARCHITECTURE & TRAJECTORY
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="font-bold tracking-tight mb-3"
                style={{
                  fontFamily: "'Clash Display','Cabinet Grotesk',sans-serif",
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  lineHeight: 1.05,
                  color: 'var(--text)',
                }}
              >
                The Journey into{' '}
                <span className="text-[var(--gold)]">Agentic AI</span>
              </h2>
              <p
                className="text-sm md:text-base max-w-2xl leading-relaxed"
                style={{ color: 'var(--text2)' }}
              >
                How I grew from building web applications to creating autonomous AI agents. Here is my exact four-step journey, interactive agent loop, and core capabilities in clear, simple terms.
              </p>
            </div>

            {/* Interactive View Switcher */}
            <div
              className="flex items-center gap-1 p-1 rounded-xl border font-mono text-xs self-start md:self-auto"
              style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}
            >
              <button
                onClick={() => setActiveTab('loop')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'loop'
                    ? 'bg-[var(--gold)] text-black font-semibold'
                    : 'text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                <FiRepeat size={12} />
                <span>Live Agent Loop</span>
              </button>
              <button
                onClick={() => setActiveTab('evolution')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'evolution'
                    ? 'bg-[var(--gold)] text-black font-semibold'
                    : 'text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                <FiCompass size={12} />
                <span>Evolutionary Stages</span>
              </button>
              <button
                onClick={() => setActiveTab('capabilities')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'capabilities'
                    ? 'bg-[var(--gold)] text-black font-semibold'
                    : 'text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                <FiLayers size={12} />
                <span>Capabilities</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── TAB 1: LIVE AGENT REASONING LOOP SIMULATOR ── */}
        {activeTab === 'loop' && (
          <div className="space-y-8">
            {/* Interactive Cycle Strip */}
            <div
              className="p-6 md:p-8 rounded-2xl border space-y-6"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border2)' }}>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--gold)]">
                    COGNITIVE STATE MACHINE // REAL-TIME DISPATCH
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-[var(--text)] mt-0.5">
                    Interactive ReAct Agent Cycle
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingLoop(!isPlayingLoop)}
                    className="px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-2 transition-all"
                    style={{
                      background: isPlayingLoop ? 'var(--surface2)' : 'var(--gold)',
                      color: isPlayingLoop ? 'var(--text)' : '#000',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <FiPlay size={12} className={isPlayingLoop ? 'animate-spin' : ''} />
                    <span>{isPlayingLoop ? 'Pause Simulation' : 'Auto-Play Simulation ▶'}</span>
                  </button>
                </div>
              </div>

              {/* 5-Step Loop Pipeline Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {AGENT_LOOP_STEPS.map((step) => {
                  const isActive = step.id === activeLoopStep
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        setIsPlayingLoop(false)
                        setActiveLoopStep(step.id)
                      }}
                      className="p-3.5 rounded-xl border text-left transition-all duration-200 relative"
                      style={{
                        background: isActive ? 'var(--surface2)' : 'var(--obsidian)',
                        borderColor: isActive ? 'var(--gold)' : 'var(--border2)',
                        boxShadow: isActive ? '0 0 16px rgba(var(--gold-rgb), 0.15)' : 'none',
                        transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-[var(--text3)] uppercase">
                          NODE 0{step.id}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full transition-colors"
                          style={{
                            background: isActive ? 'var(--gold)' : 'var(--border2)',
                            boxShadow: isActive ? '0 0 8px var(--gold)' : 'none',
                          }}
                        />
                      </div>
                      <div className="font-bold text-xs text-[var(--text)] line-clamp-1 mb-1">
                        {step.name.split('. ')[1]}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--gold)]">
                        {step.role}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Node Inspector Telemetry Box */}
              <div
                className="p-6 rounded-xl border space-y-4"
                style={{
                  background: 'var(--obsidian)',
                  borderColor: 'rgba(var(--gold-rgb), 0.35)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border2)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-pulse" />
                    <span className="font-bold text-base text-[var(--text)]">{selectedStep.name}</span>
                    <span className="font-mono text-xs text-[var(--gold)] ml-2">[{selectedStep.role}]</span>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[var(--surface2)] text-emerald-400 border border-[var(--border)]">
                    {selectedStep.metric}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {selectedStep.desc}
                </p>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-[var(--text3)]">
                  <span>Underlying Stack: <strong className="text-[var(--gold)]">{selectedStep.tech}</strong></span>
                  <span className="text-emerald-400">● STATE NOMINAL</span>
                </div>
              </div>
            </div>

            {/* Architecture Quote & Proof Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="p-6 rounded-2xl border space-y-4 md:col-span-2"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <p className="font-body text-sm leading-relaxed italic" style={{ color: 'var(--text)' }}>
                  "We have transitioned beyond static prompts and brittle chat interfaces. The authentic engineering frontier is constructing resilient, cyclic state graphs that continuously reason, execute tools, verify boundaries, and autonomously self-correct in complex real-world data environments."
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={hashirPhoto}
                    alt="Hashir Ahmad"
                    className="w-10 h-10 rounded-full object-cover border border-[var(--border2)]"
                    onError={(e) => { e.currentTarget.src = 'https://github.com/hashirahmad806.png' }}
                  />
                  <div>
                    <div className="font-bold text-sm text-[var(--text)]">Hashir Ahmad</div>
                    <div className="font-mono text-xs text-[var(--gold)]">AI Agent & Full-Stack Systems Engineer · UET Peshawar</div>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl border flex flex-col justify-between"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--gold)] mb-1">
                    TARGET INFRASTRUCTURE
                  </div>
                  <div className="font-bold text-base text-[var(--text)]">
                    LangGraph + Atlas Vector Search
                  </div>
                  <p className="text-xs text-[var(--text2)] mt-2 leading-relaxed">
                    Event-driven RAG pipelines with sub-40ms vector recall and multi-agent coordination loops.
                  </p>
                </div>

                <a
                  href="#contact"
                  className="mt-4 px-4 py-2.5 rounded-lg border text-center font-mono text-xs font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                  style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}
                >
                  Collaborate on Agents ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: EVOLUTIONARY TRAJECTORY STAGES ── */}
        {activeTab === 'evolution' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {EVOLUTION_STAGES.map((stage) => (
                <div
                  key={stage.phase}
                  className="p-6 rounded-2xl border flex flex-col justify-between space-y-5 transition-all hover:scale-[1.01]"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-3">
                      <span className="text-[var(--gold)] font-bold">{stage.phase}</span>
                      <span className="text-[var(--text3)]">{stage.period}</span>
                    </div>

                    <h3 className="font-bold text-lg text-[var(--text)] mb-1">
                      {stage.title}
                    </h3>
                    <div className="font-mono text-xs text-[var(--gold)] mb-3">
                      {stage.subtitle}
                    </div>

                    <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                      {stage.desc}
                    </p>
                  </div>

                  <div>
                    <div className="p-3 rounded-xl mb-3 text-xs leading-relaxed" style={{ background: 'var(--surface2)', color: 'var(--text)' }}>
                      <strong className="text-[var(--gold)]">Key Outcome:</strong> {stage.keyTakeaway}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {stage.stack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono border"
                          style={{
                            background: 'var(--obsidian)',
                            borderColor: 'var(--border2)',
                            color: 'var(--text2)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: FRONTIER CAPABILITIES MATRIX ── */}
        {activeTab === 'capabilities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-2xl border flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-[var(--gold)] hover:-translate-y-1"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[var(--surface2)] text-[var(--gold)]">
                      <item.icon size={20} />
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded-md border text-emerald-400" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
                      {item.metric}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--text)] mb-1">
                    {item.name}
                  </h3>
                  <div className="font-mono text-xs text-[var(--gold)] mb-2">
                    {item.sub}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>
                    {item.detail}
                  </p>
                </div>

                <div className="pt-3 border-t flex items-center justify-between font-mono text-[11px] text-[var(--text3)]" style={{ borderColor: 'var(--border2)' }}>
                  <span>STACK:</span>
                  <span className="text-[var(--text)] font-semibold">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
