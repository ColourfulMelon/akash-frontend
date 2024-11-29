import { AppSidebar } from '@/components/app-sidebar';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

export function ContextProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider defaultOpen={false}>
                <AppSidebar/>
                {children}
            </SidebarProvider>
        </ThemeProvider>
    );
}