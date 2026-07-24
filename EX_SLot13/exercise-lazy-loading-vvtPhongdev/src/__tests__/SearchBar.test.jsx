import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar'

// ─── TODO-08 ─────────────────────────────────────────────────────────────────
describe('SearchBar (TODO-08)', () => {
  test('render ô input tìm kiếm', () => {
    render(<SearchBar onSearch={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('gọi onSearch với giá trị đã nhập khi thay đổi', () => {
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Phở' } })

    expect(onSearch).toHaveBeenCalledWith('Phở')
  })

  test('gọi onSearch mỗi lần user gõ (không debounce)', () => {
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'P'  } })
    fireEvent.change(input, { target: { value: 'Ph' } })
    fireEvent.change(input, { target: { value: 'Ph' } })

    expect(onSearch).toHaveBeenCalledTimes(3)
  })
})
