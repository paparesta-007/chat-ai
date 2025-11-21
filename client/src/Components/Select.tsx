import React, { useState } from 'react';
import { FlaskIcon, SketchLogoIcon,ImageIcon, CellSignalHighIcon,  LightbulbIcon } from '@phosphor-icons/react';
import Tooltip from './Tooltip';
interface SelectProps {
    options: {
        name: string;
        available: boolean;
        type?: "normal" | "experimental" | "deprecated" | "thinking" | "fast";
    }[] | string[];
    value: string;
    onChange: (value: string) => void;
    style?: string;
}

const Select = ({ options, value, onChange, style }: SelectProps) => {

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const getTypeIcon = (type: string | undefined) => {
        switch (type) {
            case "experimental":
                return <FlaskIcon size={15} className="text-[var(--color-accent)] ml-1" />;
            case "thinking":
                return <LightbulbIcon size={15} className="text-[var(--color-accent)] ml-1" />;
            case "normal":
                return <CellSignalHighIcon size={15} className="text-[var(--color-accent)] ml-1" />;
            case "image":
                return <ImageIcon size={15} className="text-[var(--color-accent)] ml-1" />;
        }
    }

    const baseStyleOption =
        "flex flex-row items-center text-[var(--color-primary)] gap-0 px-2 py-1 select-none rounded-lg hover:bg-[var(--background-Hover)] ";

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative inline-block select-none cursor-pointer group ${style || ""}`}>
            <span
                onClick={() => setIsOpen(!isOpen)}
                className="text-[var(--color-third)]"
            >
                {value}
            </span>

            {isOpen && (
                <div className="absolute animate-slideUp bottom-full left-0 z-50 
                grid md:grid-cols-2 grid-cols-1
                bg-[var(--background-Primary)] shadow-lg rounded-lg gap-2 m-2 group p-2 text-sm border border-[var(--border-secondary)] w-max">
                    {options.map((option) => {
                        const isString = typeof option === "string";
                        const available = isString ? true : option.available;
                        const name = isString ? option : option.name;
                        const type = isString ? undefined : option.type;

                        return (
                            <div
                                key={name}
                                className={
                                    baseStyleOption +
                                    (available ? "" : "opacity-50 cursor-not-allowed")
                                }
                                onClick={() => {
                                    if (!available) return; // ❌ non cliccabile
                                    onChange(name); // restituisce solo string
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => {
                                    if (!available) {
                                        setIsTooltipVisible(true);
                                        setHoveredOption(name);
                                    }
                                }}
                                onMouseLeave={() => {
                                    setIsTooltipVisible(false);
                                    setHoveredOption(null);
                                }}
                            >
                                {name} {getTypeIcon(type)}
                                {!available && isTooltipVisible && (
                                    <Tooltip text={`${hoveredOption} is currently unavailable`} position='top' messageType="error"/>
                                )}
                            </div>
                        );
                    })}
                    <button onClick={() => setIsOpen(false)} className='absolute top-0 right-0 text-[var(--color-primary)] p-1'>X</button>
                </div>
            )}
        </div>
    );
};

export default Select;
