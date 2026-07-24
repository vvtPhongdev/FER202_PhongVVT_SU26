import { createContext, useContext, useReducer } from 'react'
import { authReducer, authInitialState } from '../reducer/authReducer'

const STORAGE_KEY = 'carrental_auth_user'

// Dùng sessionStorage (KHÔNG phải localStorage):
// - Vẫn giữ được phiên đăng nhập khi reload trang / truy cập trực tiếp một URL
//   (deep link) TRONG CÙNG một tab — nếu không, ProtectedRoute sẽ luôn coi là
//   chưa đăng nhập và đưa về /login, kể cả khi URL đó đáng lẽ phải hiển thị
//   NotFound (xem TODO-10A trong DeThi.md).
// - Nhưng KHÔNG tồn tại vĩnh viễn giữa các lần mở trình duyệt / các lần chạy
//   `npm start` khác nhau như localStorage — mỗi lần mở tab/trình duyệt mới,
//   người dùng sẽ luôn thấy trang Login trước, đúng như kỳ vọng khi test lại
//   ứng dụng từ đầu. Dùng localStorage ở đây sẽ khiến app "nhớ" đăng nhập cũ
//   mãi mãi và không bao giờ tự hiển thị lại trang Login nữa.
function loadInitialAuthState() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      const user = JSON.parse(saved)
      if (user) return { user, isAuthenticated: true }
    }
  } catch {
    // sessionStorage không khả dụng hoặc dữ liệu lỗi → bỏ qua, coi như chưa đăng nhập
  }
  return authInitialState
}

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, undefined, loadInitialAuthState)

  const loginUser = (userData) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    } catch {
      // ignore storage errors (vd. private browsing chặn storage)
    }
    dispatch({ type: 'LOGIN', payload: userData })
  }

  const logoutUser = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ user: state.user, isAuthenticated: state.isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() { return useContext(AuthContext) }
