'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AutosizeTextarea } from '@/components/AutoResizeTextarea';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronRight, ChevronsUpDown, Sparkles } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { Layout, PromptCreate, Workflows } from '@/lib/zodSchemas';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { useClientId } from '@/hooks/use-client-id';

const workflows = [
    {
        value: 'realistic',
        label: 'Realistic',
    },
    {
        value: 'fantasy',
        label: 'Fantasy',
    },
    {
        value: 'anime',
        label: 'Anime',
    },
];

const formSchema = z.object({
    text: z.string(),
    enhanceText: z.boolean().optional(),
    // Workaround for parsing issue when user deselects from toggle group
    layoutOverride: z.nativeEnum(Layout).or(z.literal('')).optional(),
    workflowOverride: z.nativeEnum(Workflows).optional(),
    seedOverride: z.coerce.number().int().optional(),
});

export const PromptCreateCard = (
    {
        defaultPromptText,
        defaultEnhanceText,
        defaultWorkflowOverride,
        defaultLayoutOverride,
        defaultSeedOverride,
        disableSubmit,
        onSubmit,
    }:
    Readonly<{
        defaultPromptText?: string;
        defaultEnhanceText?: boolean;
        defaultWorkflowOverride?: Workflows;
        defaultLayoutOverride?: Layout;
        defaultSeedOverride?: number;
        disableSubmit?: boolean;
        onSubmit?(data: PromptCreate): void;
    }>,
) => {
    const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
    const [workflowOpen, setWorkflowOpen] = useState(false);
    const clientId = useClientId();
    
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            text: defaultPromptText,
            enhanceText: defaultEnhanceText,
            workflowOverride: defaultWorkflowOverride,
            layoutOverride: defaultLayoutOverride,
            seedOverride: defaultSeedOverride,
        },
        resolver: zodResolver(formSchema),
    });
    
    function handleSubmit(data: z.infer<typeof formSchema>) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code lang={'json'} className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        if (!clientId) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Client ID is missing',
            });
            return;
        }
        if (!onSubmit) return;
        onSubmit({
            clientId,
            ...data,
            layoutOverride: data.layoutOverride === '' ? undefined : data.layoutOverride,
        });
    }
    
    return (
        <Card className="w-full">
            <CardHeader className="p-3 pt-4">
                <CardTitle>Prompt</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <CardContent className="flex flex-col p-3 gap-2">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AutosizeTextarea
                                            className="resize-none rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                            maxHeight={200}
                                            placeholder='Type your prompt here'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <div className="flex items-end text-sm cursor-pointer text-primary-foreground/70"
                             onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}>
                            Advanced Settings <ChevronRight
                            className={cn('w-5 h-5 transition-transform', advancedSettingsOpen && 'rotate-90')}/>
                        </div>
                        <div className={cn(advancedSettingsOpen ? 'flex flex-col gap-4 mt-1' : 'hidden')}>
                            <FormField
                                control={form.control}
                                name="layoutOverride"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mb-1">Aspect Ratio Override</FormLabel>
                                        <FormControl>
                                            <ToggleGroup
                                                className="flex justify-evenly bg-background h-24 p-1.5 rounded-lg"
                                                type="single"
                                                {...field}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <ToggleGroupItem
                                                    className="flex flex-col w-full h-full pb-1"
                                                    value="portrait"
                                                    aria-label="Toggle portrait"
                                                >
                                                    <div
                                                        className="bg-primary-foreground px-3 py-5 rounded-[0.2rem] my-auto"/>
                                                    <span>Portrait</span>
                                                </ToggleGroupItem>
                                                <ToggleGroupItem
                                                    className="flex flex-col w-full h-full pb-1"
                                                    value="landscape"
                                                    aria-label="Toggle landscape"
                                                >
                                                    <div
                                                        className="bg-primary-foreground px-5 py-3 rounded-[0.2rem] my-auto"/>
                                                    <span>Landscape</span>
                                                </ToggleGroupItem>
                                                <ToggleGroupItem
                                                    className="flex flex-col w-full h-full pb-1"
                                                    value="square"
                                                    aria-label="Toggle square"
                                                >
                                                    <div
                                                        className="bg-primary-foreground px-3.5 py-3.5 rounded-[0.2rem] my-auto"/>
                                                    <span>Square</span>
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="workflowOverride"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mb-1">Workflow Override</FormLabel>
                                        <Popover open={workflowOpen} onOpenChange={setWorkflowOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={workflowOpen}
                                                        className="w-full justify-between"
                                                    >
                                                        {field.value
                                                            ? workflows.find((workflow) => workflow.value === field.value)?.label
                                                            : 'Select workflow...'}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandList>
                                                        <CommandGroup>
                                                            {workflows.map((workflow) => (
                                                                <CommandItem
                                                                    key={workflow.value}
                                                                    value={workflow.value}
                                                                    onSelect={(currentValue) => {
                                                                        form.setValue('workflowOverride', currentValue === field.value ? undefined : currentValue as Workflows);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'h-4 w-4',
                                                                            field.value === workflow.value ? 'opacity-100' : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {workflow.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                            </FormField>
                            <FormField
                                control={form.control}
                                name="seedOverride"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mb-1">Seed Override</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-background"
                                                type="number"
                                                placeholder="Random"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="enhanceText"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    className="rounded-[0.3rem]"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <FormLabel
                                                    htmlFor="enhance-text"
                                                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Enhance your prompt text with AI
                                                </FormLabel>
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="p-2">
                        <Button className="[&_svg]:size-6 w-full" type="submit" disabled={disableSubmit}>
                            <Sparkles/>
                            Generate Image
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
        ;
};