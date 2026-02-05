import { Group } from "@/types/sidebar";
import { Boxes, LayoutDashboard, School, Users2} from "lucide-react";
import { usePathname } from "next/navigation";


export default function AppSidebarMenuList(): Group[] {
    const pathname = usePathname();

    const menuList = [
        {
            groupLabel: "Main",
            menus: [
                  {
                    href: "/dashboard",
                    label: "Dashboard",
                    icon: LayoutDashboard,
                    active: pathname == "/dashboard",
                    submenus: [],
                },
                {
                    href: "/admin",
                    label: "Users",
                    icon: Users2,
                    active: pathname == "/admin",
                    submenus: [
                        {
                            href: "/admin",
                            label: "Masterlist",
                            active: pathname == "/admin",
                        },
                        {
                            href: "/admin/users/groups",
                            label: "Groups",
                            active: pathname == "/admin/users/groups",
                        },
                        {
                            href: "/admin/users/roles",
                            label: "Roles",
                            active: pathname == "/admin/users/roles",
                        },
                        {
                            href: "/admin/users/permissions",
                            label: "Permissions",
                            active: pathname == "/admin/users/permissions",
                        },
                    ],
                },
            ],
        },
        {
            groupLabel: "Reference Libraries",
            menus: [
                  {
                    href: "/suppliers",
                    label: "Suppliers",
                    icon: Boxes,
                    active: pathname == "/suppliers",
                    submenus: [],
                },
               
            ],
        },
    ];

    return menuList;
}
