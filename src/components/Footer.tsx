import Image from "next/image";
import akash from "@/assets/images/akash.svg"
import {Github, Heart} from "lucide-react";
import {Separator} from "@/components/ui/separator";

export default function  Footer() {
    return(
        <section className='flex flex-col align-middle text-white w-full pb-4 text-center absolute bottom-0'>

            <div className='flex justify-center mb-4'>
                <Image src={akash} alt=""/>
            </div>

            <div className="flex mx-auto gap-4 mb-2">
                <a href="" target="_blank" className="underline">Docs</a>
                <Separator orientation="vertical"/>
                <div className="flex">
                    <Github/>
                    <a href="https://github.com/Dev3-Studio/akash-frontend" target="_blank" className="underline">Source Code</a>
                </div>
                <Separator orientation="vertical"/>
                <p>Built with <Heart color="red" className="inline"/> by <a href="https://dev3.studio"
                                                                            className="underline" target="_blank">Dev3
                    Studio</a></p>
            </div>

            <p>Animated Icon by <a target="_blank" className="underline" href="https://lordicon.com/">Lordicon.com</a></p>

        </section>
    );
}