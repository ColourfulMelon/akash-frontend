'use client';
import {TypeAnimation} from "react-type-animation";
import {atom} from "jotai";
import PromptInput from "@/components/PromptInput";
import PromptSuggestion from "@/components/PromptSuggestion";
import {useAtom} from "jotai/index";

interface TStatus {
    // idle: before user clicks generate
    // typing: type animation started
    // generating: type animation ended and image is being generated
    // done: image is done generating
    status: 'idle' | 'typing' |'generating'| 'done';
    id: string | null;
    prompt: string;
}
export const statusAtom = atom<TStatus>({status: 'idle', id: null, prompt: ''});
export default function Prompt(){
    const [status, setStatus] = useAtom(statusAtom);

    return (
        <div className="flex flex-col items-center justify-center">

            <div className={`${status.status !== "idle" ? 'animate-fadeOut' : ''}`}>
                <TypeAnimation
                    className={`mb-2`}
                    sequence={[
                        'What are we creating today?',
                    ]}
                    wrapper="span"
                    speed={40}
                    style={{ fontSize: '1.75rem', fontWeight: "bold", display: 'inline-block' }}
                    repeat={1}
                />
            </div>

            <PromptInput/>

            <div className="flex gap-4 mt-2">
                <PromptSuggestion prompt="A cat with wings"/>
                <PromptSuggestion prompt="A robot in a forest"/>
                <PromptSuggestion prompt="A city on the moon"/>
            </div>

        </div>
    )
}