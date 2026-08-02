const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  // Create a transporter using SMTP settings from environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  // Define the email options
  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
    // Support direct file attachments (e.g. from contact form uploads)
    ...(options.attachments && options.attachments.length > 0
      ? { attachments: options.attachments }
      : {}),
  }

  // Send the email
  const info = await transporter.sendMail(mailOptions)
  return info
}

module.exports = sendEmail
