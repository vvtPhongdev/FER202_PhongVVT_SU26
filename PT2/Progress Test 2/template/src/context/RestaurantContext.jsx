import { createContext, useContext, useReducer, useEffect } from 'react'
import { restaurantReducer, initialState } from '../reducer/restaurantReducer'
import { fetchCategories, fetchRestaurants } from '../api/restaurantApi'

export const RestaurantContext = createContext(null)

export function RestaurantProvider({ children }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchCategories(), fetchRestaurants()]).then(
      ([catResult, restResult]) => {
        if (catResult.status === 'fulfilled')
          dispatch({ type: 'SET_CATEGORIES', payload: catResult.value })
        if (restResult.status === 'fulfilled')
          dispatch({ type: 'SET_RESTAURANTS', payload: restResult.value })
        else
          dispatch({ type: 'SET_ERROR', payload: restResult.reason?.message })
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    )
  }, [])

  return (
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  return useContext(RestaurantContext)
}
