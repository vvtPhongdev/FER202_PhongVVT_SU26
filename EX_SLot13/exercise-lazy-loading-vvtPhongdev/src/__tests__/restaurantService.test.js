import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchMenus, addMenu, deleteMenu } from '../services/restaurantService'

const mock = new MockAdapter(axios)
const BASE  = 'http://localhost:3001'

afterEach(() => mock.reset())

// ─── TODO-02 ─────────────────────────────────────────────────────────────────
describe('fetchMenus (TODO-02)', () => {
  test('trả về mảng dữ liệu từ server', async () => {
    const fakeData = [
      { id: 1, name: 'Phở Bò', price: 65000, category: 'Món nước', available: true },
    ]
    mock.onGet(`${BASE}/menus`).reply(200, fakeData)

    const result = await fetchMenus()

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Phở Bò')
  })

  test('chỉ return response.data, không phải cả response object', async () => {
    mock.onGet(`${BASE}/menus`).reply(200, [])

    const result = await fetchMenus()

    expect(Array.isArray(result)).toBe(true)
  })
})

// ─── TODO-05 ─────────────────────────────────────────────────────────────────
describe('addMenu (TODO-05)', () => {
  test('POST đến đúng endpoint và trả về món mới (có id)', async () => {
    const newMenu = { name: 'Bún Bò', price: 70000, category: 'Món nước', available: true }
    const created = { id: 6, ...newMenu }
    mock.onPost(`${BASE}/menus`).reply(201, created)

    const result = await addMenu(newMenu)

    expect(result).toEqual(created)
    expect(result.id).toBe(6)
  })
})

// ─── TODO-06 ─────────────────────────────────────────────────────────────────
describe('deleteMenu (TODO-06)', () => {
  test('DELETE đến đúng endpoint /menus/:id', async () => {
    mock.onDelete(`${BASE}/menus/1`).reply(200, {})

    const result = await deleteMenu(1)

    expect(mock.history.delete).toHaveLength(1)
    expect(mock.history.delete[0].url).toBe(`${BASE}/menus/1`)
  })
})
