import { useState } from 'react'
import { api } from '../services/api'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleRegister() {
    try {
      await api.post('/register', {
        name,
        email,
        password
      })

      setMessage('Usuário cadastrado')
    } catch {
      setMessage('Erro ao cadastrar')
    }
  }

  return (
    <div className="login-card">
      <h1>Cadastro</h1>

      <div className="input-group">
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleRegister}>
        Cadastrar
      </button>

      <p className="message">
        {message}
      </p>
    </div>
  )
}