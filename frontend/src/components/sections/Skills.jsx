import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { FiCpu, FiDatabase, FiLayout, FiServer, FiCheckCircle, FiPlay, FiExternalLink } from 'react-icons/fi'

const SKILL_DATABASE = {
  langgraph: {
    id: 'langgraph',
    name: 'LangChain & LangGraph',
    category: 'ai',
    tag: 'Cyclic State Graphs',
    maturity: 'Production',
    latency: '34ms',
    experience: '3+ Years',
    role: 'Multi-agent state machine loops with cyclic graph traversal, memory checkpoints, human-in-the-loop branching, and dynamic tool retrieval.',
    language: 'Python 3.11',
    code: `graph = StateGraph(AgentState)
graph.add_node("agent", call_reasoning_model)
graph.add_node("tools", execute_vector_tools)
graph.add_conditional_edges("agent", should_continue)
app = graph.compile()`,
    projectLink: 'Production RAG & Vector Pipeline',
    projectId: 'projects',
  },
  vector: {
    id: 'vector',
    name: 'Atlas Vector Search',
    category: 'ai',
    tag: 'Cosine ANN Indexing',
    maturity: 'Enterprise',
    latency: '18ms',
    experience: '2+ Years',
    role: 'Hierarchical chunking, embedding generation (text-embedding-3-small), and sub-20ms approximate nearest neighbor (ANN) vector retrieval.',
    language: 'MongoDB Atlas / Python',
    code: `pipeline = [
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "embedding",
      "queryVector": query_embeddings,
      "numCandidates": 100, "limit": 5
    }
  }
]`,
    projectLink: 'Production RAG & Vector Pipeline',
    projectId: 'projects',
  },
  swarms: {
    id: 'swarms',
    name: 'Multi-Agent Orchestration',
    category: 'ai',
    tag: 'Autonomous Loops',
    maturity: 'Production',
    latency: '42ms',
    experience: '2+ Years',
    role: 'Coordinating specialized agent swarms with deterministic router boundaries, fallback safeguards, and stateful memory compaction.',
    language: 'LangChain / Python',
    code: `router = AgentRouter(tools=[search, db, coder])
result = await router.dispatch_task({
  "role": "systems_auditor",
  "task": "evaluate_rag_retrieval_bounds"
})`,
    projectLink: 'Production RAG & Vector Pipeline',
    projectId: 'projects',
  },
  react: {
    id: 'react',
    name: 'React.js Architecture',
    category: 'frontend',
    tag: 'Component Systems',
    maturity: 'Expert',
    latency: '0.4ms',
    experience: '4+ Years',
    role: 'Clean functional component architecture, custom hook pipelines, layout containment, zero-reflow state modeling, and strict WCAG standards.',
    language: 'React 18 / JSX',
    code: `export const useTelemetryStream = (endpoint) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const ws = new WebSocket(endpoint)
    ws.onmessage = (e) => setData(JSON.parse(e.data))
    return () => ws.close()
  }, [endpoint])
  return data
}`,
    projectLink: 'Triostep & Dr. Hassan BDS',
    projectId: 'projects',
  },
  tailwind: {
    id: 'tailwind',
    name: 'Tailwind CSS & Motion',
    category: 'frontend',
    tag: 'Micro-Physics & Tokens',
    maturity: 'Expert',
    latency: '60fps',
    experience: '3+ Years',
    role: 'High-agency design systems, dynamic dual-theme contrast tokens (WCAG AAA), GPU composited transforms, and spring-damped micro-physics.',
    language: 'Tailwind / Framer Motion',
    code: `<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="tactile-card border border-[var(--border)]"
/>`,
    projectLink: 'Dr. Hassan Dental Clinic',
    projectId: 'projects',
  },
  node: {
    id: 'node',
    name: 'Node.js & Express REST',
    category: 'backend',
    tag: 'Resilient Microservices',
    maturity: 'Production',
    latency: '14ms',
    experience: '3+ Years',
    role: 'Scalable RESTful API engineering, JWT security middleware pipelines, schema validation, rate-limiting, and error-boundary isolation.',
    language: 'Node.js / Express',
    code: `router.post('/agent/infer', verifyJWT, rateLimit, async (req, res) => {
  const { prompt } = req.body
  const response = await orchestrator.run(prompt)
  res.status(200).json({ ok: true, data: response })
})`,
    projectLink: 'Full Stack MERN Portfolio',
    projectId: 'projects',
  },
  mongo: {
    id: 'mongo',
    name: 'MongoDB & Mongoose ODM',
    category: 'backend',
    tag: 'Aggregation Pipelines',
    maturity: 'Production',
    latency: '9ms',
    experience: '3+ Years',
    role: 'Complex aggregation pipelines, faceted indexing, atomic transactions, schema validation, and real-time MongoDB Atlas event streams.',
    language: 'MongoDB / Mongoose',
    code: `const schema = new Schema({
  query: { type: String, required: true },
  embedding: { type: [Number], index: 'vector' },
  metadata: { timestamp: Date, verified: Boolean }
})`,
    projectLink: 'Production RAG System',
    projectId: 'projects',
  },
}

