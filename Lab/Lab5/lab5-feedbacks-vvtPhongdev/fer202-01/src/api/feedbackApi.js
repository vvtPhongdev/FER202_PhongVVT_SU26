import axios from 'axios'

const BASE = 'http://localhost:3001'

export const getFeedbacksByUser = async (userId) => {
  const res = await axios.get(`${BASE}/feedbacks`, { params: { userId } })
  return res.data
}

export const createFeedback = async (data) => {
  const res = await axios.post(`${BASE}/feedbacks`, data)
  return res.data
}

export const updateFeedback = async (id, data) => {
  const res = await axios.put(`${BASE}/feedbacks/${id}`, data)
  return res.data
}

export const removeFeedback = async (id) => {
  await axios.delete(`${BASE}/feedbacks/${id}`)
}
