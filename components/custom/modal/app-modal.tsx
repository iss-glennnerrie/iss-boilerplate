"use client";

import React, { useRef } from "react";

import { X } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AppModalProps {
    button?: React.ReactNode;
    title: string;
    description?: string | null;
    children: React.ReactNode;
    open?: boolean;
    setOpen?: (openModal: boolean) => void;
    modalWidth?: string;
}

const AppModal: React.FC<AppModalProps> = ({ button, title, description, children, modalWidth, open, setOpen }) => {
    const { isMobile } = useSidebar();
    const modalRef = useRef<HTMLDivElement | null>(null);
    // const previousActiveElement = useRef<HTMLElement | null>(null);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
            <AlertDialogContent
                style={{ maxWidth: isMobile ? "100%" : modalWidth }}
                className="sm:max-w-125"
                ref={modalRef}
                tabIndex={-1}
                aria-hidden={!open}
            >
                <AlertDialogHeader>
                    <div className="flex w-full">
                        <div className="flex-col">
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                            {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
                        </div>
                        <div className="ml-auto">
                            <Button onClick={() => setOpen?.(false)} className="ml-auto hover:scale-120" size="sm" variant="ghost">
                                <X className="hover:scale-120" />
                            </Button>
                        </div>
                    </div>
                </AlertDialogHeader>
                <div className="max-h-[80vh] overflow-auto">

                {children}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppModal;
