import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../services/api"

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials)
      return res.data.token
    } catch (err) {
      return rejectWithValue("Credenciales inválidas")
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    loading: false,
    error: null
  },
  reducers: {
    logout: state => {
      state.token = null
      localStorage.removeItem("token")
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload
        state.loading = false
        localStorage.setItem("token", action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
