import Image from "next/image";
import {PromptResult} from "@/lib/zodSchemas";

export default function R2Image({file}: { file: PromptResult }) {
	const imgURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/outputs/${file.outputFilename}`;

	return (
		<div>
			<Image src={imgURL}
			       alt={file.text}
			       width={832}
			       height={1216}
			/>
		</div>
	);
}