'use client';
import {ArrowUpRight} from "lucide-react";
import {useAtom, useAtomValue} from "jotai/index";
import {statusAtom} from "@/components/HomePagePrompt";
import {TARef} from "@/components/PromptCreateCard";

export default function PromptSuggestion({prompt}: {prompt: string}){

    const status = useAtomValue(statusAtom);
    const textAreaRef = useAtomValue(TARef);

    function setPrompt(){
        console.log(textAreaRef);
        if (!textAreaRef) return;
        textAreaRef.textArea.value = prompt
    }


    return(
        <div className={`flex rounded-2xl bg-secondary p-1 px-3 cursor-pointer ${status.status !== "idle" ? 'animate-fadeOut': ''}`} onClick={setPrompt}>
            <p className="font-light">{prompt}</p>
            <ArrowUpRight className="my-auto ml-2" size={17}/>
        </div>
    )
}