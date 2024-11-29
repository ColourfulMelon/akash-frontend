import {Spinner} from "@/components/ui/Spinner";

export default function Loading(){
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-30 h-30 border-t-2 border-b-2 border-gray-900 rounded-full">
				<Spinner size={'large'}/>
				<div className="text-center text-white">Loading...</div>
			</div>
		</div>
	);
}