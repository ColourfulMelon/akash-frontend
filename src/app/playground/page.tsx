'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { PromptCreateCard } from '@/components/PromptCreateCard';
import { z } from 'zod';
import { Layout, PromptCreate, PromptStatus, Workflows } from '@/lib/zodSchemas';
import createPrompt from '@/actions/createPrompt';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useClientId } from '@/hooks/use-client-id';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import getAllPromptResults from '@/actions/getAllPromptResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Check } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import PromptImage from '@/components/PromptImage';
import { PromptProgressBar } from '@/components/PromptProgressBar';
import PromptInput from '@/components/PromptInput';

export default function Playground() {
    const params = useSearchParams();
    const router = useRouter();
    const clientId = useClientId();
    const [isCreatingPrompt, setIsCreatingPrompt] = useState(false);
    
    const pendingPrompts = useQuery({
        queryKey: ['getAllPromptResults', clientId, PromptStatus.Pending],
        queryFn: async () => {
            return await getAllPromptResults({
                clientId: clientId!,
                status: PromptStatus.Pending,
            });
        },
        staleTime: 1000,
        refetchInterval: 3000,
        enabled: clientId !== null,
    });
    
    const lastPrompt = useQuery({
        queryKey: ['getAllPromptResults', clientId, 1],
        queryFn: async () => {
            const list = await getAllPromptResults({
                clientId: clientId!,
                limit: 1,
            });
            if (list.length === 1) {
                return list[0];
            }
            return null;
        },
        staleTime: 500,
        refetchInterval: 1000,
        enabled: clientId !== null,
    });
    
    const createPromptMutation = useMutation({
        mutationFn: async (prompt: PromptCreate) => {
            if (prompt.enhanceText || (!prompt.layoutOverride && !prompt.workflowOverride && !prompt.seedOverride)) {
                toast({
                    title: 'Optimising your prompt with AI',
                    description: (
                        <div className="flex gap-2 items-center">
                            <Spinner size="small"/><span>This may take a few seconds</span>
                        </div>
                    ),
                });
            }
            return await createPrompt(prompt);
        },
        onSuccess: () => {
            toast({
                title: 'Prompt Optimised!',
                description: (
                    <div className="flex gap-2 items-center">
                        <Check className="text-green-500 w-4 h-4"/><span>Queueing prompt...</span>
                    </div>
                ),
            });
            void pendingPrompts.refetch();
            setIsCreatingPrompt(false);
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
            void pendingPrompts.refetch();
            setIsCreatingPrompt(false);
        },
        onSettled: () => {
            if (params.get('start') === 'true') router.replace('/playground');
        },
    });
    
    const handleCreatePrompt = async (prompt: PromptCreate) => {
        setIsCreatingPrompt(true);
        await createPromptMutation.mutateAsync(prompt);
    };
    
    useEffect(() => {
        const paramsSchema = z.object({
            clientId: z.string().uuid(),
            start: z.coerce.boolean(),
            text: z.string(),
            enhanceText: z.coerce.boolean().optional(),
            layoutOverride: z.nativeEnum(Layout).optional(),
            workflowOverride: z.nativeEnum(Workflows).optional(),
            seedOverride: z.coerce.number().int().optional(),
        });
        const paramsObj = {
            clientId: clientId,
            start: Boolean(params.get('start') ?? undefined),
            text: params.get('text') ?? undefined,
            enhanceText: params.get('enhanceText') ?? undefined,
            layoutOverride: params.get('layout') ?? undefined,
            workflowOverride: params.get('workflow') ?? undefined,
            seedOverride: params.get('seed') ?? undefined,
        };
        const parsed = paramsSchema.safeParse(paramsObj);
        if (!parsed.success) {
            console.log(parsed.error);
            return;
        }
        const data = parsed.data;
        
        if (data.start) createPromptMutation.mutate(parsed.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId]);
    
    return (
        <div className="grid w-full
            grid-rows-[minmax(0,1fr)_minmax(0,max-content)]
            2xl:grid-cols-[minmax(0,max-content)_minmax(0,1fr)]
            ">
            <div className="hidden 2xl:flex flex-col h-full gap-8 w-80">
                <div className="flex flex-shrink">
                    <PromptCreateCard
                        defaultEnhanceText={true}
                        disableSubmit={isCreatingPrompt}
                        onSubmit={handleCreatePrompt}
                    />
                </div>
                <div className="flex flex-grow">
                    <Card className="h-fit w-full">
                        <CardHeader>
                            <CardTitle>Queue</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] overflow-y-auto space-y-4 px-3">
                            {pendingPrompts.isLoading && <Skeleton className="w-full h-24"/>}
                            {pendingPrompts.data?.map((result) => (
                                <div key={result.promptId}
                                     className="flex flex-col gap-1 border rounded-md py-2 px-4">
                                    <div className="mb-2 line-clamp-1">{result.text}</div>
                                    <PromptProgressBar progress={result.progress ?? 0}
                                                       message={result.statusMessage ?? 'In queue'}/>
                                </div>
                            ))}
                            {pendingPrompts.data?.length === 0 &&
                                <div className="text-muted-foreground">Start generating images to see them
                                    here</div>}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex w-full p-2 lg:p-8">
                <div className="m-auto">
                    {/*todo: Figure out how to size this responsively*/}
                    {lastPrompt.data && <PromptImage promptResult={lastPrompt.data}/>}
                </div>
            </div>
            <div className="flex justify-center 2xl:hidden">
                <PromptInput onSubmit={handleCreatePrompt}/>
            </div>
        </div>
    );
}
