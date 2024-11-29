'use client';

import { AppSidebar } from '@/components/app-sidebar';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function ContextProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <SidebarProvider defaultOpen={false}>
                    <AppSidebar/>
                    {children}
                </SidebarProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}