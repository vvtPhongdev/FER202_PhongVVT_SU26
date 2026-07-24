import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ManageCarTypes from '../pages/ManageCarTypes'
import * as carApi from '../api/carApi'

jest.mock('../api/carApi')

const initialCarTypes = [
  { id: '1', name: 'Standard' },
  { id: '2', name: 'Deluxe' },
]

const renderPage = () =>
  render(
    <MemoryRouter>
      <ManageCarTypes />
    </MemoryRouter>
  )

describe('TODO-10A: ManageCarTypes — Thêm loại phòng mới', () => {
  beforeEach(() => {
    carApi.fetchCarTypes.mockResolvedValue([...initialCarTypes])
    carApi.addCarType.mockResolvedValue({ id: '6', name: 'Pickup' })
  })

  test('form có placeholder "e.g. Pickup"', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Standard'))
    expect(screen.getByPlaceholderText('e.g. Pickup')).toBeInTheDocument()
  })

  test('thêm carType mới → xuất hiện trong danh sách', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Standard'))
    fireEvent.change(screen.getByPlaceholderText('e.g. Pickup'), { target: { value: 'Pickup' } })
    fireEvent.click(screen.getByRole('button', { name: /add car type/i }))
    await waitFor(() => {
      expect(screen.getByText('Pickup')).toBeInTheDocument()
    })
  })
})

describe('TODO-10B: ManageCarTypes — Xoá loại phòng với ModalConfirm', () => {
  beforeEach(() => {
    carApi.fetchCarTypes.mockResolvedValue([...initialCarTypes])
    carApi.deleteCarType.mockResolvedValue({})
  })

  test('nhấn Delete → modal hiện tên loại phòng', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Standard'))
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])
    await waitFor(() => {
      expect(screen.getByText(/Standard/)).toBeInTheDocument()
    })
  })
})
