import { createContext, useContext, useState } from 'react'

const CounterContext = createContext(null)

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)
  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  const ctx = useContext(CounterContext)
  if (ctx === null) throw new Error('useCounter must be used within CounterProvider')
  return ctx
}
