'use client';

import Image from "next/image";
import logoText from "@/assets/images/logoText.svg";
import {useAtom} from "jotai/index";
import {statusAtom} from "@/components/Prompt";

export default function CenterLogo(){
	const [status, setStatus] = useAtom(statusAtom);

	return (
		<Image className={`mx-auto mb-40 ${status.status !== "idle" ? 'animate-fadeOut': ''}`} src={logoText} alt="Alchemist logo"/>
	)
}