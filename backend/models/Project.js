const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    category:    { type: String, enum: ['fullstack', 'frontend', 'backend'], required: true },
    description: { type: String, required: true, trim: true },
    tech:        [{ type: String }],
    emoji:       { type: String, default: '🚀' },
    gradient:    { type: String, default: 'linear-gradient(135deg,#667eea,#764ba2)' },
    githubUrl:   { type: String, default: '#' },
    liveUrl:     { type: String, default: '#' },
    featured:    { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', projectSchema)
