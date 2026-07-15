import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";
import { Link, useLocation } from "react-router";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";
import React, { useMemo } from "react";

// ─── Mapping segment URL → label yang tampil di breadcrumb ───────────────────
// Tambahkan entri baru di sini setiap kali ada sub-halaman baru
const SEGMENT_LABELS: Record<string, string> = {
    admin: "Admin",
    dashboard: "Dashboard",
    leads: "Leads",
    portfolio: "Portfolio",
    services: "Services",
    pricing: "Pricing",

};

// ─── Override untuk full path yang segmen terakhirnya ambigu ───────────────
// Tambahkan entri baru di sini setiap kali ada sub-halaman dengan nama segmen
// yang sudah dipakai di tempat lain (misal "tambah")
const PATH_OVERRIDES: Record<string, string> = {
    "/admin/portfolio/tambah": "Tambah Project",
    "/admin/pricing/tambah": "Tambah Pricing",
};

const HeaderDashboard = () => {
    const { pathname } = useLocation();

    const crumbs = useMemo(() => {
        // Pecah pathname jadi array segment, buang yang kosong
        // contoh: "/admin/portfolio/tambah" → ["admin", "portfolio", "tambah"]
        const segments = pathname.split("/").filter(Boolean);

        return segments.map((segment, index) => {
            // Build URL akumulatif sampai segment ini
            const url = "/" + segments.slice(0, index + 1).join("/");

            // Gunakan label dari mapping, fallback ke segment mentah jika tidak ada
            const title = PATH_OVERRIDES[url] ?? SEGMENT_LABELS[segment] ?? segment;

            return { title, url };
        });
    }, [pathname]);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-20 bg-background">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        {crumbs.map((crumb, index) => {
                            const isLast = index === crumbs.length - 1;
                            return (
                                <React.Fragment key={`${crumb.url}-${index}`}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>
                                                {crumb.title}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link to={crumb.url}>
                                                    {crumb.title}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
};

export default HeaderDashboard;