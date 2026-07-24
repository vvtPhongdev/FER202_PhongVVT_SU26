/**
 * validate.js — Tập trung toàn bộ logic validate của ứng dụng.
 *
 * Quy ước trả về:
 *   - Hàm primitive (is*): boolean
 *   - Hàm validate*:  null (hợp lệ) | string (thông báo lỗi)
 */

// ── Primitives ────────────────────────────────────────────────────────────────

/** Giá trị không rỗng sau khi trim */
export const isRequired = (value) =>
  String(value ?? '').trim().length > 0

/** Độ dài sau trim >= min */
export const hasMinLength = (value, min) =>
  String(value ?? '').trim().length >= min

/**
 * Tên không trùng trong danh sách (case-insensitive, trim).
 * @param {Array}  list      - mảng object có field `name`
 * @param {string} name      - tên cần kiểm tra
 * @param {*}      excludeId - bỏ qua item có id này (dùng khi edit)
 */
export const isUniqueName = (list, name, excludeId = null) =>
  !list.some(
    (item) =>
      item.name.toLowerCase() === String(name).trim().toLowerCase() &&
      item.id !== excludeId
  )

// ── Date ──────────────────────────────────────────────────────────────────────

/**
 * Kiểm tra chuỗi có đúng định dạng dd/MM/yyyy và là ngày hợp lệ.
 *
 * Các trường hợp trả về false:
 *   - Không khớp regex dd/MM/yyyy
 *   - Tháng < 1 hoặc > 12
 *   - Ngày < 1 hoặc vượt số ngày thực tế của tháng (vd: 31/02, 31/04)
 *   - Năm < 1900 hoặc > 2100
 *
 * @param {string} value - chuỗi ngày cần kiểm tra
 * @returns {boolean}
 */
export const isValidDate = (value) => {
  if (!value) return false
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  const match = String(value).match(regex)
  if (!match) return false

  const day   = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const year  = parseInt(match[3], 10)

  if (year < 1900 || year > 2100) return false
  if (month < 1 || month > 12)    return false
  if (day < 1)                    return false

  // Dùng Date để kiểm tra ngày thực tế (tự động xử lý năm nhuận)
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth()    === month - 1 &&
    date.getDate()     === day
  )
}

/**
 * Validate ngày theo định dạng dd/MM/yyyy.
 * @param {string} value
 * @param {string} label - tên field để hiển thị trong thông báo lỗi
 * @returns {string|null}
 */
export const validateDate = (value, label = 'Date') => {
  if (!isRequired(value)) return `${label} is required.`
  if (!isValidDate(value))
    return `${label} must be a valid date in dd/MM/yyyy format.`
  return null
}

// ── Currency (VND) ────────────────────────────────────────────────────────────

/**
 * Kiểm tra giá trị là số nguyên không âm (hợp lệ cho VND).
 * VND không có số thập phân.
 * @param {number|string} value
 * @returns {boolean}
 */
export const isValidVND = (value) => {
  if (!isRequired(String(value ?? ''))) return false
  const num = Number(value)
  return !isNaN(num) && Number.isFinite(num) && num >= 0 && Number.isInteger(num)
}

/**
 * Validate một trường giá tiền VND.
 * @param {number|string} value
 * @param {string}        label - tên field
 * @returns {string|null}
 */
export const validateVND = (value, label = 'Amount') => {
  if (!isRequired(String(value ?? ''))) return `${label} is required.`
  const num = Number(value)
  if (isNaN(num) || !Number.isFinite(num)) return `${label} must be a number.`
  if (!Number.isInteger(num))              return `${label} must be a whole number (VND has no decimals).`
  if (num < 0)                             return `${label} must be 0 or greater.`
  return null
}

/**
 * Validate khoảng giá (priceMin ≤ priceMax), cả hai phải là VND hợp lệ.
 * @returns {string|null}
 */
export const validatePriceRange = (priceMin, priceMax) => {
  const minError = validateVND(priceMin, 'Price Min')
  if (minError) return minError

  const maxError = validateVND(priceMax, 'Price Max')
  if (maxError) return maxError

  if (Number(priceMin) > Number(priceMax))
    return 'Price Min must not be greater than Price Max.'

  return null
}

// ── Category ──────────────────────────────────────────────────────────────────

/**
 * Validate tên category — required + minLength 3 + unique.
 * @param {string} name
 * @param {Array}  categories
 * @param {*}      excludeId
 * @returns {string|null}
 */
export const validateCategoryName = (name, categories, excludeId = null) => {
  if (!isRequired(name))              return 'Name is required.'
  if (!hasMinLength(name, 3))         return 'Name must be at least 3 characters.'
  if (!isUniqueName(categories, name, excludeId))
                                      return 'Category name already exists.'
  return null
}

// ── Auth ──────────────────────────────────────────────────────────────────────

/** Validate username */
export const validateUsername = (username) => {
  if (!isRequired(username)) return 'Username is required.'
  return null
}

/** Validate password */
export const validatePassword = (password) => {
  if (!isRequired(password)) return 'Password is required.'
  return null
}

/**
 * Validate toàn bộ login form.
 * @returns {{ username: string|null, password: string|null }}
 */
export const validateLoginForm = (username, password) => ({
  username: validateUsername(username),
  password: validatePassword(password),
})

// ── Restaurant ────────────────────────────────────────────────────────────────

/**
 * Validate tên nhà hàng — required + minLength + unique (optional).
 *
 * @param {string} name
 * @param {Array}  [restaurants=[]] - danh sách để check unique
 * @param {*}      [excludeId=null] - bỏ qua item khi edit
 * @returns {string|null}
 */
export const validateRestaurantName = (name, restaurants = [], excludeId = null) => {
  if (!isRequired(name))      return 'Restaurant name is required.'
  if (!hasMinLength(name, 2)) return 'Name must be at least 2 characters.'
  if (restaurants.length > 0 && !isUniqueName(restaurants, name, excludeId))
    return 'Restaurant name already exists.'
  return null
}
