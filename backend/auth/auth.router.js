// creamos el router de Express
const router = require('express').Router()

// importamos los servicios de autenticación
const authServices = require('./auth.services')

// ruta para registrar usuarios
router.post('/auth/register', authServices.register)

// Ruta para iniciar sesión
router.post('/auth/login', authServices.login)

// exportamos el router
module.exports = router
