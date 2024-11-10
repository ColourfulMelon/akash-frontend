'use server';

export default async function promptImage(prompt: string){
    const baseUrl = process.env.API_ENDPOINT;
    if (!baseUrl) {
        throw new Error('API_ENDPOINT is not set');
    }

    const res = await fetch(baseUrl + '/tasks', {
        method: 'POST',
        body: JSON.stringify({prompt}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.text();
}