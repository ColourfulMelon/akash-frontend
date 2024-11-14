import React, { useRef, useState, useEffect } from 'react';
import {Textarea} from "@/components/ui/textarea";

function AutoResizeTextarea() {
    const textareaRef = useRef(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        const textarea = textareaRef.current;
        // @ts-ignore
        textarea.style.height = "auto"; // Reset height to auto to shrink if needed
        // @ts-ignore
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }, [value]);
    // @ts-ignore
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            className="w-full text-xl border-none !ring-0 text-white placeholder:text-white font-light resize-none overflow-hidden !h-[28px] !min-h-[28px] p-0"
            placeholder="Type your prompt here"
        />
    );
}

export default AutoResizeTextarea;
