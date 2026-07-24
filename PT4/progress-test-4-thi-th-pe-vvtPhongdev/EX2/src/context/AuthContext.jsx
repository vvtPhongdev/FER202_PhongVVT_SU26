import { createContext, useContext, useReducer } from 'react'
import { authReducer, authInitialState } from '../reducer/authReducer'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'auth_user'

const persistedUser = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) } catch { return null }
})()

const initialState = persistedUser
  ? { user: persistedUser, isAuthenticated: true }
  : authInitialState

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const loginUser = (userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    dispatch({ type: 'LOGIN', payload: userData })
  }

  const logoutUser = () => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ user: state.user, isAuthenticated: state.isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
