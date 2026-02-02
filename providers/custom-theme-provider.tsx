"use client";
import { useEffect } from "react";
import { hexToHSL } from "@/lib/utils";
import { useThemeStore } from "@/hooks/layout/use-theme-store";

export default function CustomThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        document.documentElement.style.setProperty("--primary", hexToHSL(theme));
    }, [hexToHSL(theme)]);

    return <>{children}</>;
}
