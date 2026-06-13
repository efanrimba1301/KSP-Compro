import './App.css'
import AdminLogin from './Pages/Admin/Login'
import HomePage from './Pages/HomePage'
import Dashboard from './Pages/Admin/Dashboard'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
