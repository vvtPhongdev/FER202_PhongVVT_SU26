/**
 * categoryReducer.js — Hai reducer riêng biệt cho ManageCategories:
 *
 * 1. categoryFormReducer  — quản lý state form thêm category mới
 * 2. editReducer          — quản lý state inline edit một category
 *
 * onBlur được xử lý qua reducer:
 *   Component tính kết quả validate → dispatch action BLUR kèm error
 *   Reducer cập nhật editError / validated — KHÔNG dùng setState trực tiếp
 */

// ══════════════════════════════════════════════════════════════════════════════
// 1. Form thêm category mới
// ══════════════════════════════════════════════════════════════════════════════

export const formInitialState = {
  newName: '',
  validated: false,   // bật sau lần submit đầu tiên (HTML5 Bootstrap pattern)
  uniqueError: false, // lỗi trùng tên — nằm ngoài HTML5 checkValidity
}

export function categoryFormReducer(state, action) {
  switch (action.type) {
    // Người dùng gõ vào input
    case 'SET_NAME':
      return {
        ...state,
        newName: action.payload,
        uniqueError: false,   // xóa lỗi unique ngay khi gõ lại
      }

    // Bật/tắt chế độ validated (hiển thị border đỏ HTML5)
    case 'SET_VALIDATED':
      return { ...state, validated: action.payload }

    // Đánh dấu lỗi trùng tên từ logic custom
    case 'SET_UNIQUE_ERROR':
      return { ...state, uniqueError: action.payload }

    /**
     * onBlur — component gọi sau khi rời field:
     *   dispatch({ type: 'BLUR', isValid: e.target.checkValidity() && !state.uniqueError })
     * Nếu input đã hợp lệ → reset validated để xóa border đỏ HTML5
     */
    case 'BLUR':
      return action.isValid ? { ...state, validated: false } : state

    // Reset về trạng thái ban đầu sau khi thêm thành công
    case 'RESET':
      return formInitialState

    default:
      return state
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. Inline edit
// ══════════════════════════════════════════════════════════════════════════════

export const editInitialState = {
  editingId: null,
  editValue: '',
  editError: null,
}

export function editReducer(state, action) {
  switch (action.type) {
    // Bắt đầu edit một category
    case 'START':
      return {
        editingId: action.id,
        editValue: action.name,
        editError: null,
      }

    // Người dùng gõ vào ô edit
    case 'SET_VALUE':
      return {
        ...state,
        editValue: action.payload,
        editError: null,    // xóa lỗi khi gõ lại
      }

    /**
     * onBlur — component gọi sau khi rời ô edit:
     *   dispatch({ type: 'BLUR', error: validateCategoryName(value, categories, id) })
     * Reducer chỉ lưu kết quả — logic validate vẫn ở utils/validate.js
     */
    case 'BLUR':
      return { ...state, editError: action.error }

    // Lỗi khi save (từ API hoặc validate trước save)
    case 'SET_ERROR':
      return { ...state, editError: action.payload }

    // Hủy edit
    case 'CANCEL':
      return editInitialState

    default:
      return state
  }
}
