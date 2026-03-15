import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projectsAPI } from '../../utils/api'

const gold = '#c9a84c'
const dim  = '#5a5a72'

const FALLBACK = [
  { _id:'1', title:'Doctor Appointment Website', category:'fullstack', description:'A comprehensive healthcare platform enabling patients to schedule, manage & track appointments. Features real-time availability, doctor profiles, and a clean booking flow.', tech:['React.js','Material UI','Node.js','Express','MongoDB'], emoji:'🏥', gradient:'linear-gradient(135deg,#667eea,#764ba2)', githubUrl:'https://github.com/hashirahmad806', liveUrl:'#' },
  { _id:'2', title:'Malakand News Website', category:'fullstack', description:'Dynamic news aggregation platform for the Malakand region with category navigation, breaking news alerts, search functionality & a full CMS.', tech:['React.js','Node.js','Express','MongoDB','Tailwind CSS'], emoji:'📰', gradient:'linear-gradient(135deg,#f093fb,#f5576c)', githubUrl:'https://github.com/hashirahmad806', liveUrl:'#' },
  { _id:'3', title:'MERN Auth CRUD App', category:'fullstack', description:'Production-ready full-stack app with JWT authentication, role-based access control & complete CRUD operations built with security best practices.', tech:['React.js','Node.js','Express','MongoDB','JWT'], emoji:'🔐', gradient:'linear-gradient(135deg,#4facfe,#00f2fe)', githubUrl:'https://github.com/hashirahmad806', liveUrl:'#' },
  { _id:'4', title:'E-Commerce Platform', category:'fullstack', description:'Full-featured online store with product catalog, cart management, order tracking & user authentication with a seamless checkout experience.', tech:['React.js','Tailwind CSS','Node.js','Express','MongoDB'], emoji:'🛒', gradient:'linear-gradient(135deg,#43e97b,#38f9d7)', githubUrl:'https://github.com/hashirahmad806', liveUrl:'#' },
  { _id:'5', title:'Task Manager Pro', category:'frontend', description:'Feature-rich Kanban task management app with drag-and-drop boards, priority tagging, deadline tracking & smooth Framer Motion animations.', tech:['React.js','Tailwind CSS','Framer Motion','Context API'], emoji:'✅', gradient:'linear-gradient(135deg,#fa709a,#fee140)', githubUrl:'https://github.com/hashirahmad806', liveUrl:'#' },
  { _id:'6', title:'REST API Boilerplate', category:'backend', description:'Production-ready Node.js/Express API starter with JWT auth, rate limiting, error handling, request logging & MongoDB integration.', tech:['Node.js','Express','MongoDB','JWT','Mongoose'], emoji:'⚙️', gradient:'linear-gradient(135deg,#30cfd0,#330867)', githubUrl:'https://github.com/hashirahmad806', liveUrl:'#' },
]

const FILTERS = ['all','fullstack','frontend','backend']

function ProjectCard({ p, i }) {
  const { ref, visible } = useScrollReveal(0.05)
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.25)' }}
      style={{
        borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)',
        background: '#11111f', overflow: 'hidden', cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .6s ease ${i * 0.07}s, transform .6s ease ${i * 0.07}s`,
        boxShadow: '0 0 0 0 transparent',
      }}
    >
      {/* Visual header */}
      <div style={{ height: 170, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: p.gradient, opacity: 0.18 }} />
        <span style={{ fontSize: 56, position: 'relative', zIndex: 1 }}>{p.emoji}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '24px' }}>
        <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: gold, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
          {p.category}
        </div>
        <div style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 10, lineHeight: 1.2 }}>
          {p.title}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: dim, marginBottom: 18 }}>
          {p.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {p.tech.map(t => (
            <span key={t} style={{ padding: '4px 10px', borderRadius: 6, fontFamily: 'JetBrains Mono,monospace', fontSize: 10, letterSpacing: '0.04em', border: '1px solid rgba(255,255,255,0.06)', color: dim }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { href: p.githubUrl, Icon: FiGithub, label: 'Code'      },
            { href: p.liveUrl,   Icon: FiExternalLink, label: 'Demo' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                fontFamily: "'Cabinet Grotesk',sans-serif",
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#9090a8', textDecoration: 'none',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)'; e.currentTarget.style.color = gold }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.color = '#9090a8' }}
            >
              <Icon size={12} /> {label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 1, background: p.gradient, opacity: 0.35 }} />
    </motion.div>
  )
}

export default function Projects() {
  const [filter,   setFilter]   = useState('all')
  const [projects, setProjects] = useState(FALLBACK)
  const { ref: hRef, visible: hVis } = useScrollReveal()

  useEffect(() => {
    projectsAPI.getAll()
      .then(r => { if (r.data?.data?.length) setProjects(r.data.data) })
      .catch(() => {/* use fallback */})
  }, [])

  const shown = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" style={{ padding: '120px 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={hRef} style={{ opacity: hVis?1:0, transform: hVis?'translateY(0)':'translateY(24px)', transition: 'opacity .7s, transform .7s', marginBottom: 20 }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 1, background: gold }} />
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Portfolio</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'white' }}>
            Featured <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>projects</em>
          </h2>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                fontFamily: "'Cabinet Grotesk',sans-serif",
                border: '1px solid ' + (filter === f ? gold : 'rgba(255,255,255,.08)'),
                background: filter === f ? gold : 'transparent',
                color: filter === f ? '#080810' : '#9090a8',
                cursor: 'pointer', transition: 'all .25s',
                textTransform: 'capitalize',
              }}
            >
              {f === 'all' ? 'All Projects' : f === 'fullstack' ? 'Full Stack' : f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" layout>
            {shown.map((p, i) => (
              <motion.div key={p._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProjectCard p={p} i={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a
            href="https://github.com/hashirahmad806" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 28px', borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.09)',
              color: '#9090a8', fontSize: 14, fontWeight: 600,
              fontFamily: "'Cabinet Grotesk',sans-serif", textDecoration: 'none',
              transition: 'all .25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,168,76,.35)'; e.currentTarget.style.color=gold }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.09)'; e.currentTarget.style.color='#9090a8' }}
          >
            <FiGithub size={16} /> View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
