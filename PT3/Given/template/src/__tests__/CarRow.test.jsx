import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CarRow from '../components/CarRow'

const mockCar = {
  id: '1', name: 'Car 101', carType: 'Standard', seats: '1',
  transmission: 'Automatic', priceWeekday: 800000, priceWeekend: 1200000, lastServiced: '15/03/2022'
}

const mockDelete = jest.fn()

const renderRow = (car = mockCar) =>
  render(
    <MemoryRouter>
      <table><tbody>
        <CarRow car={car} index={1} onDelete={mockDelete} />
      </tbody></table>
    </MemoryRouter>
  )

describe('TODO-06: CarRow - Delete voi ModalConfirm', () => {
  test('nhan Delete -> modal xuat hien voi ten xe', async () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => {
      expect(screen.getByText(/Car 101/)).toBeInTheDocument()
    })
  })

  test('xac nhan modal -> goi onDelete voi id xe', async () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => screen.getByText(/Car 101/))
    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }))
    expect(mockDelete).toHaveBeenCalledWith('1')
  })
})

describe('TODO-07: CarRow - Price (Weekday) column', () => {
  test('hien thi gia weekday dung dinh dang VND', () => {
    renderRow()
    expect(screen.getByText(/800\.000/)).toBeInTheDocument()
    expect(screen.getByText(/₫/)).toBeInTheDocument()
  })

  test('KHONG hien thi gia weekend trong cot', () => {
    renderRow()
    expect(screen.queryByText(/1\.200|1,200/)).not.toBeInTheDocument()
  })
})
