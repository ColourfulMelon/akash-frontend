import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import React, { Suspense } from 'react';
import { ContextProvider } from '@/app/context';
import Footer from '@/components/Footer';
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: 'Akash Alchemist',
    description: 'AI Enhanced Image Generator',
    keywords: 'AI, Akash, Image Generation',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning={true} className="">
            <body
                className="font-SFPro bg-radial-gradient from-bg-gradient-start from-0% to-bg-gradient-end to-100% w-full overflow-x-hidden">
                <ContextProvider>
                    <main className="w-full min-h-dvh">
                        <Header/>

                        <div className="grid grid-rows-[minmax(0,1fr)_minmax(0,max-content)] w-full">
                            <Suspense>
                                {children}
                            </Suspense>
                        </div>
                        <Footer/>
                    </main>
                    <Toaster/>

                </ContextProvider>
            </body>
        </html>
    );
}
