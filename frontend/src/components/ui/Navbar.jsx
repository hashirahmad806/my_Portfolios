import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const links = [
  { to: 'about',      label: 'About'      },
  { to: 'skills',     label: 'Skills'     },
  { to: 'projects',   label: 'Projects'   },
  { to: 'experience', label: 'Experience' },
  { to: 'learning',   label: 'Learning'   },
  { to: 'contact',    label: 'Contact'    },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navBg = scrolled
    ? (dark ? 'rgba(8,8,16,0.88)' : 'rgba(248,249,250,0.88)')
    : 'transparent'

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.4s ease',
          padding: scrolled ? '14px 48px' : '24px 48px',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="hero" smooth spy offset={-80} className="cursor-pointer">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "'Clash Display','Syne',sans-serif", color: 'var(--text)' }}
            >
              Hashir<span style={{ color: '#c9a84c' }}>.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                smooth spy offset={-80}
                className="nav-link"
                style={{ fontFamily: "'Cabinet Grotesk','DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text2)', cursor: 'pointer', position: 'relative', transition: 'color .2s' }}
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
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text2)' }}
            >
              {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>

            {/* Hire Me CTA */}
            <Link
              to="contact" smooth offset={-80}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "'Cabinet Grotesk',sans-serif",
                border: '1px solid rgba(201,168,76,0.35)',
                background: 'rgba(201,168,76,0.04)',
                color: '#c9a84c',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#080810' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.04)'; e.currentTarget.style.color = '#c9a84c' }}
            >
              Hire Me
            </Link>

            {/* Mobile menu */}
            <button
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ border: '1px solid var(--border)', color: 'var(--text2)' }}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <FiX size={17} /> : <FiMenu size={17} />}
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
              style={{ background: 'rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 h-full flex flex-col py-20 px-10 gap-2"
              style={{ width: 'min(320px, 85vw)', background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', borderLeft: '1px solid var(--border)' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={l.to} smooth offset={-80}
                    className="block py-3 border-b text-2xl font-bold"
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
