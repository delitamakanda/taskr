'use client'
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation";
import React from "react";

// todo popover component


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
            {children}
            <Picker
                onClick={handleEmojiClick}
                style={{
                    position: "absolute",
                    zIndex: 1000,
                    top: 0,
                    right: 0,
                }}
            />
        </div>
    )
};

export default EmojiPicker;
