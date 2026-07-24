import { createContext, useContext, useReducer, useEffect } from 'react'
import { movieReducer, initialState } from '../reducer/movieReducer'
import { fetchGenres, fetchMovies } from '../api/movieApi'

export const MovieContext = createContext(null)

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchGenres(), fetchMovies()]).then(([genResult, movieResult]) => {
      if (genResult.status === 'fulfilled') dispatch({ type: 'SET_GENRES', payload: genResult.value })
      if (movieResult.status === 'fulfilled') dispatch({ type: 'SET_MOVIES', payload: movieResult.value })
      else dispatch({ type: 'SET_ERROR', payload: movieResult.reason?.message })
      dispatch({ type: 'SET_LOADING', payload: false })
    })
  }, [])

  return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>
}

export function useMovie() { return useContext(MovieContext) }
