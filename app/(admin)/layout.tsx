/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import AppLayout from "@/components/custom/app-layout";


export default function PageLayout({ children }: { children: React.ReactNode }) {

    return (
       <AppLayout>{children}</AppLayout>
    );
}
