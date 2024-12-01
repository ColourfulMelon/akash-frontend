'use client';
import {PromptHistorySheet} from "@/components/PromptHistorySheet";
import {useSidebar} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

export default function Header(){
	const { setOpenMobile } = useSidebar();

	return (
		<header className='flex justify-between items-center w-full py-4 px-8 md:justify-end'>
			{/*mobile sidebar toggle*/}
			<Button className="block md:hidden" onClick={()=>setOpenMobile(true)}><Menu /></Button>

			<PromptHistorySheet/>
		</header>)
}