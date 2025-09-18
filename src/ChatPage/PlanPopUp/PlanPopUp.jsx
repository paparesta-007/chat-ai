import React from 'react';
import {Sparkles} from "lucide-react";
const PlanPopUp = ({ handleUpgradeToProPopUp, setIsUpgradeToProPopUpOpen }) => {
    return (
        <div
            className="fixed animate-slideUp bottom-5 right-5 bg-[var(--background-Secondary)] z-50 shadow-lg rounded-md border border-[var(--border-secondary)] p-2"
            style={{ transformOrigin: "left bottom" }} // opzionale, se vuoi animare da sinistra basso
        >
            <h2 className="text-[var(--color-primary)] text-xl flex items-center gap-2">
                <Sparkles className="text-red-300"/>Upgrade to Pro
            </h2>
            <ul className="list-disc ml-5 text-[var(--color-third)] my-4">
                <li>Access to Gemini Pro</li>
                <li>Connect your api from other AI</li>
                <li>Preview of new features</li>
                <li>And more...</li>
            </ul>
            <button
                onClick={handleUpgradeToProPopUp}
                className="bg-[var(--background-Tertiary)] text-white px-2 py-1 rounded-md"
            >
                Upgrade to Pro
            </button>
            <button
                className="absolute top-2 right-2 cursor-pointer text-[var(--color-primary)]"
                onClick={() => setIsUpgradeToProPopUpOpen(false)}
            >
                X
            </button>
        </div>
    );
};

export default PlanPopUp;
