import React from 'react';
import { useState } from 'react';

interface SelectProps{
    options: string[];
    value: string;
    onChange: (value: string) => void;
    style?:string;
}
const Select = ({options,value,onChange,style}:SelectProps) => {
    const baseStyleOption="flex flex-row items-center text-[var(--color-primary)] gap-0 px-2 py-1 select-none rounded-lg hover:bg-[var(--background-Hover)] "
    const topOption="-10"
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative inline-block select-none cursor-pointer group ${style ? style : ""}`}>
            <span onClick={() => setIsOpen(!isOpen)}
            className="text-[var(--color-third)]">{value}</span>
            {isOpen && (
                <div className="absolute animate-slideUp bottom-full left-0  z-50 bg-[var(--background-Primary)] shadow-lg rounded-lg
                gap-2 m-2 group p-2 text-sm border border-[var(--border-secondary)] w-max">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={baseStyleOption}
                            onClick={()=>{
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default Select;
