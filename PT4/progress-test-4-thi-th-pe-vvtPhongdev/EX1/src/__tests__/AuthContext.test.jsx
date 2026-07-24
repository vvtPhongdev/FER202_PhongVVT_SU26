import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CarProvider } from '../context/CarContext'
import AppNavbar from '../components/AppNavbar'
import AppRoutes from '../routes/AppRoutes'
import * as carApi from '../api/carApi'
import * as authApi from '../api/authApi'

jest.mock('../api/carApi')
jest.mock('../api/authApi')

const renderApp = (initialPath) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <CarProvider>
          <AppNavbar />
          <AppRoutes />
        </CarProvider>
      </AuthProvider>
    </MemoryRouter>
  )

describe('AuthContext — phiên đăng nhập phải được giữ lại khi reload / truy cập trực tiếp URL', () => {
  beforeEach(() => {
    carApi.fetchCarTypes.mockResolvedValue([{ id: '1', name: 'Standard' }])
    carApi.fetchCars.mockResolvedValue([])
  })

  test('chưa từng đăng nhập → truy cập /car-types/999 lần đầu sẽ về trang Login (đúng, không phải bug)', async () => {
    renderApp('/car-types/999')
    await waitFor(() => {
      expect(screen.getByText(/Admin Login/i)).toBeInTheDocument()
    })
  })

  test('BUG ĐÃ FIX: đăng nhập thành công, sau đó "reload" (remount) tại /car-types/999 → vẫn còn phiên đăng nhập, KHÔNG bị đưa về Login', async () => {
    authApi.login.mockResolvedValue({
      id: '1', username: 'admin', role: 'Admin', email: 'admin@carrental.com', fullName: 'Rental Manager',
    })

    const { unmount } = renderApp('/login')
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument()
    })

    // Unmount toàn bộ app rồi render lại từ đầu tại URL khác — mô phỏng đúng
    // hành vi reload trang / dán URL /car-types/999 vào thanh địa chỉ.
    unmount()
    renderApp('/car-types/999')
    await waitFor(() => {
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument()
    })
  })

  test('logout → xóa phiên đăng nhập → reload lại route bảo vệ sẽ về Login', async () => {
    authApi.login.mockResolvedValue({
      id: '1', username: 'admin', role: 'Admin', email: 'admin@carrental.com', fullName: 'Rental Manager',
    })
    const { unmount } = renderApp('/login')
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    await waitFor(() => {
      expect(screen.getByText(/Admin Login/i)).toBeInTheDocument()
    })

    unmount()
    renderApp('/car-types/999')
    await waitFor(() => {
      expect(screen.getByText(/Admin Login/i)).toBeInTheDocument()
    })
  })
})
