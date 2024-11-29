import Image from "next/image";

export default function R2Image({fileName}: { fileName: string }) {
	const imgURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/outputs/${fileName}`

	return (
		<div>
			<Image src={imgURL}
			       alt={fileName}
			       width={832}
			       height={1216}
			/>
		</div>
	);
}