import HomePagePrompt from '@/components/HomePagePrompt';
import Image from 'next/image';
import { PromptHistorySheet } from '@/components/PromptHistorySheet';

export default function Home() {
    
    return (
        <div className='h-full'>
            <header className='flex justify-end items-center w-full py-4 px-8'>
                <PromptHistorySheet />
            </header>
            
            <section className="flex flex-col justify-center align-middle h-full">
                
                <Image className='mx-auto mb-12' src={'/images/akash-powered.svg'} alt="akash" width={134} height={52}/>
                <HomePagePrompt/>
            
            </section>
        </div>
    );
}
