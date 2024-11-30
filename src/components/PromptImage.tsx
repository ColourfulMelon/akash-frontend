import Image from 'next/image';
import { Layout, PromptResult } from '@/lib/zodSchemas';
import { ImageIcon, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PromptSettingsCard } from '@/components/PromptSettingsCard';

const convertFilenameToUrl = (filename: string) => {
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/outputs/${filename}`;
};

function PromptCompletedImage({
    filename,
    alt,
    text,
    layout,
    seed,
    workflow,
    enhancedText,
}: {
    filename: string;
    alt: string;
    text: string;
    layout: Layout;
    seed: number;
    workflow: string;
    enhancedText: string | undefined;
}) {
    const imgURL = convertFilenameToUrl(filename);
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
                    alt={alt}
                    width={DIMENSIONS[layout].width}
                    height={DIMENSIONS[layout].height}
                />
                <div className="absolute bottom-0 right-0 p-4">
                    <Popover>
                        <PopoverTrigger>
                            <Info className="w-6 h-6 "/>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PromptSettingsCard
                                text={text}
                                workflow={workflow}
                                layout={layout}
                                seed={seed}
                                enhancedText={enhancedText}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

function PromptPendingImage({ promptResult }: { promptResult: PromptResult }) {
    const DIMENSIONS = {
        landscape: { width: 1216, height: 832 },
        portrait: { width: 832, height: 1216 },
        square: { width: 1024, height: 1024 },
    };
    return (
        <div className="flex">
            <div className="relative w-[640px] h-[640px] max-w-screen-sm bg-secondary overflow-hidden
                before:absolute before:w-[1280px] before:h-[1280px]
                before:bg-[radial-gradient(hsl(var(--primary)),transparent,transparent)]
                before:animate-[loader-border_1.5s_linear_infinite]
                after:absolute after:inset-[2px] after:bg-secondary"
            >
                <ImageIcon className="w-96 h-96"/>
            </div>
        </div>
    );
}

export default function PromptImage({ promptResult }: { promptResult: PromptResult }) {
    if (promptResult.outputFilename) {
        return <PromptCompletedImage
            filename={promptResult.outputFilename}
            alt={promptResult.text}
            text={promptResult.text}
            layout={promptResult.layout}
            seed={promptResult.seed}
            workflow={promptResult.workflow}
            enhancedText={promptResult.enhancedText ?? undefined}
        />;
    }
    return <PromptPendingImage promptResult={promptResult}/>;
}