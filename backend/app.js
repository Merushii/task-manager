// Importamos Express
const express = require('express')

// Importamos CORS
const cors = require('cors')

// Importamos rutas de tareas
const taskRouter = require('./tasks/tasks.router')

const authRouter = require('./auth/auth.router')


const app = express()

// Middlewares globales
app.use(cors())
app.use(express.json())

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API OK' })
})

// Rutas principales
// Ejemplo: http://localhost:3000/api/tasks
app.use('/api', authRouter)
app.use('/api', taskRouter)

// Servidor
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
