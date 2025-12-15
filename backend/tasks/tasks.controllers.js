
// Base de datos temporal de tareas
// Las tareas se almacenan en memoria solo para pruebas
const tasksDb = [
  {
    id: 1,
    title: "Tarea de ejemplo",
    description: "Primera tarea",
    status: "PENDING"
  }
]

let taskId = 2

//obtiene la s tareas
const findAllTasks = async () => {
  return tasksDb
}

//crea una nueva tarea
// Recibe un objeto con título y descripción
// El estado se asigna por defecto como PENDING
const createTask = async (taskObj) => {
  const newTask = {
    id: taskId++,
    title: taskObj.title,
    description: taskObj.description,
    status: "PENDING" // Estado inicial por defecto
  }

  // guardamos la tarea en la "base de datos"
  tasksDb.push(newTask)

  // retornamos la tarea creada
  return newTask
}

// Actualiza una tarea existente
// Busca la tarea por ID y actualiza solo los campos enviados
const updateTask = async (id, data) => {

  // buscamos el índice de la tarea
  const index = tasksDb.findIndex(task => task.id === id)

  // si no existe la tarea retornamos null
  if (index === -1) return null

  // actualizamos la tarea manteniendo los valores anteriores
  tasksDb[index] = {
    ...tasksDb[index],
    ...data
  }

  // retornamos la tarea actualizada
  return tasksDb[index]
}

// --------------------
// elimina una tarea
// --------------------
// busca la tarea por ID y la elimina del arreglo
const deleteTask = async (id) => {

  const index = tasksDb.findIndex(task => task.id === id)

  // si no existe la tarea
  if (index === -1) return null

  // eliminamos la tarea del arreglo
  tasksDb.splice(index, 1)

  return true
}

// exportamos las funciones del controlador
module.exports = {
  findAllTasks,
  createTask,
  updateTask,
  deleteTask
}
