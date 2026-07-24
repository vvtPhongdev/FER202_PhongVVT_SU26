import { createContext, useContext, useReducer } from 'react'
import {
  AUTH_ACTIONS,
  authReducer,
  initialAuthState,
} from '../reducer/authReducer'
import { loginUser } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START })

    try {
      const user = await loginUser(credentials)

      if (!user) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAIL,
          payload: 'Invalid email or password',
        })
        return false
      }

      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user })
      return true
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAIL, payload: err.message })
      return false
    }
  }

  const logout = () => dispatch({ type: AUTH_ACTIONS.LOGOUT })
  const clearError = () => dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
