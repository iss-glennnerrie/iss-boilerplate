import { useState } from "react";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import { ChevronRight, Folder, FolderOpen,  SearchIcon } from "lucide-react";

import { useDebounce } from "@/hooks/layout/use-debounde";
import { InputGroup, InputGroupAddon,  InputGroupInput } from "@/components/ui/input-group";
import { Group, Menu } from "@/types/sidebar";


interface AppSidebarMenuProps {
    title?: string;
    description?: string | null;
    menuItems: Group[];
}

const AppSidebarMenu = ({ title, description, menuItems }: AppSidebarMenuProps) => {
    const [search, setSearch] = useState<string>("");

    const debouncedSearch = useDebounce(search, 300);

    const filterMenus = (menus: Menu[], query: string) => {
        return menus
            .map((menu) => {
                // Filter submenus that match the search
                const filteredSubmenus = menu.submenus.filter((submenu) => submenu.label.toLowerCase().includes(query.toLowerCase()));
                // If menu or any submenu matches, return a new object with filtered submenus
                if (menu.label.toLowerCase().includes(query.toLowerCase()) || filteredSubmenus.length > 0) {
                    return { ...menu, submenus: filteredSubmenus };
                }
                return null;
            })
            .filter(Boolean) as Menu[];
    };

    const filteredMenuItems = menuItems
        .map(({ groupLabel, menus }) => {
            const filteredMenus = filterMenus(menus, debouncedSearch);

            // Keep group if it or its menus match
            if (groupLabel.toLowerCase().includes(debouncedSearch.toLowerCase()) || filteredMenus.length > 0) {
                return { groupLabel, menus: filteredMenus };
            }

            return null;
        })
        .filter(Boolean) as Group[];
    return (
        <SidebarContent>
            <SidebarGroup>
                <div className="flex w-full flex-col">
                    <div className="font-medium text-foreground text-lg">{title}</div>
                    <div className="text-xs">{description}</div>
                </div>
          
                <InputGroup>
                    <InputGroupInput placeholder="Search..."  value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
            </SidebarGroup>
            {filteredMenuItems.map(({ groupLabel, menus }, groupIndex) => (
                <SidebarGroup key={groupIndex}>
                    {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}

                    {menus.map(({ href, label, icon: Icon, active, submenus }, menuIndex) =>
                        submenus.length === 0 ? (
                            <SidebarMenuItem key={menuIndex}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={label}
                                    isActive={active}
                                >
                                    <Link href={href}>
                                        {Icon && <Icon />}
                                        <span>{label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ) : (
                            <Collapsible key={label} asChild defaultOpen={active} className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={label}
                                            isActive={active}
                                        >
                                            {Icon && <Icon />}
                                            <span>{label}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {submenus.map((submenu) => (
                                                <SidebarMenuSubItem key={submenu.label}>
                                                    <SidebarMenuSubButton asChild className="rounded-xl">
                                                        <Link href={submenu.href}>
                                                            {submenu.active ? <FolderOpen /> : <Folder />}
                                                            <span className={` ${submenu.active ? "font-bold text-primary hover:text-primary" : ""}`}>
                                                                {submenu.label}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ),
                    )}
                </SidebarGroup>
            ))}
        </SidebarContent>
    );
};

export default AppSidebarMenu;
