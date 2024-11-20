'use client';
import {Settings, Sparkles} from "lucide-react";
import {useAtom} from "jotai/index";
import {useToast} from "@/components/ui/use-toast";
import promptImage from "@/actions/promptImage";
import {statusAtom} from "@/components/Prompt";
import {useState} from "react";
import AdvancedOptions from "@/components/AdvancedOptions";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import getStatus from "@/actions/getStatus";

const blankRegex = /^\s*$/;
export default function PromptInput(){
    const [status, setStatus] = useAtom(statusAtom);
    const { toast } = useToast();
    const [optionsOpen, setOptionsOpen] = useState(false);
    let prompt: string = '';


    async function generateImage(){
        setStatus({status: 'typing', id: null, prompt: ''});
        // get prompt from textarea
        prompt = document.querySelector('textarea')?.value || '';
        if (!prompt || prompt.match(blankRegex)) return toast({variant: 'destructive', title: 'Error', description: 'Please enter a prompt'});
        const res = await promptImage({prompt, options: {optimisePrompt: true}});
        setStatus({status: 'typing', id: res.id, prompt: res.prompt});

        console.log(res.prompt);
    }

    async function updateStatus() {
        if (status.status === 'idle' || status.status === 'done') return;
        if (!status.id) return;
        try {
            setStatus(await getStatus(status.id));
        } catch (e) {}
    }

    // check status every 10 seconds
    // todo uncomment to test
    // setInterval(updateStatus, 10000);


    return(
        <div className="gap-4 w-full justify-center mx-20 max-w-[50rem] rounded-[4rem] bg-secondary animate-glow px-4 py-2">
            <div className="flex items-center">
                <Settings className="cursor-pointer mr-3" size={45} onClick={() => setOptionsOpen(!optionsOpen)}/>
                <AutoResizeTextarea/>

                <div className="rounded-full bg-primary p-2 ml-3">
                    <Sparkles className="cursor-pointer stroke-white" size={40} onClick={generateImage}/>
                </div>
            </div>
            {optionsOpen && <AdvancedOptions/>}
        </div>
    )
}

