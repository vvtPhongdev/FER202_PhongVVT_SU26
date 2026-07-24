export const validateLogin = (email, password) => {
  if (!email.trim() || !password.trim()) {
    return 'Email and password are required'
  }
  if (!email.includes('@')) {
    return 'Email must contain @'
  }
  return null
}

export const validateFeedback = ({ course, rating }) => {
  if (!course || !course.trim()) return 'Course name is required'
  const r = Number(rating)
  if (!rating || isNaN(r) || r < 1 || r > 5) return 'Rating must be between 1 and 5'
  return null
}
