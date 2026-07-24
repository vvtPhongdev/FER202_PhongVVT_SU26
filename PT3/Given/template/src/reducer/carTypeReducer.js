export const formInitialState = { newName: '', validated: false, uniqueError: false }
export function carTypeFormReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME': return { ...state, newName: action.payload, uniqueError: false }
    case 'SET_VALIDATED': return { ...state, validated: action.payload }
    case 'SET_UNIQUE_ERROR': return { ...state, uniqueError: action.payload }
    case 'BLUR': return action.isValid ? { ...state, validated: false } : state
    case 'RESET': return formInitialState
    default: return state
  }
}
export const editInitialState = { editingId: null, editValue: '', editError: null }
export function editReducer(state, action) {
  switch (action.type) {
    case 'START': return { editingId: action.id, editValue: action.name, editError: null }
    case 'SET_VALUE': return { ...state, editValue: action.payload, editError: null }
    case 'BLUR': return { ...state, editError: action.error }
    case 'SET_ERROR': return { ...state, editError: action.payload }
    case 'CANCEL': return editInitialState
    default: return state
  }
}
