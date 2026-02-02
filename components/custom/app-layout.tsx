import React from 'react'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../app-sidebar'
import AppHeader from './app-header';

const AppLayout = ({ children }: {children: React.ReactNode; }) => {
   
    return (
        <SidebarProvider
            style={
                {
                "--sidebar-width": "350px",
                } as React.CSSProperties
            }
        >
        <AppSidebar/>
            <SidebarInset>
                <AppHeader/>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AppLayout