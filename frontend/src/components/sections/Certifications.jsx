import { motion } from 'framer-motion'
import { FiExternalLink, FiDownload, FiAward } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { certifications } from '../../data/certifications'

const gold  = '#c9a84c'
const gold2 = '#e8c97a'

/* ─── Reusable reveal wrapper (same pattern as About.jsx) ─── */
function RevealDiv({ children, delay = 0, style = {} }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Single certification card ─── */
function CertCard({ cert, idx }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      style={{
        padding: '28px 26px',
        borderRadius: 20,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .7s ease ${idx * 0.1}s, transform .7s ease ${idx * 0.1}s, border-color .3s`,
      }}
      onMouseEnter={ev => {
        ev.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'
        const bar = ev.currentTarget.querySelector('.cert-accent-bar')
        if (bar) bar.style.height = '100%'
      }}
      onMouseLeave={ev => {
        ev.currentTarget.style.borderColor = 'var(--border)'
        const bar = ev.currentTarget.querySelector('.cert-accent-bar')
        if (bar) bar.style.height = '0%'
      }}
    >
      {/* Left accent bar — matches ExpCard pattern */}
      <div
        className="cert-accent-bar"
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 3, height: 0,
          background: cert.color,
          transition: 'height .5s ease',
          borderRadius: '0 0 3px 3px',
        }}
      />

      {/* Subtle gradient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at top left, ${cert.color}09, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon + issuer badge row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `${cert.color}18`,
            border: `1px solid ${cert.color}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>
            {cert.icon}
          </div>

          {/* Platform badge */}
          <span style={{
            fontFamily: 'JetBrains Mono,monospace',
            fontSize: 9, letterSpacing: '0.12em',
            padding: '4px 10px', borderRadius: 6,
            border: `1px solid ${cert.color}30`,
            color: cert.color,
            background: `${cert.color}0a`,
            textTransform: 'uppercase',
          }}>
            {cert.platform}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Clash Display','Syne',sans-serif",
          fontSize: 15, fontWeight: 600,
          color: 'var(--text)', marginBottom: 8, lineHeight: 1.3,
        }}>
          {cert.title}
        </h3>

        {/* Issuer + date row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 16, height: 1, background: cert.color, opacity: 0.5 }} />
            <span style={{
              fontFamily: 'JetBrains Mono,monospace',
              fontSize: 11, color: 'var(--text2)',
            }}>
              {cert.issuer}
            </span>
          </div>
          <span style={{
            fontFamily: 'JetBrains Mono,monospace',
            fontSize: 10, color: 'var(--text3)',
            letterSpacing: '0.08em',
          }}>
            {cert.date}
          </span>
        </div>

        {/* Credential ID (if present) */}
        {cert.credentialId && (
          <div style={{
            marginBottom: 16,
            padding: '8px 12px', borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--surface2)',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.1em' }}>
              CREDENTIAL ID&nbsp;&nbsp;
            </span>
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: gold }}>
              {cert.credentialId}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 8,
              fontSize: 12, fontWeight: 600,
              fontFamily: "'Cabinet Grotesk',sans-serif",
              border: '1px solid var(--border)',
              color: 'var(--text2)',
              textDecoration: 'none',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${cert.color}55`; e.currentTarget.style.color = cert.color }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
          >
            <FiDownload size={12} /> View PDF
          </a>

          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 8,
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Cabinet Grotesk',sans-serif",
                border: `1px solid ${cert.color}40`,
                color: cert.color,
                background: `${cert.color}08`,
                textDecoration: 'none',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = cert.color; e.currentTarget.style.color = '#080810' }}
              onMouseLeave={e => { e.currentTarget.style.background = `${cert.color}08`; e.currentTarget.style.color = cert.color }}
            >
              <FiExternalLink size={12} /> Verify
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Section ─── */
export default function Certifications() {
  const { ref: hRef, visible: hVis } = useScrollReveal()

  return (
    <section id="certifications" style={{ padding: '120px 0', background: 'var(--void)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Section header — matches Experience/Skills pattern */}
        <div
          ref={hRef}
          style={{
            opacity: hVis ? 1 : 0,
            transform: hVis ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .7s, transform .7s',
            marginBottom: 64,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 28, height: 1, background: gold }} />
                <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  Credentials
                </span>
              </div>
              <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                My{' '}
                <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>
                  certifications
                </em>
              </h2>
            </div>

            {/* Summary badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 20px', borderRadius: 14,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              flexShrink: 0,
            }}>
              <FiAward size={18} style={{ color: gold }} />
              <div>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                  {certifications.length}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: 'var(--text3)', marginTop: 2, letterSpacing: '0.1em' }}>
                  CERTIFICATES
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-col grid — matches Experience layout */}
        <div className="grid md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
