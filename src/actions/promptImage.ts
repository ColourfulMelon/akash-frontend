'use server';

import {Task, TaskCreate} from "@/lib/zodSchemas";

export default async function promptImage(createOptions: TaskCreate): Promise<Task>{
    const baseUrl = process.env.API_ENDPOINT;
    if (!baseUrl) {
        throw new Error('API_ENDPOINT is not set');
    }

    const res = await fetch(baseUrl + '/tasks', {
        method: 'POST',
        body: JSON.stringify({...createOptions}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}