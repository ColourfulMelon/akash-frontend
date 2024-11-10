"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarProvider,
} from "@/components/ui/sidebar"
import placeholder from "@/assets/image-placeholder.png"
import Image from "next/image";

const items = Array.from({ length: 10 }, (_, i) => i)
export function AppSidebar() {
    return (
        <Sidebar side="right" variant="sidebar" collapsible="offcanvas">
            <SidebarContent>
            {/*    images*/}
                {items.map((item) => (
                    <Image src={placeholder} alt=""/>) )}
            </SidebarContent>
        </Sidebar>
    )
}
