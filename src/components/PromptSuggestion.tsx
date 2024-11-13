import {ArrowUpRight} from "lucide-react";

export default function PromptSuggestion({prompt}: {prompt: string}){
    return(
        <div className="flex rounded-2xl bg-secondary p-1 px-3 cursor-pointer">
            <p className="font-light">{prompt}</p>
            <ArrowUpRight className="my-auto ml-2" size={17}/>
        </div>
    )
}