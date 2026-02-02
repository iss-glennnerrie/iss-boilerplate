import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Innovatix Systems Services",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReactQueryProvider>
            <html lang="en">
                <body className={`${inter.variable} antialiased font-[family-name:var(--font-inter)]`}>
                    {children}
                    <Toaster position="top-center" richColors={true} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </body>
            </html>
        </ReactQueryProvider>
    );
}
