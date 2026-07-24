/**
 * Visible tests — TODO-02, 03, 04: Navbar user info, Logout, Brand link
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppNavbar from '../components/AppNavbar'
import { AuthContext } from '../context/AuthContext'

// Helper: render Navbar với user đã đăng nhập
const renderWithUser = (user = null) => {
  const logoutUser = jest.fn()
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, logoutUser, isAuthenticated: !!user, loginUser: jest.fn() }}>
        <AppNavbar />
      </AuthContext.Provider>
    </MemoryRouter>
  )
  return { logoutUser }
}

test('TODO-02: hiển thị fullName và role khi đã đăng nhập', () => {
  renderWithUser({ id: '1', username: 'admin', fullName: 'Administrator', role: 'Admin' })

  // Dùng exact match để tránh /Admin/i khớp cả "Administrator" lẫn "Admin"
  expect(screen.getByText('Administrator')).toBeInTheDocument()
  expect(screen.getByText('Admin')).toBeInTheDocument()
})

test('TODO-03: nhấn Logout gọi logoutUser', () => {
  const { logoutUser } = renderWithUser({
    id: '1', username: 'admin', fullName: 'Administrator', role: 'Admin',
  })

  fireEvent.click(screen.getByRole('button', { name: /logout/i }))
  expect(logoutUser).toHaveBeenCalledTimes(1)
})

test('TODO-04: Navbar.Brand có liên kết đến trang chủ (/)', () => {
  renderWithUser()
  // Brand phải render một thẻ <a> hoặc link dẫn đến "/"
  const brand = screen.getByText(/Restaurant Management App/i).closest('a')
  expect(brand).not.toBeNull()
  expect(brand.getAttribute('href')).toBe('/')
})
