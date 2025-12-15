// importamos la lógica del controlador
const authControllers = require('./auth.controllers')

// registro del usuario
const register = (req, res) => {
  // extraemos email y password del body
  const { email, password } = req.body

  // validamos que ambos campos existan
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password required'
    })
  }

  // ñlamamos al controlador para registrar al usuario
  authControllers.registerUser({ email, password })
    .then(user => {
      // respondemos sin enviar la contraseña
      res.status(201).json({
        message: 'User registered',
        user: {
          id: user.id,
          email: user.email
        }
      })
    })
}

// login
const login = (req, res) => {
  // Extraemos credenciales del body
  const { email, password } = req.body

  // intentamos hacer login
  authControllers.loginUser(email, password)
    .then(token => {
      // Si no hay token, las credenciales son incorrectas
      if (!token) {
        return res.status(401).json({
          message: 'Invalid credentials'
        })
      }

      // si todo está bien regresamos el token
      res.status(200).json({ token })
    })
}

// exportamos los servicios
module.exports = {
  register,
  login
}
