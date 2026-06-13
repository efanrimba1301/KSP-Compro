import { ThemeProvider } from "../../Components/ui/ThemeProvider";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../Components/ui/sidebar";
import AppsSidebar from "../../Components/AppsSidebar";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { Separator } from "@/Components/ui/separator";

const Dashboard = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider defaultOpen={false}>
                <TooltipProvider>
                    <AppsSidebar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex item-centre gap-2 px-4">
                                <SidebarTrigger className="-m-1" />
                                <Separator orientation="vertical" className="w-px h-6" />

                            </div>
                        </header>
                    </SidebarInset>
                </TooltipProvider>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default Dashboard;