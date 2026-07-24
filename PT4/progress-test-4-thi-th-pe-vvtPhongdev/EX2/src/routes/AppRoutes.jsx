import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { MovieProvider } from '../context/MovieContext'
import ProtectedRoute from './ProtectedRoute'
import AppNavbar from '../components/AppNavbar'
import AppFooter from '../components/AppFooter'
import Login from '../pages/Login'
import MovieList from '../pages/MovieList'
import MovieDetail from '../pages/MovieDetail'
import AddMovie from '../pages/AddMovie'
import ManageGenres from '../pages/ManageGenres'
import GenreDetail from '../pages/GenreDetail'
import NotFound from '../pages/NotFound'

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <AppNavbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><MovieList /></ProtectedRoute>} />
            <Route path="/movies/:id" element={<ProtectedRoute><MovieDetail /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddMovie /></ProtectedRoute>} />
            <Route path="/genres" element={<ProtectedRoute><ManageGenres /></ProtectedRoute>} />
            <Route path="/genres/:id" element={<ProtectedRoute><GenreDetail /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AppFooter />
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
