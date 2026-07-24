import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CarContext } from '../context/CarContext'
import { AuthContext } from '../context/AuthContext'
import CarList from '../pages/CarList'
import * as carApi from '../api/carApi'

jest.mock('../api/carApi')

const carTypes = [
  { id: 1, name: 'Economy' },
  { id: 2, name: 'SUV' },
]

const cars = [
  { id: '3', name: 'Audi A6', carTypeId: 2, seats: '5', transmission: 'Automatic', priceWeekday: 2100000, priceWeekend: 2900000, lastServiced: '20/07/2024' },
  { id: '1', name: 'Toyota Vios', carTypeId: 1, seats: '5', transmission: 'Automatic', priceWeekday: 500000, priceWeekend: 700000, lastServiced: '15/03/2022' },
  { id: '2', name: 'Mazda CX-5', carTypeId: 2, seats: '7', transmission: 'Automatic', priceWeekday: 900000, priceWeekend: 1200000, lastServiced: '01/03/2024' },
]

const mockCarCtx = { state: { cars, carTypes, loading: false, error: null }, dispatch: jest.fn() }

const renderList = (role) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: { role, email: 'x@carrental.com' }, isAuthenticated: true }}>
        <CarContext.Provider value={mockCarCtx}>
          <CarList />
        </CarContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('TODO-01: CarList — ẩn nút quản lý khi role không phải Admin', () => {
  test('role Admin → thấy nút "+ Add Car" và nút Delete', () => {
    renderList('Admin')
    expect(screen.getByRole('button', { name: /add car/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /delete/i }).length).toBeGreaterThan(0)
  })

  test('role User → KHÔNG thấy nút "+ Add Car" và nút Delete, vẫn xem được danh sách', () => {
    renderList('User')
    expect(screen.queryByRole('button', { name: /add car/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
    expect(screen.getByText('Toyota Vios')).toBeInTheDocument()
  })
})

describe('TODO-03: CarList — dropdown sắp xếp Name / Seats / Price', () => {
  test('có dropdown sắp xếp (aria-label "Sort by")', () => {
    renderList('Admin')
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
  })

  test('chọn Price (Low → High) → xe rẻ nhất hiển thị hàng đầu tiên', () => {
    renderList('Admin')
    fireEvent.change(screen.getByLabelText(/sort by/i), { target: { value: 'price-asc' } })
    const rows = screen.getAllByRole('row').slice(1)
    expect(rows[0]).toHaveTextContent('Toyota Vios')
  })
})
