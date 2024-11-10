"use client";
import {ThemeToggle} from "@/components/ThemeToggle";
import logoCircle from "@/assets/logo_circle.png";
import Image from "next/image";
import {SidebarMenuButton, SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {PanelRight} from "lucide-react";

export default function Header(){
    const { open, toggleSidebar } = useSidebar()
    return (
        <header className="flex items-center justify-between p-4 w-full text-white px-10 mt-2">
            <div className="flex items-center gap-4">
                <Image src={logoCircle} alt="Logo" width={70} />
                <h1 className="text-3xl font-poppins font-thin">Alchemist</h1>

            </div>

            <button className={`cursor-pointer transition-transform ${open ? 'transform -translate-x-60' : ''} duration-300`}  onClick={toggleSidebar}>
                <PanelRight />
            </button>

        </header>
    )
}