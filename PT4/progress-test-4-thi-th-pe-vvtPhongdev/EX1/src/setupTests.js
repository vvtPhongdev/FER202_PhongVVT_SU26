import '@testing-library/jest-dom'

// Suppress React Router v6 future flag deprecation warnings in tests
const originalWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) return
  originalWarn.call(console, ...args)
}

// Reset sessionStorage giữa các test để tránh phiên đăng nhập (AuthContext)
// bị rò rỉ từ test này sang test khác trong cùng 1 file
afterEach(() => {
  window.sessionStorage.clear()
})
