import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../services/api"

// thunk para hacer login del usuario
// envía las credenciales al backend y obtiene el token
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials)
      return res.data.token
    } catch (err) {
      // devuelve un mensaje de error personalizado
      return rejectWithValue("Credenciales inválidas")
    }
  }
)

const authSlice = createSlice({
  name: "auth",

  // estado inicial del slice de autenticación
  initialState: {
    token: localStorage.getItem("token"),
    loading: false,
    error: null
  },

  reducers: {
    // cierra la sesión del usuario
    // elimina el token del estado y del localStorage
    logout: state => {
      state.token = null
      localStorage.removeItem("token")
    }
  },

  // maneja los estados del thunk login
  extraReducers: builder => {
    builder
      // cuando el login está en proceso
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })

      // cuando el login es exitoso
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload
        state.loading = false
        localStorage.setItem("token", action.payload)
      })

      // cuando el login falla
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

// exportamos la acción logout
export const { logout } = authSlice.actions

// exportamos el reducer
export default authSlice.reducer
