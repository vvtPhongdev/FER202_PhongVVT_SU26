import { createContext, useContext, useReducer } from 'react'
import { authReducer, authInitialState } from '../reducer/authReducer'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  /** Đăng nhập — lưu user vào state */
  const loginUser = (userData) =>
    dispatch({ type: 'LOGIN', payload: userData })

  /** Đăng xuất — reset về initialState */
  const logoutUser = () => dispatch({ type: 'LOGOUT' })

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
