export const validateUsername = (username) => {
  if (!username || !username.trim()) return 'Username is required.'
  return null
}
export const validatePassword = (password) => {
  if (!password || !password.trim()) return 'Password is required.'
  return null
}
export const validateCarTypeName = (name, existingNames = [], currentId = null) => {
  if (!name || !name.trim()) return 'Car type name is required.'
  if (name.trim().length < 2) return 'Car type name must be at least 2 characters.'
  if (name.trim().length > 50) return 'Car type name must be at most 50 characters.'
  const duplicate = existingNames.find(
    (n) => n.name.trim().toLowerCase() === name.trim().toLowerCase() && n.id !== currentId
  )
  if (duplicate) return 'Car type name already exists.'
  return null
}
export const validateCarName = (name, existingNames = [], currentId = null) => {
  if (!name || !name.trim()) return 'Car name is required.'
  if (name.trim().length < 2) return 'Car name must be at least 2 characters.'
  if (name.trim().length > 100) return 'Car name must be at most 100 characters.'
  const duplicate = existingNames.find(
    (n) => n.name.trim().toLowerCase() === name.trim().toLowerCase() && n.id !== currentId
  )
  if (duplicate) return 'Car name already exists.'
  return null
}
