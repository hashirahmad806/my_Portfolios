import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { FiGithub, FiExternalLink, FiCpu, FiCheckCircle, FiLayers, FiX, FiShield, FiZap, FiActivity } from 'react-icons/fi'
import { projectsAPI } from '../../utils/api'

const FALLBACK_PROJECTS = [
  {
    _id: 'client-1',
    title: 'Triostep Footwear E-Commerce',
    category: 'client',
    tag: 'Commercial Client Delivery',
    domain: 'triostepdkhyber.vercel.app',
    isClient: true,
    clientName: 'Triostep Heritage Footwear',
    shortDesc: 'A luxury e-commerce store for handcrafted artisan footwear with real-time product filtering, responsive cart drawer, and WhatsApp order concierge.',
    fullDesc: 'Engineered a complete commercial e-commerce platform for high-end artisan leather shoes. Designed luxury lookbook galleries, instant client-side catalog search, smooth slide-out cart drawers, and direct WhatsApp concierge ordering for international customers.',
    metrics: ['⚡ Sub-second load', '🛒 WhatsApp Checkout'],
    highlights: [
      'Built with Astro & Tailwind for ultra-fast performance',
      'Instant search and filter by size, material, and price',
      'One-click WhatsApp concierge checkout integration',
    ],
    tech: ['Astro', 'Tailwind CSS', 'JavaScript', 'E-Commerce', 'Responsive UI'],
    gradient: 'linear-gradient(135deg, #c9a84c 0%, #1e1e24 100%)',
    githubUrl: 'https://github.com/hashirahmad806/triostepdkhyber',
    liveUrl: 'https://triostepdkhyber.vercel.app/',
    featured: true,
  },
  {
    _id: 'client-2',
    title: 'Dr. Hassan BDS Dental Clinic',
    category: 'client',
    tag: 'Healthcare Client Delivery',
    domain: 'hassanbds.info',
    isClient: true,
    clientName: 'Dr. Hassan Dental Surgery',
    shortDesc: 'A modern dental clinic website featuring online appointment booking, smile makeover before/after galleries, and patient consultation workflows.',
    fullDesc: 'Designed and engineered a healthcare platform for Dr. Hassan BDS. Streamlined patient onboarding with an interactive booking system, before/after dental treatment galleries, patient consultation request workflows, and clinic location maps.',
    metrics: ['📅 Online Booking', '🦷 Smile Gallery'],
    highlights: [
      'Interactive appointment booking with instant form validation',
      'Before & After smile makeover comparison gallery',
      'Mobile-first responsive architecture built with React & Vite',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Healthcare UI'],
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0f172a 100%)',
    githubUrl: 'https://github.com/hashirahmad806/Hassan_Web',
    liveUrl: 'https://hassanbds.info',
    featured: true,
  },
  {
    _id: 'rag-1',
    title: 'Production RAG & Vector Intelligence Pipeline',
    category: 'ai',
    tag: 'Enterprise AI & Vectors',
    domain: 'sys.rag // atlas-vector:0x01',
    isClient: false,
    shortDesc: 'High-speed knowledge retrieval system using MongoDB Atlas Vector Search and OpenAI to answer complex questions from private documents with zero guessing.',
    fullDesc: 'An enterprise-grade Retrieval-Augmented Generation (RAG) system. Chunks and vectorizes large document libraries into MongoDB Atlas Vector Search, retrieves accurate facts in under 20ms using cosine similarity, and streams grounded, verified answers with zero hallucination.',
    metrics: ['⏱ < 18ms Latency', '🎯 0% Hallucination'],
    highlights: [
      'Sub-20ms Cosine ANN vector retrieval across thousands of chunks',
      'Real-time database vectorization using MongoDB Atlas triggers',
      '100% grounded answers with source document citations',
    ],
    tech: ['Python', 'LangChain', 'MongoDB Vector Search', 'OpenAI', 'Atlas Triggers'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
    githubUrl: 'https://github.com/hashirahmad806/Lang_chain_Learning',
    liveUrl: 'https://github.com/hashirahmad806/Lang_chain_Learning',
    featured: true,
  },
  {
    _id: 'agentic-2',
    title: 'AI Codebase Memory & Multi-Agent Graph',
    category: 'ai',
    tag: 'Autonomous Multi-Agent',
    domain: 'agent.graph // langgraph:v2',
    isClient: false,
    shortDesc: 'Autonomous multi-agent system built with LangGraph that can read entire codebases, plan multi-file refactors, and execute code changes on its own.',
    fullDesc: 'A stateful cognitive multi-agent architecture. Employs LangGraph cyclic state machines, ReAct reasoning loops, long-term memory compaction, and dynamic tool calls to autonomously navigate, analyze, and implement code modifications across complex repositories.',
    metrics: ['🤖 Multi-Agent Graph', '🧠 Persistent Memory'],
    highlights: [
      'Cyclic LangGraph state machine with automatic self-correction',
      'Persistent memory checkpoints that track execution across turns',
      'Deterministic tool calling with Pydantic validation boundaries',
    ],
    tech: ['Python', 'LangGraph', 'Multi-Agent Swarms', 'Vector Store', 'Tool Calling'],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b0764 100%)',
    githubUrl: 'https://github.com/hashirahmad806/AI_Codebase_Memory',
    liveUrl: 'https://github.com/hashirahmad806/AI_Codebase_Memory',
    featured: true,
  },
  {
    _id: 'lumina-3',
    title: 'Lumina Academic Multimodal Assistant',
    category: 'fullstack',
    tag: 'Multimodal AI App',
    domain: 'lumina-assistant.vercel.app',
    isClient: false,
    shortDesc: 'Intelligent full-stack study companion that analyzes study notes and solves problems directly from uploaded textbook images via Groq LLM.',
    fullDesc: 'A complete full-stack educational web application with multimodal vision and reasoning. Students upload textbook diagrams or study problems to receive step-by-step problem-solving explanations with real-time streaming inference powered by Groq.',
    metrics: ['👁 Groq Vision', '⚡ Sub-Second Stream'],
    highlights: [
      'Multimodal image-to-text analysis for mathematical queries',
      'Sub-second streaming token responses via Groq inference engine',
      'MERN stack backend with user chat history and study material storage',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Groq Vision', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #78350f 100%)',
    githubUrl: 'https://github.com/hashirahmad806/Web_Projectect_Ai_Assistant',
    liveUrl: 'https://web-projectect-ai-assistant-x8xz.vercel.app/',
    featured: false,
  },
  {
    _id: 'blog-platform',
    title: 'QuickBlogs Full-Stack Platform',
    category: 'fullstack',
    tag: 'Full-Stack MERN CMS',
    domain: 'quickblogs.vercel.app',
    isClient: false,
    shortDesc: 'Secure publishing platform with JWT authentication, rich-text markdown blogging, image uploads, and interactive comment moderation.',
    fullDesc: 'End-to-end full-stack blogging system built with the MERN stack. Features role-based user authentication, admin content management, cloud image uploads, tag-based article categorization, and responsive reading layouts.',
    metrics: ['🔒 JWT Auth', '📝 Markdown CMS'],
    highlights: [
      'Secure authentication pipeline using JWT and bcrypt encryption',
      'Mongoose aggregation pipelines for popular post metrics',
      'Fast client-side rendering with Tailwind responsive design',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #831843 100%)',
    githubUrl: 'https://github.com/hashirahmad806/Quick-Blogs',
    liveUrl: 'https://quick-blogs-i4xh.vercel.app/',
    featured: false,
  },
  {
    _id: 'intelliwrite-ui',
    title: 'IntelliWrite AI Landing Architecture',
    category: 'frontend',
    tag: 'Frontend Systems & UI',
    domain: 'intelliwrite-ui.vercel.app',
    isClient: false,
    shortDesc: 'A futuristic landing page for an AI writing companion with fluid interactive pricing, feature spotlights, and polished micro-animations.',
    fullDesc: 'High-craft frontend design engineering demonstration built with React 18 and Tailwind CSS. Showcases modular layout design, fluid spring animations, interactive product tier switchers, and dark mode contrast calibration.',
    metrics: ['🎨 120Hz Physics', '♿ WCAG AAA'],
    highlights: [
      'Framer Motion spring physics and staggered reveal orchestrations',
      'Strict WCAG contrast compliance and accessible screen-reader markup',
      'Fluid interactive pricing calculator with instant state switching',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'UI Engineering'],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #164e63 100%)',
    githubUrl: 'https://github.com/hashirahmad806/Intelliwrite-ui',
    liveUrl: 'https://intelliwrite-ui.vercel.app',
    featured: false,
  },
  {
    _id: 'reel-nova',
    title: 'ReelNova Movie Discovery Platform',
    category: 'fullstack',
    tag: 'Media Application',
    domain: 'reel-nova-movie.vercel.app',
    isClient: false,
    shortDesc: 'Movie discovery web app with real-time movie search, personal watchlists, Appwrite authentication, and trending film analytics.',
    fullDesc: 'Modern movie discovery application that queries cinema databases with real-time debounced search, custom user watchlists, genre categorization, and responsive carousel previews.',
    metrics: ['🎬 Instant Search', '⭐ Personal Watchlist'],
    highlights: [
      'Real-time search debouncing with zero layout jitter',
      'Cloud user profiles and favorites list persistence',
      'Modern glassmorphic interface with mobile gesture controls',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Appwrite', 'REST API', 'JavaScript'],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
    githubUrl: 'https://github.com/hashirahmad806/ReelNova-Movie-Web',
    liveUrl: 'https://reel-nova-movie.vercel.app/',
    featured: false,
  },
]

const FILTER_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'client', label: 'Client Deliveries (Real Clients)' },
  { id: 'ai', label: 'Agentic AI & RAG' },
  { id: 'fullstack', label: 'Full-Stack MERN' },
]

function ProjectCard({ project, onInspect }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -100, y: -100 })
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-2 relative"
      style={{
        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--gold-rgb), 0.1), transparent 80%), var(--surface)`,
        borderColor: 'var(--border)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div>
        {/* CAD Browser Mockup Window Header */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b backdrop-blur-md text-[10px] font-mono select-none"
          style={{ background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
          </div>

          {/* URL Pill */}
          <div
            className="px-2.5 py-0.5 rounded-full text-zinc-300 truncate max-w-[170px] border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {project.domain}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-semibold">
            {project.isClient ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DELIVERED
              </span>
            ) : (
              <span className="text-[var(--gold)]">AI.SYS</span>
            )}
          </div>
        </div>

        {/* Card Visual Banner */}
        <div
          className="relative h-44 p-5 flex flex-col justify-between overflow-hidden"
          style={{ background: project.gradient }}
        >
          {/* Subtle Vector Drafting Grid Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top Tag Badges */}
          <div className="flex items-center justify-between z-10">
            <span
              className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md"
              style={{
                background: 'rgba(0,0,0,0.65)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
              }}
            >
              {project.tag}
            </span>

            {/* Quick Metrics Badges */}
            <div className="flex items-center gap-1.5">
              {project.metrics?.map((m) => (
                <span
                  key={m}
                  className="px-2 py-0.5 rounded-full text-[9px] font-mono border backdrop-blur-md"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: '#ffdca1',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Banner Title & Subtitle */}
          <div className="z-10 text-white">
            <div className="font-bold text-lg md:text-xl leading-snug drop-shadow-md">
              {project.title}
            </div>
            <div className="font-mono text-[11px] opacity-85 mt-1">
              {project.clientName ? `Client: ${project.clientName}` : project.tech.slice(0, 3).join(' • ')}
            </div>
          </div>

          {/* Soft Dark Bottom Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
            {project.shortDesc}
          </p>

          {/* Key Deliverables Highlights */}
          <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: 'var(--border2)' }}>
            {project.highlights.slice(0, 2).map((h) => (
              <div key={h} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text3)' }}>
                <FiCheckCircle size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[10px] font-mono border"
                style={{
                  background: 'var(--surface2)',
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

      {/* Card Action Footer */}
      <div className="p-6 pt-0 flex items-center gap-2">
        <button
          onClick={() => onInspect(project)}
          className="flex-1 py-2 px-3 rounded-lg border font-mono text-xs font-semibold text-center transition-all hover:border-[var(--gold)] hover:text-[var(--gold)]"
          style={{
            background: 'var(--surface2)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          }}
        >
          Inspect Architecture
        </button>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-4 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'var(--gold)',
            color: '#000',
          }}
          title="Open Live Application"
        >
          <span>Live</span>
          <FiExternalLink size={13} />
        </a>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border text-[var(--text2)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
            style={{
              background: 'var(--surface2)',
              borderColor: 'var(--border)',
            }}
            title="Inspect Source Code on GitHub"
          >
            <FiGithub size={15} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [selectedProject, setSelectedProject] = useState(null)
  const { ref: headRef, visible: headVis } = useScrollReveal()

  useEffect(() => {
    projectsAPI
      .getAll()
      .then((r) => {
        if (r.data?.data && Array.isArray(r.data.data) && r.data.data.length > 0) {
          setProjects(FALLBACK_PROJECTS)
        }
      })
      .catch(() => {
        setProjects(FALLBACK_PROJECTS)
      })
  }, [])

  const filteredProjects =
    filter === 'all'
      ? projects
      : filter === 'client'
      ? projects.filter((p) => p.isClient || p.category === 'client')
      : projects.filter((p) => p.category === filter)

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--void)', color: 'var(--text)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={headRef}
          className="mb-14"
          style={{
            opacity: headVis ? 1 : 0,
            transform: headVis ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)]">
              FEATURED PORTFOLIO & COMMERCIAL DELIVERIES
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="font-bold tracking-tight mb-3"
                style={{
                  fontFamily: "'Clash Display','Cabinet Grotesk',sans-serif",
                  fontSize: 'clamp(36px, 5.5vw, 64px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                }}
              >
                Featured{' '}
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'var(--gold)',
                  }}
                >
                  projects
                </span>
              </h2>
              <p
                className="text-sm md:text-base max-w-2xl leading-relaxed"
                style={{ color: 'var(--text2)' }}
              >
                Real-world software built to production standard: client commercial deliveries, autonomous AI agent loops, and high-performance vector RAG pipelines.
              </p>
            </div>

            {/* Filter Pills with Counts */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border font-mono text-xs self-start md:self-auto" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
              {FILTER_TABS.map((tab) => {
                const isActive = filter === tab.id
                const count =
                  tab.id === 'all'
                    ? projects.length
                    : tab.id === 'client'
                    ? projects.filter((p) => p.isClient).length
                    : projects.filter((p) => p.category === tab.id).length

                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[var(--gold)] text-black font-semibold'
                        : 'text-[var(--text2)] hover:text-[var(--text)]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
            {filteredProjects.map((p) => (
              <ProjectCard
                key={p._id}
                project={p}
                onInspect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Global GitHub Repo CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/hashirahmad806"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border font-mono text-xs font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all hover:scale-105"
            style={{
              background: 'var(--surface2)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <FiGithub size={15} />
            <span>Explore All 25+ Repositories on GitHub ↗</span>
          </a>
        </div>
      </div>

      {/* ── INTERACTIVE ARCHITECTURE INSPECTION MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/65 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden z-10 space-y-6 p-6 md:p-8"
              style={{
                background: 'var(--surface)',
                borderColor: 'rgba(var(--gold-rgb), 0.35)',
                boxShadow: '0 25px 65px -10px rgba(0,0,0,0.5)',
              }}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--gold)]">
                    PROJECT ARCHITECTURE // {selectedProject.tag}
                  </div>
                  <h3 className="font-bold text-2xl text-[var(--text)] mt-1">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.clientName && (
                    <div className="font-mono text-xs text-emerald-400 mt-1">
                      Client: {selectedProject.clientName}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Full Description in Simple Clear English */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--text3)]">
                  System Overview
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {selectedProject.fullDesc}
                </p>
              </div>

              {/* Engineering Highlights */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--text3)]">
                  Key Deliverables & Architecture
                </div>
                <div className="space-y-2 p-4 rounded-xl border" style={{ background: 'var(--surface2)', borderColor: 'var(--border2)' }}>
                  {selectedProject.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 text-xs md:text-sm" style={{ color: 'var(--text)' }}>
                      <FiCheckCircle size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--text3)]">
                  Technology Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs font-mono border"
                      style={{
                        background: 'var(--obsidian)',
                        borderColor: 'var(--border2)',
                        color: 'var(--gold)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t flex flex-wrap items-center gap-3" style={{ borderColor: 'var(--border)' }}>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  style={{
                    background: 'var(--gold)',
                    color: '#000',
                  }}
                >
                  <span>Launch Live Deployment</span>
                  <FiExternalLink size={14} />
                </a>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                    style={{
                      background: 'var(--surface2)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                  >
                    <FiGithub size={15} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
