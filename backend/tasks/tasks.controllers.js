// Base de datos temporal de tareas
const tasksDb = [
  {
    id: 1,
    title: "Tarea de ejemplo",
    description: "Primera tarea",
    status: "PENDING"
  }
]

let taskId = 2

const findAllTasks = async () => {
  return tasksDb
}

const createTask = async (taskObj) => {
  const newTask = {
    id: taskId++,
    title: taskObj.title,
    description: taskObj.description,
    status: "PENDING" // ✅ ESTADO POR DEFECTO
  }

  tasksDb.push(newTask)
  return newTask
}

const updateTask = async (id, data) => {
  const index = tasksDb.findIndex(task => task.id === id)
  if (index === -1) return null

  tasksDb[index] = {
    ...tasksDb[index],
    ...data
  }

  return tasksDb[index]
}

const deleteTask = async (id) => {
  const index = tasksDb.findIndex(task => task.id === id)
  if (index === -1) return null

  tasksDb.splice(index, 1)
  return true
}

module.exports = {
  findAllTasks,
  createTask,
  updateTask,
  deleteTask
}
