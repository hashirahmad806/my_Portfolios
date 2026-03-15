import { useScrollReveal } from '../../hooks/useScrollReveal'

const gold = '#c9a84c'
const dim  = '#5a5a72'
const muted = '#9090a8'

const experiences = [
  {
    period: '2023 – Present', color: '#61DAFB',
    title: 'React.js Frontend Development',
    desc: 'Building component-driven UIs with React hooks, context API & state management. Creating reusable component libraries and integrating REST APIs for dynamic experiences.',
    points: ['Built 10+ React apps with modern hooks & patterns','Responsive layouts with Tailwind CSS & Material UI','REST API integration for dynamic data rendering','Performance optimization with lazy loading & code splitting'],
  },
  {
    period: '2023 – Present', color: '#339933',
    title: 'Node.js & Express Backend',
    desc: 'Designing RESTful APIs with Node.js and Express.js. Implementing JWT authentication, middleware pipelines, request validation & error handling for production-grade servers.',
    points: ['Secure REST APIs with JWT & bcrypt','Middleware for auth, validation & error handling','MVC architecture for scalable applications','Third-party service & webhook integrations'],
  },
  {
    period: '2023 – Present', color: '#47A248',
    title: 'MongoDB Database Integration',
    desc: 'Designing NoSQL schemas with Mongoose ODM, building aggregation pipelines & implementing indexing strategies for high-performance data layers.',
    points: ['Optimized MongoDB schemas with Mongoose','Complex aggregation pipelines for analytics','Referencing & embedding strategies','CRUD operations with robust error handling'],
  },
  {
    period: '2023 – Present', color: '#c9a84c',
    title: 'Full Stack MERN Projects',
    desc: 'End-to-end development of complete web applications — from architecture and database design to deployment on cloud platforms. Delivering production-ready digital products.',
    points: ['Deployed apps on Vercel & Render','User auth with bcrypt & JWT tokens','Git/GitHub version control & collaboration','Optimized production builds & deployments'],
  },
]

function ExpCard({ e, idx }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      style={{
        padding: '32px 28px', borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#11111f', position: 'relative', overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .7s ease ${idx * 0.12}s, transform .7s ease ${idx * 0.12}s, border-color .3s`,
      }}
      onMouseEnter={ev => {
        ev.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'
        ev.currentTarget.querySelector('.accent-bar').style.height = '100%'
      }}
      onMouseLeave={ev => {
        ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        ev.currentTarget.querySelector('.accent-bar').style.height = '0%'
      }}
    >
      {/* Accent bar */}
      <div className="accent-bar" style={{ position: 'absolute', top: 0, left: 0, width: 3, height: 0, background: e.color, transition: 'height .5s ease', borderRadius: '0 0 3px 3px' }} />

      {/* Period */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 18, height: 1, background: e.color, opacity: 0.6 }} />
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: e.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{e.period}</span>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 19, fontWeight: 600, color: 'white', marginBottom: 14, lineHeight: 1.2 }}>
        {e.title}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: 13, lineHeight: 1.75, color: muted, marginBottom: 20 }}>{e.desc}</p>

      {/* Bullet points */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {e.points.map(pt => (
          <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: dim, lineHeight: 1.5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: e.color, flexShrink: 0, marginTop: 5 }} />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  const { ref, visible } = useScrollReveal()
  return (
    <section id="experience" style={{ padding: '120px 0', background: '#0c0c18' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={ref} style={{ opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(24px)', transition: 'opacity .7s, transform .7s', marginBottom: 64 }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 1, background: gold }} />
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Experience</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'white' }}>
            What I <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>do best</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {experiences.map((e, i) => <ExpCard key={e.title} e={e} idx={i} />)}
        </div>
      </div>
    </section>
  )
}
