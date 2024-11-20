'use client';
import React, {useEffect, useRef, useState} from 'react';
import {Textarea} from "@/components/ui/textarea";
import {useAtom} from "jotai/index";
import {statusAtom} from "@/components/Prompt";
import Typed from "typed.js";

function AutoResizeTextarea() {
    const [status, setStatus] = useAtom(statusAtom);

    const calculateContentHeight = function( ta: HTMLTextAreaElement, scanAmount: number ) {
        let height = ta.offsetHeight;
        const origHeight = ta.style.height,
            scrollHeight = ta.scrollHeight,
            overflow = ta.style.overflow;
        /// only bother if the ta is bigger than content
        if ( height >= scrollHeight ) {
            /// check that our browser supports changing dimension
            /// calculations mid-way through a function call...
            ta.style.height = (height + scanAmount) + 'px';
            /// because the scrollbar can cause calculation problems
            ta.style.overflow = 'hidden';
            /// by checking that scrollHeight has updated
            if ( scrollHeight < ta.scrollHeight ) {
                /// now try and scan the ta's height downwards
                /// until scrollHeight becomes larger than height
                ta.style.height = ta.scrollHeight + 'px';

                /// reset the ta back to its original height
                ta.style.height = origHeight;
                /// put the overflow back
                ta.style.overflow = overflow;
                return height;
            }
        } else {
            return scrollHeight;
        }
    }

    const calculateHeight = function(ta: HTMLTextAreaElement) {
        // @ts-ignore
        const style = (window.getComputedStyle) ? window.getComputedStyle(ta) : ta.currentStyle;

        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        const taLineHeight = parseInt(style.lineHeight, 10);
        // Get the scroll height of the textarea

        const taHeight = calculateContentHeight(ta, taLineHeight);
        if (!taHeight) return;
        // calculate the number of lines
        return Math.ceil(taHeight / taLineHeight);
    };

    const textareaRef = useRef(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        const textarea = textareaRef.current;

        // @ts-ignore
        textarea.style.height = 'auto';
        // @ts-ignore
        const numLines = calculateHeight(textarea);

        // set height of textarea based on number of lines
        // @ts-ignore
        const style = (window.getComputedStyle) ? window.getComputedStyle(textarea) : textarea.currentStyle;
        const taLineHeight = parseInt(style.lineHeight, 10);
        // @ts-ignore
        textarea.style.height = `${numLines * taLineHeight}px`;
    }, [value]);

    useEffect(() => {
        console.log(status);
        if (status.status === 'generating'){
            typeWriter();
        }
    }, [status]);

    let i = 0;
    const [switchTyper, setSwitchTyper] = useState(false);

    async function typeWriter() {
        if (i <= value.length) {
            setValue(value.slice(0, value.length - i));
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setSwitchTyper(true);
            await new Promise(r => setTimeout(r, 1000));
            // start type animation
            const x = new Typed("#test", {
                    strings: [status.prompt],
                    typeSpeed: 50,
                    backSpeed: 50,
                }
            );

        }
    }


    // @ts-ignore
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="w-full text-white placeholder:text-white font-light text-xl">
            {!switchTyper && <Textarea
                rows={1}
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                className="w-full border-none !ring-0 resize-none scrollbar-hidden overflow-y-scroll p-0 max-h-40 text-white placeholder:text-white font-light text-xl"
                placeholder="Type your prompt here"
            />}

            {switchTyper && <span id="test"/>}
        </div>
    );
}

export default AutoResizeTextarea;
