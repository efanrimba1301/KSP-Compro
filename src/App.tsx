import './App.css'
import AdminLogin from './Pages/Admin/Login'
import HomePage from './Pages/HomePage'
import Dashboard from './Pages/Admin/Dashboard'
import { Routes, Route } from 'react-router'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { AuthProvider } from './Context/AuthContext'
import Leads from './Pages/Admin/Leads'
import AdminLayout from './Layouts/AdminLayout'
import { Navigate } from 'react-router'
import Portfolio from './Pages/Admin/Portofolio'
import TambahProject from './Pages/Admin/TambahProject'
import Services from './Pages/Admin/Services'
import Pricing from './Pages/Admin/Pricing'
import TambahPricing from './Pages/Admin/TambahPricing'


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
                <AdminLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="portfolio">
              <Route index element={<Portfolio />} />
              <Route path="tambah" element={<TambahProject />} />
            </Route>
            <Route path="services" element={<Services />} />
            <Route path="pricing">
              <Route index element={<Pricing />} />
              <Route path="tambah" element={<TambahPricing />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
