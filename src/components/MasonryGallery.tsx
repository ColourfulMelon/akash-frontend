import { useClientId } from '@/hooks/use-client-id';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PromptStatus } from '@/lib/zodSchemas';
import getAllPromptResults from '@/actions/getAllPromptResults';
import { Masonry } from 'react-plock';
import PromptImage from '@/components/PromptImage';

export default function MasonryGallery({ scope }: { scope: 'explore' | 'gallery' }) {
    const clientId = useClientId();
    const targetRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState({});
    
    const promptResults = useQuery({
        queryKey: ['getAllPromptResults', clientId, PromptStatus.Completed, 100],
        queryFn: async () => await getAllPromptResults({
            clientId: scope === 'gallery' ? clientId : undefined,
            status: PromptStatus.Completed,
            limit: 100,
        }),
        staleTime: 3000,
        refetchInterval: 60_000,
        enabled: clientId !== null,
    });
    
    useLayoutEffect(() => {
        if (targetRef.current) {
            setHeight({
                height: targetRef.current.offsetHeight + 'px',
            });
        }
    }, []);
    
    return (
        <div ref={targetRef} className="mx-auto overflow-scroll [&::-webkit-scrollbar]:hidden" style={height}>
            {promptResults.data && <Masonry
                items={promptResults.data}
                config={{
                    columns: [1, 2, 3, 4, 5],
                    gap: [24, 12, 6, 4, 4],
                    media: [640, 768, 1024, 1280, 1536],
                }}
                render={(item, key) => (
                    <PromptImage key={key} promptResult={item}/>
                )}
            ></Masonry>}
        </div>
    );
}