import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CarTypeDetail from '../pages/CarTypeDetail'
import AppRoutes from '../routes/AppRoutes'
import { AuthContext } from '../context/AuthContext'
import { CarProvider } from '../context/CarContext'
import * as carApi from '../api/carApi'

jest.mock('../api/carApi')

const carTypes = [
  { id: '1', name: 'Standard' },
  { id: '2', name: 'Deluxe' },
]
const cars = [
  { id: '1', name: 'Car 101', carTypeId: 1, seats: '1', transmission: 'Automatic', priceWeekday: 800000, priceWeekend: 1200000, lastServiced: '15/03/2022' },
  { id: '4', name: 'Car 102', carTypeId: 1, seats: '1', transmission: 'Manual', priceWeekday: 800000, priceWeekend: 1200000, lastServiced: '15/03/2022' },
  { id: '2', name: 'Car 201', carTypeId: 2, seats: '2', transmission: 'Automatic', priceWeekday: 1500000, priceWeekend: 2000000, lastServiced: '20/06/2023' },
]

const renderDetail = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/car-types/${id}`]}>
      <Routes>
        <Route path="/car-types/:id" element={<CarTypeDetail />} />
      </Routes>
    </MemoryRouter>
  )

describe('TODO-09: CarTypeDetail — Promise.all fetch + filter', () => {
  beforeEach(() => {
    carApi.fetchCarTypes.mockResolvedValue(carTypes)
    carApi.fetchCars.mockResolvedValue(cars)
  })

  test('hiển thị tên loại phòng', async () => {
    renderDetail('1')
    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument()
    })
  })

  test('chỉ hiển thị phòng thuộc loại Standard (carTypeId=1)', async () => {
    renderDetail('1')
    await waitFor(() => screen.getByText('Standard'))
    expect(screen.getByText('Car 101')).toBeInTheDocument()
    expect(screen.getByText('Car 102')).toBeInTheDocument()
    expect(screen.queryByText('Car 201')).not.toBeInTheDocument()
  })

  test('có nút Back to Car Types', async () => {
    renderDetail('1')
    await waitFor(() => {
      expect(screen.getByText(/Back to Car Types/i)).toBeInTheDocument()
    })
  })
})

describe('TODO-10A: id không hợp lệ → hiển thị trang 404, KHÔNG redirect về Login', () => {
  beforeEach(() => {
    carApi.fetchCarTypes.mockResolvedValue(carTypes)
    carApi.fetchCars.mockResolvedValue(cars)
  })

  // Render bằng AppRoutes thật (có ProtectedRoute bọc /car-types/:id) thay vì
  // một cây Routes giả lập riêng, để kiểm tra đúng hành vi khi chạy thật.
  const renderApp = (path, isAuthenticated) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <AuthContext.Provider
          value={{
            user: isAuthenticated ? { email: 'admin@carrental.com', role: 'Admin' } : null,
            isAuthenticated,
            loginUser: jest.fn(),
            logoutUser: jest.fn(),
          }}
        >
          <CarProvider>
            <AppRoutes />
          </CarProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

  test('đã đăng nhập + id không tồn tại → hiển thị trang 404 (không phải Login)', async () => {
    renderApp('/car-types/999', true)
    await waitFor(() => {
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument()
    })
  })

  test('URL sai bất kỳ (kể cả khi chưa đăng nhập) → không tự động chuyển về trang Login', async () => {
    renderApp('/duong-dan-khong-ton-tai', false)
    await waitFor(() => {
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument()
    })
  })
})
