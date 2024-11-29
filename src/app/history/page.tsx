'use client';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import getAllPromptResults from '@/actions/getAllPromptResults';
import { useClientId } from '@/hooks/use-client-id';

export default function History() {
    const clientId = useClientId();
    const promptResults = useQuery({
        queryKey: ['getAllPromptResults', { clientId }],
        queryFn: () => getAllPromptResults({ clientId }),
        refetchInterval: 3000,
        enabled: clientId !== null,
    });

    return (
        <div className="grid grid-rows-[minmax(0,max-content)_minmax(0,1fr)]">
            <div className="flex justify-between items-center w-full py-4 px-8">
                <div className="text-4xl">History</div>
                <Clock/>
            </div>
            <div className='w-full overflow-auto px-10'>
                <div className=''>
                    <div className='mx-auto flex justify-center gap-4'>
                        <div className="flex-1 flex flex-col gap-4">
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                            <div>
                                <div className="relative h-full overflow-hidden rounded-md">
                                    <Image src={'https://placehold.co/832x1216.png'} width={832} height={1216}
                                           alt={'placehold'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}