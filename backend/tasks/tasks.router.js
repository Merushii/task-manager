const router = require('express').Router()
const services = require('./tasks.services')

router.get('/tasks', services.getAllTasks)
router.post('/tasks', services.postTask)
router.put('/tasks/:id', services.updateTask)
router.delete('/tasks/:id', services.deleteTask)

module.exports = router
