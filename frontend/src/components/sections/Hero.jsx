import { motion } from 'framer-motion'
import { Link }   from 'react-scroll'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi'
import hashirPhoto from '../../assets/hashir.jpg'

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } } },
  item:      { hidden: { y: 32, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25,0.46,0.45,0.94] } } },
}

const gold   = '#c9a84c'
const gold2  = '#e8c97a'
const muted  = '#9090a8'
const muted2 = '#5a5a72'

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 75% 55% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 55% at 50% 50%, black 0%, transparent 100%)',
      }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={stagger.container}
          initial="hidden"
          animate="show"
        >
          {/* ── Left column ── */}
          <div>
            {/* Status badge */}
            <motion.div variants={stagger.item} className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full" style={{ border: '1px solid rgba(0,229,160,0.2)', background: 'rgba(0,229,160,0.04)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00e5a0', boxShadow: '0 0 10px #00e5a0', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 8px #00e5a0}50%{box-shadow:0 0 18px #00e5a0,0 0 26px rgba(0,229,160,.3)}}`}</style>
              <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: '#00e5a0', letterSpacing: '0.1em' }}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Role label */}
            <motion.div variants={stagger.item} className="flex items-center gap-3 mb-4">
              <div style={{ width: 28, height: 1, background: gold }} />
              <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                MERN Stack Developer
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={stagger.item}
              style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(52px,6.5vw,88px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 20 }}
            >
              <span style={{ color: 'white', display: 'block' }}>Hashir</span>
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold, display: 'block', fontSize: '1.05em' }}>Ahmad</span>
              <span style={{ color: '#3a3a55', display: 'block' }}>builds the web.</span>
            </motion.h1>

            {/* Type animation */}
            <motion.div variants={stagger.item} className="flex items-center gap-3 mb-5" style={{ height: 36 }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 14, color: muted }}>
                &gt;&nbsp;
                <TypeAnimation
                  sequence={['React.js Developer', 2000, 'Node.js Engineer', 2000, 'Full Stack MERN', 2000, 'MongoDB Architect', 2000, 'API Builder', 2000]}
                  wrapper="span"
                  repeat={Infinity}
                  style={{ color: gold2 }}
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p variants={stagger.item} style={{ fontSize: 16, lineHeight: 1.8, color: muted, maxWidth: 520, marginBottom: 44 }}>
              I craft <strong style={{ color: 'white' }}>scalable, modern web applications</strong> using the MERN stack —
              blending pixel-perfect React UIs with robust Node.js & Express backends,
              powered by MongoDB. Every project is built to perform, scale, and impress.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-3 mb-10">
              <Link to="projects" smooth offset={-80}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(201,168,76,.35)' }}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide"
                  style={{ background: gold, color: '#080810', fontFamily: "'Cabinet Grotesk',sans-serif", border: 'none', cursor: 'pointer' }}
                >
                  View Projects <span>→</span>
                </motion.button>
              </Link>
              <motion.a
                href="https://github.com/hashirahmad806" target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm tracking-wide"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: muted, background: 'rgba(255,255,255,0.02)', fontFamily: "'Cabinet Grotesk',sans-serif", textDecoration: 'none' }}
              >
                <FiGithub size={15} /> GitHub
              </motion.a>
              <Link to="contact" smooth offset={-80}>
                <motion.button
                  whileHover={{ y: -2, borderColor: 'rgba(201,168,76,.4)', color: gold }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: muted, background: 'transparent', fontFamily: "'Cabinet Grotesk',sans-serif", cursor: 'pointer' }}
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Socials */}
            <motion.div variants={stagger.item} className="flex items-center gap-4">
              <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: muted2, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Find me</span>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              {[
                { href: 'https://github.com/hashirahmad806',                         Icon: FiGithub   },
                { href: 'https://www.linkedin.com/in/hashir-ahmad-25639031b', Icon: FiLinkedin },
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2, borderColor: 'rgba(201,168,76,.4)', color: gold }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', color: muted, background: 'rgba(255,255,255,0.02)', textDecoration: 'none', transition: 'all .2s' }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right photo column ── */}
          <motion.div
            variants={stagger.item}
            className="hidden lg:flex justify-center"
          >
            <div className="relative" style={{ width: 380 }}>
              {/* Decorative frame behind */}
              <div style={{
                position: 'absolute', top: -14, left: -14, right: 14, bottom: 14,
                border: '1px solid rgba(201,168,76,0.18)', borderRadius: 28,
                background: 'linear-gradient(135deg,rgba(201,168,76,0.04),transparent)',
              }} />
              <div style={{
                position: 'absolute', top: 14, left: 14, right: -14, bottom: -14,
                border: '1px solid rgba(255,255,255,0.04)', borderRadius: 28,
              }} />

              {/* Photo */}
              <motion.img
                src={hashirPhoto}
                alt="Hashir Ahmad — MERN Stack Developer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '100%', aspectRatio: '4/5', objectFit: 'cover',
                  borderRadius: 22, position: 'relative', zIndex: 1,
                  filter: 'contrast(1.05) saturate(0.95)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                }}
              />

              {/* Floating badge — top left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: 28, left: -40, zIndex: 2,
                  background: 'rgba(8,8,22,0.92)', backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14,
                  padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{ fontSize: 22 }}>⚡</span>
                <div>
                  <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1 }}>MERN</div>
                  <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: muted2, marginTop: 2 }}>Full Stack</div>
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                style={{
                  position: 'absolute', bottom: 48, right: -36, zIndex: 2,
                  background: 'rgba(8,8,22,0.92)', backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14,
                  padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{ fontSize: 22 }}>🚀</span>
                <div>
                  <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1 }}>10+</div>
                  <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: muted2, marginTop: 2 }}>Projects</div>
                </div>
              </motion.div>

              {/* Stats strip */}
              <div style={{
                position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 32, whiteSpace: 'nowrap', zIndex: 2,
              }}>
                {[['10+','Projects'],['2+','Years'],['4','Core Tech']].map(([n,l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1 }}>
                      {n.replace('+','')}<span style={{ color: gold }}>+</span>
                    </div>
                    <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 11, color: muted2, marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: muted2, letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
          <motion.div animate={{ y: [0,6,0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <FiArrowDown size={13} style={{ color: muted2 }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
