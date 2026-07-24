import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Login from '../pages/Login'
import * as authApi from '../api/authApi'

jest.mock('../api/authApi')

const mockLoginUser = jest.fn()
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: null, isAuthenticated: false, loginUser: mockLoginUser, logoutUser: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('Login — TODO-01', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockLoginUser.mockClear()
  })

  test('TODO-01: shows Alert when login returns User role (not Admin)', async () => {
    authApi.login.mockRejectedValue(new Error('Access denied. Only Admin users can log in.'))
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'user1' } })
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'user123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  test('TODO-01: shows Alert when credentials are wrong', async () => {
    authApi.login.mockRejectedValue(new Error('Invalid username or password.'))
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'wrong' } })
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  test('TODO-01: error message is displayed in the Alert', async () => {
    authApi.login.mockRejectedValue(new Error('Access denied. Only Admin users can log in.'))
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'user1' } })
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'user123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/admin/i)
    })
  })
})
