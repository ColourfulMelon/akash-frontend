import {ArrowUpRight} from "lucide-react";
import {useEffect} from "react";

export default function PromptSuggestion({prompt}: {prompt: string}){

    let textArea: HTMLTextAreaElement | null = null;

    useEffect(() => {
        textArea = document.querySelector('textarea');
    }, []);

    function setPrompt(){
        if (!textArea) return;
        textArea.value = prompt
    }

    return(
        <div className="flex rounded-2xl bg-secondary p-1 px-3 cursor-pointer" onClick={setPrompt}>
            <p className="font-light">{prompt}</p>
            <ArrowUpRight className="my-auto ml-2" size={17}/>
        </div>
    )
}