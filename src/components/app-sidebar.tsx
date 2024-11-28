'use client';
import {
    Sidebar,
    SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Book, Compass, Terminal } from 'lucide-react';
import { useState } from 'react';

export function AppSidebar() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();
    
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Image src="/images/logo.svg" alt="Alchemist Logo" width={30} height={55} className="w-full p-3"/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="">
                            <SidebarMenuItem className="flex justify-center mb-4 !w-full">
                                <SidebarMenuButton asChild className="">
                                    <Terminal/>
                                    
                                    {/*<a href="/">*/}
                                    {/*    <Terminal />*/}
                                    {/*    <span>Dashboard</span>*/}
                                    {/*</a>*/}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            
                            <SidebarMenuItem className="flex justify-center">
                                <SidebarMenuButton asChild>
                                    <Compass/>
                                    
                                    {/*<a href="/">*/}
                                    {/*    <Compass/>*/}
                                    {/*    <span>Dashboard</span>*/}
                                    {/*</a>*/}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem className="flex justify-center">
                    <SidebarMenuButton asChild>
                        <Book/>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem className="flex justify-center mt-6 mb-4">
                    <SidebarMenuButton asChild>
                        <Image src="/images/akashLogo.svg" className="w-full" alt="Akash logo" width={30} height={25}/>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}