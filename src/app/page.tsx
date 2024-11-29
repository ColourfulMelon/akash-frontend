import Prompt from '@/components/Prompt';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Home() {
    
    return (
        <div className='h-full'>
            <Header/>
            
            <section className="flex flex-col justify-center align-middle h-full">
                
                <Image className='mx-auto mb-12' src={'/images/akash-powered.svg'} alt="akash" width={134} height={52}/>
                <Prompt/>
            
            </section>
        </div>
    );
}
