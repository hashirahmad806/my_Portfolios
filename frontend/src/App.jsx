import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider }  from './context/ThemeContext'
import Cursor      from './components/ui/Cursor'
import BlueprintGrid from './components/ui/BlueprintGrid'
import SystemHUD     from './components/ui/SystemHUD'
import AgentTerminal from './components/ui/AgentTerminal'
import Loader      from './components/ui/Loader'
import Navbar      from './components/ui/Navbar'
import Footer      from './components/ui/Footer'
import Hero        from './components/sections/Hero'
import About       from './components/sections/About'
import Skills      from './components/sections/Skills'
import Projects    from './components/sections/Projects'
import Experience  from './components/sections/Experience'
import Learning        from './components/sections/Learning'
import Certifications  from './components/sections/Certifications'
import GitHubActivity  from './components/sections/GitHubActivity'
import Contact         from './components/sections/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 2400); return () => clearTimeout(t) }, [])

  // Global shortcut to toggle Agent Terminal with ~ or Ctrl+K
  useEffect(() => {
    const handleGlobalKey = (e) => {
      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      if (e.key === '`' || e.key === '~' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [])

  return (
    <ThemeProvider>
      <div className="relative min-h-screen" style={{ background:'var(--obsidian)', color:'var(--text)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
        {/* Global architectural blueprint grid & interactive canvas */}
        <BlueprintGrid />
        {loading && <Loader />}
        <Cursor />
        <Navbar />
        <main className="relative z-10">
          <Hero /><About /><Skills /><Projects /><Experience /><Learning /><Certifications /><GitHubActivity /><Contact />
        </main>
        <SystemHUD onOpenTerminal={() => setTerminalOpen(true)} />
        <AgentTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
        <Footer />
        <ToastContainer position="bottom-right" autoClose={4000} toastStyle={{ background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', fontSize:14 }} />
      </div>
    </ThemeProvider>
  )
}
