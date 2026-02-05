
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import AppCrumb from "./app-crumb";

const AppHeader = () => {

    
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 w-full">
            <div className="flex items-center gap-2 px-4  w-full">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <AppCrumb/>
                <div className="ml-auto">
                    {/* <AnimatedThemeToggler /> */}
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
