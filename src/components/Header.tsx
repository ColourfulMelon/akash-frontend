'use client';
import { PromptHistorySheet } from '@/components/PromptHistorySheet';
import { useSidebar } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header({ disableTitle }: { disableTitle?: boolean }) {
    const pathname = usePathname();
    const { setOpen, toggleSidebar, isMobile } = useSidebar();
    
    function openSidebar() {
        toggleSidebar();
        // fix text on mobile sidebar
        if (isMobile) setOpen(true);
    }
    
    return (
        <header className="flex justify-between items-center w-full py-4 px-4 md:px-8">
            <div className={cn(
                'hidden lg:block text-4xl',
                disableTitle ? 'hidden' : '',
            )}>
                {pathname.charAt(1).toUpperCase() + pathname.slice(2)}
            </div>
            <Menu className="cursor-pointer lg:invisible" onClick={openSidebar}/>
            <PromptHistorySheet/>
        </header>);
}