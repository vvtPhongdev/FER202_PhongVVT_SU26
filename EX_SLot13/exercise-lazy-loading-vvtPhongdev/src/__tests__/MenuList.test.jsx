import { render, screen } from '@testing-library/react'
import MenuList from '../components/MenuList'

const mockMenus = [
  { id: 1, name: 'Phở Bò',   price: 65000, category: 'Món nước', available: true },
  { id: 2, name: 'Cơm Sườn', price: 55000, category: 'Cơm',      available: true },
]

// ─── TODO-03 ─────────────────────────────────────────────────────────────────
describe('MenuList (TODO-03)', () => {
  test('render đủ số lượng MenuCard', () => {
    render(<MenuList menus={mockMenus} onDelete={() => {}} />)
    expect(screen.getAllByRole('button', { name: /xóa/i })).toHaveLength(2)
  })

  test('hiển thị tên của tất cả các món', () => {
    render(<MenuList menus={mockMenus} onDelete={() => {}} />)
    expect(screen.getByText('Phở Bò')).toBeInTheDocument()
    expect(screen.getByText('Cơm Sườn')).toBeInTheDocument()
  })

  test('hiển thị thông báo khi danh sách rỗng', () => {
    render(<MenuList menus={[]} onDelete={() => {}} />)
    expect(screen.getByText(/Không có món ăn/i)).toBeInTheDocument()
  })
})
