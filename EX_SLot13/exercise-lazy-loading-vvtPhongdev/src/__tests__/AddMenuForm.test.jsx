import { render, screen, fireEvent } from '@testing-library/react'
import AddMenuForm from '../components/AddMenuForm'

// ─── TODO-04 ─────────────────────────────────────────────────────────────────
describe('AddMenuForm (TODO-04)', () => {
  test('render đủ 3 trường và nút Thêm', () => {
    render(<AddMenuForm onAdd={() => {}} />)
    expect(screen.getByPlaceholderText(/Tên món/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Giá/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /thêm/i })).toBeInTheDocument()
  })

  test('gọi onAdd với đúng dữ liệu khi form hợp lệ', () => {
    const onAdd = jest.fn()
    render(<AddMenuForm onAdd={onAdd} />)

    fireEvent.change(screen.getByPlaceholderText(/Tên món/i), { target: { value: 'Bún Bò' } })
    fireEvent.change(screen.getByPlaceholderText(/Giá/i),    { target: { value: '70000'  } })
    fireEvent.click(screen.getByRole('button', { name: /thêm/i }))

    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Bún Bò', price: 70000, available: true })
    )
  })

  test('KHÔNG gọi onAdd khi tên rỗng', () => {
    const onAdd = jest.fn()
    render(<AddMenuForm onAdd={onAdd} />)

    fireEvent.change(screen.getByPlaceholderText(/Giá/i), { target: { value: '50000' } })
    fireEvent.click(screen.getByRole('button', { name: /thêm/i }))

    expect(onAdd).not.toHaveBeenCalled()
  })

  test('KHÔNG gọi onAdd khi giá không hợp lệ (= 0)', () => {
    const onAdd = jest.fn()
    render(<AddMenuForm onAdd={onAdd} />)

    fireEvent.change(screen.getByPlaceholderText(/Tên món/i), { target: { value: 'Món nào đó' } })
    fireEvent.change(screen.getByPlaceholderText(/Giá/i),    { target: { value: '0'          } })
    fireEvent.click(screen.getByRole('button', { name: /thêm/i }))

    expect(onAdd).not.toHaveBeenCalled()
  })

  test('reset form về rỗng sau khi submit thành công', () => {
    render(<AddMenuForm onAdd={() => {}} />)
    const nameInput = screen.getByPlaceholderText(/Tên món/i)

    fireEvent.change(nameInput,                            { target: { value: 'Bún Bò' } })
    fireEvent.change(screen.getByPlaceholderText(/Giá/i), { target: { value: '70000'  } })
    fireEvent.click(screen.getByRole('button', { name: /thêm/i }))

    expect(nameInput.value).toBe('')
  })
})
