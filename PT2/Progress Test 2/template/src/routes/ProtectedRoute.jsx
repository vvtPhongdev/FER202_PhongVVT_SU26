import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Bảo vệ route — chuyển hướng về /login nếu chưa đăng nhập.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
