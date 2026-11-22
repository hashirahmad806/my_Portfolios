import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider }  from './context/ThemeContext'
import Cursor      from './components/ui/Cursor'
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
  useEffect(() => { const t = setTimeout(() => setLoading(false), 2400); return () => clearTimeout(t) }, [])

  return (
    <ThemeProvider>
      <div className="relative min-h-screen" style={{ background:'var(--obsidian)', color:'var(--text)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
        {/* Global architectural ambient canvas — cohesive across the entire page */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            maxWidth: '1280px',
            height: '600px',
            background: 'radial-gradient(ellipse 70% 500px at 50% 0%, rgba(var(--gold-rgb), 0.075), transparent 75%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '15%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(var(--gold-rgb), 0.035) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }} />
        </div>
        {loading && <Loader />}
        <Cursor />
        <Navbar />
        <main className="relative z-10">
          <Hero /><About /><Skills /><Projects /><Experience /><Learning /><Certifications /><GitHubActivity /><Contact />
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={4000} toastStyle={{ background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', fontSize:14 }} />
      </div>
    </ThemeProvider>
  )
}
