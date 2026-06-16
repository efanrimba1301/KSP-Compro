import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon, Logout03Icon, ArrowUpDownIcon } from "@hugeicons/core-free-icons";
import { SidebarMenuButton, useSidebar } from "./ui/sidebar";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router";

const User = () => {
    const { isMobile } = useSidebar();

    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await signOut();
        if (error) {
            alert("Logout failed");
        }
        navigate("/admin/login", { replace: true });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback className="rounded-lg">US</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="font-reguler">User</span>
                        <span className="font-light text-sm">user@kebetulanserius.com</span>
                    </div>
                    <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-auto size-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src="" alt="User" />
                            <AvatarFallback className="rounded-lg">US</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="font-reguler">User</span>
                            <span className="text-xs">user@kebetulanserius.com</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <HugeiconsIcon icon={Notification01Icon} />
                    <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <HugeiconsIcon icon={Logout03Icon} />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default User;