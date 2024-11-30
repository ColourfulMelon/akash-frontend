'use client';
import {ArrowUpRight} from "lucide-react";
import {useEffect} from "react";
import {useAtom} from "jotai/index";
import {statusAtom} from "@/components/HomePagePrompt";

export default function PromptSuggestion({prompt}: {prompt: string}){

    const [status] = useAtom(statusAtom);

    let textArea: HTMLTextAreaElement | null = null;

    useEffect(() => {
        textArea = document.querySelector('textarea');
    }, []);

    function setPrompt(){
        if (!textArea) return;
        textArea.value = prompt
    }


    return(
        <div className={`flex rounded-2xl bg-secondary p-1 px-3 cursor-pointer ${status.status !== "idle" ? 'animate-fadeOut': ''}`} onClick={setPrompt}>
            <p className="font-light">{prompt}</p>
            <ArrowUpRight className="my-auto ml-2" size={17}/>
        </div>
    )
}