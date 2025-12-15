import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// url base del backend para las tareas
const API_URL = "http://localhost:3000/api/tasks"

// obtiene todas las tareas desde el backend
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const res = await axios.get(API_URL)
    return res.data
  }
)

// crea una nueva tarea
export const addTask = createAsyncThunk(
  "tasks/add",
  async (task) => {
    const res = await axios.post(API_URL, task)
    return res.data
  }
)

// elimina una tarea por id
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
  }
)

// actualiza el estado de una tarea
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ id, status }) => {
    const res = await axios.put(`${API_URL}/${id}`, { status })
    return res.data
  }
)

const tasksSlice = createSlice({
  name: "tasks",

  // estado inicial del slice de tareas
  initialState: {
    tasks: [],
    loading: false
  },

  reducers: {},

  // maneja los resultados de los thunks
  extraReducers: builder => {
    builder
      // guarda la lista de tareas
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
      })

      // agrega una nueva tarea al estado
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })

      // elimina la tarea del estado
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          task => task.id !== action.payload
        )
      })

      // actualiza el estado de una tarea específica
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          task => task.id === action.payload.id
        )

        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
  }
})

// exportamos el reducer de tareas
export default tasksSlice.reducer
