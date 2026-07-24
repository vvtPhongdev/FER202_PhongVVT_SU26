export const formatVND = (amount) => {
  const num = Number(amount)
  if (isNaN(num)) return '—'
  return num.toLocaleString('vi-VN') + ' ₫'
}
export const formatPriceRange = (min, max) => `${formatVND(min)} – ${formatVND(max)}`
export const parseDateDMY = (value) => {
  if (!value) return null
  const [dd, MM, yyyy] = String(value).split('/')
  if (!dd || !MM || !yyyy) return null
  const date = new Date(Number(yyyy), Number(MM) - 1, Number(dd))
  return isNaN(date.getTime()) ? null : date
}
export const formatDateDisplay = (value) => {
  const date = parseDateDMY(value)
  if (!date) return value ?? '—'
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })
}
export const toDateDMY = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return ''
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`
}
