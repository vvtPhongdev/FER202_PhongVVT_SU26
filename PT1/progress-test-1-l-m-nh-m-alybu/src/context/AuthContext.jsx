import { createContext, useContext, useState } from 'react'
import USERS from '../data/users'

// Khởi tạo AuthContext bằng createContext()
const AuthContext = createContext(null)

// Tạo AuthProvider quản lý 3 states: user, loading, error
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Triển khai hàm login(email, password)
  const login = (email, password) => {
    setLoading(true)
    setError(null)
    
    setTimeout(() => {
      const foundUser = USERS.find(u => u.email === email && u.password === password)
      if (foundUser) {
        setUser(foundUser)
        setError(null)
      } else {
        setError('Email hoặc mật khẩu không đúng.')
      }
      setLoading(false)
    }, 800)
  }

  // Triển khai hàm logout()
  const logout = () => {
    setUser(null)
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Triển khai và export custom hook useAuth()
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
