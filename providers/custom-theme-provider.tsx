"use client";
import { useEffect } from "react";
import { hexToHSL, hexToOKLCH } from "@/lib/utils";
import { useThemeStore } from "@/hooks/layout/use-theme-store";

export default function CustomThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        if (!theme) return;
          const oklch = hexToOKLCH(theme);
        
        document.documentElement.style.setProperty("--primary", oklch);
        console.log(hexToHSL(oklch));
    }, [theme]);

    return <>{children}</>;
}
