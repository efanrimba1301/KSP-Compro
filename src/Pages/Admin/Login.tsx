import { ThemeProvider } from "../../Components/ui/ThemeProvider";

const AdminLogin = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <h1>AdminLogin</h1>
            </div>
        </ThemeProvider>
    )
}

export default AdminLogin