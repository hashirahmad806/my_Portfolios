const express = require('express')
const router  = express.Router()
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const multer = require('multer')
const ctrl = require('../controllers/contactController')

// Rate limit: 5 messages per IP per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages. Please try again later.' },
  standardHeaders: true, legacyHeaders: false,
})

// Configure multer storage and size limits
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
})

// Multer error handling wrapper middleware
const handleUpload = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds 5MB limit.' })
      }
      return res.status(400).json({ success: false, message: err.message })
    } else if (err) {
      return res.status(400).json({ success: false, message: 'File upload error.' })
    }
    next()
  })
}

// Server-side validation and sanitization
const validate = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be at least 2 characters')
    .escape(),
  body('email')
    .trim()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be at least 10 characters')
    .escape(),
  body('honey')
    .optional()
    .trim()
]

const checkValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const msg = errors.array()[0].msg
    console.log('❌ Validation failed:', errors.array())
    return res.status(400).json({ success: false, message: msg })
  }
  next()
}

router.post('/',         limiter, handleUpload, validate, checkValidation, ctrl.createMessage)
router.get('/',          ctrl.getMessages)
router.patch('/:id/read', ctrl.markRead)
router.delete('/:id',    ctrl.deleteMessage)

module.exports = router
