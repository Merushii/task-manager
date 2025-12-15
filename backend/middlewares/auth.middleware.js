const jwt = require('jsonwebtoken')

const SECRET_KEY = 'task_manager_secret_key'

// Middleware para proteger rutas
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token required' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = {
  authenticate,
  SECRET_KEY
}
