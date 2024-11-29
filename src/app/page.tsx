import Prompt from '@/components/Prompt';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageContainer from '@/components/ImageContainer';
import { toast } from '@/components/ui/use-toast';

export default function Home() {
    
    return (
        <div className='h-full'>
            <Header/>
            
            <section className="flex flex-col justify-center align-middle h-full">
                
                <ImageContainer/>
                <Prompt/>
            
            </section>
        </div>
    );
}
