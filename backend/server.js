require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const helmet     = require('helmet')
const morgan     = require('morgan')
const rateLimit  = require('express-rate-limit')
const path       = require('path')
const connectDB  = require('./config/db')
const { errorHandler, notFound } = require('./middleware/errorHandler')

connectDB()
const app = express()

// ── Security ──────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

// ── CORS ─────────────────────────────────────────────────
const rawFrontend = (process.env.FRONTEND_URL || '').replace(/\/$/, '')
const allowed = [
  rawFrontend,
  'http://localhost:5173',
  'http://localhost:4173',
  'https://my-portfolios-sandy.vercel.app',
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => (!origin || allowed.includes(origin) ? cb(null, true) : cb(new Error('CORS blocked'))),
  credentials: true,
}))

// ── Global rate limit ─────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
}))

// ── Parsing ───────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ── Logging ───────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))

// ── Health check ─────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({
  success: true,
  message: 'Hashir Ahmad Portfolio API 🚀',
  env:  process.env.NODE_ENV,
  time: new Date().toISOString(),
}))

// ── API Routes ────────────────────────────────────────────
app.use('/api/contact',  require('./routes/contact'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/download', require('./routes/download'))
app.use('/api/github',   require('./routes/github'))

// ── Serve React build in production ───────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../frontend/dist')
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

// ── Error Handlers ────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n  🚀  Server  →  http://localhost:${PORT}`)
  console.log(`  🏥  Health  →  http://localhost:${PORT}/api/health`)
  console.log(`  🌍  Mode    →  ${process.env.NODE_ENV || 'development'}\n`)
})

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message)
  process.exit(1)
})
