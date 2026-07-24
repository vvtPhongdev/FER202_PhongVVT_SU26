export const authInitialState = { user: null, isAuthenticated: false }
export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return { ...state, user: action.payload, isAuthenticated: true }
    case 'LOGOUT': return { ...authInitialState }
    default: return state
  }
}
export const loginInitialState = { username: '', password: '', validated: false, serverError: '' }
export function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME': return { ...state, username: action.payload, serverError: '' }
    case 'SET_PASSWORD': return { ...state, password: action.payload, serverError: '' }
    case 'SET_VALIDATED': return { ...state, validated: action.payload }
    case 'SET_ERROR': return { ...state, serverError: action.payload }
    case 'CANCEL': return { ...loginInitialState }
    default: return state
  }
}
