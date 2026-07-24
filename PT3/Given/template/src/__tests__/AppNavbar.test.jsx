import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AppNavbar from '../components/AppNavbar'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const mockLogout = jest.fn()

const renderWithUser = (user) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, isAuthenticated: !!user, logoutUser: mockLogout }}>
        <AppNavbar />
      </AuthContext.Provider>
    </MemoryRouter>
  )

beforeEach(() => { mockNavigate.mockClear(); mockLogout.mockClear() })

describe('TODO-02: Navbar — hiển thị email và role', () => {
  test('hiển thị email của user', () => {
    renderWithUser({ email: 'admin@carrental.com', role: 'Admin' })
    expect(screen.getByText('admin@carrental.com')).toBeInTheDocument()
  })

  test('hiển thị role trong Badge', () => {
    renderWithUser({ email: 'admin@carrental.com', role: 'Admin' })
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })
})

describe('TODO-03: Navbar — Logout button', () => {
  test('nhấn Logout gọi logoutUser', () => {
    renderWithUser({ email: 'admin@carrental.com', role: 'Admin' })
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    expect(mockLogout).toHaveBeenCalled()
  })

  test('nhấn Logout navigate đến /login', () => {
    renderWithUser({ email: 'admin@carrental.com', role: 'Admin' })
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})

describe('Navbar.Brand dẫn đến /', () => {
  test('Brand link trỏ đến /', () => {
    renderWithUser({ email: 'admin@carrental.com', role: 'Admin' })
    const brand = screen.getByText('Car Rental App').closest('a')
    expect(brand).toHaveAttribute('href', '/')
  })
})
