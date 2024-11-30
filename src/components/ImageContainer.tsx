'use client';
import IconPlayer from "@/components/IconPlayer";
import {statusAtom} from "@/components/HomePagePrompt";
import {useAtom} from "jotai/index";
import CenterLogo from "@/components/CenterLogo";
import {useEffect, useRef, useState} from "react";

export default function ImageContainer(){
	const [status, setStatus] = useAtom(statusAtom);
	const logoRef = useRef<HTMLImageElement | null>(null);
	const [logoGone, setLogoGone] = useState(false);

	useEffect(() => {
		const logo = logoRef.current;
		if (!logo) return;

		const handleAnimationEnd = () => {
			if (status.status === "generating") {
				logo.style.display = 'none';
				setLogoGone(true);
			}
		};

		logo.addEventListener('animationend', handleAnimationEnd);
		return () => {
			logo.removeEventListener('animationend', handleAnimationEnd);
		};
	}, [status]);

	return (
		<div>
			{/*display logo before generating*/}
			<CenterLogo ref={logoRef}/>
			<div
				className={`mx-auto p-10 text-center text-xl border-4 border-primary rounded-2xl shadow-red-glow aspect-square max-w-[40rem] ${logoGone ? 'block': 'hidden'} animate-fadeIn`
			}>
				<IconPlayer className="size-full"/>
				<p>Generating image...</p>
			</div>
		</div>
	)
}