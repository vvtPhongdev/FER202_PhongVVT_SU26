import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

/**
 * Authenticate user — only Admin role is allowed to log in.
 * @returns {Object} user object if successful
 * @throws {Error} if credentials wrong or role is not Admin
 */
export const login = async (username, password) => {
  const response = await axios.get(
    `${BASE_URL}/users?username=${username}&password=${password}`
  )
  const users = response.data

  if (users.length === 0) {
    throw new Error('Invalid username or password.')
  }

  const user = users[0]
  if (user.role !== 'Admin') {
    throw new Error('Access denied. Only Admin users can log in.')
  }

  return user
}
