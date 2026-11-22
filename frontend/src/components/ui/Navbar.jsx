import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true
const gold = '#ffdca1'

const links = [
  { to: 'about',           label: 'About'          },
  { to: 'skills',          label: 'Skills'         },
  { to: 'projects',        label: 'Projects'       },
  { to: 'experience',      label: 'Experience'     },
  { to: 'learning',        label: 'Agentic Journey'},
  { to: 'certifications',  label: 'Certifications' },
  { to: 'contact',         label: 'Contact'        },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-2.5 rounded-full border border-[var(--border2)] transition-all duration-300 shadow-2xl"
          style={{
            background: scrolled
              ? (dark ? 'rgba(14,14,15,0.85)' : 'rgba(255,255,255,0.85)')
              : (dark ? 'rgba(14,14,15,0.65)' : 'rgba(255,255,255,0.65)'),
            backdropFilter: 'blur(24px)',
            boxShadow: dark
              ? '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 8px 32px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.9)',
            maxWidth: '940px',
            width: '100%',
          }}
        >
          {/* Logo */}
          <Link to="hero" smooth spy offset={-100} className="cursor-pointer flex items-center gap-2">
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Clash Display','Syne',sans-serif", color: 'var(--text)' }}
            >
              Hashir<span style={{ color: gold }}>.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                smooth spy offset={-100}
                className="nav-link"
                style={{
                  fontFamily: "'Cabinet Grotesk','DM Sans',sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text2)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color .2s'
                }}
                activeStyle={{ color: 'var(--text)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text2)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'
                e.currentTarget.style.color = '#38bdf8'
                if (motionOk) e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {dark ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>

            {/* Hire Me CTA */}
            <Link
              to="contact" smooth offset={-100}
              className="hidden md:flex items-center gap-2"
              style={{
                padding: '6px 16px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 100,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                color: '#fff',
                boxShadow: '0 2px 10px rgba(56,189,248,0.25)',
                textDecoration: 'none',
              }}
            >
              Contact
            </Link>

            {/* Mobile menu */}
            <button
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center"
              style={{ border: '1px solid var(--border)', color: 'var(--text2)' }}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 h-full flex flex-col py-20 px-8 gap-3"
              style={{
                width: 'min(300px, 85vw)',
                background: 'var(--surface)',
                borderLeft: '1px solid var(--border)'
              }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 + 0.1 }}
                >
                  <Link
                    to={l.to} smooth offset={-100}
                    className="block py-2.5 border-b text-xl font-bold"
                    style={{ fontFamily: "'Clash Display','Syne',sans-serif", borderColor: 'var(--border)', color: 'var(--text)', cursor: 'pointer' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
