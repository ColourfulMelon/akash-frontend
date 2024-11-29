'use server';

import { getRequiredEnvVar } from '@/lib/utils';
import { PromptResult } from '@/lib/zodSchemas';

export default async function getPromptResult(id: string): Promise<PromptResult> {
    const url = getRequiredEnvVar('NEXT_PUBLIC_API_ENDPOINT');
    const endpoint = `${url}/prompts/${id}/result`;

    const res = await fetch(endpoint);

    if (res.status === 404) {
        throw new Error('Not Found');
    }

    return await res.json();
}