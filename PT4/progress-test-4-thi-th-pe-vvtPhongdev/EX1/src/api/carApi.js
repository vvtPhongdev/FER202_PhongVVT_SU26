import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchCarTypes = async () => {
  const r = await axios.get(`${BASE_URL}/carTypes`); return r.data
}
export const addCarType = async (data) => {
  const r = await axios.post(`${BASE_URL}/carTypes`, data); return r.data
}
export const updateCarType = async (id, data) => {
  const r = await axios.put(`${BASE_URL}/carTypes/${id}`, data); return r.data
}
export const deleteCarType = async (id) => {
  const r = await axios.delete(`${BASE_URL}/carTypes/${id}`); return r.data
}
export const fetchCars = async () => {
  const r = await axios.get(`${BASE_URL}/cars`); return r.data
}
export const fetchCarById = async (id) => {
  const r = await axios.get(`${BASE_URL}/cars/${id}`); return r.data
}
export const addCar = async (data) => {
  const r = await axios.post(`${BASE_URL}/cars`, data); return r.data
}
export const deleteCar = async (id) => {
  const r = await axios.delete(`${BASE_URL}/cars/${id}`); return r.data
}
