import HomePagePrompt from '@/components/HomePagePrompt';
import Image from 'next/image';
import React from 'react';

export default function Home() {
    return (
        <section className="m-auto w-full">
            <Image className="mx-auto mb-5 md:mb-12" src={'/images/akash-powered.svg'} alt="akash" width={134}
                   height={52}/>
            <HomePagePrompt/>
        </section>
    );
}
