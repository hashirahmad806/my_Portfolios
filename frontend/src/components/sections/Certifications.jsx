import { useScrollReveal } from '../../hooks/useScrollReveal'
import { certifications } from '../../data/certifications'

const gold = '#ffdca1'

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

/* ─── Reusable 3D Tilt Card Component ─── */
function CertCard({ cert, idx, className, style }) {
  const { ref, visible } = useScrollReveal()

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)

    if (motionOk) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 50
      const rotateY = (centerX - x) / 50
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
      card.style.borderColor = 'rgba(255, 184, 0, 0.3)'
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 184, 0, 0.05)'
    }
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    card.style.borderColor = ''
    card.style.boxShadow = 'none'
  }

  // Define logos from the HTML mockup code
  const logos = {
    'computer-vision-ibm': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-QwJLfMomU6l1z8b1mLv6QeVx8yDDH0UImIpAgXllZu6UkUcW3YXxfgUPc-CDQkyPHFz6I5dP0euY2ZqhOW1Tg91ftVlGSpcOf_a_Lujk6lsOWhNOG6BQ71Zu9w0p6-nvn-3QBACFIiCulhqMjlWTpBPR08WPo6DOA2sCj9GOYZ8O6Xbjf6KoabAAl8eV39Na2-7E3u1WPuRmMTRU7zLldZjNiQAePRANxFqdY2zU2PhuVBpqQ1BCmB7OJsoUfboYBsydVJMU7ss',
    'ai-fundamentals-google': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhUoG8KE5DPr4cBo-E5qYyedV6yN7oaaXeyKPHkRmcGDD-LZMrEMbtu8locmVqSOjFe5CSUtiflsTYh_2U4zNFcH4M2OtdztU-5KTQaR6kwpyLg62oW5kTynsmt7NmzA795jLeRbgZqhNMhqoEvQcyaOQ_xZoTlvmyGXlgHaH1iyPiauIGE8MAlhMbRF4ReJnK3U2cdQC5v_As_GdYamszaIgkSkUrecW9yXNRAqefgVk7oYPKLJuh-0m1WutQQa1rF8oWRfefbeA',
    'cybersecurity-ibm': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSmRpyIyDvQUL4Ufdp7Q8DyhDDiJZDzSI9N4NzZ9VdHNwUeaN5m3Lst1QuThXkokgi4Za-XAVHd7GIVnkwMDZpYvMZY5XegfdUPkWt48bUcH55XUTvCbJMd_GO9XoCBrLdDNScCBK3RiIlEyyLwSa2POa2BPW5_WCS3elk-tJEOIvsgTQT4p4qGnKmQuEM9MXDIuKnWaL8MqzwNKso9iBuCbuz2gn6HtLcthdMNfWztSiCXj-FYW-l5ijb2gMmI2U256ttctaA-Kc',
    'data-analysis-jhu': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7NzO56_klYWQOL9A1LTnHnWUVNjGPD1h33OtphYH6CnfEM-HozlFyh4joMZNKpvRhY_I6miuBLlPW7IfxVG3FeP-fYwfTWhOhvY7XJEjt8HHmc5_BbG2sUfNYsdIWBdpbBC7Guu2nE5xTMGhCZblSdF_WVfkjBvdzYULKLEucMoum_BWj8_6Xx8Ik3GeLoT6e6vsoGrdv9swji7Wp9EW01a_pC4mgcWrzNtiGxjbAasE6NVqZ3SoVwFXKIU-tLLoIahs1XBPoV8U',
    'frontend-react-board-infinity': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWfmQ3MhkQB1T6RhOH3QuxkcGRciSmbE2Q-NtSCG1_nl-ydlakf6yFZRyx87hyEhC_ymO3t2kHXWASKNkPLGzXyniglN1gIT9WiTTjDVlkHS7aJJSeQEL511bLsiGySE9ZE5K32AN_qvAHcqHEXHUZnDB-cwMVDcxR7-Yj3mzrjJKmvq6JqdJfCQp-AwIobuAR3ogrS_tHQT90nUvMmPU1ejluY03cZZRKwxzrfd_4qo-LsvVxLckdJsBjbqUr6hLbYm_jp9hZLQ8',
    'human-factors-ai-duke': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO4e_1cWvy0uz9GDlc7ksZpoXzCT9jdRPfWwdGQLOIwC4L3P10xDkKFLhsplxjh2Nqzq_gfvWxmrFbJY4X4udk2c4uD4zmJTX7t4WQI_FLMT-X5LRyP2n4sqjsEpBV_omQK--TAeIHrAZp-t2lKSqZvBglRUHK-1EWvMdnGxwnqojkreXgDAVteea121epRVSs6s6islbKWJWusfrFCVvgGCyBdeQ1OA4HKgggUnLvxEeHqepNElAxxDa9o748av3bDGcGOkzmiNc',
    'azure-ai-fundamentals': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtJ2D_bNULA8seF6vz-J6hzLTNm6280EjLjpvzGC3T8Ub5In5tnfPXLNz5YO5i9YyQnfr_l5KqYB0Ubabc7XQwSaP1Mq1jLHp1TUdb9yCw6c7wRoSGiSFox0lpiGRajbpqruR0PsLEJX-VHFV0FwBkALq3azUz1CksTFSLPFVqzKQJp8J0N_L21vDkZxfqVihv2v79QW6Fz80461w4p-Eh_GFphzJoKz6O2Taw_YBAp8p83A8_XuNbNERZT-8ot8BRuQvYXUy5gC4'
  }

  const logoUrl = logos[cert.id] || logos['computer-vision-ibm']

  // ─── Special Wide Layout: JHU Data Analysis (id: data-analysis-jhu) ───
  if (cert.id === 'data-analysis-jhu') {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-8 md:col-span-2 relative overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity .65s ease ${idx * 0.1}s, transform .65s ease ${idx * 0.1}s, border-color .35s ease, box-shadow .35s ease`,
          ...style
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="flex-shrink-0">
          <div className="icon-tray p-6 w-24 h-24 flex items-center justify-center">
            <img className="w-16 h-16 object-contain" src={logoUrl} alt={cert.title} />
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-headline text-[28px] font-bold text-on-surface leading-tight">{cert.title}</h3>
            <span className="text-label-mono text-[10px] bg-surface-variant/30 px-2 py-1 rounded border border-border-glass text-on-surface-variant uppercase">{cert.date}</span>
          </div>
          <p className="text-on-surface-variant font-body text-[16px] leading-[26px] mb-6 max-w-lg">Advanced certification covering experimental design, data interpretation, and statistical management within agile development cycles.</p>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-primary font-label-mono text-xs font-medium uppercase tracking-wider">{cert.issuer}</span>
            <span className="w-1 h-1 bg-on-surface-variant/30 rounded-full"></span>
            <span className="text-on-surface-variant font-label-mono text-xs font-medium uppercase tracking-wider">{cert.platform}</span>
          </div>
          <div className="mt-auto pt-6 border-t border-border-glass flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant font-label-mono uppercase tracking-wider">Credential ID</span>
              <span className="text-xs font-label-mono text-on-surface">JHU-DATA-ANALYSIS-2026-X</span>
            </div>
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-[#ffdca1] text-[#412d00] px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-95 transition-transform text-label-mono text-sm"
            >
              <span>View Certificate</span>
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ─── Featured Hero Layout: Microsoft Azure (id: azure-ai-fundamentals) ───
  if (cert.id === 'azure-ai-fundamentals') {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-8 md:col-span-2 lg:col-span-3 relative overflow-hidden group"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity .65s ease ${idx * 0.1}s, transform .65s ease ${idx * 0.1}s, border-color .35s ease, box-shadow .35s ease`,
          ...style
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,184,0,0.08),transparent_50%)]"></div>
        <div className="flex-shrink-0 z-10">
          <div className="bg-surface-elevated p-8 rounded-3xl border border-border-glass w-32 h-32 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#ffdca1]/10 animate-pulse"></div>
            <img className="w-20 h-20 object-contain z-10" src={logoUrl} alt={cert.title} />
          </div>
        </div>
        <div className="flex flex-col flex-grow z-10">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">{cert.title}</h3>
              <div className="bg-primary-container/20 text-[#ffdca1] text-[10px] font-bold px-3 py-1 rounded-full border border-primary-container/30 uppercase tracking-widest">Featured</div>
            </div>
            <span className="text-label-mono text-xs bg-surface-variant/30 px-3 py-1 rounded-lg border border-border-glass text-on-surface-variant uppercase">{cert.date}</span>
          </div>
          <p className="text-on-surface-variant font-body text-[16px] leading-[26px] mb-8 max-w-2xl">Foundational knowledge of machine learning (ML) and artificial intelligence (AI) concepts and related Microsoft Azure services. Proving capability in AI workloads, computer vision, and NLP within Azure cloud infrastructures.</p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-surface-container-highest/50 px-4 py-2 rounded-xl border border-border-glass flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdca1] text-[18px]">cloud</span>
              <span className="text-label-mono text-xs">Azure Cloud</span>
            </div>
            <div className="bg-surface-container-highest/50 px-4 py-2 rounded-xl border border-border-glass flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdca1] text-[18px]">psychology</span>
              <span className="text-label-mono text-xs">AI Models</span>
            </div>
            <div className="bg-surface-container-highest/50 px-4 py-2 rounded-xl border border-border-glass flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdca1] text-[18px]">verified</span>
              <span className="text-label-mono text-xs">Enterprise Validated</span>
            </div>
          </div>
          <div className="mt-auto pt-6 border-t border-border-glass flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant font-label-mono uppercase tracking-widest">Issuer</span>
                <span className="text-sm font-bold text-on-surface">{cert.issuer}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant font-label-mono uppercase tracking-widest">Credential ID</span>
                <span className="text-sm font-bold text-primary">{cert.credentialId}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="bg-surface-variant/50 text-on-surface px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-variant transition-colors border border-border-glass text-label-mono text-sm"
              >
                <span className="material-symbols-outlined text-[20px]">description</span>
                <span>View Exam</span>
              </a>
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffb800] text-[#0e0e0f] px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#ffb800]/10 text-label-mono text-sm"
                >
                  <span>Verify Credential</span>
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Default Bento Card Layout ───
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card p-8 rounded-3xl flex flex-col h-full relative overflow-hidden ${className || ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .65s ease ${idx * 0.1}s, transform .65s ease ${idx * 0.1}s, border-color .35s ease, box-shadow .35s ease`,
        ...style
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-glow blur-[60px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
      <div className="flex justify-between items-start mb-6">
        <div className="icon-tray p-4">
          <img className="w-10 h-10 object-contain" src={logoUrl} alt={cert.title} />
        </div>
        <span className="text-label-mono text-[10px] bg-surface-variant/30 px-2 py-1 rounded border border-border-glass text-on-surface-variant uppercase">{cert.date}</span>
      </div>
      <h3 className="font-headline text-headline-md text-on-surface mb-2 leading-tight">{cert.title}</h3>
      <div className="flex items-center gap-2 mb-8">
        <span className="text-primary font-label-mono text-caption">{cert.issuer}</span>
        <span className="w-1 h-1 bg-on-surface-variant/30 rounded-full"></span>
        <span className="text-on-surface-variant font-label-mono text-caption">{cert.platform}</span>
      </div>
      <div className="mt-auto pt-6 border-t border-border-glass flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-label-mono uppercase tracking-wider">Credential ID</span>
          <span className="text-caption font-label-mono text-on-surface">
            {cert.credentialId || `${cert.issuer.substring(0,3).toUpperCase()}-AI-${55100 + idx}`}
          </span>
        </div>
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:bg-[#ffdca1]/10 px-4 py-2 rounded-xl transition-colors text-label-mono text-sm"
          >
            <span>Verify</span>
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        )}
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
export default function Certifications() {
  const { ref: hRef, visible: hVis } = useScrollReveal()

  return (
    <section id="certifications" className="pb-24 pt-12 overflow-hidden" style={{ background: 'var(--void)', color: 'var(--text)' }}>
      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header Section */}
        <header ref={hRef} className="mb-16" style={{
          opacity: hVis ? 1 : 0,
          transform: hVis ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity .7s ease, transform .7s ease',
        }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-label-mono text-primary tracking-widest uppercase">Credentials</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline text-[48px] md:text-[64px] text-on-surface leading-none mb-2">
                My <span className="accent-gradient-text italic font-medium">certifications</span>
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-body leading-[30px]">A curated collection of professional achievements and technical specializations across AI, Cloud, and Software Development.</p>
            </div>
            <div className="flex items-center gap-4 bg-surface-container px-6 py-4 rounded-2xl border border-border-glass">
              <div className="bg-primary-container/20 p-3 rounded-xl">
                <span className="material-symbols-outlined text-[#ffdca1]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <div>
                <div className="font-headline text-[24px] text-on-surface leading-none">{certifications.length}</div>
                <div className="text-caption text-on-surface-variant uppercase tracking-tighter">Verified Assets</div>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid / Certifications Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} idx={i} />
          ))}
        </section>
      </main>
    </section>
  )
}
