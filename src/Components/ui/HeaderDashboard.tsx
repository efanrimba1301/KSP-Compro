import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";
import { Link, useLocation } from "react-router";
import { AppMenu } from "@/Constants/AppMenu";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";


const HeaderDashboard = () => {
    const Location = useLocation();

    const CurrentMenu = AppMenu.primaryNav.find((item) => {
        return (
            Location.pathname === item.url ||
            Location.pathname.startsWith(`${item.url}`)
        );
    });

    const crumbs = [
        {
            title: 'admin', url: "/admin/dashboard"
        }, ...(CurrentMenu ?
            [{ title: CurrentMenu.title, url: CurrentMenu.url }]
            : [])
    ]

    return (

        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky-top-0" >
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>

                        {crumbs.map((crumb, index) => {
                            const isLast = index === crumbs.length - 1;
                            return (
                                <div key={crumb.url} className="flex items-center">
                                    <BreadcrumbItem key={index}>
                                        {isLast ? (
                                            <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link to={crumb.url}>{crumb.title}</Link>
                                            </BreadcrumbLink>
                                        )}
                                        {index !== crumbs.length - 1 && <BreadcrumbSeparator />}
                                    </BreadcrumbItem>
                                </div>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
};

export default HeaderDashboard;