'use client';

import * as React from 'react';
import { Aperture, Book, History, Terminal } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter, SidebarGroup,
    SidebarHeader, SidebarMenu, SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import Link from 'next/link';


const SidebarButton = ({ children, label, ...props }: React.ComponentProps<typeof Button> & { label: string }) => {
    const { open } = useSidebar();
    const currentPathname = usePathname();
    const router = useRouter();
    const targetPathname = `/${label}`.toLowerCase();
    return (
        <Button
            variant="ghost"
            className={cn(
                'flex items-center justify-start p-2 gap-2',
                currentPathname.toLowerCase() === targetPathname.toLowerCase() ? 'bg-accent' : '',
            )}
            {...props}
            onClick={(e) => {
                e.stopPropagation();
                router.push(targetPathname);
            }}

        >
            {children}
            {open && label}
        </Button>
    );
};

const SidebarNoNav = ({ children, label, ...props }: React.ComponentProps<typeof Button> & { label: string }) => {
    const { open } = useSidebar();
    const currentPathname = usePathname();
    const targetPathname = `/${label}`.toLowerCase();
    return (
        <Button
            variant="ghost"
            className={cn(
                'flex items-center justify-start p-2 gap-2',
                currentPathname.toLowerCase() === targetPathname.toLowerCase() ? 'bg-accent' : '',
            )}
            {...props}
        >
            {children}
            {open && label}
        </Button>
    );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open, setOpen } = useSidebar();
    const router = useRouter();

    return (
        <Sidebar collapsible="icon" {...props} onClick={(e) => {
            if (!open) {
                setOpen(true);
            }
        }}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem onClick={() => router.push('/')}>
                        <div className={cn(
                            open ? 'flex items-center justify-center hover:bg-accent ' : '',
                            'py-2 rounded-md hover:cursor-pointer',
                        )}>
                            <Logo iconOnly={!open} className="h-10"/>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="flex justify-between overflow-hidden">
                <SidebarGroup className="pt-6">
                    <SidebarMenu className="gap-2">
                        <SidebarButton label="Playground" >
                            <Terminal className="!w-6 !h-6"/>
                        </SidebarButton>
                        <SidebarButton label={'History'}>
                            <History className="!w-6 !h-6"/>
                        </SidebarButton>
                        <SidebarButton label={'Explore'}>
                            <Aperture className="!w-6 !h-6"/>
                        </SidebarButton>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="pt-6">
                    <SidebarMenu className="gap-2">
                        <SidebarNoNav label={'Documentation'} className="justify-center" onClick={()=> window.open("https://aisignal.gitbook.io/akash-alchemist/", "_blank")}>
                            <Book className="!w-6 !h-6"/>
                        </SidebarNoNav>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="flex items-center justify-center py-4">
                <Link href={'https://akash.network'} target={'_blank'} onClick={(e) => e.stopPropagation()}>
                    {!open &&
                        <Image src={'/images/akashLogo.svg'} alt="akash" width={174} height={150} className="h-10"/>}
                    {open &&
                        <Image src={'/images/akash-powered.svg'} alt="akash" width={134} height={52}/>}
                </Link>
            </SidebarFooter>
            <div onClick={() => setOpen(!open)}>
                <SidebarRail/>
            </div>
        </Sidebar>
    );
}
