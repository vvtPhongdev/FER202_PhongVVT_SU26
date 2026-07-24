export const initialState = { loading: true, error: null, genres: [], movies: [] }

export function movieReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload }
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false }
    case 'SET_GENRES': return { ...state, genres: action.payload }
    case 'SET_MOVIES': return { ...state, movies: action.payload }
    case 'ADD_MOVIE': return { ...state, movies: [...state.movies, action.payload] }
    case 'DELETE_MOVIE': return { ...state, movies: state.movies.filter((b) => b.id !== action.payload) }
    default: return state
  }
}
