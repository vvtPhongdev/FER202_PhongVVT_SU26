import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

// ── Categories ──────────────────────────────────────────────────────────────

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`)
  return response.data
}

export const addCategory = async (data) => {
  const response = await axios.post(`${BASE_URL}/categories`, data)
  return response.data
}

export const updateCategory = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/categories/${id}`, data)
  return response.data
}

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/${id}`)
  return response.data
}

// ── Restaurants ──────────────────────────────────────────────────────────────

export const fetchRestaurants = async () => {
  const response = await axios.get(`${BASE_URL}/restaurants`)
  return response.data
}

export const fetchRestaurantById = async (id) => {
  const response = await axios.get(`${BASE_URL}/restaurants/${id}`)
  return response.data
}

export const addRestaurant = async (data) => {
  const response = await axios.post(`${BASE_URL}/restaurants`, data)
  return response.data
}

export const deleteRestaurant = async (id) => {
  const response = await axios.delete(`${BASE_URL}/restaurants/${id}`)
  return response.data
}
