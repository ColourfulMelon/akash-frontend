import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";


export const metadata: Metadata = {
    title: "Akash Alchemist",
    description: "AI Enhanced Image Generator",
    keywords: "AI, Akash, Image Generation",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <body className='font-SFPro'>{children}</body>
        </ThemeProvider>
        </html>
    );
}
