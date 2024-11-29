'use server';

import { getRequiredEnvVar } from '@/lib/utils';
import { PromptResult, PromptStatus } from '@/lib/zodSchemas';

interface GetAllPromptResultsOptions {
    clientId?: string;
    limit?: number;
    status?: PromptStatus;
}

export default async function getAllPromptResults(options?: GetAllPromptResultsOptions): Promise<PromptResult[]> {
    const url = getRequiredEnvVar('API_ENDPOINT');
    let endpoint = `${url}/prompts/results`;
    if (options?.clientId) {
        endpoint += `?clientId=${options.clientId}`;
    }
    if (options?.limit) {
        endpoint += `&limit=${options.limit}`;
    }
    if (options?.status) {
        endpoint += `&status=${options.status}`;
    }
    console.log(endpoint)
    const res = await fetch(endpoint);
    const json = await res.json();
    
    if (!res.ok) {
        console.error(json);
        throw new Error(json.error);
    }
    
    return json;
}