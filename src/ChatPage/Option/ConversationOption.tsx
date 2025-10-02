import React from 'react';
import ButtonLabel from "../../Components/ButtonLabel.js";
import {Trash2, Star, Copy, Search, Share} from "lucide-react";
import {useRef, useState} from "react";
import Kbd from "../../Components/Kbd";
import {Command,SquarePen,WandSparkles} from "lucide-react";

interface ConversationOptionProps {
    isConversationOptionsOpen: boolean;
}

const ConversationOption: React.FC<ConversationOptionProps> = ({isConversationOptionsOpen}) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const buttons1=[
        {type:"primary",Icon:<Star className="w-4 h-4"/>,text:"Favourite",Kbd:"Ctrl + F"},
        {type:"primary",Icon:<Copy className="w-4 h-4"/>,text:"Duplicate",Kbd:"Ctrl + D"},
        {type:"primary",Icon:<Share className="w-4 h-4"/>,text:"Share",Kbd:"Ctrl + P"},


    ]
    const buttons2=[
        {type:"primary",Icon:<SquarePen className="w-4 h-4"/>,text:"Edit",Kbd:"Ctrl + C"},
        {type:"primary",Icon:<WandSparkles className="w-4 h-4"/>,text:"Draft ideas",Kbd:"Ctrl + \\"},
        {type:"danger",Icon:<Trash2 className="w-4 h-4"/>,text:"Delete",Kbd:"Ctrl + canc"},
    ]
    const baseStyle="absolute top-10 z-[9999] bg-[var(--background-Primary)] dark:bg-[var(--background-Secondary)] right-4 flex flex-col p-2 shadow-lg rounded-lg border border-[var(--border-secondary)]"
    const animationStyle=isConversationOptionsOpen?"animate-slideDown":"animate-slideUp"
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
            {buttons1.filter((button)=>button.text.toLowerCase().includes(searchQuery.toLowerCase())).map((button,index)=>(
                <ButtonLabel key={index} type={button.type} Icon={button.Icon} text={button.text} Kbd={<Kbd text={button.Kbd}/>}/>
            ))}
            <hr className="border-[var(--border-secondary)] m-2"/>
            {buttons2.filter((button)=>button.text.toLowerCase().includes(searchQuery.toLowerCase())).map((button,index)=>(
                <ButtonLabel key={index} type={button.type} Icon={button.Icon} text={button.text} Kbd={<Kbd text={button.Kbd}/>}/>
            ))}
            <hr className="border-[var(--border-secondary)] m-2"/>

        </div>
    );
};

export default ConversationOption;
