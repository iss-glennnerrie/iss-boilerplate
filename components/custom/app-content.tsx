"use client";
import { useThemeStore } from "@/hooks/layout/use-theme-store";
import useTitle from "@/hooks/layout/use-title";
import { useEffect } from "react";

interface AppContentProps {
    title?: string | null;
    description?: string | null;
    children: React.ReactNode;
}

export default function AppContent({ title, children, description }: AppContentProps) {
    const { setTitle } = useTitle();
    const { fontSize } = useThemeStore();

    useEffect(() => {
        if (title) {
            setTitle(title);
        }
    }, [title, setTitle]);

    return (
        <div className={`${fontSize} p-4`}>
            <div className="mb-3">
                <div className="text-xl font-bold">{title}</div>
                {description && <div className="text-base text-muted-foreground">{description}</div>}
            </div>
            <div className="min-h-screen flex-1 rounded-xl md:min-h-min">{children}</div>
        </div>
    );
}
