import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import CarList from '../pages/CarList'
import CarDetail from '../pages/CarDetail'
import AddCar from '../pages/AddCar'
import ManageCarTypes from '../pages/ManageCarTypes'
import CarTypeDetail from '../pages/CarTypeDetail'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><CarList /></ProtectedRoute>} />
      <Route path="/cars/:id" element={<ProtectedRoute><CarDetail /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
      <Route path="/car-types" element={<ProtectedRoute><ManageCarTypes /></ProtectedRoute>} />
      <Route path="/car-types/:id" element={<ProtectedRoute><CarTypeDetail /></ProtectedRoute>} />
      {/* Route /not-found KHÔNG được bọc ProtectedRoute — TODO-10A dùng navigate('/not-found') khi id không hợp lệ, phải hiển thị được kể cả khi chưa đăng nhập */}
      <Route path="/not-found" element={<NotFound />} />
      {/* TODO-09: Route * → NotFound page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
