const errorHandler = (err, req, res, next) => {
  let status  = err.statusCode || 500
  let message = err.message    || 'Internal Server Error'

  if (err.name === 'ValidationError')
    message = Object.values(err.errors).map(e => e.message).join(', ')
  if (err.code === 11000)
    message = 'Duplicate field value'
  if (err.name === 'CastError')
    message = `Invalid ${err.path}`

  if (process.env.NODE_ENV === 'development')
    console.error(`[${status}] ${message}`, err.stack)

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

const notFound = (req, res, next) => {
  const err = new Error(`Not found: ${req.originalUrl}`)
  err.statusCode = 404
  next(err)
}

module.exports = { errorHandler, notFound }
