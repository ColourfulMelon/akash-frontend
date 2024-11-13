import Image from "next/image";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoText from "@/assets/images/logoText.svg";

export default function Home() {
    return (
        <main className="items-center justify-center w-full ">

            <div className="bg-gradient-to-b from-[#400002] to-background h-full">
                <Header/>

                <section className="flex flex-col justify-center align-middle h-full">
                    <Image className="mx-auto mb-40" src={logoText} alt="Alchemist logo"/>

                    <Prompt/>
                    {/*<div className="hidden xl:block border-4 border-primary rounded-2xl ml-20 shadow-red-glow aspect-square my-auto max-h-[calc(100vh-30rem)] overflow-hidden">*/}
                    {/*    <IconPlayer className="size-full"/>*/}
                    {/*</div>*/}
                </section>
                <Footer/>

            </div>


        </main>
    );
}
