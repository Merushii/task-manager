// Importamos el controlador de tareas
const taskController = require('./tasks.controllers')

// GET /tasks
// Retorna la lista completa de tareas
const getAllTasks = (req, res) => {
  taskController.findAllTasks()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}

// POST /tasks
// Crea una nueva tarea
const postTask = (req, res) => {

  const { title, description } = req.body

  // Validación básica de datos
  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description required"
    })
  }

  taskController.createTask({ title, description })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json(err))
}

// PUT /tasks/:id
// Actualiza una tarea existente
const updateTask = (req, res) => {

  // Convertimos el id a número
  const id = parseInt(req.params.id)

  taskController.updateTask(id, req.body)
    .then(task => {
      // si no se encuentra la tarea
      if (!task) {
        return res.status(404).json({
          message: "Task not found"
        })
      }

      // retornamos la tarea actualizada
      res.json(task)
    })
}

// DELETE /tasks/:id
// Elimina una tarea por ID
const deleteTask = (req, res) => {

  const id = parseInt(req.params.id)

  taskController.deleteTask(id)
    .then(result => {
      // si la tarea no existe
      if (!result) {
        return res.status(404).json({
          message: "Task not found"
        })
      }
      res.status(204).end()
    })
}

// Exportamos los servicios
module.exports = {
  getAllTasks,
  postTask,
  updateTask,
  deleteTask
}
