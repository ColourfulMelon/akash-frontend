'use client';
import {ArrowUpRight} from "lucide-react";
import {ReactDOM, useEffect} from "react";
import {useAtom, useAtomValue} from "jotai/index";
import {statusAtom} from "@/components/Prompt";
import {TARef} from "@/components/PromptCreateCard";

export default function PromptSuggestion({prompt}: {prompt: string}){

    const [status, setStatus] = useAtom(statusAtom);
    const textArea = useAtomValue(TARef);

    function setPrompt(){
        console.log(textArea);
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