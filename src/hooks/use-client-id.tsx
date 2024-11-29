'use client';

import { v4 as uuid } from 'uuid';
import { useState, useEffect } from 'react';

// This hook should always return a value. If there is no client id, generate one and store it in local storage. Retrieve it from local storage if it exists.
export function useClientId() {
    const [clientId, setClientId] = useState<string | null>(null);

    useEffect(() => {
        let id = localStorage.getItem('client-id');
        if (!id) {
            id = uuid();
            localStorage.setItem('client-id', id);
        }
        setClientId(id);
    }, []);

    return clientId;
}
