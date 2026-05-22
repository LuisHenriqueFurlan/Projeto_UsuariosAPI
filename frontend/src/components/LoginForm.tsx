import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  async function handleLogin() {
    try {
      const response = await api.post('/login', {
        email,
        password
      })

      const token = response.data.data.token

      localStorage.setItem('token', token)

      setMessage('Login realizado com sucesso')

      setTimeout(() => {
        navigate('/profile')
      }, 1000)

    } catch {
      setMessage('Email ou senha inválidos')
    }
  }

  return (
    <div className="login-card">

      <h1>Login</h1>

      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>
        Entrar
      </button>

      <p>{message}</p>

      <br />

      <Link to="/register">
        Não possui conta? Cadastre-se
      </Link>

    </div>
  )
}