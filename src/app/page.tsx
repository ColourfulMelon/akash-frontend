import Image from "next/image";
import placeholder from "@/assets/image-placeholder.png";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import how3 from "@/assets/how3.png"
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="items-center justify-center w-full">

            <div className="bg-gradient-to-b from-[#400002] to-background">
                <Header/>
                <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 mx-20 mt-[-5rem]">
                    <Prompt/>
                    <div className="hidden xl:block border-4 border-primary rounded-2xl ml-20 shadow-red-glow aspect-square my-auto max-h-[calc(100vh-30rem)]">
                        <Image className="filter-red w-full"
                               src={placeholder} alt="placeholder"/>
                    </div>
                </section>
            </div>


            <section className="bg-white w-full text-slate-900 text-center">
                <svg className="" viewBox="0 0 1440 58" fill="none" width="100%">
                    <path
                        d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
                        fill="#150002"></path>
                </svg>

                <div className="mx-auto max-w-screen-2xl px-20">

                    <h2 className="text-6xl mt-10 font-semibold mb-10">How does it work?</h2>

                    <div className="grid grid-cols-1 xl:grid-cols-2">
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
