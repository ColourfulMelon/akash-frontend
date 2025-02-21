import { Progress } from '@/components/ui/progress';

export function PromptProgressBar({ progress, message }: { progress: number, message: string }) {
    const percent = Math.floor(progress * 100);
    return (
        <div className="flex flex-col gap-2 w-full">
            <Progress value={percent}/>
            <div className="text-sm">{message} ({percent}%)</div>
        </div>
    );
}