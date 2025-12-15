import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/authSlice"

function Login() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // maneja el envío del formulario de login
  // evita que la página se recargue
  // da la acción login con email y contraseña
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Iniciar sesión
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {loading ? "Ingresando..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
