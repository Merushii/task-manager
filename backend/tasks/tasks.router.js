// Importamos el router de Express
const router = require('express').Router()

// Importamos los servicios de tareas
const services = require('./tasks.services')

// Obtiene todas las tareas
router.get('/tasks', services.getAllTasks)

// Crea una nueva tarea
router.post('/tasks', services.postTask)

// Actualiza una tarea por id
router.put('/tasks/:id', services.updateTask)

// Elimina una tarea por id
router.delete('/tasks/:id', services.deleteTask)

// Exportamos el router
module.exports = router
