'use client';
import {Textarea} from "@/components/ui/textarea";
import {Settings, Sparkles} from "lucide-react";
import {useAtom} from "jotai/index";
import {useToast} from "@/components/ui/use-toast";
import promptImage from "@/actions/promptImage";
import {statusAtom} from "@/components/Prompt";
import {useEffect, useRef, useState} from "react";
import AdvancedOptions from "@/components/AdvancedOptions";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";

export default function PromptInput(){
    const [status, setStatus] = useAtom(statusAtom);
    const { toast } = useToast();
    const [optionsOpen, setOptionsOpen] = useState(false);


    async function generateImage(){
        // get prompt from textarea
        const prompt = document.querySelector('textarea')?.value;
        if (!prompt) return toast({variant: 'destructive', title: 'Error', description: 'Please enter a prompt'});
        const id = await promptImage(prompt);
        setStatus({status: 'generating', id: id});
    }

    return(
        <div className="gap-4 w-full justify-center mx-20 max-w-[50rem] rounded-[4rem] bg-secondary animate-glow px-4 py-2">
            <div className="flex items-center">
            <Settings className="cursor-pointer mr-3" size={45} onClick={()=>setOptionsOpen(!optionsOpen)}/>
            {/*<Textarea ref={ref} placeholder="Type your prompt here" className="text-xl border-none !ring-0 text-white placeholder:text-white font-light h-10 -mb-3 resize-none overflow-hidden"/>*/}
                <AutoResizeTextarea />
            <div className="rounded-full bg-primary p-2 ml-3">
                <Sparkles className="cursor-pointer stroke-white" size={40} onClick={generateImage}/>
            </div>
            </div>
            {optionsOpen && <AdvancedOptions/>}
        </div>
    )
}