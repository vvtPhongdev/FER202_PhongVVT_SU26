/**
 * format.js — Hàm định dạng hiển thị dùng chung trong ứng dụng.
 * Tách khỏi validate.js vì chức năng khác nhau:
 *   validate → kiểm tra dữ liệu đầu vào
 *   format   → chuyển đổi dữ liệu sang chuỗi hiển thị
 */

// ── Currency (VND) ────────────────────────────────────────────────────────────

/**
 * Định dạng số thành chuỗi tiền tệ VND.
 * @example formatVND(250000) → "250.000 ₫"
 * @param {number|string} amount
 * @returns {string}
 */
export const formatVND = (amount) => {
  const num = Number(amount)
  if (isNaN(num)) return '—'
  return num.toLocaleString('vi-VN') + ' ₫'
}

/**
 * Định dạng khoảng giá.
 * @example formatPriceRange(50000, 200000) → "50.000 ₫ – 200.000 ₫"
 * @param {number} min
 * @param {number} max
 * @returns {string}
 */
export const formatPriceRange = (min, max) =>
  `${formatVND(min)} – ${formatVND(max)}`

// ── Date ──────────────────────────────────────────────────────────────────────

/**
 * Chuyển chuỗi dd/MM/yyyy thành object Date.
 * @param {string} value - "dd/MM/yyyy"
 * @returns {Date|null}
 */
export const parseDateDMY = (value) => {
  if (!value) return null
  const [dd, MM, yyyy] = String(value).split('/')
  if (!dd || !MM || !yyyy) return null
  const date = new Date(Number(yyyy), Number(MM) - 1, Number(dd))
  return isNaN(date.getTime()) ? null : date
}

/**
 * Hiển thị ngày từ chuỗi dd/MM/yyyy thành dạng dài hơn.
 * @example formatDateDisplay("25/12/2025") → "25 tháng 12, 2025"
 * @param {string} value - "dd/MM/yyyy"
 * @returns {string}
 */
export const formatDateDisplay = (value) => {
  const date = parseDateDMY(value)
  if (!date) return value ?? '—'
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Chuyển Date object hoặc ISO string thành dd/MM/yyyy.
 * @example toDateDMY(new Date(2025, 11, 25)) → "25/12/2025"
 * @param {Date|string} date
 * @returns {string}
 */
export const toDateDMY = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return ''
  const dd  = String(d.getDate()).padStart(2, '0')
  const MM  = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${MM}/${yyyy}`
}
