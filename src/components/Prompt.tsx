'use client';
import {Textarea} from "@/components/ui/textarea";
import {Sparkles} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import AdvancedOptions from "@/components/AdvancedOptions";
import {TypeAnimation} from "react-type-animation";

export default function Prompt(){

    async function generateImage(){

    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <TypeAnimation
                className="mb-4"
                sequence={[
                    'Prompt',
                ]}
                wrapper="span"
                speed={5}
                style={{ fontSize: '2.5rem', fontWeight: "bold", display: 'inline-block' }}
                repeat={1}
            />

            <div className="flex items-center gap-4 w-full justify-center mx-20 max-w-[50rem]">
                <Textarea placeholder="Enter your prompt here" className="h-20 text-xl animate-glow"/>

                <Sparkles className="cursor-pointer stroke-primary" size={50} onClick={generateImage}/>
            </div>

            <Accordion  type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gray-500">Advanced Options</AccordionTrigger>
                    <AccordionContent className="w-full">
                        <AdvancedOptions/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}