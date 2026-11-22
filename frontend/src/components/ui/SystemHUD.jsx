import { useState, useEffect } from 'react'
import { FiTerminal, FiActivity, FiCpu } from 'react-icons/fi'

export default function SystemHUD({ onOpenTerminal }) {
  const [coords, setCoords] = useState({ lat: '34.01', scrollPct: 0 })
  const [latency, setLatency] = useState(24)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const pct = total > 0 ? Math.round((current / total) * 100) : 0
      setCoords((prev) => ({ ...prev, scrollPct: pct }))
    }

    // Dynamic latency flutter between 21ms - 28ms to simulate live telemetry
    const interval = setInterval(() => {
      setLatency(20 + Math.floor(Math.random() * 8))
    }, 4500)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-40 pointer-events-none flex items-center justify-between"
      aria-label="System Telemetry HUD"
    >
      {/* Left: Telemetry Data Pill */}
      <div
        className="pointer-events-auto hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full border shadow-lg text-[11px] font-mono backdrop-blur-md transition-colors"
        style={{
          background: 'rgba(var(--surface-rgb, 19, 19, 20), 0.85)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[var(--text2)] font-semibold uppercase tracking-wider text-[10px]">
            AI ENGINE:
          </span>
          <span className="text-[var(--gold)] font-medium">ONLINE</span>
        </div>

        <span className="text-[var(--border)]">│</span>

        <div className="hidden lg:flex items-center gap-1.5 text-[var(--text3)]">
          <FiCpu size={12} className="text-[var(--gold)]" />
          <span>VECTORS:</span>
          <span className="text-[var(--text)]">READY ({latency}ms)</span>
        </div>

        <span className="hidden lg:inline text-[var(--border)]">│</span>

        <div className="flex items-center gap-1 text-[var(--text3)]">
          <FiActivity size={12} className="text-[var(--gold)]" />
          <span>CAD.LOC:</span>
          <span className="text-[var(--text)]">0x{coords.scrollPct.toString(16).padStart(2, '0').toUpperCase()}</span>
          <span className="text-[var(--text3)]">({coords.scrollPct}%)</span>
        </div>
      </div>

      {/* Right: Quick Action Launch Terminal */}
      <div className="pointer-events-auto ml-auto flex items-center gap-2">
        <button
          onClick={onOpenTerminal}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-xl text-xs font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'var(--surface2)',
            borderColor: 'rgba(var(--gold-rgb), 0.4)',
            color: 'var(--text)',
            boxShadow: '0 8px 24px -4px rgba(0,0,0,0.35), 0 0 12px rgba(var(--gold-rgb), 0.12)',
          }}
          title="Open Agent Terminal (Press ~ or Ctrl+K)"
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--gold)] text-black font-bold">
            <FiTerminal size={12} />
          </span>
          <span className="font-semibold tracking-wider text-[var(--gold)] group-hover:brightness-110">
            AGENT.CLI
          </span>
          <span
            className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] text-[var(--text3)] font-mono border"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border2)',
            }}
          >
            ~ / Ctrl+K
          </span>
        </button>
      </div>
    </div>
  )
}
