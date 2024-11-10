'use server';

export default async function getStatus(id: string){
    const baseUrl = process.env.API_ENDPOINT;
    if (!baseUrl) {
        throw new Error('API_ENDPOINT is not set');
    }

    return await fetch(baseUrl + `/tasks/${id}/status`, {
        method: 'GET',
    });
}