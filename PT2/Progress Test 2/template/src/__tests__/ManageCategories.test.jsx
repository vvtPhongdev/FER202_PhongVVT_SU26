/**
 * Visible tests — TODO-10A: Thêm category / TODO-10B: Xóa category
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ManageCategories from '../pages/ManageCategories'
import { AuthProvider } from '../context/AuthContext'

const mock = new MockAdapter(axios)

const mockCategories = [
  { id: '1', name: 'Casual' },
  { id: '2', name: 'FastFood' },
]

const renderPage = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <ManageCategories />
      </AuthProvider>
    </MemoryRouter>
  )

beforeEach(() => {
  mock.onGet(/\/categories/).reply(200, mockCategories)
})
afterEach(() => mock.reset())

test('TODO-10A: form thêm category xuất hiện trên trang', async () => {
  renderPage()
  await waitFor(() => {
    expect(screen.getByPlaceholderText(/e\.g\. Buffet/i)).toBeInTheDocument()
  })
})

test('TODO-10A: thêm category thành công cập nhật danh sách', async () => {
  mock.onPost(/\/categories/).reply(200, { id: '7', name: 'Buffet' })

  renderPage()
  await waitFor(() => screen.getByPlaceholderText(/e\.g\. Buffet/i))

  fireEvent.change(screen.getByPlaceholderText(/e\.g\. Buffet/i), {
    target: { value: 'Buffet' },
  })
  fireEvent.click(screen.getByRole('button', { name: /add/i }))

  await waitFor(() => {
    expect(screen.getByText('Buffet')).toBeInTheDocument()
  })
})

test('TODO-10B: nhấn Delete hiển thị ModalConfirm', async () => {
  renderPage()

  await waitFor(() => {
    expect(screen.getAllByRole('button', { name: /delete/i }).length).toBeGreaterThan(0)
  })

  fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0])

  await waitFor(() => {
    // Modal xuất hiện với tên category "Casual"
    expect(screen.getByText(/Casual/i, { selector: 'strong' })).toBeInTheDocument()
  })
})
