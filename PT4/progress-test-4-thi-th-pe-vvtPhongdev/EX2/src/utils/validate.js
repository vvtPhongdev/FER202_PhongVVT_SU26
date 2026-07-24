export const validateGenreName = (name) => {
  if (!name || !name.trim()) return 'Genre name is required.'
  if (name.trim().length < 2) return 'Genre name must be at least 2 characters.'
  if (name.trim().length > 50) return 'Genre name must not exceed 50 characters.'
  return null
}

export const validateMovieTitle = (title) => {
  if (!title || !title.trim()) return 'Movie title is required.'
  if (title.trim().length < 2) return 'Movie title must be at least 2 characters.'
  if (title.trim().length > 100) return 'Movie title must not exceed 100 characters.'
  return null
}

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || !String(value).trim()) return `${fieldName} is required.`
  return null
}

export const validatePositiveInt = (value, fieldName = 'Amount') => {
  const num = Number(value)
  if (isNaN(num) || num < 0) return `${fieldName} must be a non-negative number.`
  if (!Number.isInteger(num)) return `${fieldName} must be an integer.`
  return null
}

export const validateDateDMY = (value) => {
  if (!value || !value.trim()) return 'Date is required.'
  const parts = String(value).split('/')
  if (parts.length !== 3) return 'Date must be in dd/MM/yyyy format.'
  const [dd, MM, yyyy] = parts.map(Number)
  if (isNaN(dd) || isNaN(MM) || isNaN(yyyy)) return 'Date must be in dd/MM/yyyy format.'
  if (MM < 1 || MM > 12) return 'Month must be between 1 and 12.'
  if (dd < 1 || dd > 31) return 'Day must be between 1 and 31.'
  if (yyyy < 1000 || yyyy > 2100) return 'Year must be between 1000 and 2100.'
  return null
}
