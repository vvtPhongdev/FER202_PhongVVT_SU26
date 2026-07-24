import { createContext, useContext, useReducer, useEffect } from 'react'
import { carReducer, initialState } from '../reducer/carReducer'
import { fetchCarTypes, fetchCars } from '../api/carApi'
export const CarContext = createContext(null)
export function CarProvider({ children }) {
  const [state, dispatch] = useReducer(carReducer, initialState)
  useEffect(() => {
    Promise.allSettled([fetchCarTypes(), fetchCars()]).then(([rtResult, carResult]) => {
      if (rtResult.status === 'fulfilled') dispatch({ type: 'SET_CAR_TYPES', payload: rtResult.value })
      if (carResult.status === 'fulfilled') dispatch({ type: 'SET_CARS', payload: carResult.value })
      else dispatch({ type: 'SET_ERROR', payload: carResult.reason?.message })
      dispatch({ type: 'SET_LOADING', payload: false })
    })
  }, [])
  return <CarContext.Provider value={{ state, dispatch }}>{children}</CarContext.Provider>
}
export function useCar() { return useContext(CarContext) }
