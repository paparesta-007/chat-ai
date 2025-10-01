    import React from 'react';



    interface kbdLabelProps {

        Icon1?: React.ReactNode;
        Icon2?: React.ReactNode;
        Icon3?: React.ReactNode;
        text?: string | null | undefined;
    }
    const Kbd: React.FC<kbdLabelProps> = ({Icon1,Icon2,Icon3,text}) => {
        return (
            <div className="flex items-center gap-2 text-xs font-sans text-gray-500">
                {Icon1 && <span className="flex">{Icon1}</span>}
                {Icon2 && <span className="flex">{Icon2}</span>}
                {Icon3 && <span className="flex">{Icon3}</span>}
                {text && <span className="flex">{text}</span>}
            </div>
        );
    };

    export default Kbd;
