import axios from 'axios'

const API_URL = 'http://localhost:3001'

// ============================================================
// MENUS
// ============================================================

/**
 * TODO-02 (10đ): Lấy danh sách tất cả món ăn từ server
 *
 * Yêu cầu:
 *  - Gọi GET  http://localhost:3001/menus
 *  - Return response.data  (KHÔNG return cả response object)
 */
export const fetchMenus = async () => {
  const response = await axios.get(`${API_URL}/menus`)
  return response.data
}

/**
 * TODO-05 (10đ): Thêm món ăn mới
 *
 * Yêu cầu:
 *  - Gọi POST http://localhost:3001/menus  với body là `menuData`
 *  - Return response.data  (object món ăn vừa tạo, có id từ server)
 *
 * @param {{ name: string, price: number, category: string, available: boolean }} menuData
 */
export const addMenu = async (menuData) => {
  const response = await axios.post(`${API_URL}/menus`, menuData)
  return response.data
}

/**
 * TODO-06 (10đ): Xóa món ăn theo id
 *
 * Yêu cầu:
 *  - Gọi DELETE http://localhost:3001/menus/:id
 *  - Return response.data
 *
 * @param {number} id
 */
export const deleteMenu = async (id) => {
  const response = await axios.delete(`${API_URL}/menus/${id}`)
  return response.data
}

// ============================================================
// TABLES  (đã cài sẵn – KHÔNG cần sửa)
// ============================================================

export const fetchTables = async () => {
  const response = await axios.get(`${API_URL}/tables`)
  return response.data
}
