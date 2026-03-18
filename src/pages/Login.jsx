import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === "admin@sena.com" && password === "1234") {
      login()
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white font-extrabold text-2xl">
            A
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-800 text-center mb-1">
          Agenda ADSO
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          SENA CTMA · Ficha 3229209
        </p>

      </div>
    </div>
  )
}