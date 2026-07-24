import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import AppNavbar from '../components/AppNavbar'
import AppFooter from '../components/AppFooter'
import Login from '../pages/Login'
import RestaurantList from '../pages/RestaurantList'
import RestaurantDetail from '../pages/RestaurantDetail'
import AddRestaurant from '../pages/AddRestaurant'
import ManageCategories from '../pages/ManageCategories'
import CategoryDetail from '../pages/CategoryDetail'

export default function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/"
            element={<ProtectedRoute><RestaurantList /></ProtectedRoute>}
          />
          <Route
            path="/restaurants/:id"
            element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>}
          />
          <Route
            path="/add"
            element={<ProtectedRoute><AddRestaurant /></ProtectedRoute>}
          />
          <Route
            path="/categories"
            element={<ProtectedRoute><ManageCategories /></ProtectedRoute>}
          />
          <Route
            path="/categories/:id"
            element={<ProtectedRoute><CategoryDetail /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <AppFooter />
    </>
  )
}
