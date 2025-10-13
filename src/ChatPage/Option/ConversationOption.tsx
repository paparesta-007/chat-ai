import React, {useEffect} from 'react';
import ButtonLabel from "../../Components/ButtonLabel.js";
import {Trash2, Star, Copy, Search, Share} from "lucide-react";
import {useRef, useState,} from "react";
import Kbd from "../../Components/Kbd";
import {Command, SquarePen, WandSparkles} from "lucide-react";

interface ConversationOptionProps {
    isConversationOptionsOpen: boolean;
}

interface ButtonOption {
    type: string;
    Icon: React.ReactNode;
    text: string;
    Kbd: string;
    onClick?: () => void; // opzionale
}


const ConversationOption: React.FC<ConversationOptionProps> = ({isConversationOptionsOpen}) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const buttons1: ButtonOption[] = [
        {
            type: "primary",
            Icon: <Star className="w-4 h-4"/>,
            text: "Favourite",
            Kbd: "Ctrl + F",
            onClick: () => console.log("Favourite")
        },
        {
            type: "primary",
            Icon: <Copy className="w-4 h-4"/>,
            text: "Duplicate",
            Kbd: "Ctrl + D",
            onClick: () => console.log("Duplicate")
        },
        {
            type: "primary",
            Icon: <Share className="w-4 h-4"/>,
            text: "Share",
            Kbd: "Ctrl + P",
            onClick: () => console.log("Share")
        },
    ];

    const buttons2: ButtonOption[] = [
        {
            type: "primary",
            Icon: <SquarePen className="w-4 h-4"/>,
            text: "Edit",
            Kbd: "Ctrl + C",
            onClick: () => console.log("Edit")
        },
        {
            type: "primary",
            Icon: <WandSparkles className="w-4 h-4"/>,
            text: "Draft ideas",
            Kbd: "Ctrl + \\",
            onClick: () => console.log("Draft ideas")
        },
        {
            type: "danger",
            Icon: <Trash2 className="w-4 h-4"/>,
            text: "Delete",
            Kbd: "Ctrl + canc",
            onClick: () => console.log("Delete")
        },
    ];


    useEffect(() => {

        const handleShortcuts = (event: KeyboardEvent): void => {

            if(event.ctrlKey && event.key === "f") {
                event.preventDefault();
            }
            if(event.ctrlKey && event.key === "d") {
                event.preventDefault();
            }
            if(event.ctrlKey && event.key === "p") {
                event.preventDefault();
            }
            if(event.ctrlKey && event.key === "c") {
                event.preventDefault();
            }

            if(event.ctrlKey && event.key === "canc") {
                event.preventDefault();
            }

        };

        window.addEventListener("keydown", handleShortcuts);

        return () => {
            window.removeEventListener("keydown", handleShortcuts);

        };
    }, []);

    const baseStyle = "absolute top-10 z-[9999] bg-[var(--background-Primary)] dark:bg-[var(--background-Secondary)] right-4 flex flex-col p-2 shadow-lg rounded-lg border border-[var(--border-secondary)]"
    const animationStyle = isConversationOptionsOpen ? "animate-slideDown" : "animate-slideUp"
    const handleSearch = () => {
        if (searchRef.current) {
            searchRef.current.focus();
        }

    };
    return (
        <div
            className={`${baseStyle} ${animationStyle}`}>
            <div
                className="flex items-center  gap-2 m-2 group p-1 rounded-lg border border-[var(--border-secondary)]"
                onClick={handleSearch}>
                <Search className="w-4 h-4"/>
                <input type="text" placeholder="Search action"
                       ref={searchRef}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full  group-hover:border-[var(--color-primary)] outline-none"/>
            </div>
            {buttons1.filter((button) => button.text.toLowerCase().includes(searchQuery.toLowerCase())).map((button, index) => (
                <ButtonLabel key={index} type={button.type} Icon={button.Icon} onClick={button.onClick}
                             text={button.text} Kbd={<Kbd text={button.Kbd}/>}/>
            ))}
            <hr className="border-[var(--border-secondary)] m-2"/>
            {buttons2.filter((button) => button.text.toLowerCase().includes(searchQuery.toLowerCase())).map((button, index) => (
                <ButtonLabel key={index} type={button.type} Icon={button.Icon} onClick={button.onClick}
                             text={button.text} Kbd={<Kbd text={button.Kbd}/>}/>
            ))}
            <hr className="border-[var(--border-secondary)] m-2"/>

        </div>
    );
};

export default ConversationOption;
