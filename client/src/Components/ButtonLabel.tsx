import React from 'react';

interface ButtonLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    type: 'primary' | 'danger' | string;
    Icon?: React.ReactNode;
    text?: string;
    Kbd?: React.ReactNode;
    onClick?: () => void;

}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ type, Icon = null, text = "", Kbd = null, ...props }) => {
    const baseClasses = "flex flex-row items-center  gap-2 px-2 py-1 select-none rounded-lg hover:bg-[var(--background-Hover)] ";
    const typeClasses =
        type === "primary"
            ? "text-[var(--color-primary)]"
            : type === "danger"
                ? "text-[#ec6f6f] "
                : "";
    
    return (
        <div {...props} className={`${baseClasses} ${typeClasses} flex justify-between`}>
            <div className="flex items-center   gap-2">
            {Icon && <span className="flex">{Icon}</span>}
            <span>{text}</span>
            </div>
            {Kbd && <span className="flex text-xs ">{Kbd}</span>}
        </div>
    );
};

export default ButtonLabel;
