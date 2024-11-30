import { Card, CardContent } from '@/components/ui/card';
import { AutosizeTextarea } from '@/components/AutoResizeTextarea';
import { Badge } from '@/components/ui/badge';

export function PromptSettingsCard({
    text,
    enhancedText,
    workflow,
    layout,
    seed,
}: {
    text: string;
    enhancedText?: string;
    workflow: string;
    layout: string;
    seed: number;
}) {
    return (
        <Card className="w-full">
            <CardContent className="flex flex-col gap-4 p-4">
                <div>
                    <div className="font-bold text-lg">Prompt</div>
                    <AutosizeTextarea
                        className="resize-none rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={text}
                        readOnly={true}
                    />
                </div>
                feat: {enhancedText && <div>
                    <div className="font-bold text-lg">Enhanced Prompt</div>
                    <AutosizeTextarea
                        className="resize-none rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={enhancedText}
                        readOnly={true}
                    />
            </div>}
                <div className="flex flex-wrap gap-2 w-full justify-evenly items-center">
                    <Badge className="space-x-1">
                        <p className="font-black">Workflow:</p>
                        <p>{
                            workflow.charAt(0).toUpperCase() +
                            workflow.slice(1)
                        }</p>
                    </Badge>
                    <Badge className="space-x-1">
                        <p className="font-black">Layout:</p>
                        <p>{
                            layout.charAt(0).toUpperCase() +
                            layout.slice(1)
                        }</p>
                    </Badge>
                    <Badge className="space-x-1">
                        <p className="font-black">Seed:</p>
                        <p>{seed}</p>
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}