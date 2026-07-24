import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Login from '../pages/Login'
import * as authApi from '../api/authApi'

jest.mock('../api/authApi')

const mockAuthCtx = { loginUser: jest.fn(), isAuthenticated: false, user: null }

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthCtx}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('TODO-01: Login - hien thi loi khi dang nhap that bai, role User van dang nhap duoc', () => {
  beforeEach(() => mockAuthCtx.loginUser.mockClear())

  test('role User dang nhap thanh cong -> KHONG hien thi Alert', async () => {
    authApi.login.mockResolvedValue({ id: '2', username: 'user1', role: 'User', fullName: 'Nguyen Van A', email: 'user1@carrental.com' })
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'user1' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'user123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(mockAuthCtx.loginUser).toHaveBeenCalled()
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('Alert chua thong bao loi tu server', async () => {
    authApi.login.mockRejectedValue(new Error('Invalid username or password.'))
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'wronguser' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid username or password.')
    })
  })
})
