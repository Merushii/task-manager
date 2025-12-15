// importamos jsonwebtoken para verificar los tokens JWT
const jwt = require('jsonwebtoken')

// clave secreta usada para firmar y validar los token
const SECRET_KEY = 'task_manager_secret_key'

// Este middleware protege rutas privadas verificando
// que el usuario envíe un token JWT válido
const authenticate = (req, res, next) => {

  // obtenemos el header Authorization
  const authHeader = req.headers.authorization

  // si no se envía el header, el usuario no está autenticado
  if (!authHeader) {
    return res.status(401).json({
      message: 'Token required'
    })
  }

  // extraemos el token eliminando la palabra "Bearer"
  const token = authHeader.split(' ')[1]

  try {
    // verificamos el token usando la clave secreta
    const decoded = jwt.verify(token, SECRET_KEY)

    // guardamos la información del usuario decodificada para poder usarla en las siguientes rutas
    req.user = decoded

    // Continuamos con la ejecución de la ruta protegida
    next()
  } catch (error) {
    // si el token es inválido o expiró
    return res.status(401).json({
      message: 'Invalid token'
    })
  }
}

// exportamos el middleware y la clave secreta
module.exports = {
  authenticate,
  SECRET_KEY
}
