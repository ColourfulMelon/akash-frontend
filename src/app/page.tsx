import Image from "next/image";
import placeholder from "@/assets/image-placeholder.png";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import {Button} from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center">

            <Header/>
            <div className="grid grid-cols-2 gap-4 w-full">
                <Prompt/>


                <div className="border-4 border-primary my-auto mx-auto w-auto rounded-2xl">
                    <Image className="aspect-square filter-red"
                           src={placeholder} alt="placeholder"/>
                </div>
            </div>


            <div className="bg-white w-full text-slate-900 text-center">
                <svg viewBox="0 0 1440 58" fill="none" width="100%">
                    <path
                        d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
                        fill="#150002"></path>
                </svg>

                <h2 className="text-6xl mt-10 font-semibold">How does it work?</h2>

                {/*<p>With Akash Alchemist, */}
            </div>

        </main>
    );
}
