export const initialState = { loading: true, error: null, carTypes: [], cars: [] }
export function carReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload }
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false }
    case 'SET_CAR_TYPES': return { ...state, carTypes: action.payload }
    case 'SET_CARS': return { ...state, cars: action.payload }
    case 'ADD_CAR': return { ...state, cars: [...state.cars, action.payload] }
    case 'DELETE_CAR': return { ...state, cars: state.cars.filter((r) => r.id !== action.payload) }
    default: return state
  }
}
