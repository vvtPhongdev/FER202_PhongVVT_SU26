/**
 * Visible tests — TODO-01: Alert khi đăng nhập không phải Admin
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Login from '../pages/Login'
import { AuthProvider } from '../context/AuthContext'

const mock = new MockAdapter(axios)

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  )

afterEach(() => mock.reset())

test('TODO-01: hiển thị alert lỗi khi đăng nhập với tài khoản không phải Admin', async () => {
  mock.onGet(/\/users/).reply(200, [
    { id: '2', username: 'user1', password: 'user123', role: 'User', fullName: 'Nguyen Van A' },
  ])

  renderLogin()

  fireEvent.change(screen.getByPlaceholderText(/Enter username/i), {
    target: { value: 'user1' },
  })
  fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
    target: { value: 'user123' },
  })
  fireEvent.click(screen.getByRole('button', { name: /login/i }))

  await waitFor(() => {
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})

test('TODO-01: không hiển thị alert khi form mới load', () => {
  renderLogin()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})
