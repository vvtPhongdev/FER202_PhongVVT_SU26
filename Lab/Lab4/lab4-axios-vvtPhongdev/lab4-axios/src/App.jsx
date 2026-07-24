import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/Authcontext';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return null; // Wait for context session check
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return null; // Wait for context session check
  if (currentUser) {
    return <Navigate to="/users" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


