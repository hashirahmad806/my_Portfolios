const Contact = require('../models/Contact')
const sendEmail = require('../utils/sendEmail')
const cloudinary = require('cloudinary').v2

// Configure Cloudinary if credentials exist
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

// Check file magic numbers / signatures to verify actual MIME type
const checkFileSignature = (buffer, extension) => {
  if (!buffer || buffer.length < 4) return false
  
  const hex = buffer.toString('hex', 0, 8).toLowerCase()
  
  // PDF: 25504446 -> %PDF
  if (hex.startsWith('25504446')) {
    return extension === 'pdf'
  }
  // PNG: 89504e47
  if (hex.startsWith('89504e47')) {
    return extension === 'png'
  }
  // JPEG/JPG: ffd8ff
  if (hex.startsWith('ffd8ff')) {
    return ['jpg', 'jpeg'].includes(extension)
  }
  // DOCX / ZIP: 504b0304 -> PK..
  if (hex.startsWith('504b0304')) {
    return extension === 'docx'
  }
  // DOC (legacy binary): d0cf11e0
  if (hex.startsWith('d0cf11e0')) {
    return extension === 'doc'
  }
  
  return false
}

// Upload buffer directly to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio_contacts',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    uploadStream.end(fileBuffer)
  })
}

// @desc  Save new contact message
// @route POST /api/contact
exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, message, honey } = req.body

    // 1. Honeypot check: silently reject bots
    if (honey) {
      console.log('🤖 Honeypot field filled. Rejecting bot submission.')
      return res.status(400).json({ success: false, message: 'Invalid submission data.' })
    }

    const ipAddress =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress || null

    let fileUrl = null
    let fileOriginalName = null

    // 2. Handle file validation & upload
    if (req.file) {
      const file = req.file

      // Max 5MB limit
      const maxFileSize = 5 * 1024 * 1024
      if (file.size > maxFileSize) {
        return res.status(400).json({ success: false, message: 'File size exceeds 5MB limit.' })
      }

      // Allowed extensions
      const allowedExtensions = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg']
      const fileExt = file.originalname.split('.').pop().toLowerCase()
      if (!allowedExtensions.includes(fileExt)) {
        return res.status(400).json({ success: false, message: 'Invalid file type. Allowed: .pdf, .doc, .docx, .png, .jpg' })
      }

      // Magic numbers / Signature validation
      const isSignatureValid = checkFileSignature(file.buffer, fileExt)
      if (!isSignatureValid) {
        return res.status(400).json({ success: false, message: 'File content verification failed.' })
      }

      fileOriginalName = file.originalname

      // Upload to Cloudinary or mock fallback
      const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                            process.env.CLOUDINARY_API_KEY && 
                            process.env.CLOUDINARY_API_SECRET

      if (hasCloudinary) {
        try {
          const uploadResult = await uploadToCloudinary(file.buffer)
          fileUrl = uploadResult.secure_url
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr)
          return res.status(500).json({ success: false, message: 'Failed to process file upload.' })
        }
      } else {
        console.warn('⚠️ Cloudinary not configured. Mocking file URL for development.')
        fileUrl = `https://mock-storage.local/portfolio_contacts/${Date.now()}-${file.originalname}`
      }
    }

    const contact = await Contact.create({ 
      name, 
      email, 
      message, 
      fileUrl, 
      fileOriginalName, 
      ipAddress 
    })

    console.log(`📬  New message from ${name} <${email}>. Attached: ${fileOriginalName || 'None'}`)

    try {
      let attachmentText = ''
      let attachmentHtml = ''
      if (fileUrl) {
        attachmentText = `\n\nAttached File: ${fileOriginalName}\nDownload Link: ${fileUrl}`
        attachmentHtml = `<br><br><strong>Attached File:</strong> ${fileOriginalName}<br><strong>Download Link:</strong> <a href="${fileUrl}" target="_blank" rel="noopener noreferrer">${fileUrl}</a>`
      }

      // Notify the site owner
      await sendEmail({
        email: process.env.RECEIVER_EMAIL,
        subject: `New Contact Message from ${name}`,
        message: `You have a new message from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}${attachmentText}\n\nIP Address: ${ipAddress}`,
        html: `<p>You have a new message from your portfolio.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
               ${attachmentHtml}
               <p><small>IP Address: ${ipAddress}</small></p>`
      })
      
      // Auto-reply to the sender
      await sendEmail({
        email: email,
        subject: `Thank you for contacting me, ${name}!`,
        message: `Hi ${name},\n\nThank you for reaching out. I have received your message and will get back to you as soon as possible.\n\nBest regards,\nHashir Ahmad`
      })
    } catch (emailErr) {
      console.error('Error sending email:', emailErr)
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon 🚀',
      data: { id: contact._id, name: contact.name, createdAt: contact.createdAt },
    })
  } catch (err) { 
    console.error('Error in createMessage:', err)
    res.status(500).json({ success: false, message: 'An internal server error occurred.' })
  }
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
