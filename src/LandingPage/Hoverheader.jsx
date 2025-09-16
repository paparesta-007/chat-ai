import React from 'react';
import LandingPagesVoices from "../library/LandingPagesVoices.js";
const Hoverheader= ({liName}) => {
    return (
        <div className="w-full border border-[var(--border-primary)] flex items-center justify-center fixed">
            <div className="grid md:grid-cols-4 grid-cols-2 w-[80%]">
                {LandingPagesVoices[liName]?.map((voice, index) => (
                    <div key={index}>
                        <h1 className="text-xl text-[var(--color-primary)] font-semibold">{voice.title}</h1>
                        <p className="text-lg text-[var(--color-third)]">{voice.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Hoverheader;
