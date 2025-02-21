'use server';

import { Prompt, PromptCreate } from '@/lib/zodSchemas';
import { getRequiredEnvVar } from '@/lib/utils';

export default async function createPrompt(prompt: PromptCreate): Promise<Prompt> {
    const url = getRequiredEnvVar('API_ENDPOINT');
    const endpoint = `${url}/prompts`;
    const res = await fetch(endpoint, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(prompt),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 404){
        throw new Error('Not Found');
    }
    const json = await res.json();
    if (!res.ok) {
        console.error(json);
        throw new Error(json.error);
    }
    return json;
}