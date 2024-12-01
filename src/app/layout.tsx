import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import React, { Suspense } from 'react';
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
        <html lang="en" suppressHydrationWarning={true} className="">
            <body
                className="font-SFPro bg-radial-gradient from-bg-gradient-start from-0% to-bg-gradient-end to-100% w-full overflow-hidden">
                <ContextProvider>
                    <main className="w-full min-h-dvh">
                        
                        <div
                            className="grid grid-rows-[minmax(0,max-content)_minmax(0,1fr)_minmax(0,max-content)] w-full h-full">
                            <Header/>
                            <Suspense>
                                <div className="flex p-8 w-full h-full">
                                    {children}
                                </div>
                            </Suspense>
                            <Footer/>
                        </div>
                    
                    </main>
                    <Toaster/>
                
                </ContextProvider>
            </body>
        </html>
    );
}
