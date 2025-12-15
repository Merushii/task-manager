import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "http://localhost:3000/api/tasks"

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const res = await axios.get(API_URL)
    return res.data
  }
)

export const addTask = createAsyncThunk(
  "tasks/add",
  async (task) => {
    const res = await axios.post(API_URL, task)
    return res.data
  }
)

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
  }
)

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ id, status }) => {
    const res = await axios.put(`${API_URL}/${id}`, { status })
    return res.data
  }
)

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          task => task.id !== action.payload
        )
      })
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

export default tasksSlice.reducer
