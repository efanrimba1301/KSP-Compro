import { ThemeProvider } from "../../Components/ui/ThemeProvider";

import { useAuth } from "../../Context/AuthContext"
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import LoginForm from "../../Components/LoginForm";
import { AuthProvider } from "../../Context/AuthContext";

const AdminLogin = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen flex items-center justify-center bg-neutral-950">
                <AuthProvider>
                    <LoginForm></LoginForm>
                </AuthProvider>
            </div>
        </ThemeProvider>
    )
}

export default AdminLogin