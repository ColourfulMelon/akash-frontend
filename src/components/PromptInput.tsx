import {Textarea} from "@/components/ui/textarea";
import {Settings, Sparkles} from "lucide-react";
import {useAtom} from "jotai/index";
import {useToast} from "@/components/ui/use-toast";
import promptImage from "@/actions/promptImage";
import {statusAtom} from "@/components/Prompt";

export default function PromptInput(){
    const [status, setStatus] = useAtom(statusAtom);
    const { toast } = useToast();
    async function generateImage(){
        // get prompt from textarea
        const prompt = document.querySelector('textarea')?.value;
        if (!prompt) return toast({variant: 'destructive', title: 'Error', description: 'Please enter a prompt'});
        const id = await promptImage(prompt);
        setStatus({status: 'generating', id: id});
    }
    return(
        <div className="flex items-center gap-4 w-full justify-center mx-20 max-w-[50rem] rounded-[4rem] bg-secondary animate-glow px-4 py-2">
            <Settings className="cursor-pointer" size={45}/>
            <Textarea placeholder="Type your prompt here" className="text-xl h-10 border-none !ring-0 text-white placeholder:text-white font-light"/>

            <div className="rounded-full bg-primary p-2 ">
                <Sparkles className="cursor-pointer stroke-white " size={40} onClick={generateImage}/>
            </div>
        </div>
    )
}