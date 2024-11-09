'use client';
import {Textarea} from "@/components/ui/textarea";
import {Sparkle, Sparkles} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import AdvancedOptions from "@/components/AdvancedOptions";

export default function Prompt(){

    async function generateImage(){

    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Prompt</h1>

            <div className="flex items-center gap-4 w-full justify-center">
                <Textarea placeholder="Enter your prompt here" className="max-w-[50%]"/>


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