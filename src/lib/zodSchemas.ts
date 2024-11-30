import { z } from 'zod';

export enum Workflows {
    Realistic = 'realistic',
    Fantasy = 'fantasy',
    Anime = 'anime',
}

export enum Layout {
    Landscape = 'landscape',
    Portrait = 'portrait',
    Square = 'square',
}

export enum PromptStatus {
    Pending = 'pending',
    Completed = 'completed',
    Failed = 'failed',
}

export const zPrompt = z.object({
    clientId: z.string().uuid(),
    promptId: z.string().uuid(),
    text: z.string(),
    enhancedText: z.string().nullable(),
    workflow: z.nativeEnum(Workflows),
    layout: z.nativeEnum(Layout),
    seed: z.number().int(),
});

export const zPromptCreate = z.object({
    clientId: z.string().uuid(),
    text: z.string(),
    enhanceText: z.boolean().optional(),
    workflowOverride: z.nativeEnum(Workflows).optional(),
    layoutOverride: z.nativeEnum(Layout).optional(),
    seedOverride: z.number().int().optional(),
});

export const zPromptCreateForm = z.object({
    text: z.string(),
    enhanceText: z.boolean().optional(),
    // Workaround for parsing issue when user deselects from toggle group
    layoutOverride: z.nativeEnum(Layout).or(z.literal('')).optional(),
    workflowOverride: z.nativeEnum(Workflows).optional(),
    seedOverride: z.coerce.number().int().optional(),
});

export const zPromptResult = z.object({
    clientId: z.string().uuid(),
    promptId: z.string().uuid(),
    text: z.string(),
    enhancedText: z.string().nullable(),
    workflow: z.nativeEnum(Workflows),
    layout: z.nativeEnum(Layout),
    seed: z.number().int(),
    status: z.nativeEnum(PromptStatus),
    statusMessage: z.string().nullable(),
    progress: z.number().int().min(0).max(1).nullable(),
    outputFilename: z.string().nullable(),
});

export type Prompt = z.infer<typeof zPrompt>;
export type PromptCreate = z.infer<typeof zPromptCreate>;
export type PromptCreateForm = z.infer<typeof zPromptCreateForm>;
export type PromptResult = z.infer<typeof zPromptResult>;