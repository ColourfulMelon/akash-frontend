'use client';
import IconPlayer from "@/components/IconPlayer";
import {statusAtom} from "@/components/Prompt";
import {useAtom} from "jotai/index";

export default function ImageContainer(){
	const [status, setStatus] = useAtom(statusAtom);

	return (
		<div
			className={`mx-auto p-10 text-center text-xl border-4 border-primary rounded-2xl shadow-red-glow aspect-square max-w-[40rem] ${status.status === 'generating' ? 'block': 'hidden'}`}>
			<IconPlayer className="size-full"/>
			<p>Generating image...</p>
		</div>
	)
}