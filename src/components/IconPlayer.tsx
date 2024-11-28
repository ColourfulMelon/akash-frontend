'use client';
import { Player } from '@lordicon/react';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { statusAtom } from '@/components/Prompt';
import { useAtomValue } from 'jotai/index';

export default function IconPlayer({ className }: { className?: string }) {
    const playerRef = useRef(null);
    const statusObj = useAtomValue(statusAtom);
    
    useEffect(() => {
        if (statusObj.status === 'generating') {
            // @ts-ignore
            playerRef.current?.play();
        }
    }, [statusObj]);
    return (
        <div className={cn('flex justify-center items-center', className)}>
            <Player
                ref={playerRef}
                icon={'/icons/image.json'}
                size={400}
                // @ts-ignore
                onComplete={() => playerRef.current?.playFromBeginning()}
            />
        </div>
    );
}
