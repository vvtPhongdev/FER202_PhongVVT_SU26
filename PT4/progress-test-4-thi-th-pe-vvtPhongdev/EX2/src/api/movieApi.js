import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchGenres = async () => {
  const r = await axios.get(`${BASE_URL}/genres`)
  return r.data
}
export const addGenre = async (data) => {
  const r = await axios.post(`${BASE_URL}/genres`, data)
  return r.data
}
export const updateGenre = async (id, data) => {
  const r = await axios.put(`${BASE_URL}/genres/${id}`, data)
  return r.data
}
export const deleteGenre = async (id) => {
  const r = await axios.delete(`${BASE_URL}/genres/${id}`)
  return r.data
}
export const fetchMovies = async () => {
  const r = await axios.get(`${BASE_URL}/movies`)
  return r.data
}
export const fetchMovieById = async (id) => {
  const r = await axios.get(`${BASE_URL}/movies/${id}`)
  return r.data
}
export const addMovie = async (data) => {
  const r = await axios.post(`${BASE_URL}/movies`, data)
  return r.data
}
export const deleteMovie = async (id) => {
  const r = await axios.delete(`${BASE_URL}/movies/${id}`)
  return r.data
}
