export const initialState = {
  loading: true,
  error: null,
  categories: [],
  restaurants: [],
}

export function restaurantReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }

    case 'SET_RESTAURANTS':
      return { ...state, restaurants: action.payload }

    case 'ADD_RESTAURANT':
      return { ...state, restaurants: [...state.restaurants, action.payload] }

    case 'DELETE_RESTAURANT':
      return {
        ...state,
        restaurants: state.restaurants.filter((r) => r.id !== action.payload),
      }

    default:
      return state
  }
}