const CATEGORIES = [
  { id: 'ai', label: 'Agentic AI & LLMs', icon: FiCpu, color: '#38bdf8' },
  { id: 'frontend', label: 'Frontend Systems', icon: FiLayout, color: 'var(--gold)' },
  { id: 'backend', label: 'Backend & Cloud Data', icon: FiServer, color: '#34d399' },
]

export default function Skills() {
  const { ref: sectionRef, visible: sectionVis } = useScrollReveal()
  const [activeSkillId, setActiveSkillId] = useState('langgraph')
  const [activeCategory, setActiveCategory] = useState('all')
  const [benchRunning, setBenchRunning] = useState(false)
  const [benchLogs, setBenchLogs] = useState([])

  const activeSkill = SKILL_DATABASE[activeSkillId] || SKILL_DATABASE.langgraph

  const filteredSkills = Object.values(SKILL_DATABASE).filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  )

  const runBenchmark = () => {
    if (benchRunning) return
    setBenchRunning(true)
    setBenchLogs(['[BENCH] Initializing capability verification sequence...'])

    setTimeout(() => {
      setBenchLogs((prev) => [
        ...prev,
        `[01] Vector Embedding Tensor: 1536 dim mapped in 11.8ms`,
      ])
    }, 450)

    setTimeout(() => {
      setBenchLogs((prev) => [
        ...prev,
        `[02] Cosine ANN Index Scan (k=5): 16.4ms (similarity: 0.948)`,
      ])
    }, 900)

    setTimeout(() => {
      setBenchLogs((prev) => [
        ...prev,
        `[03] LangGraph State Dispatch: 3.9ms [SUCCESS]`,
        `✓ All sub-systems nominal (32.1ms total execution loop)`,
      ])
      setBenchRunning(false)
    }, 1450)
  }

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--void)', color: 'var(--text)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={sectionRef}
          className="mb-14"
          style={{
            opacity: sectionVis ? 1 : 0,
            transform: sectionVis ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)]">
              TELEMETRY & CAPABILITY MATRIX
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
                Technical Architecture
              </h2>
              <p
                className="text-sm md:text-base max-w-2xl leading-relaxed"
                style={{ color: 'var(--text2)' }}
              >
                Inspect core cognitive and full-stack modules. Select any competency to audit live telemetry, architecture responsibilities, and production code implementations.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border font-mono text-xs" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[var(--gold)] text-black font-semibold'
                    : 'text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                All Modules
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeCategory === c.id
                      ? 'bg-[var(--gold)] text-black font-semibold'
                      : 'text-[var(--text2)] hover:text-[var(--text)]'
                  }`}
                >
                  <c.icon size={13} />
                  <span>{c.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Column Interactive Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Module Selector */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[var(--text3)] px-1 mb-1">
              <span>ACTIVE CAPABILITIES ({filteredSkills.length})</span>
              <span>CLICK TO AUDIT NODE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSkills.map((s) => {
                const isSelected = s.id === activeSkillId
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSkillId(s.id)}
                    className="group p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden"
                    style={{
                      background: isSelected ? 'var(--surface2)' : 'var(--surface)',
                      borderColor: isSelected
                        ? 'var(--gold)'
                        : 'var(--border)',
                      boxShadow: isSelected
                        ? '0 0 20px rgba(var(--gold-rgb), 0.15)'
                        : 'var(--card-shadow)',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--gold)] font-medium">
                        {s.tag}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full transition-colors"
                        style={{
                          background: isSelected ? 'var(--gold)' : 'var(--border2)',
                          boxShadow: isSelected ? '0 0 8px var(--gold)' : 'none',
                        }}
                      />
                    </div>

                    <div
                      className="font-bold text-sm md:text-base group-hover:text-[var(--gold)] transition-colors mb-1"
                      style={{ color: 'var(--text)' }}
                    >
                      {s.name}
                    </div>

                    <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text3)] pt-2 border-t" style={{ borderColor: 'var(--border2)' }}>
                      <span>LATENCY: {s.latency}</span>
                      <span className="text-[var(--text2)] font-semibold">{s.maturity}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Quick Diagnostic Benchmark Sandbox */}
            <div
              className="mt-6 p-5 rounded-2xl border font-mono text-xs"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-3 border-b pb-3" style={{ borderColor: 'var(--border2)' }}>
                <div className="flex items-center gap-2">
                  <FiCpu className="text-[var(--gold)]" />
                  <span className="font-bold text-[var(--text)]">REAL-TIME TELEMETRY RUNNER</span>
                </div>
                <button
                  onClick={runBenchmark}
                  disabled={benchRunning}
                  className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all disabled:opacity-50"
                  style={{
                    background: 'var(--gold)',
                    color: '#000',
                  }}
                >
                  <FiPlay size={12} />
                  <span>{benchRunning ? 'Running...' : 'Run Benchmark'}</span>
                </button>
              </div>

              <div
                className="p-3 rounded-lg min-h-[72px] space-y-1 overflow-x-auto leading-relaxed"
                style={{ background: 'var(--obsidian)', color: 'var(--text2)' }}
              >
                {benchLogs.length === 0 ? (
                  <span className="text-[var(--text3)] italic">
                    Press "Run Benchmark" to execute live vector retrieval and state traversal tests...
                  </span>
                ) : (
                  benchLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes('✓')
                          ? 'text-emerald-400 font-semibold'
                          : log.includes('[01]')
                          ? 'text-sky-400'
                          : log.includes('[02]')
                          ? 'text-[var(--gold)]'
                          : 'text-[var(--text)]'
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Capability & Code Inspector */}
          <div
            className="lg:col-span-5 sticky top-28 p-6 rounded-2xl border space-y-5 shadow-2xl"
            style={{
              background: 'var(--surface)',
              borderColor: 'rgba(var(--gold-rgb), 0.35)',
              boxShadow: 'var(--card-shadow), 0 0 25px rgba(var(--gold-rgb), 0.08)',
            }}
          >
            {/* Inspector Header */}
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--gold)]">
                  NODE INSPECTOR // {activeSkill.category.toUpperCase()}
                </div>
                <h3
                  className="font-bold text-xl md:text-2xl mt-0.5"
                  style={{ color: 'var(--text)' }}
                >
                  {activeSkill.name}
                </h3>
              </div>

              <span
                className="px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold"
                style={{
                  background: 'var(--surface2)',
                  borderColor: 'rgba(var(--gold-rgb), 0.3)',
                  color: 'var(--gold)',
                }}
              >
                {activeSkill.maturity}
              </span>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2.5 rounded-xl border" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                <div className="text-[10px] text-[var(--text3)] uppercase">Latency</div>
                <div className="text-sm font-bold text-emerald-400">{activeSkill.latency}</div>
              </div>
              <div className="p-2.5 rounded-xl border" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                <div className="text-[10px] text-[var(--text3)] uppercase">Tenure</div>
                <div className="text-sm font-bold text-[var(--gold)]">{activeSkill.experience}</div>
              </div>
              <div className="p-2.5 rounded-xl border" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                <div className="text-[10px] text-[var(--text3)] uppercase">Runtime</div>
                <div className="text-sm font-bold text-[var(--text)]">Verified</div>
              </div>
            </div>

            {/* Architecture Description */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text3)] mb-1.5">
                Architectural Responsibility
              </div>
              <p
                className="text-xs md:text-sm leading-relaxed"
                style={{ color: 'var(--text2)' }}
              >
                {activeSkill.role}
              </p>
            </div>

            {/* Real Production Code Implementation */}
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text3)] mb-1.5">
                <span>Production Implementation</span>
                <span className="text-[var(--gold)]">{activeSkill.language}</span>
              </div>
              <pre
                className="p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed"
                style={{
                  background: 'var(--obsidian)',
                  borderColor: 'var(--border2)',
                  color: 'var(--gold)',
                }}
              >
                <code>{activeSkill.code}</code>
              </pre>
            </div>

            {/* Proof of Delivery Project Link */}
            <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border2)' }}>
              <div className="text-xs text-[var(--text3)] font-mono">
                Verified Deliverable:
              </div>
              <a
                href={`#${activeSkill.projectId}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--gold)] hover:underline"
              >
                <span>{activeSkill.projectLink}</span>
                <FiExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
