const Project = require('../models/Project')

// @desc  Get all projects
// @route GET /api/projects
exports.getProjects = async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.category && req.query.category !== 'all')
      filter.category = req.query.category

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).lean()
    res.json({ success: true, count: projects.length, data: projects })
  } catch (err) { next(err) }
}

// @desc  Seed default projects
// @route POST /api/projects/seed
exports.seedProjects = async (req, res, next) => {
  try {
    const count = await Project.countDocuments()
    if (count > 0)
      return res.json({ success: true, message: 'Projects already exist', count })

    const defaults = [
      {
        title: 'Doctor Appointment Website',
        category: 'fullstack',
        description: 'A comprehensive healthcare platform enabling patients to schedule, manage & track appointments with doctors. Features real-time availability, doctor profiles, and a clean booking flow.',
        tech: ['React.js', 'Material UI', 'Node.js', 'Express', 'MongoDB'],
        emoji: '🏥',
        gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
        githubUrl: 'https://github.com/hashirahmad806',
        liveUrl: '#',
        featured: true,
        order: 1,
      },
      {
        title: 'Malakand News Website',
        category: 'fullstack',
        description: 'Dynamic news aggregation platform for the Malakand region. Category navigation, breaking news alerts, search functionality, and a full content management system.',
        tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        emoji: '📰',
        gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
        githubUrl: 'https://github.com/hashirahmad806',
        liveUrl: '#',
        featured: true,
        order: 2,
      },
      {
        title: 'MERN Auth CRUD App',
        category: 'fullstack',
        description: 'Production-ready full-stack app with JWT authentication, role-based access control & complete CRUD operations. Built with security best practices and clean RESTful API design.',
        tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt'],
        emoji: '🔐',
        gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)',
        githubUrl: 'https://github.com/hashirahmad806',
        liveUrl: '#',
        featured: true,
        order: 3,
      },
      {
        title: 'E-Commerce Platform',
        category: 'fullstack',
        description: 'Full-featured online store with product catalog, cart management, order tracking & user authentication. Clean product gallery with a seamless checkout experience.',
        tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
        emoji: '🛒',
        gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)',
        githubUrl: 'https://github.com/hashirahmad806',
        liveUrl: '#',
        order: 4,
      },
      {
        title: 'Task Manager Pro',
        category: 'frontend',
        description: 'Feature-rich Kanban task management app with drag-and-drop boards, priority tagging, deadline tracking & smooth animations built with Framer Motion.',
        tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Context API'],
        emoji: '✅',
        gradient: 'linear-gradient(135deg,#fa709a,#fee140)',
        githubUrl: 'https://github.com/hashirahmad806',
        liveUrl: '#',
        order: 5,
      },
      {
        title: 'REST API Boilerplate',
        category: 'backend',
        description: 'Production-ready Node.js/Express API starter with built-in auth, rate limiting, error handling, request logging & MongoDB integration for rapid API development.',
        tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose'],
        emoji: '⚙️',
        gradient: 'linear-gradient(135deg,#30cfd0,#330867)',
        githubUrl: 'https://github.com/hashirahmad806',
        liveUrl: '#',
        order: 6,
      },
    ]

    const created = await Project.insertMany(defaults)
    res.status(201).json({ success: true, message: 'Projects seeded!', count: created.length })
  } catch (err) { next(err) }
}
