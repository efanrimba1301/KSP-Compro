import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";
import logoUrl from "@/assets/KSP-FullLogo.svg";

const HeaderDashboard = () => {
    return (

        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex item-centre gap-2 px-4">
                <SidebarTrigger className="-m-1" />
                <img src={logoUrl} alt="Logo KSP" className="h-6" />
                <Separator orientation="vertical" className="w-px h-6" />

            </div>
        </header>
    );
};

export default HeaderDashboard;