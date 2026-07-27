const express = require('express')
const router  = express.Router()
const path    = require('path')
const fs      = require('fs')

const publicDir = path.join(__dirname, '../../frontend/public')
const certsDir  = path.join(publicDir, 'certificates')

// Helper — send file or 404
function sendFile(res, filePath, downloadName) {
  if (fs.existsSync(filePath)) {
    res.download(filePath, downloadName)
  } else {
    res.status(404).json({ success: false, message: `File not found: ${downloadName}` })
  }
}

// ── CV ────────────────────────────────────────────────────────
// @route GET /api/download/cv
router.get('/cv', (req, res) => {
  sendFile(res, path.join(publicDir, 'My_cv.pdf'), 'Hashir_Ahmad_CV.pdf')
})

// ── Internship certificate (legacy route kept intact) ─────────
// @route GET /api/download/certificate
router.get('/certificate', (req, res) => {
  sendFile(res, path.join(publicDir, 'internship Certificate  (1).png'), 'Hashir_Ahmad_Internship_Certificate.png')
})

// ── Individual certification PDFs ────────────────────────────
// @route GET /api/download/cert/:filename
router.get('/cert/:filename', (req, res) => {
  // Whitelist only known cert filenames to prevent path traversal
  const allowed = [
    'computer-vision-ibm.pdf',
    'ai-fundamentals-google.pdf',
    'cybersecurity-ibm.pdf',
    'data-analysis-jhu.pdf',
    'frontend-react-board-infinity.pdf',
    'human-factors-ai-duke.pdf',
    'azure-ai-fundamentals-microsoft.pdf',
  ]
  const { filename } = req.params
  if (!allowed.includes(filename)) {
    return res.status(403).json({ success: false, message: 'File not allowed' })
  }
  sendFile(res, path.join(certsDir, filename), filename)
})

module.exports = router
