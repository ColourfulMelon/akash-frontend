'use client';
import {Clock} from 'lucide-react';
import {useQuery} from '@tanstack/react-query';
import getAllPromptResults from '@/actions/getAllPromptResults';
import PromptImage from '@/components/PromptImage';
import useMasonry from '@/components/hooks/useMasonry';
import LoadingComponent from '@/components/LoadingComponent';
import {PromptStatus} from "@/lib/zodSchemas";

export default function Explore() {
    const promptResults = useQuery({
        queryKey: ['getAllPromptResults'],
        queryFn: () => getAllPromptResults({status: PromptStatus.Completed}),
        refetchInterval: 3000,
        enabled: true,
    });

    const masonryContainer = useMasonry();

    return (
        <div className="grid grid-rows-[minmax(0,max-content)_minmax(0,1fr)]">
            <div className="flex justify-between items-center w-full py-4 px-8">
                <div className="text-4xl">Explore</div>
                <Clock/>
            </div>
            <div>
                <div className="fadedScrollTop"></div>
                <div className='w-full overflow-auto px-10 py-5 grid items-start gap-4 sm:grid-cols-3 md:gap-6 row-span-1 h-full'
                     ref={masonryContainer}>
                    {!promptResults.data && <LoadingComponent/>}

                    {promptResults.data && promptResults.data.map((result) => (
                        <PromptImage key={result.promptId} promptResult={result}/>
                    ))}
                </div>
                <div className="fadedScrollBottom"></div>
            </div>
            </div>
            );
            }