import type { Metadata } from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

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
            <SidebarProvider defaultOpen={false}>
                <AppSidebar/>
                <body className='font-SFPro'>
                    {children}
                </body>
            </SidebarProvider>
        </ThemeProvider>
        </html>
    );
}
