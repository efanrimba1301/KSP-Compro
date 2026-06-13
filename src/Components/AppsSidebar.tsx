import { cn } from "../lib/utils";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarGroup, SidebarGroupContent, SidebarMenuButton } from "./ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSidebar } from "./ui/sidebar";
import logoUrl from "@/assets/KSP-Icon.svg";
import { AppMenu } from "../Constants/AppMenu";

// Custom component Logo untuk menerima prop 'variant'
const Logo = ({ variant = 'default' }: { variant?: 'default' | 'icon' }) => {
    return (
        <div className="flex items-center gap-2">
            <img
                src={logoUrl}
                alt="Logo KSP"
                className={cn(variant === 'icon' ? "w-8 h-8" : "w-auto h-10")}
            />
        </div>
    )
}

const AppsSidebar = () => {
    const { isMobile } = useSidebar();

    return (
        <>
            <Sidebar
                variant='floating'
                collapsible='icon'
            >
                {/* Header */}
                <SidebarHeader>
                    <SidebarMenuItem>
                        <Logo variant={isMobile ? 'default' : 'icon'} />

                    </SidebarMenuItem>
                </SidebarHeader>
                {/* Content */}
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {AppMenu.primaryNav.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton tooltip={item.title} asChild>
                                            <a href={item.url}>
                                                <HugeiconsIcon icon={item.Icon} className="w-5 h-5" />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                {/* Footer */}
                <SidebarFooter></SidebarFooter>

            </Sidebar>
        </>
    )
}

export default AppsSidebar;