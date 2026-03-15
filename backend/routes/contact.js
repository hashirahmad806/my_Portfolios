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
  body('name').trim().notEmpty().isLength({ min: 2, max: 100 }),
  body('email').trim().isEmail().normalizeEmail(),
  body('message').trim().notEmpty().isLength({ min: 10, max: 2000 }),
]

const checkValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, message: errors.array()[0].msg })
  next()
}

router.post('/',         limiter, validate, checkValidation, ctrl.createMessage)
router.get('/',          ctrl.getMessages)
router.patch('/:id/read', ctrl.markRead)
router.delete('/:id',    ctrl.deleteMessage)

module.exports = router
