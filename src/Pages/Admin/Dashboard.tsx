import { ThemeProvider } from "../../Components/ui/ThemeProvider";
import { SidebarProvider, SidebarInset } from "../../Components/ui/sidebar";
import AppsSidebar from "../../Components/AppsSidebar";
import { TooltipProvider } from "@/Components/ui/tooltip";
import HeaderDashboard from "../../Components/ui/HeaderDashboard";

const Dashboard = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider defaultOpen={false}>
                <TooltipProvider>
                    <AppsSidebar />
                    <SidebarInset>
                        <HeaderDashboard />
                    </SidebarInset>
                </TooltipProvider>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default Dashboard;