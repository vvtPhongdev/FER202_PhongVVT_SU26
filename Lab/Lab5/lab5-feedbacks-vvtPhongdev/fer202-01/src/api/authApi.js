import axios from 'axios'

const BASE = 'http://localhost:3001'

export const loginUser = async ({ email, password }) => {
  const res = await axios.get(`${BASE}/users`, { params: { email } })
  return res.data.find((user) => user.password === password) || null
}
