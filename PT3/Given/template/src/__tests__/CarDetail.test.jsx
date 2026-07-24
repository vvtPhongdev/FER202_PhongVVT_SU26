import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CarContext } from '../context/CarContext'
import CarDetail from '../pages/CarDetail'
import * as carApi from '../api/carApi'

jest.mock('../api/carApi')

const mockCar = {
  id: '1', name: 'Car 101', carTypeId: 1, seats: '1',
  transmission: 'Automatic', priceWeekday: 800000, priceWeekend: 1200000, lastServiced: '15/03/2022'
}

const mockCtx = {
  state: { carTypes: [{ id: 1, name: 'Standard' }], cars: [], loading: false, error: null },
  dispatch: jest.fn(),
}

const renderCarDetail = () =>
  render(
    <CarContext.Provider value={mockCtx}>
      <MemoryRouter initialEntries={['/cars/1']}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </MemoryRouter>
    </CarContext.Provider>
  )

describe('TODO-05: CarDetail — fetch và hiển thị thông tin phòng', () => {
  test('hiển thị tên phòng sau khi load', async () => {
    carApi.fetchCarById.mockResolvedValue(mockCar)
    renderCarDetail()
    await waitFor(() => {
      expect(screen.getByText('Car 101')).toBeInTheDocument()
    })
  })

  test('hiển thị Spinner khi đang loading', () => {
    carApi.fetchCarById.mockReturnValue(new Promise(() => {}))
    renderCarDetail()
    expect(document.querySelector('.spinner-border') || screen.queryByRole('status')).toBeTruthy()
  })

  test('có nút Back', async () => {
    carApi.fetchCarById.mockResolvedValue(mockCar)
    renderCarDetail()
    await waitFor(() => {
      expect(screen.getByText(/back/i)).toBeInTheDocument()
    })
  })
})
