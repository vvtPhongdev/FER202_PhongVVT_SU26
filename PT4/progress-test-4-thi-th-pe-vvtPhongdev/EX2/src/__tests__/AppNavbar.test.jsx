import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AppNavbar from '../components/AppNavbar'

const mockLogoutUser = jest.fn()
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const renderWithUser = (user = { fullName: 'Cinema Admin', role: 'Admin' }) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginUser: jest.fn(), logoutUser: mockLogoutUser }}>
        <AppNavbar />
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('AppNavbar', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockLogoutUser.mockClear()
  })

  test('TODO-02: shows user fullName in navbar', () => {
    renderWithUser()
    expect(screen.getByText('Cinema Admin')).toBeInTheDocument()
  })

  test('TODO-02: shows user role as Badge', () => {
    renderWithUser()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  test('TODO-03: Logout button is present', () => {
    renderWithUser()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  test('TODO-03: clicking Logout calls logoutUser and navigates to /login', () => {
    renderWithUser()
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    expect(mockLogoutUser).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  test('Brand shows app name "Cinema Management App" (provided)', () => {
    renderWithUser()
    expect(screen.getByText(/Cinema Management App/i)).toBeInTheDocument()
  })

  test('Brand links to "/" (provided)', () => {
    const { container } = renderWithUser()
    const brand = container.querySelector('a.navbar-brand')
    expect(brand).not.toBeNull()
    expect(brand.getAttribute('href')).toBe('/')
  })
})
