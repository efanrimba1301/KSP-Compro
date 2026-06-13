import { DashboardSquare03Icon } from '@hugeicons/core-free-icons';
import { UserMultipleIcon } from "@hugeicons/core-free-icons";
import { Folder01Icon } from "@hugeicons/core-free-icons";
import { LayerIcon } from "@hugeicons/core-free-icons";
import { Invoice01Icon } from "@hugeicons/core-free-icons";
import { User02Icon } from "@hugeicons/core-free-icons";

export const AppMenu = {
    primaryNav: [
        {
            name: "dashboard",
            title: "Dashboard",
            url: "/Dashboard",
            Icon: DashboardSquare03Icon
        },
        {
            name: "leads",
            title: "Leads",
            url: "/admin/leads",
            Icon: UserMultipleIcon
        },
        {
            name: "portfolio",
            title: "Portfolio",
            url: "/admin/portfolio",
            Icon: Folder01Icon
        },
        {
            name: "services",
            title: "Services",
            url: "/admin/services",
            Icon: LayerIcon
        },
        {
            name: "pricing",
            title: "Pricing",
            url: "/admin/pricing",
            Icon: Invoice01Icon
        },
    ],
    secondaryNav: [
        {
            name: "user",
            title: "User",
            Icon: User02Icon
        }
    ]
};
