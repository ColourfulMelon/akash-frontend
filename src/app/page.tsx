import HomePagePrompt from '@/components/HomePagePrompt';
import Image from 'next/image';
import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className='max-h-dvh'>

            <section className="flex flex-col justify-center align-middle h-full">
                <Image className='mx-auto mb-5 md:mb-12' src={'/images/akash-powered.svg'} alt="akash" width={134} height={52}/>
                <HomePagePrompt/>
            </section>
        </div>
    );
}
