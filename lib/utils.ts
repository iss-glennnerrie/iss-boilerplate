import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const hexToHSL = (hex: string) => {
    const hexColorPattern = /^#([0-9A-Fa-f]{3}){1,2}$/;

    // Ensure hex starts with "#" and is a valid hex code
    if (!hexColorPattern.test(hex)) return "0, 0%, 50%"; // Default to gray if invalid

    // Remove the "#" if it's there and normalize to 6 digits
    hex = hex.replace(/^#/, "");
    if (hex.length === 3)
        hex = hex
            .split("")
            .map((c) => c + c)
            .join("");

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Find min and max values to get lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h *= 60;
    }

    // const hsl = Math.round(h) + ", " + Math.round(s * 100) + "%, " + Math.round(l * 100) + "%";
    // return hsl;
    return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

export function hexToOKLCH(hex: string): string {
    const el = document.createElement("div");
    el.style.color = hex;
    document.body.appendChild(el);

    const computed = getComputedStyle(el).color;
    document.body.removeChild(el);

    // Create temp element to force OKLCH conversion
    const temp = document.createElement("div");
    temp.style.color = computed;
    temp.style.color = `oklch(from ${computed} l c h)`;

    document.body.appendChild(temp);
    const oklch = getComputedStyle(temp).color;
    document.body.removeChild(temp);

    return oklch;
}
export function appNameToSlug(appName?: string | null): string {
    if (!appName) return "";

    return appName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
