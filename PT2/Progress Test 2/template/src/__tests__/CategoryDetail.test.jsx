/**
 * Visible tests — TODO-09: Chi tiết Category + danh sách nhà hàng
 */
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import CategoryDetail from '../pages/CategoryDetail'

const mock = new MockAdapter(axios)

const categories = [{ id: '1', name: 'Casual' }, { id: '2', name: 'FastFood' }]
const restaurants = [
  { id: '1', name: 'BBQ Restaurant', categoryId: 1, owner: 'Hoang', address: 'Hang Bai', priceMin: 50000, priceMax: 200000 },
  { id: '5', name: 'Bun Bo Hue',    categoryId: 1, owner: 'Nga',   address: 'Dong Da',  priceMin: 30000, priceMax: 60000  },
  { id: '2', name: 'Pho 24',        categoryId: 2, owner: 'Minh',  address: 'Hoan Kiem',priceMin: 50000, priceMax: 100000 },
]

const renderPage = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/categories/${id}`]}>
      <Routes>
        <Route path="/categories/:id" element={<CategoryDetail />} />
      </Routes>
    </MemoryRouter>
  )

beforeEach(() => {
  mock.onGet(/\/categories/).reply(200, categories)
  mock.onGet(/\/restaurants/).reply(200, restaurants)
})
afterEach(() => mock.reset())

test('TODO-09: hiển thị tên category', async () => {
  renderPage('1')
  await waitFor(() => {
    expect(screen.getByText(/Casual/i)).toBeInTheDocument()
  })
})

test('TODO-09: chỉ hiển thị nhà hàng thuộc đúng category', async () => {
  renderPage('1')
  await waitFor(() => {
    expect(screen.getByText(/BBQ Restaurant/i)).toBeInTheDocument()
    expect(screen.getByText(/Bun Bo Hue/i)).toBeInTheDocument()
    expect(screen.queryByText(/Pho 24/i)).not.toBeInTheDocument()
  })
})

test('TODO-09: có nút Back to Categories', async () => {
  renderPage('1')
  await waitFor(() => {
    expect(screen.getByText(/back to categories/i)).toBeInTheDocument()
  })
})
