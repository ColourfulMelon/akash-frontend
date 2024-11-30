import Image from 'next/image';
import { PromptResult } from '@/lib/zodSchemas';
import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PromptSettingsCard } from '@/components/PromptSettingsCard';

export default function PromptImage({ promptResult }: { promptResult: PromptResult }) {
	const imgURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/outputs/${promptResult.outputFilename}`;
	const DIMENSIONS = {
		landscape: { width: 1216, height: 832 },
		portrait: { width: 832, height: 1216 },
		square: { width: 1024, height: 1024 },
	};
	return (
		<div>
			<div className="relative">
				<Image
					className="rounded-md"
					src={imgURL}
					alt={promptResult.text}
					width={DIMENSIONS[promptResult.layout].width}
					height={DIMENSIONS[promptResult.layout].height}
				/>
				<div className="absolute bottom-0 right-0 p-4">
					<Popover>
						<PopoverTrigger>
							<Info className="w-6 h-6 "/>
						</PopoverTrigger>
						<PopoverContent>
							<PromptSettingsCard prompt={promptResult}/>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}