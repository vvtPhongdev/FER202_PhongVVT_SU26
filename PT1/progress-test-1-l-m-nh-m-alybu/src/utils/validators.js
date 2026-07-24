export function validateField(name, value, allValues = {}) {
  const fieldValue = String(value ?? '')
  const trimmedValue = fieldValue.trim()

  switch (name) {
    case 'fullName':
      if (!trimmedValue) {
        return 'Họ và tên không được để trống'
      }
      if (trimmedValue.length < 3) {
        return 'Họ và tên phải có ít nhất 3 ký tự'
      }
      return ''

    case 'email':
      if (!trimmedValue) {
        return 'Email không được để trống'
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return 'Email không hợp lệ'
      }
      return ''

    case 'password':
      if (!fieldValue) {
        return 'Mật khẩu không được để trống'
      }
      if (fieldValue.length < 6) {
        return 'Mật khẩu phải có ít nhất 6 ký tự'
      }
      if (!/[A-Z]/.test(fieldValue)) {
        return 'Mật khẩu phải có ít nhất 1 chữ hoa'
      }
      if (!/\d/.test(fieldValue)) {
        return 'Mật khẩu phải có ít nhất 1 chữ số'
      }
      return ''

    case 'confirmPassword':
      if (!fieldValue) {
        return 'Xác nhận mật khẩu không được để trống'
      }
      if (fieldValue !== allValues.password) {
        return 'Xác nhận mật khẩu không khớp'
      }
      return ''

    default:
      return ''
  }
}
