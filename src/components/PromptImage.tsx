import Image from 'next/image';
import { PromptResult } from '@/lib/zodSchemas';

export default function PromptImage({ promptResult }: { promptResult: PromptResult }) {
	const imgURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/outputs/${promptResult.outputFilename}`;
	const DIMENSIONS = {
		landscape: { width: 1216, height: 832 },
		portrait: { width: 832, height: 1216 },
		square: { width: 1024, height: 1024 },
	};
	return (
		<div>
			<Image src={imgURL}
			       alt={promptResult.text}
			       width={DIMENSIONS[promptResult.layout].width}
			       height={DIMENSIONS[promptResult.layout].height}
			/>
		</div>
	);
}