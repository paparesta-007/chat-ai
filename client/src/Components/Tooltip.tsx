import React from "react";

interface TooltipProps {
    text: string;
    position?: "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
    messageType?: "normal" | "error" | "warning";
}

const Tooltip: React.FC<TooltipProps> = ({ text, position = "top", messageType="normal" }) => {
    // classi dinamiche per posizionamento e freccia
    const positions: Record<string, string> = {
        "top": "bottom-full left-1/2 -translate-x-1/2 mb-2",
        "bottom": "top-full left-1/2 -translate-x-1/2 mt-2",
        "left": "right-full top-1/2 -translate-y-1/2 mr-2",
        "right": "left-full top-1/2 -translate-y-1/2 ml-2",
        "top-right": "bottom-full right-0 mb-2",
        "top-left": "bottom-full left-0 mb-2",
        "bottom-right": "top-full right-0 mt-2",
        "bottom-left": "top-full left-0 mt-2",
    };

    const bgColor: Record<string, string> = {
        "normal": "bg-[var(--background-Secondary)] ",
        "error": "bg-[var(--bg-error)] ",
        "warning": "bg-[var(--bg-warning)] border border-[var(--border-warning)]",
    };

    const animation: Record<string, string> = {
        "top": "animate-slideUp",
        "bottom": "animate-slideDown",
        "left": "animate-slideLeft",
        "right": "animate-slideRight",
        "top-right": "animate-slideUpRight",
        "top-left": "animate-slideUpLeft",
        "bottom-right": "animate-slideDownRight",
        "bottom-left": "animate-slideDownLeft",
    };

    const arrowPositions: Record<string, string> = {
        "top": "bottom-[-0.25rem] left-1/2 -translate-x-1/2 rotate-45",
        "bottom": "top-[-0.25rem] left-1/2 -translate-x-1/2 rotate-45",
        "left": "right-[-0.25rem] top-1/2 -translate-y-1/2 rotate-45",
        "right": "left-[-0.25rem] top-1/2 -translate-y-1/2 rotate-45",
        "top-right": "bottom-[-0.25rem] right-2 rotate-45",
        "top-left": "bottom-[-0.25rem] left-2 rotate-45",
        "bottom-right": "top-[-0.25rem] right-2 rotate-45",
        "bottom-left": "top-[-0.25rem] left-2 rotate-45",
    };

    return (
        <div className={`absolute ${positions[position]} ${animation[position]} hidden group-hover:flex flex-col items-center z-50`}>
            <div className={`relative  text-white text-xs rounded-lg px-3 py-1 shadow-lg whitespace-nowrap ${bgColor[messageType]}`}>
                {text}
                <div className={`absolute w-2 h-2 ${bgColor[messageType]} ${arrowPositions[position]}`}></div>
            </div>
        </div>
    );
};

export default Tooltip;
