const router = require('express').Router()
const authServices = require('./auth.services')

router.post('/auth/register', authServices.register)
router.post('/auth/login', authServices.login)

module.exports = router
