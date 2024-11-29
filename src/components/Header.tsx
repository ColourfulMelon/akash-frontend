"use client";
import { PromptHistorySheet } from '@/components/PromptHistorySheet';

export default function Header(){
    return (
        <header className="w-full z-10">
            <button className='cursor-pointer absolute right-5 top-5'>
                <PromptHistorySheet />
            </button>
        </header>
    )
}