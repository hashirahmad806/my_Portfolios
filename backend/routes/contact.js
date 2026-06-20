const express = require('express')
const router  = express.Router()
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const ctrl = require('../controllers/contactController')

// Rate limit: 5 messages per IP per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages. Please try again later.' },
  standardHeaders: true, legacyHeaders: false,
})

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be at least 2 characters'),
  body('email').trim().isEmail().withMessage('Please enter a valid email address'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 }).withMessage('Message must be at least 10 characters'),
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

router.post('/',         limiter, validate, checkValidation, ctrl.createMessage)
router.get('/',          ctrl.getMessages)
router.patch('/:id/read', ctrl.markRead)
router.delete('/:id',    ctrl.deleteMessage)

module.exports = router
