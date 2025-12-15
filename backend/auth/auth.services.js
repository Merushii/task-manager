const authControllers = require('./auth.controllers')

// POST /auth/register
const register = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password required'
    })
  }

  authControllers.registerUser({ email, password })
    .then(user => {
      res.status(201).json({
        message: 'User registered',
        user: { id: user.id, email: user.email }
      })
    })
}

// POST /auth/login
const login = (req, res) => {
  const { email, password } = req.body

  authControllers.loginUser(email, password)
    .then(token => {
      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      res.status(200).json({ token })
    })
}

module.exports = {
  register,
  login
}
