const Contact = require('../models/Contact')

// @desc  Save new contact message
// @route POST /api/contact
exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body
    const ipAddress =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress || null

    const contact = await Contact.create({ name, email, message, ipAddress })
    console.log(`📬  New message from ${name} <${email}>`)

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon 🚀',
      data: { id: contact._id, name: contact.name, createdAt: contact.createdAt },
    })
  } catch (err) { next(err) }
}

// @desc  Get all messages (paginated)
// @route GET /api/contact
exports.getMessages = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1)
    const limit = Math.min(50, parseInt(req.query.limit) || 20)
    const skip  = (page - 1) * limit

    const [messages, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(),
    ])

    res.json({
      success: true,
      count: messages.length, total, page,
      totalPages: Math.ceil(total / limit),
      data: messages,
    })
  } catch (err) { next(err) }
}

// @desc  Mark message as read
// @route PATCH /api/contact/:id/read
exports.markRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, { isRead: true }, { new: true }
    )
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: contact })
  } catch (err) { next(err) }
}

// @desc  Delete message
// @route DELETE /api/contact/:id
exports.deleteMessage = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, message: 'Deleted successfully' })
  } catch (err) { next(err) }
}
