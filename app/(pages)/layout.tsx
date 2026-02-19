/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import AppLayout from "@/components/custom/app-layout";
import CustomThemeProvider from "@/providers/custom-theme-provider";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            <CustomThemeProvider>{children}</CustomThemeProvider>
        </AppLayout>
    );
}
