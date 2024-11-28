import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRequiredEnvVar(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable ${name}`);
    }
    return value;
}