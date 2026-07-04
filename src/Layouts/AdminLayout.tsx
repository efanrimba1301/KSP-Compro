import { Outlet } from "react-router";

import AppsSidebar from "@/Components/AppsSidebar";
import HeaderDashboard from "@/Components/ui/HeaderDashboard";

import { SidebarProvider, SidebarInset } from "@/Components/ui/sidebar";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { ThemeProvider } from "@/Components/ui/ThemeProvider";
import { Toaster } from "@/Components/ui/sonner"


export default function AdminLayout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider defaultOpen={false}>
                <TooltipProvider>
                    <AppsSidebar />
                    <SidebarInset>
                        <HeaderDashboard />
                        <main>
                            <Outlet />
                        </main>
                    </SidebarInset>
                </TooltipProvider>
            </SidebarProvider>
            <Toaster position="top-center" />
        </ThemeProvider>
    );
}