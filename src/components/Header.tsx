"use client";
import {useSidebar} from "@/components/ui/sidebar";
import {Clock} from "lucide-react";

export default function Header(){
    const { toggleSidebar } = useSidebar()
    return (
        <header className="w-full z-10">
            <button className='cursor-pointer absolute right-5 top-5'>
                <Clock />
            </button>
        </header>
    )
}