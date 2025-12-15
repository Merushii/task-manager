import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import tasksReducer from "./tasksSlice"

// configuración del store global de redux
// se registran los reducers de autenticación y tareas
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer
  }
})
