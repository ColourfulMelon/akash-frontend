'use client';
import {TypeAnimation} from "react-type-animation";
import {atom} from "jotai";
import PromptInput from "@/components/PromptInput";
import PromptSuggestion from "@/components/PromptSuggestion";

interface TStatus {
    status: 'idle' | 'generating';
    id: string | null;
}
export const statusAtom = atom<TStatus>({status: 'idle', id: null});
export default function Prompt(){


    return (
        <div className="flex flex-col items-center justify-center">

            <TypeAnimation
                className="mb-2"
                sequence={[
                    'What are we creating today?',
                ]}
                wrapper="span"
                speed={40}
                style={{ fontSize: '1.75rem', fontWeight: "bold", display: 'inline-block' }}
                repeat={1}
            />

            <PromptInput/>

            <div className="flex gap-4 mt-2">
                <PromptSuggestion prompt="A cat with wings"/>
                <PromptSuggestion prompt="A robot in a forest"/>
                <PromptSuggestion prompt="A city on the moon"/>
            </div>

        </div>
    )
}