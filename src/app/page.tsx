import Prompt from '@/components/Prompt';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageContainer from '@/components/ImageContainer';

export default function Home() {
    return (
        <main className="items-center justify-center w-full ">
            
            <div className="bg-gradient-to-b from-[#400002] to-background h-full">
                <Header/>
                
                <section className="flex flex-col justify-center align-middle h-full">
                    
                    <ImageContainer/>
                    <Prompt/>
                
                </section>
                <Footer/>
            
            </div>
        
        
        </main>
    );
}
