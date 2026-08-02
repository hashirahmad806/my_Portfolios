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
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div style={{ position:'absolute', width:600, height:600, top:-150, right:-150, borderRadius:'50%', background:'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', filter:'blur(80px)', animation:'floatOrb 8s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:450, height:450, bottom:'20%', left:-100, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter:'blur(80px)', animation:'floatOrb 11s ease-in-out infinite reverse' }} />
        </div>
        <style>{`@keyframes floatOrb{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}`}</style>
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
