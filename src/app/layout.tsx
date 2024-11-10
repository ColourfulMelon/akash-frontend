import type { Metadata } from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

export const metadata: Metadata = {
    title: "Akash Alchemist",
    description: "AI Enhanced Image Generator",
    keywords: "AI, Akash, Image Generation",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className='font-SFPro'>

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >

        <SidebarProvider defaultOpen={false}>
                {children}
            <AppSidebar/>
        </SidebarProvider>

        </ThemeProvider>
        </body>
</html>);
}
