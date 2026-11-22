import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTerminal, FiX, FiCornerDownLeft, FiMaximize2, FiMinimize2 } from 'react-icons/fi'

const INITIAL_LOGS = [
  { type: 'system', text: 'hashir-os [Version 2.4.0-agentic-prod]' },
  { type: 'system', text: '(c) 2026 Hashir Ahmad. All rights reserved.' },
  { type: 'system', text: 'Type "help" or click a preset below to run real-time agent routines.\n' },
  { type: 'info', text: '● Neural subsystem: ONLINE | MongoDB Vector Engine: READY' },
]

export default function AgentTerminal({ isOpen, onClose }) {
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [inputVal, setInputVal] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const appendLog = (type, text) => {
    setLogs((prev) => [...prev, { type, text }])
  }

  const executeCommand = async (cmdStr) => {
    const rawCmd = cmdStr.trim()
    if (!rawCmd) return

    setHistory((prev) => [rawCmd, ...prev])
    setHistoryIdx(-1)
    appendLog('prompt', `visitor@hashir-portfolio:~$ ${rawCmd}`)
    setInputVal('')

    const cmd = rawCmd.toLowerCase()

    if (cmd === 'clear' || cmd === 'cls') {
      setLogs([])
      return
    }

    if (cmd === 'help') {
      appendLog('system', `AVAILABLE ROUTINES:
  agent run rag      - Simulate LangChain/LangGraph vector retrieval loop
  sys --inspect      - Inspect full-stack & cognitive architecture diagram
  skills --agentic   - Audit autonomous agent & framework capabilities
  hire               - Initiate engineering contact channels (WhatsApp / Email)
  clear              - Wipe terminal buffer
  help               - Show this manual`)
      return
    }

    if (cmd === 'agent run rag') {
      setIsExecuting(true)
      appendLog('info', '[LANGGRAPH] Initializing state graph executor (thread_id: 0x9AF4)...')
      
      await new Promise((r) => setTimeout(r, 600))
      appendLog('tool', '[EMBEDDING] Generating text-embedding-3-small vector tensor (1536 dim)...')
      
      await new Promise((r) => setTimeout(r, 700))
      appendLog('vector', '[ATLAS] Executing ANN Cosine Search on collection "knowledge_base" (k=3)...')
      
      await new Promise((r) => setTimeout(r, 750))
      appendLog('agent', '[STATE] Retrieved 3 high-similarity chunks (top score: 0.942).')
      
      await new Promise((r) => setTimeout(r, 650))
      appendLog('success', `[SYNTHESIS] Output generated:
"Hashir Ahmad architected production RAG pipelines utilizing LangChain and
MongoDB Atlas Vector Search with sub-80ms semantic retrieval and real-time
Atlas event-stream syncing."`)
      setIsExecuting(false)
      return
    }

    if (cmd === 'sys --inspect' || cmd === 'sys') {
      appendLog('system', `┌─────────────────────────────────────────────────────────────┐
│  CLIENT TIER                                                │
│  React 18 · Vite · Tailwind CSS · Framer Motion · JetBrains │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  AGENT ORCHESTRATION LAYER                                  │
│  LangChain · LangGraph State Nodes · Multi-Agent Router     │
└──────────────┬───────────────────────────────┬──────────────┘
               ▼                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│  KNOWLEDGE & VECTORS         │ │  INFERENCE & TOOL CALLS    │
│  MongoDB Atlas Vector Search │ │  OpenAI · Groq · REST APIs │
└──────────────────────────────┘ └────────────────────────────┘`)
      return
    }

    if (cmd === 'skills --agentic' || cmd === 'skills') {
      appendLog('system', `CORE AGENTIC & FULL-STACK CAPABILITIES:
  ● LangChain / LangGraph  │  94%  │ Production Multi-Agent Graph Workflows
  ● Atlas Vector Search    │  95%  │ Semantic ANN Indexing & RAG Pipelines
  ● React.js / Vite        │  95%  │ Component Design Systems & Micro-Interactions
  ● Node.js / Express      │  92%  │ Scalable REST Services & JWT Security
  ● Python ML Stack        │  88%  │ PyTorch, Pandas, Scikit-Learn`)
      return
    }

    if (cmd === 'hire' || cmd === 'contact') {
      appendLog('success', `CONTACT CHANNELS:
  WhatsApp : https://wa.me/923705105561
  Email    : hashirahmad808@gmail.com
  LinkedIn : https://www.linkedin.com/in/hashir-ahmad-25639031b
  GitHub   : https://github.com/hashirahmad806`)
      return
    }

    appendLog('error', `Command not recognized: "${rawCmd}". Type "help" for valid routines.`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0 && historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1
        setHistoryIdx(nextIdx)
        setInputVal(history[nextIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1
        setHistoryIdx(nextIdx)
        setInputVal(history[nextIdx])
      } else if (historyIdx === 0) {
        setHistoryIdx(-1)
        setInputVal('')
      }
    }
  }

  const getLogStyle = (type) => {
    switch (type) {
      case 'prompt':
        return { color: 'var(--text)' }
      case 'info':
        return { color: '#38bdf8' }
      case 'tool':
        return { color: '#c084fc' }
      case 'vector':
        return { color: '#34d399' }
      case 'agent':
        return { color: 'var(--gold)' }
      case 'success':
        return { color: '#10b981', fontWeight: 600 }
      case 'error':
        return { color: '#f87171' }
      default:
        return { color: 'var(--text2)' }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
          {/* Modal Overlay / Backdrop Click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full z-10 flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
              isExpanded ? 'max-w-6xl h-[85vh]' : 'max-w-3xl h-[560px]'
            }`}
            style={{
              background: 'var(--surface)',
              borderColor: 'rgba(var(--gold-rgb), 0.35)',
              boxShadow: '0 25px 65px -10px rgba(0,0,0,0.45), 0 0 0 1px var(--border)',
            }}
          >
            {/* Window Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b select-none"
              style={{
                background: 'var(--surface2)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  title="Close (Esc)"
                />
                <button
                  onClick={() => setLogs([])}
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
                  title="Clear Buffer"
                />
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"
                  title="Toggle Size"
                />
                <span className="ml-3 font-mono text-xs font-semibold tracking-wider text-[var(--gold)]">
                  hashir-os // agent-executor v2.4.0
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block font-mono text-[10px] text-[var(--text3)]">
                  Press ESC to close
                </span>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[var(--text2)] hover:text-[var(--text)] transition-colors"
                >
                  {isExpanded ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  className="text-[var(--text2)] hover:text-red-400 transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>

            {/* Quick Action Suggestion Chips */}
            <div
              className="flex items-center gap-2 px-4 py-2 border-b overflow-x-auto text-[11px] font-mono select-none"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border2)',
              }}
            >
              <span className="text-[var(--text3)] uppercase tracking-wider text-[10px]">
                Preset:
              </span>
              {[
                'agent run rag',
                'sys --inspect',
                'skills --agentic',
                'hire',
                'help',
                'clear',
              ].map((cmd) => (
                <button
                  key={cmd}
                  disabled={isExecuting}
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-1 rounded-md border text-[var(--text2)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all whitespace-nowrap active:scale-95"
                  style={{
                    background: 'var(--surface2)',
                    borderColor: 'var(--border)',
                  }}
                >
                  &gt; {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-xs md:text-[13px] leading-relaxed space-y-2 select-text"
              style={{ background: 'var(--obsidian)' }}
              onClick={() => inputRef.current?.focus()}
            >
              {logs.map((log, i) => (
                <div
                  key={i}
                  style={getLogStyle(log.type)}
                  className="whitespace-pre-wrap break-words"
                >
                  {log.text}
                </div>
              ))}
              {isExecuting && (
                <div className="flex items-center gap-2 text-[var(--gold)] animate-pulse">
                  <span>●</span>
                  <span>Executing agent graph loop...</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Line */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t font-mono text-xs md:text-sm"
              style={{
                background: 'var(--surface2)',
                borderColor: 'var(--border)',
              }}
            >
              <span className="text-[var(--gold)] font-semibold select-none">
                visitor@hashir:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                disabled={isExecuting}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type a command ("help" for options)...'
                className="flex-1 bg-transparent border-none outline-none text-[var(--text)] placeholder-[var(--text3)]"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                disabled={isExecuting || !inputVal.trim()}
                onClick={() => executeCommand(inputVal)}
                className="p-1.5 rounded text-[var(--text3)] hover:text-[var(--gold)] transition-colors disabled:opacity-30"
              >
                <FiCornerDownLeft size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
