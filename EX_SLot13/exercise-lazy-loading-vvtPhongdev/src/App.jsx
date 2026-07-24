import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import LoadingSpinner from './components/LoadingSpinner'
import HomePage from './pages/HomePage'

const MenuPage  = lazy(() => import('./pages/MenuPage'))
const TablePage = lazy(() => import('./pages/TablePage'))

function App() {
  return (
    <Router>
      <AppNavbar />
      <Suspense fallback={<LoadingSpinner message="Đang tải trang..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/tables" element={<TablePage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
