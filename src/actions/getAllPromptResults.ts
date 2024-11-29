'use server';

import { getRequiredEnvVar } from '@/lib/utils';
import { PromptResult } from '@/lib/zodSchemas';

export default async function getAllPromptResults(clientId: string): Promise<PromptResult[]> {
    const url = getRequiredEnvVar('API_ENDPOINT');
    const endpoint = `${url}/prompts/results?clientId=${clientId}&status=completed`;
    
    const res = await fetch(endpoint);
    const json = await res.json();
    
    if (!res.ok) {
        console.error(json);
        throw new Error(json.error);
    }
    
    return json;
}