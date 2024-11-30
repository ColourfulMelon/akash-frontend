'use client';
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";

export default function Custom404() {
	const router = useRouter();
	return (
		<div className="w-full h-full flex items-center justify-center text-center text-2xl">
			<div>
				<div className="mb-4">
					<h1 className="inline text-3xl">404</h1>
					<Separator orientation="vertical" className="border mx-2 border-white inline"/>
					<h1 className="inline">Page Not Found</h1>
				</div>
				<Button onClick={() => router.push('/')}>Return Home</Button>
			</div>

		</div>
	)
}