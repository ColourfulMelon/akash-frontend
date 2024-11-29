'use client';
import { useSearchParams } from 'next/navigation';
import { Clock } from 'lucide-react';
import { PromptCreateCard } from '@/components/PromptCreateCard';
import { z } from 'zod';
import { Layout, PromptCreate, Workflows } from '@/lib/zodSchemas';
import createPrompt from '@/actions/createPrompt';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useClientId } from '@/hooks/use-client-id';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import getAllPromptResults from '@/actions/getAllPromptResults';

export default function Playground() {
    const params = useSearchParams();
    const clientId = useClientId();
    const [isCreatingPrompt, setIsCreatingPrompt] = useState(false);
    
    const defaultPromptTextParse = z.string().optional().safeParse(params.get('prompt') ?? undefined);
    const defaultLayoutOverrideParse = z.nativeEnum(Layout).optional().safeParse(params.get('layout') ?? undefined);
    const defaultWorkflowOverrideParse = z.nativeEnum(Workflows).optional().safeParse(params.get('workflow') ?? undefined);
    const defaultSeedOverrideParse = z.coerce.number().int().optional().safeParse(params.get('seed') ?? undefined);
    
    const defaultPromptText = defaultPromptTextParse.success ? defaultPromptTextParse.data : undefined;
    const defaultLayoutOverride = defaultLayoutOverrideParse.success ? defaultLayoutOverrideParse.data : undefined;
    const defaultWorkflowOverride = defaultWorkflowOverrideParse.success ? defaultWorkflowOverrideParse.data : undefined;
    const defaultSeedOverride = defaultSeedOverrideParse.success ? defaultSeedOverrideParse.data : undefined;
    
    const start = params.get('start') === 'true';
    
    const createPromptMutation = useMutation({
        mutationFn: (prompt: PromptCreate) => {
            return createPrompt(prompt);
        },
        onSuccess: (data) => {
            toast({
                title: 'Prompt created',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code lang={'json'} className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            });
            setIsCreatingPrompt(false);
        },
        onError: (error, variables, context) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
            setIsCreatingPrompt(false);
        },
    });
    
    const handleCreatePrompt = async (prompt: PromptCreate) => {
        setIsCreatingPrompt(true);
        await createPromptMutation.mutateAsync(prompt);
    };
    
    useEffect(() => {
        if (start && clientId) {
            void handleCreatePrompt({
                clientId: clientId,
                text: defaultPromptText ?? 'Generate an image',
                layoutOverride: defaultLayoutOverride,
                workflowOverride: defaultWorkflowOverride,
                seedOverride: defaultSeedOverride,
            });
        }
    }, []);
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center w-full py-4 px-8">
                <div className="text-4xl">Playground</div>
                <Clock/>
            </div>
            <div className="flex flex-col h-full px-8 pt-4 pb-2 overflow-hidden scroll-auto">
                <div>
                    <PromptCreateCard
                        defaultPromptText={defaultPromptText}
                        defaultLayoutOverride={defaultLayoutOverride}
                        defaultWorkflowOverride={defaultWorkflowOverride}
                        defaultSeedOverride={defaultSeedOverride}
                        disableSubmit={isCreatingPrompt}
                        onSubmit={handleCreatePrompt}
                    />
                </div>
                
            </div>
        </div>
    );
}
