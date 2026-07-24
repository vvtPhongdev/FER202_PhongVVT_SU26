import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const login = async (username, password) => {
  const response = await axios.get(`${BASE_URL}/users?username=${username}&password=${password}`)
  const users = response.data
  if (users.length === 0) throw new Error('Invalid username or password.')
  // Ca Admin va User deu dang nhap duoc - phan quyen UI (an nut Add/Delete)
  // duoc xu ly theo role tai CarList.jsx / CarRow.jsx (xem TODO-01 trong DeThi.md)
  return users[0]
}
