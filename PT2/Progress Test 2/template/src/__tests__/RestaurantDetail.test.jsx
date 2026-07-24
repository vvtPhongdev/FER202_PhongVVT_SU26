/**
 * Visible tests — TODO-05: View Detail + nút Back
 */
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import RestaurantDetail from '../pages/RestaurantDetail'
import { RestaurantContext } from '../context/RestaurantContext'

const mock = new MockAdapter(axios)

const mockRestaurant = {
  id: '1',
  name: 'BBQ Restaurant',
  categoryId: 1,
  owner: 'Hoang',
  address: 'Hang Bai',
  priceMin: 50000,
  priceMax: 200000,
  openDate: '15/03/2018',
}

const mockCtx = {
  state: {
    categories: [{ id: 1, name: 'Casual' }],
    restaurants: [],
    loading: false,
    error: null,
  },
  dispatch: jest.fn(),
}

const renderDetail = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/restaurants/${id}`]}>
      <RestaurantContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        </Routes>
      </RestaurantContext.Provider>
    </MemoryRouter>
  )

afterEach(() => mock.reset())

test('TODO-05: hiển thị tên nhà hàng sau khi tải dữ liệu', async () => {
  mock.onGet(/\/restaurants\/1/).reply(200, mockRestaurant)

  renderDetail('1')

  await waitFor(() => {
    expect(screen.getByText(/BBQ Restaurant/i)).toBeInTheDocument()
  })
})

test('TODO-05: hiển thị spinner khi đang tải', () => {
  // Giả lập API chậm (không resolve)
  mock.onGet(/\/restaurants\/1/).reply(() => new Promise(() => {}))

  renderDetail('1')

  expect(document.querySelector('.spinner-border')).toBeInTheDocument()
})

test('TODO-05: có nút Back', async () => {
  mock.onGet(/\/restaurants\/1/).reply(200, mockRestaurant)

  renderDetail('1')

  await waitFor(() => {
    expect(screen.getByText(/back/i)).toBeInTheDocument()
  })
})
