// Importamos bcrypt para encriptar y comparar contraseñas
const bcrypt = require('bcryptjs')

// Importamos jsonwebtoken para generar tokens JWT
const jwt = require('jsonwebtoken')

// Importamos la llave secreta desde el middleware de auth
const { SECRET_KEY } = require('../middlewares/auth.middleware')

// Base de datos en memoria
// Aquí se guardan los usuarios temporalmente
// Al reiniciar el servidor, estos datos se pierden
const usersDb = [
  {
    id: 1,
    email: 'snorlax@admin.com',
    // La contraseña ya está encriptada
    password: bcrypt.hashSync('123456', 10)
  }
]

// Contador para asignar los id únicos a nuevos usuarios
let userId = 2

// aquí se registra el usuario
const registerUser = async (userObj) => {
  // encriptamos la contraseña antes de guardarla
  const hashedPassword = bcrypt.hashSync(userObj.password, 10)

  // creamos el nuevo usuario
  const newUser = {
    id: userId++,
    email: userObj.email,
    password: hashedPassword
  }

  // guardamos el usuario en la base de datos en memoria
  usersDb.push(newUser)

  return newUser
}

// login del usuario
const loginUser = async (email, password) => {
  // buscamos al usuario por email
  const user = usersDb.find(u => u.email === email)

  // bi no existe el usuario es null
  if (!user) return null

  // comparamos la contraseña ingresada con la guardada
  const isValid = bcrypt.compareSync(password, user.password)

  // si la contraseña no es válida devuelve un null
  if (!isValid) return null

  // Si todo es correcto, generamos el token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email }, // payload
    SECRET_KEY,                          // clave secreta
    { expiresIn: '1h' }                  // duración del token
  )

  return token
}

// Exportamos las funciones para usarlas en los servicios
module.exports = {
  registerUser,
  loginUser
}
