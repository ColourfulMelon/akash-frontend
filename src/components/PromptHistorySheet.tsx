'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import getAllPromptResults from '@/actions/getAllPromptResults';
import { PromptResult, PromptStatus } from '@/lib/zodSchemas';
import { useClientId } from '@/hooks/use-client-id';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import PromptImage from '@/components/PromptImage';

export function PromptHistorySheet() {
    const clientId = useClientId();
    const [prompts, setPrompts] = useState<PromptResult[]>([]);
    const promptsQuery = useQuery({
        queryKey: ['getAllPromptResults', clientId, PromptStatus.Completed, 10],
        queryFn: async () => {
            const promptResults = await getAllPromptResults({
                clientId: clientId!,
                status: PromptStatus.Completed,
                limit: 10,
            });
            setPrompts(promptResults);
            return promptResults;
        },
        staleTime: 1000,
        refetchInterval: 3000,
        enabled: clientId !== null,
    });
    
    
    return (
        <Sheet>
            <SheetTrigger>
                <Clock className="w-6 h-6"/>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle className="flex flex-row gap-2 items-center">
                        Recent Images
                        <ArrowUpRight className="w-4 h-4 cursor-pointer"/>
                    </SheetTitle>
                    <SheetDescription>
                        These are your most recent creations!
                    </SheetDescription>
                </SheetHeader>
                <div className="h-full overflow-auto">
                    <div className="mx-auto flex justify-center gap-4">
                        <div className="flex-1 flex flex-col gap-4 mt-8 mb-16">
                            {promptsQuery.isLoading && prompts.length !== 0 && <Skeleton className="h-96"/>}
                            {promptsQuery.isError && <div className="text-destructive">Failed to load prompts</div>}
                            {prompts.map((prompt) => (
                                <div key={prompt.promptId}>
                                    <PromptImage promptResult={prompt}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}