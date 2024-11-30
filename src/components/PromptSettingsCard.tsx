import { Card, CardContent } from '@/components/ui/card';
import { AutosizeTextarea } from '@/components/AutoResizeTextarea';
import { Badge } from '@/components/ui/badge';
import { Prompt } from '@/lib/zodSchemas';

export function PromptSettingsCard({ prompt }: { prompt: Prompt }) {
    return (
        <Card className="w-full">
            <CardContent className="flex flex-col gap-4 p-4">
                <div>
                    <div className="font-bold text-lg">Prompt</div>
                    <AutosizeTextarea
                        className="resize-none rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={prompt.text}
                    />
                </div>
                <div>
                    <div className="font-bold text-lg">Enhanced Prompt</div>
                    <AutosizeTextarea
                        className="resize-none rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={prompt.enhancedText ?? ''}
                    />
                </div>
                <div className="flex flex-wrap gap-2 w-full justify-evenly items-center mt-4">
                    <Badge className="space-x-1">
                        <p className="font-black">Workflow:</p>
                        <p>{
                            prompt.workflow.charAt(0).toUpperCase() +
                            prompt.workflow.slice(1)
                        }</p>
                    </Badge>
                    <Badge className="space-x-1">
                        <p className="font-black">Layout:</p>
                        <p>{
                            prompt.layout.charAt(0).toUpperCase() +
                            prompt.layout.slice(1)
                        }</p>
                    </Badge>
                    <Badge className="space-x-1">
                        <p className="font-black">Seed:</p>
                        <p>{prompt.seed}</p>
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}