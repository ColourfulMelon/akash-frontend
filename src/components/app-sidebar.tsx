'use client';
import {
    Sidebar,
    SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {Book, Compass, Terminal } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import akashLogo from "@/assets/images/akashLogo.svg";


export function AppSidebar() {

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                    <Image src={logo} alt="Alchemist Logo" className="w-full p-3"/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="">
                            <SidebarMenuItem className="flex justify-center mb-4 !w-full">
                                <SidebarMenuButton asChild className="">
                                    <Terminal />

                                    {/*<a href="/">*/}
                                    {/*    <Terminal />*/}
                                    {/*    <span>Dashboard</span>*/}
                                    {/*</a>*/}
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="flex justify-center">
                                <SidebarMenuButton asChild >
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
                        <Image src={akashLogo} className="w-full" alt="Akash logo"/>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}