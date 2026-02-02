import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
    theme: string;
    setTheme: (newTheme: string) => void;
    fontSize: string;
    setFontSize: (newFontSize: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "#0A089A",
            setTheme: (newTheme: string) => set({ theme: newTheme }),
            fontSize: "text-sm",
            setFontSize: (newFontSize: string) => set({ fontSize: newFontSize }),
        }),
        {
            name: "theme-storage", // Key for localStorage
        },
    ),
);
