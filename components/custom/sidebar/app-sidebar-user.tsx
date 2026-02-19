"use client";

import { BadgeCheck, Bell, Check, ChevronsUpDown, CreditCard, LogOut, LogOutIcon, Palette, Sparkles, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import useUserStore from "@/hooks/auth/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/authApi";
import { RemoveToken } from "@/services/handlers/token-handler";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AppModal from "../modal/app-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AppSidebarUser() {
    const { isMobile } = useSidebar();
    const { user, clearUser } = useUserStore();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        RemoveToken();
        clearUser();
        router.push("/login");
        toast.success("Logout Successfully");
    };

    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: handleLogout,
        onError: handleLogout,
    });

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user?.name}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
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
                                        {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user?.name}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <Link href="/appearance">
                                <DropdownMenuItem>
                                    <Palette />
                                    Appearance
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <AppModal title="Logout" open={open} setOpen={setOpen}>
                <div className="flex flex-col items-center justify-center">
                    <div className="rounded-full bg-stone-200 p-5 flex items-center justify-center mb-4">
                        <LogOutIcon />
                    </div>
                    <b>Are you sure you want to log out?</b>
                    <span className="text-muted-foreground text-sm">This process cannot be undone</span>
                    <div className="flex gap-5 mt-4">
                        <Button
                            className="mr-auto"
                            variant="secondary"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <X /> No, I want to stay
                        </Button>
                        <Button
                            className="ml-auto"
                            onClick={() => {
                                logoutMutation.mutate();
                            }}
                        >
                            <Check /> Yes, log me out
                        </Button>
                    </div>
                </div>
            </AppModal>
        </>
    );
}
