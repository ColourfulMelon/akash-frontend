import Image from "next/image";
import placeholder from "@/assets/image-placeholder.png";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">

            <Header/>
            <div className="grid grid-cols-2 gap-4 w-full">
                <Prompt/>

                <Image className="aspect-square my-auto mx-auto w-auto border-4 border-slate-950 rounded-2xl" src={placeholder} alt="placeholder"/>
            </div>

        </main>
    );
}
