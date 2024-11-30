import {Spinner} from "@/components/ui/Spinner";

export default function LoadingComponent(){
	return (
		<div className="justify-center items-center align-middle h-full flex w-full col-span-full">
			<div>
				<Spinner size={'large'}/>
				<div className="text-center text-white">Loading...</div>
			</div>
		</div>
	);
}