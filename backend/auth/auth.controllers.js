const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../middlewares/auth.middleware')

// Base de datos en memoria
const usersDb = [
  {
    id: 1,
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

let userId = 2

// Registro
const registerUser = async (userObj) => {
  const hashedPassword = bcrypt.hashSync(userObj.password, 10)

  const newUser = {
    id: userId++,
    email: userObj.email,
    password: hashedPassword
  }

  usersDb.push(newUser)
  return newUser
}

// Login
const loginUser = async (email, password) => {
  const user = usersDb.find(u => u.email === email)

  if (!user) return null

  const isValid = bcrypt.compareSync(password, user.password)
  if (!isValid) return null

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  )

  return token
}

module.exports = {
  registerUser,
  loginUser
}
