'use server';

import { Prompt, PromptCreate } from '@/lib/zodSchemas';
import { getRequiredEnvVar } from '@/lib/utils';

export default async function createPrompt(prompt: PromptCreate): Promise<Prompt> {
    const url = getRequiredEnvVar('API_ENDPOINT');
    const endpoint = `${url}/prompts`;
    const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(prompt),
    });
    return await res.json();
}