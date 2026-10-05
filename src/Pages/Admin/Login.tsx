import { ThemeProvider } from "../../Components/ui/ThemeProvider";
import LoginForm from "../../Components/LoginForm";
import { AuthProvider } from "../../Context/AuthContext";
import { Seo } from "@/Components/Seo";

const AdminLogin = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Seo title="Login admin - Kebetulan Serius" description="" noindex />

            <div className="min-h-screen flex items-center justify-center bg-neutral-950">
                <AuthProvider>
                    <LoginForm></LoginForm>
                </AuthProvider>
            </div>
        </ThemeProvider>
    )
}

export default AdminLogin