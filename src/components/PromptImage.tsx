import Image from 'next/image';
import { Layout, PromptResult } from '@/lib/zodSchemas';
import { Copy, Download, ImageIcon, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PromptSettingsCard } from '@/components/PromptSettingsCard';
import { PromptProgressBar } from '@/components/PromptProgressBar';
import { toast } from '@/components/ui/use-toast';
import FileSaver from 'file-saver';

const convertFilenameToUrl = (filename: string) => {
    return `${process.env.NEXT_PUBLIC_IMAGE_CDN}/akash-alchemist/${filename}`;
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
    
    async function copyImg(src: string) {
        const img = await fetch(src);
        const imgBlob = await img.blob();
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [imgBlob.type]: imgBlob,
                }),
            ]);
            toast({
                title: 'Copied',
                description: 'Image copied to clipboard',
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    async function downloadImg(src: string) {
        FileSaver.saveAs(src, 'prompt.png');
    }
    
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
                    <div className="flex gap-2">
                        <Popover>
                            <PopoverTrigger>
                                <Info className="w-6 h-6 "/>
                            </PopoverTrigger>
                            <PopoverContent className="lg:w-96">
                                <PromptSettingsCard
                                    text={text}
                                    workflow={workflow}
                                    layout={layout}
                                    seed={seed}
                                    enhancedText={enhancedText}
                                />
                            </PopoverContent>
                        </Popover>
                        <Copy className="w-6 h-6 cursor-pointer" onClick={() => copyImg(imgURL)}/>
                        <Download className="w-6 h-6 cursor-pointer" onClick={() => downloadImg(imgURL)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PromptPendingImage({ promptResult }: { promptResult: PromptResult }) {
    return (
        <div className="flex">
            <div className="relative">
                <div>
                    <div className="relative w-[640px] h-[640px] top-0 left-0 max-w-screen-sm bg-secondary overflow-hidden
                        before:absolute before:w-[1280px] before:h-[1280px]
                        before:bg-[radial-gradient(hsl(var(--primary)),transparent,transparent)]
                        before:animate-[loader-border_1.5s_linear_infinite]
                        after:absolute after:inset-[2px] after:bg-secondary"
                    />
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-48 h-48">
                    <div className="flex flex-col gap-4">
                        <ImageIcon className="w-48 h-48"/>
                        <PromptProgressBar progress={promptResult.progress ?? 0}
                                           message={promptResult.statusMessage ?? 'In queue'}/>
                    </div>
                </div>
                
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