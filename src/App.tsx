import './App.css'
import AdminLogin from './Pages/Admin/Login'
import HomePage from './Pages/HomePage'
import Dashboard from './Pages/Admin/Dashboard'
import { Routes, Route, Navigate } from 'react-router'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { AuthProvider } from './Context/AuthContext'
import Leads from './Pages/Admin/Leads'



function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }

          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
