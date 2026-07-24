import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CarContext } from '../context/CarContext'
import AddCar from '../pages/AddCar'
import * as carApi from '../api/carApi'

jest.mock('../api/carApi')

const mockCarTypes = [
  { id: '1', name: 'Standard' },
  { id: '2', name: 'Deluxe' },
  { id: '3', name: 'Suite' },
]

const mockAuthCtx = { user: { email: 'admin@carrental.com', role: 'Admin' }, isAuthenticated: true, logoutUser: jest.fn() }
const mockCarCtx = { state: { cars: [], loading: false }, dispatch: jest.fn() }

const renderAddCar = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthCtx}>
        <CarContext.Provider value={mockCarCtx}>
          <AddCar />
        </CarContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('TODO-04: AddCar — dropdown CarType từ API', () => {
  beforeEach(() => {
    carApi.fetchCarTypes.mockResolvedValue(mockCarTypes)
  })

  test('gọi fetchCarTypes khi component mount', async () => {
    renderAddCar()
    await waitFor(() => {
      expect(carApi.fetchCarTypes).toHaveBeenCalled()
    })
  })

  test('hiển thị đủ các option CarType trong dropdown', async () => {
    renderAddCar()
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Standard' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Deluxe' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Suite' })).toBeInTheDocument()
    })
  })
})
