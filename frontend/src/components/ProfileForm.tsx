import { useEffect, useState } from 'react'
import { api } from '../services/api'

type User = {
  name: string
  email: string
}

export function ProfileForm() {
  const [user, setUser] = useState<User | null>(null)
  const [message, setMessage] = useState('')

  async function loadProfile() {
    const token = localStorage.getItem('token')

    if (!token) {
      setMessage('Usuário não autenticado')
      return
    }

    try {
      const response = await api.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(response.data.data)
    } catch {
      setMessage('Erro ao carregar perfil')
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setUser(null)
    setMessage('Logout realizado')
  }

  useEffect(() => {
    loadProfile()
  }, [])

  return (
    <div className="login-card">
      <h1>Perfil</h1>

      {user ? (
        <>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>

          <button onClick={handleLogout}>
            Sair
          </button>
        </>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}