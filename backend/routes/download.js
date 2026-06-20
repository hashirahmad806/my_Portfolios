const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

// @desc  Download CV
// @route GET /api/download/cv
router.get('/cv', (req, res, next) => {
  const filePath = path.join(__dirname, '../../frontend/public/CV.pdf')
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'Hashir_Ahmad_CV.pdf')
  } else {
    res.status(404).json({ success: false, message: 'CV not found' })
  }
})

// @desc  Download Internship Certificate
// @route GET /api/download/certificate
router.get('/certificate', (req, res, next) => {
  const filePath = path.join(__dirname, '../../frontend/public/internship Certificate  (1).png')
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'Hashir_Ahmad_Internship_Certificate.png')
  } else {
    res.status(404).json({ success: false, message: 'Certificate not found' })
  }
})

module.exports = router
