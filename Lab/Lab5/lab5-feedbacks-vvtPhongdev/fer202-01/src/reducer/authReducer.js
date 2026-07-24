export const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
}

export const initialAuthState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { ...state, loading: true, error: null }

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, loading: false, user: action.payload }

    case AUTH_ACTIONS.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload }

    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('user')
      return { ...state, user: null }

    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null }

    default:
      return state
  }
}
