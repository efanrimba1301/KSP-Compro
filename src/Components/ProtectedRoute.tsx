import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../Context/AuthContext'

export function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#E8FF5A] border-t-transparent rounded-full animate-spin" />
                    <p className="text-neutral-400 text-sm">Memuat...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    return children
}