import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import { ContextProvider } from '@/app/context';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'Akash Alchemist',
    description: 'AI Enhanced Image Generator',
    keywords: 'AI, Akash, Image Generation',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning={true} className="overflow-hidden">
            <body className="font-SFPro bg-radial-gradient from-bg-gradient-start from-0% to-bg-gradient-end to-100% h-full w-full">
                <ContextProvider>
                    <main className='w-full'>
                        <div className='grid grid-rows-[minmax(0,1fr)_minmax(0,max-content)] h-dvh w-full'>
                            {children}
                            <Footer className='z-40'/>
                        </div>
                    </main>
                    <Toaster/>
                </ContextProvider>
            </body>
        </html>
    );
}
