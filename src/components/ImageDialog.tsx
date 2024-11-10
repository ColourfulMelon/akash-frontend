import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog'
import Image, {StaticImageData} from 'next/image';

export function ImageDialog({ isOpen, closeDialog, imageSrc }: { isOpen: boolean; closeDialog: () => void; imageSrc: StaticImageData | null }) {
    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            {imageSrc && <DialogContent>
                <Image src={imageSrc} alt="Image"/>
                <DialogClose asChild>
                    <button
                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Close
                    </button>
                </DialogClose>
            </DialogContent>}
        </Dialog>
    );
}