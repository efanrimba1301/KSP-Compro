import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";

const HeaderDashboard = () => {
    return (

        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <div className="flex item-centre gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4" />
            </div>
        </header>
    );
};

export default HeaderDashboard;