'use client';
import { Settings, Sparkles } from 'lucide-react';
import { AutosizeTextarea, AutosizeTextAreaRef } from '@/components/AutoResizeTextarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

export default function PromptInput() {
    const router = useRouter();
    const promptText = useRef<AutosizeTextAreaRef | null>(null);
    
    // Go to /playground when button is clicked and all fields are populated
    function goToPlayground() {
        if (!promptText.current?.textArea.value) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter a prompt',
            });
            return;
        }
        router.push(`/playground?text=${promptText.current.textArea.value}&start=true`);
    }
    
    return (
        <div
            className="flex flex-col items-center gap-4 w-full justify-center mx-auto max-w-[50rem] rounded-lg bg-secondary animate-glow p-2">
            <AutosizeTextarea
                className="bg-secondary border-none resize-none rounded-md outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                maxHeight={200}
                placeholder={'Generate an image'}
                ref={promptText}
            />
            <div className='flex justify-between w-full'>
                <Button variant='outline' size='icon' className="[&_svg]:size-6">
                    <Settings />
                </Button>
                <Button size='icon' className="[&_svg]:size-6" onClick={goToPlayground}>
                    <Sparkles />
                </Button>
            </div>
        </div>
    );
}

