import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTaskStatus
} from "../redux/tasksSlice"
import { logout } from "../redux/authSlice"

const STATUS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En Proceso",
  COMPLETED: "Completada"
}

function TaskList() {
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.tasks)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [filter, setFilter] = useState("ALL")

  // se ejecuta al montar el componente
  // obtiene la lista de tareas desde el backend
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  // filtra las tareas según el estado seleccionado
  const filteredTasks = tasks.filter(task => {
    if (filter === "ALL") return true
    return task.status === filter
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Task Manager</h1>

          {/* cierra la sesión del usuario */}
          <button
            onClick={() => dispatch(logout())}
            className="text-red-500 text-sm"
          >
            Logout
          </button>
        </div>

        {/* filtro de tareas por estado */}
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        >
          <option value="ALL">Todas</option>
          <option value="PENDING">Pendiente</option>
          <option value="IN_PROGRESS">En Proceso</option>
          <option value="COMPLETED">Completada</option>
        </select>

        {/* formulario para crear una nueva tarea */}
        <input
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded"
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded"
        />

        {/* crea una nueva tarea y limpia los campos */}
        <button
          onClick={() => {
            if (!title || !description) return
            dispatch(addTask({ title, description }))
            setTitle("")
            setDescription("")
          }}
          className="w-full bg-green-500 text-white py-2 rounded mb-4"
        >
          Agregar tarea
        </button>

        {/* lista de tareas */}
        <ul className="space-y-3">
          {filteredTasks.map(task => (
            <li key={task.id} className="border p-3 rounded">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500 mb-2">
                {task.description}
              </p>

              <div className="flex gap-2 flex-wrap items-center">

                {/* botones para cambiar el estado de la tarea */}
                {Object.keys(STATUS).map(key => (
                  <button
                    key={key}
                    onClick={() =>
                      dispatch(updateTaskStatus({
                        id: task.id,
                        status: key
                      }))
                    }
                    className={`text-xs px-2 py-1 rounded border ${
                      task.status === key
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    {STATUS[key]}
                  </button>
                ))}

                {/* elimina la tarea */}
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="text-xs text-red-500 ml-auto"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        {filteredTasks.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            No hay tareas
          </p>
        )}
      </div>
    </div>
  )
}

export default TaskList
