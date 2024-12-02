'use server';

import { getRequiredEnvVar } from '@/lib/utils';
import { PromptResult, PromptStatus } from '@/lib/zodSchemas';

interface GetAllPromptResultsOptions {
    clientId?: string | null;
    limit?: number | null;
    status?: PromptStatus | null;
}

export default async function getAllPromptResults(options?: GetAllPromptResultsOptions): Promise<PromptResult[]> {
    const url = getRequiredEnvVar('API_ENDPOINT');
    let endpoint = `${url}/prompts/results`;
    
    const searchParams = new URLSearchParams();
    
    // Only add parameters that are defined and not null
    if (options?.clientId) {
        searchParams.append('clientId', options.clientId);
    }
    
    if (options?.limit !== undefined && options.limit !== null) {
        searchParams.append('limit', options.limit.toString());
    }
    
    if (options?.status) {
        searchParams.append('status', options.status);
    }
    
    const searchParamsString = searchParams.toString();
    if (searchParamsString) {
        endpoint += `?${searchParamsString}`;
    }
    
    console.log(endpoint);
    
    const res = await fetch(endpoint);
    const json = await res.json();
    
    if (!res.ok) {
        console.error(json);
        throw new Error(json.error);
    }
    
    return json;
}