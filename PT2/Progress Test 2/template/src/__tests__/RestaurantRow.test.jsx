/**
 * Visible tests — TODO-06: Delete với ModalConfirm / TODO-07: Price Range column
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RestaurantRow from '../components/RestaurantRow'

const mockRestaurant = {
  id: '1',
  name: 'BBQ Restaurant',
  category: 'Casual',
  owner: 'Hoang',
  address: 'Hang Bai',
  priceMin: 50000,
  priceMax: 200000,
  openDate: '15/03/2018',
}

const renderRow = (onDelete = jest.fn()) =>
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <RestaurantRow restaurant={mockRestaurant} index={0} onDelete={onDelete} />
        </tbody>
      </table>
    </MemoryRouter>
  )

test('TODO-06: nhấn Delete hiển thị ModalConfirm', () => {
  renderRow()

  fireEvent.click(screen.getByText(/delete/i))

  // Modal phải xuất hiện với tên nhà hàng
  expect(screen.getByText(/BBQ Restaurant/i, { selector: 'strong, p, div' })).toBeInTheDocument()
})

test('TODO-06: xác nhận xóa gọi onDelete với đúng id', () => {
  const onDelete = jest.fn()
  renderRow(onDelete)

  fireEvent.click(screen.getByText(/delete/i))
  // Nhấn nút xác nhận trong modal
  const confirmBtn = screen.getAllByRole('button').find(
    (btn) => btn.textContent === 'Delete' && btn.closest('.modal')
  ) || screen.getByRole('button', { name: /^delete$/i })
  fireEvent.click(confirmBtn)

  expect(onDelete).toHaveBeenCalledWith('1')
})

test('TODO-07: hiển thị Price Range', () => {
  renderRow()
  // Phải có text định dạng giá VND
  expect(screen.getByText(/50\.000|50,000/)).toBeInTheDocument()
  expect(screen.getByText(/200\.000|200,000/)).toBeInTheDocument()
})
