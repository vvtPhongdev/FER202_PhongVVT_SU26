import { render, screen, fireEvent } from '@testing-library/react'
import MenuCard from '../components/MenuCard'

const mockMenu = {
  id: 1,
  name: 'Phở Bò',
  price: 65000,
  category: 'Món nước',
  available: true,
}

// ─── TODO-01 ─────────────────────────────────────────────────────────────────
describe('MenuCard (TODO-01)', () => {
  test('hiển thị tên món ăn', () => {
    render(<MenuCard menu={mockMenu} onDelete={() => {}} />)
    expect(screen.getByText('Phở Bò')).toBeInTheDocument()
  })

  test('hiển thị giá có định dạng số và ký hiệu ₫', () => {
    render(<MenuCard menu={mockMenu} onDelete={() => {}} />)
    expect(screen.getByText(/65[.,]000/)).toBeInTheDocument()
    expect(screen.getByText(/₫/)).toBeInTheDocument()
  })

  test('hiển thị danh mục', () => {
    render(<MenuCard menu={mockMenu} onDelete={() => {}} />)
    expect(screen.getByText(/Món nước/i)).toBeInTheDocument()
  })

  test('hiển thị badge "Còn món" khi available = true', () => {
    render(<MenuCard menu={mockMenu} onDelete={() => {}} />)
    expect(screen.getByText(/Còn món/i)).toBeInTheDocument()
  })

  test('hiển thị badge "Hết món" khi available = false', () => {
    render(<MenuCard menu={{ ...mockMenu, available: false }} onDelete={() => {}} />)
    expect(screen.getByText(/Hết món/i)).toBeInTheDocument()
  })

  test('gọi onDelete với đúng id khi bấm nút Xóa', () => {
    const onDelete = jest.fn()
    render(<MenuCard menu={mockMenu} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: /xóa/i }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
