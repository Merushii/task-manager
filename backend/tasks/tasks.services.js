const taskController = require('./tasks.controllers')

const getAllTasks = (req, res) => {
  taskController.findAllTasks()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}

const postTask = (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" })
  }

  taskController.createTask({ title, description })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json(err))
}

const updateTask = (req, res) => {
  const id = parseInt(req.params.id)
  taskController.updateTask(id, req.body)
    .then(task => {
      if (!task) return res.status(404).json({ message: "Task not found" })
      res.json(task)
    })
}

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id)
  taskController.deleteTask(id)
    .then(result => {
      if (!result) return res.status(404).json({ message: "Task not found" })
      res.status(204).end()
    })
}

module.exports = {
  getAllTasks,
  postTask,
  updateTask,
  deleteTask
}
