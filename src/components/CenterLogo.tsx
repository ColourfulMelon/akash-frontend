'use client';

import Image from "next/image";
import logoText from "@/assets/images/logoText.svg";
import {useAtom} from "jotai/index";
import {statusAtom} from "@/components/Prompt";

export default function CenterLogo({ref}: {ref: React.RefObject<HTMLImageElement>}){
	const [status, setStatus] = useAtom(statusAtom);

	return (
		<Image ref={ref} className={`mx-auto mb-40 ${status.status === "generating" ? 'animate-fadeOut': ''}`} src={logoText} alt="Alchemist logo"/>
	)
}