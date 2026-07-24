import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { themes, STORAGE_KEY } from '../data/themeConfig'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem(STORAGE_KEY) || 'system')
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = e => setSystemPrefersDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const resolvedTheme = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode
  const colors = themes[resolvedTheme]

  const changeMode = newMode => {
    setMode(newMode)
    localStorage.setItem(STORAGE_KEY, newMode)
  }

  const value = useMemo(
    () => ({ mode, resolvedTheme, colors, changeMode }),
    [mode, resolvedTheme, colors]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (ctx === null) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
