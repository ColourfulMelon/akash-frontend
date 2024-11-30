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
import { Progress } from '@/components/ui/progress';
import { PromptHistorySheet } from '@/components/PromptHistorySheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, Copy, Download } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import PromptImage from '@/components/PromptImage';

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
    
    const lastCompletedPrompt = useQuery({
        queryKey: ['getAllPromptResults', clientId, PromptStatus.Completed, 1],
        queryFn: async () => {
            const list = await getAllPromptResults({
                clientId: clientId!,
                status: PromptStatus.Completed,
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
    
    async function copyImg(src: string) {
        const img = await fetch(src);
        const imgBlob = await img.blob();
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [imgBlob.type]: imgBlob,
                }),
            ]);
            toast({
                title: 'Copied',
                description: 'Image copied to clipboard',
            });
        } catch (error) {
            console.error(error);
        }
    }
    
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
        <div className="grid grid-rows-[minmax(0,max-content)_minmax(0,1fr)]">
            <div className="flex justify-between items-center w-full py-4 px-8">
                <div className="text-4xl">Playground</div>
                <PromptHistorySheet/>
            </div>
            <div className="flex px-8 pt-4 pb-2">
                <div className="flex flex-col h-full gap-8 w-80 min-h-full">
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
                                        <Progress value={(result.progress ?? 0) * 100}/>
                                        <div
                                            className="text-sm">{result.statusMessage} ({Math.floor((result.progress ?? 0) * 100)}%)
                                        </div>
                                    </div>
                                ))}
                                {pendingPrompts.data?.length === 0 &&
                                    <div className="text-muted-foreground">Start generating images to see them
                                        here</div>}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="m-auto">
                        {lastCompletedPrompt.data && <div className="flex flex-row gap-2">
                            <div className="flex flex-col items-center gap-2 max-w-screen-md">
                                <PromptImage promptResult={lastCompletedPrompt.data}/>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <Download className="w-6 h-6 cursor-pointer"/>
                                <Copy
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={() => {
                                        if (lastCompletedPrompt.data?.outputFilename) {
                                            void copyImg(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/outputs/${lastCompletedPrompt.data.outputFilename}`);
                                        }
                                    }}
                                />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
