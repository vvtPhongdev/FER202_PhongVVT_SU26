import '@testing-library/jest-dom'

// Suppress React Router v6 future flag warnings in tests
const RR_FLAGS = ['v7_relativeSplatPath', 'v7_startTransition']
const isRRWarning = (arg) => typeof arg === 'string' && RR_FLAGS.some((f) => arg.includes(f))

const originalWarn = console.warn
const originalError = console.error
beforeAll(() => {
  console.warn = (...args) => { if (isRRWarning(args[0])) return; originalWarn(...args) }
  console.error = (...args) => { if (isRRWarning(args[0])) return; originalError(...args) }
})
afterAll(() => {
  console.warn = originalWarn
  console.error = originalError
})
