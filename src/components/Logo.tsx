import Image from 'next/image';
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ iconOnly = false, className }: React.ComponentProps<'img'> & { iconOnly?: boolean }) => {
    
    if (iconOnly) {
        return (
            <Image src={'/images/logo.svg'} alt={'Alchemist logo'} width={176} height={176} className={className}/>
        );
    }
    
    return (
        <Image src={'/images/logo-text.svg'} alt={'Alchemist logo'} width={769} height={80} className={className}/>
    );
}