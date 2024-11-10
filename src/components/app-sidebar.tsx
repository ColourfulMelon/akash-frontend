'use client';
import { useState } from 'react';
import { ImageDialog } from './ImageDialog';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar";
import placeholder from "@/assets/images/image-placeholder.png";
import Image, {StaticImageData} from "next/image";

const items = Array.from({ length: 10 }, (_, i) => i);

export function AppSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

    function openDialog(imageSrc: StaticImageData) {
        setSelectedImage(imageSrc);
        setIsOpen(true);
    }

    function closeDialog() {
        setIsOpen(false);
        setSelectedImage(null);
    }

    return (
        <>
            <Sidebar side="right" variant="inset">
                <SidebarHeader>
                    <h2 className="text-2xl font-semibold">Generated Images</h2>
                </SidebarHeader>
                <SidebarContent>
                    {items.map((item, index) => (
                        <Image
                            key={index}
                            src={placeholder}
                            alt=""
                            onClick={() => openDialog(placeholder)}
                            className="cursor-pointer"
                        />
                    ))}
                </SidebarContent>
            </Sidebar>
            <ImageDialog isOpen={isOpen} closeDialog={closeDialog} imageSrc={selectedImage} />
        </>
    );
}