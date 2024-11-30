'use client';

import Image from 'next/image';
import { useAtom } from 'jotai/index';
import { statusAtom } from '@/components/HomePagePrompt';

export default function CenterLogo({ ref }: { ref: React.RefObject<HTMLImageElement> }) {
    const [status] = useAtom(statusAtom);
    
    return (
        <Image
            src={'/images/logoText.svg'} ref={ref}
            alt="Alchemist logo"
            width={231}
            height={80}
            className={`mx-auto mb-40 ${status.status === 'generating' ? 'animate-fadeOut' : ''}`}
        />
    );
}