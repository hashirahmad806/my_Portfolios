import { FiExternalLink, FiDownload, FiAward, FiZap } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { certifications } from '../../data/certifications'

const gold  = '#c9a84c'
const gold2 = '#e8c97a'

/* ─────────────────────────────────────────────────────
   Shared depth-card style tokens
   shadow: outer dark + inner top-highlight (1px)
───────────────────────────────────────────────────── */
const CARD_SHADOW  = '0 2px 8px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
const CARD_SHADOW_HOVER = (color) =>
  `0 6px 20px rgba(0,0,0,0.55), 0 18px 48px rgba(0,0,0,0.35), 0 0 0 1px ${color}22, 0 0 28px ${color}10, inset 0 1px 0 rgba(255,255,255,0.07)`

/* prefers-reduced-motion guard — evaluated once at module load */
const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

/* ─── Frosted-glass icon chip ─── */
function IconChip({ icon, color }) {
  return (
    <div style={{
      width: 46, height: 46, borderRadius: 13, flexShrink: 0,
      background: `linear-gradient(145deg, ${color}20, ${color}08)`,
      border: `1px solid ${color}30`,
      boxShadow: `inset 0 1px 3px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.25)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 20,
    }}>
      {icon}
    </div>
  )
}

/* ─── Single certification card ─── */
function CertCard({ cert, idx }) {
  const { ref, visible } = useScrollReveal()

  const handleEnter = (ev) => {
    const el = ev.currentTarget
    el.style.transform = motionOk ? 'translateY(-5px)' : 'none'
    el.style.boxShadow = CARD_SHADOW_HOVER(cert.color)
    el.style.borderColor = `${cert.color}28`
  }
  const handleLeave = (ev) => {
    const el = ev.currentTarget
    el.style.transform = 'translateY(0)'
    el.style.boxShadow = CARD_SHADOW
    el.style.borderColor = `${cert.color}18`
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        /* Layout */
        padding: '26px 24px 24px',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',

        /* Soft-depth surface */
        background: 'linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 100%), var(--surface)',
        border: `1px solid ${cert.color}18`,
        boxShadow: CARD_SHADOW,

        /* Scroll reveal */
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',

        /* Transitions — honor prefers-reduced-motion */
        transition: motionOk
          ? `opacity .65s ease ${idx * 0.1}s, transform .65s ease ${idx * 0.1}s, box-shadow .35s ease, border-color .35s ease`
          : `opacity .65s ease ${idx * 0.1}s`,
      }}
    >
      {/* ── Colored left accent bar (always 4px visible, expands on hover) ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 4,
        background: `linear-gradient(180deg, ${cert.color}, ${cert.color}55)`,
        borderRadius: '20px 0 0 20px',
      }} />

      {/* ── Top-left corner radial glow tied to issuer color ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60% 40% at 0% 0%, ${cert.color}10, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* ── Recent badge — top-right corner ── */}
      {cert.isRecent && (
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 2,
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '3px 9px', borderRadius: 100,
          background: `linear-gradient(135deg, ${gold}30, ${gold}12)`,
          border: `1px solid ${gold}40`,
          backdropFilter: 'blur(8px)',
        }}>
          <FiZap size={9} style={{ color: gold2 }} />
          <span style={{
            fontFamily: 'JetBrains Mono,monospace',
            fontSize: 8, letterSpacing: '0.12em',
            color: gold2, textTransform: 'uppercase',
          }}>
            Recent
          </span>
        </div>
      )}

      {/* ── Card body ── */}
      <div style={{ position: 'relative', zIndex: 1, paddingLeft: 12 }}>

        {/* Icon chip + platform badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <IconChip icon={cert.icon} color={cert.color} />

          <span style={{
            fontFamily: 'JetBrains Mono,monospace',
            fontSize: 9, letterSpacing: '0.14em',
            padding: '4px 10px', borderRadius: 6,
            border: `1px solid ${cert.color}28`,
            color: cert.color,
            background: `linear-gradient(135deg, ${cert.color}12, ${cert.color}06)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
            textTransform: 'uppercase',
          }}>
            {cert.platform}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Clash Display','Syne',sans-serif",
          fontSize: 15, fontWeight: 600,
          color: 'var(--text)', marginBottom: 10, lineHeight: 1.35,
        }}>
          {cert.title}
        </h3>

        {/* Issuer + date */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 18,
          flexWrap: 'wrap', gap: 6,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 18, height: 1, background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--text2)' }}>
              {cert.issuer}
            </span>
          </div>
          <span style={{
            fontFamily: 'JetBrains Mono,monospace',
            fontSize: 10, color: 'var(--text3)', letterSpacing: '0.08em',
          }}>
            {cert.date}
          </span>
        </div>

        {/* Credential ID — distinct code chip (Azure only) */}
        {cert.credentialId && (
          <div style={{
            marginBottom: 16,
            padding: '8px 12px', borderRadius: 9,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.25), rgba(0,0,0,0.12))',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono,monospace', fontSize: 8,
              color: 'var(--text3)', letterSpacing: '0.15em',
              textTransform: 'uppercase', flexShrink: 0,
            }}>
              Credential ID
            </span>
            <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{
              fontFamily: 'JetBrains Mono,monospace', fontSize: 11,
              color: gold, letterSpacing: '0.04em',
            }}>
              {cert.credentialId}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>

          {/* View PDF — outlined tactile */}
          <a
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 15px', borderRadius: 9,
              fontSize: 12, fontWeight: 600,
              fontFamily: "'Cabinet Grotesk',sans-serif",
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.2)',
              color: 'var(--text2)',
              textDecoration: 'none',
              transition: 'all .2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${cert.color}50`
              e.currentTarget.style.color = cert.color
              e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3), 0 0 8px ${cert.color}20`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'var(--text2)'
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.2)'
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            <FiDownload size={12} /> View PDF
          </a>

          {/* Verify — gradient primary */}
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 15px', borderRadius: 9,
                fontSize: 12, fontWeight: 600,
                fontFamily: "'Cabinet Grotesk',sans-serif",
                background: `linear-gradient(135deg, ${cert.color}dd, ${cert.color}88)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px ${cert.color}30, 0 4px 16px rgba(0,0,0,0.25)`,
                border: `1px solid ${cert.color}50`,
                color: '#080810',
                textDecoration: 'none',
                transition: 'all .2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px ${cert.color}50, 0 8px 24px rgba(0,0,0,0.3)`
                e.currentTarget.style.transform = motionOk ? 'translateY(-1px)' : 'none'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px ${cert.color}30, 0 4px 16px rgba(0,0,0,0.25)`
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
              onMouseUp={e => { e.currentTarget.style.transform = motionOk ? 'translateY(-1px)' : 'translateY(0)' }}
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

        {/* Section header */}
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
                <span style={{
                  fontFamily: 'JetBrains Mono,monospace', fontSize: 11,
                  color: gold, letterSpacing: '0.25em', textTransform: 'uppercase',
                }}>
                  Credentials
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Clash Display','Syne',sans-serif",
                fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600,
                lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)',
              }}>
                My{' '}
                <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>
                  certifications
                </em>
              </h2>
            </div>

            {/* Count badge — soft depth */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 22px', borderRadius: 16, flexShrink: 0,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.05)), var(--surface)',
              border: `1px solid ${gold}20`,
              boxShadow: `${CARD_SHADOW}, 0 0 16px ${gold}08`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(145deg, ${gold}25, ${gold}0a)`,
                border: `1px solid ${gold}30`,
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FiAward size={16} style={{ color: gold }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                  {certifications.length}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: 'var(--text3)', marginTop: 2, letterSpacing: '0.12em' }}>
                  CERTIFICATES
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-col card grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
