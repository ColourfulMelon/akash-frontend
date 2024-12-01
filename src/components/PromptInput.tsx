'use client';
import { ArrowUpRight, Check, ChevronsUpDown, Settings, Sparkles } from 'lucide-react';
import { AutosizeTextarea } from '@/components/AutoResizeTextarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PromptCreate, PromptCreateForm, Workflows, zPromptCreateForm } from '@/lib/zodSchemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useClientId } from '@/hooks/use-client-id';
import { Badge } from '@/components/ui/badge';

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

export default function PromptInput({ onSubmit, suggestions }: Readonly<{
    onSubmit(data: PromptCreate): void,
    suggestions?: string[]
}>) {
    const clientId = useClientId();
    const [workflowOpen, setWorkflowOpen] = useState(false);

    const form = useForm<PromptCreateForm>({
        defaultValues: {
            enhanceText: true,
        },
        resolver: zodResolver(zPromptCreateForm),
    });

    function handleSubmit(data: PromptCreateForm) {
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
        <div className="flex flex-col flex-wrap items-center w-full max-w-[50rem] gap-2">
            <div
                className="flex flex-col items-center gap-4 w-full justify-center mx-auto rounded-lg bg-secondary animate-glow p-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2 w-full">
                        <FormField
                            name="text"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AutosizeTextarea
                                            className="bg-secondary border-none resize-none rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                            maxHeight={200}
                                            placeholder={'Generate an image'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between w-full">
                            <Popover>
                                <PopoverTrigger className="border bg-background p-1 rounded-sm">
                                    <Settings/>
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col gap-2">
                                    <div className="font-bold">Settings</div>
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
                                                                <ChevronsUpDown
                                                                    className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
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
                                        )}
                                    />
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
                                                    <div className="flex items-center space-x-2 mt-2">
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
                                </PopoverContent>
                            </Popover>
                            <Button size="icon" className="[&_svg]:size-6" type="submit">
                                <Sparkles/>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            {suggestions && <div className="flex flex-wrap gap-2 lg:gap-4 items-center justify-center">
                {suggestions.map((suggestion, index) =>
                    <Badge
                        key={index}
                        onClick={() => form.setValue('text', suggestion)}
                        className="cursor-pointer text-sm bg-secondary text-center flex justify-center p-1 px-2"
                    >
                        {suggestion}
                        <ArrowUpRight className="w-4 h-4"/>
                    </Badge>
                )}
            </div>}
        </div>
    );
}

