import Image from "next/image";
import placeholder from "@/assets/image-placeholder.png";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import {Button} from "@/components/ui/button";
import how3 from "@/assets/how3.png"
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center">

            <Header/>
            <section className="grid grid-cols-2 gap-4 w-full mt-[-6rem]">
                <Prompt/>


                <div className="border-4 border-primary my-auto mx-auto w-auto rounded-2xl">
                    <Image className="aspect-square filter-red"
                           src={placeholder} alt="placeholder"/>
                </div>
            </section>


            <section className="bg-white w-full text-slate-900 text-center">
                <svg viewBox="0 0 1440 58" fill="none" width="100%">
                    <path
                        d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
                        fill="#150002"></path>
                </svg>

                <div className="max-w-screen-2xl mx-auto">
                    <h2 className="text-6xl mt-10 font-semibold mb-10">How does it work?</h2>

                    <div className="flex">
                        <p className="text-2xl flex-1 my-auto">With Akash Alchemist, Image Generation is as simple as possible. All you need to do is write your
                            prompt and hit the generate button. We make use of AI to optimise your prompt, select the best model
                            for your desired theme and adjust model parameters to give you the best possible image.
                        </p>
                        <div className="flex-1">
                            <Image src={how3} alt=""/>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </main>
    );
}
