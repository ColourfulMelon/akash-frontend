"use client";
import logoCircle from "@/assets/images/logo_circle.png";
import Image from "next/image";
import {SidebarMenuButton, SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {PanelRight} from "lucide-react";

export default function Header(){
    const { toggleSidebar } = useSidebar()
    return (
        <header className="flex items-center justify-between p-4 w-full text-white px-10 pt-4 z-10">
            <div className="flex items-center gap-4">
                <Image src={logoCircle} alt="Logo" width={70} />
                <h1 className="text-3xl font-poppins font-thin">Alchemist</h1>

            </div>

            <button className={`cursor-pointer`}  onClick={toggleSidebar}>
                <PanelRight />
            </button>

        </header>
    )
}