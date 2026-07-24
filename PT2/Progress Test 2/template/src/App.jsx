import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RestaurantProvider } from './context/RestaurantContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RestaurantProvider>
          <AppRoutes />
        </RestaurantProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
