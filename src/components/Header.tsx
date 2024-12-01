'use client';
import {PromptHistorySheet} from "@/components/PromptHistorySheet";
import {useSidebar} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

export default function Header(){
	const { toggleSidebar } = useSidebar();

	return (
		<header className='flex justify-between items-center w-full py-4 px-4 md:px-8'>
			{/*mobile sidebar toggle*/}
			<Button className="" onClick={toggleSidebar}><Menu /></Button>

			<PromptHistorySheet/>
		</header>)
}