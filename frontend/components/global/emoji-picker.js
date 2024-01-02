'use client'
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


const EmojiPicker = ({ children, getValue }) => {
    const router = useRouter();
    const Picker = dynamic(() => import("emoji-picker-react"));

    const handleEmojiClick = (emoji) => {
        if (getValue) {
            getValue(emoji.emoji);
        }
    }
    return (
        <div className="flex items-center">
            <Popover>
                <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
                <PopoverContent className="p-0 border-none">
            <Picker
                onEmojiClick={handleEmojiClick}
                />
                </PopoverContent>
            </Popover>
        </div>
    )
};

export default EmojiPicker;
