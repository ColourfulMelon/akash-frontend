'use client';
import { PromptHistorySheet } from '@/components/PromptHistorySheet';
import { useSidebar } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

export default function Header() {
    const { setOpen, toggleSidebar, isMobile } = useSidebar();
    
    function openSidebar() {
        toggleSidebar();
        // fix text on mobile sidebar
        if (isMobile) setOpen(true);
    }
    
    return (
        <header className="flex justify-between items-center w-full py-4 px-4 md:px-8">
            {/*mobile sidebar toggle*/}
            <Menu className="cursor-pointer lg:invisible" onClick={openSidebar}/>
            <PromptHistorySheet/>
        </header>);
}