import Image from 'next/image';
import { Github, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function Footer({ className }: { className?: string }) {
    return (
        <section className={cn("flex flex-col align-middle text-white w-full p-4 text-center", className)}>

            {/*<div className='flex justify-center mb-4'>*/}
            {/*    <Image src='/images/akash-powered.svg' alt="akash" width={134} height={52}/>*/}
            {/*</div>*/}

            <div className="flex mx-auto gap-2 text-sm sm:text-base">
                <div className="flex">
                    <Github/>
                    <a href="https://github.com/Dev3-Studio/Akash-Alchemist" target="_blank" className="underline">
                        Source Code
                    </a>
                </div>
                <Separator orientation="vertical" className='bg-primary-foreground'/>
                <p>
                    Built with <Heart color="red" className="inline"/> by
                    <a href="https://dev3.studio" className="underline" target="_blank">Dev3 Studio</a>
                </p>
            </div>

            {/*<p>Animated Icon by <a target="_blank" className="underline" href="https://lordicon.com/">Lordicon.com</a></p>*/}

        </section>
    );
}