import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi'

const navLinks = ['about','skills','projects','experience','learning','contact']

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080810' }} className="relative z-10 py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap">

          {/* Brand */}
          <Link to="hero" smooth className="cursor-pointer">
            <span className="text-lg font-bold text-white" style={{ fontFamily: "'Clash Display','Syne',sans-serif" }}>
              Hashir<span style={{ color: '#c9a84c' }}>.</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6 justify-center">
            {navLinks.map(l => (
              <Link
                key={l} to={l} smooth offset={-80}
                className="capitalize cursor-pointer transition-colors duration-200"
                style={{ fontSize: 13, color: '#9090a8', fontFamily: "'Cabinet Grotesk',sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#9090a8'}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { href: 'https://github.com/hashirahmad806', Icon: FiGithub },
              { href: 'https://www.linkedin.com/in/hashir-ahmad-25639031b', Icon: FiLinkedin },
            ].map(({ href, Icon }) => (
              <a
                key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#9090a8' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.color = '#c9a84c' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#9090a8' }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="flex items-center gap-1.5 text-xs" style={{ color: '#5a5a72', fontFamily: 'JetBrains Mono,monospace' }}>
            © {new Date().getFullYear()} Hashir Ahmad
            <FiHeart size={11} style={{ color: '#c9a84c' }} />
            Built with MERN Stack
          </p>
          <div className="flex gap-2">
            {['React','Node.js','MongoDB'].map(t => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-[10px] tracking-wide"
                style={{ fontFamily: 'JetBrains Mono,monospace', border: '1px solid rgba(255,255,255,0.06)', color: '#5a5a72' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
