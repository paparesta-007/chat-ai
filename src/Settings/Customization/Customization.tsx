import React from 'react';
import {useState, useEffect} from 'react';
import supabase from "../../library/supabaseclient.js";
import getUserPreferences from "../../services/userSettings/getUserPreferences.js";
import updatePreference from "../../services/userSettings/updatePreference.js";
import type {User} from '@supabase/supabase-js';
import { Check, X } from 'lucide-react';
type Style = {
    theme: string;
    fontFamily: string;
}
type Preferences = {
    style: Style[];
}
type Popup = {
    show: boolean;
    message: string;
    status: string;
}
const CustomizationSettings = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [style, setStyle] = useState<Style | null>(null);
    const [currentFontFamily, setCurrentFontFamily] = useState<string | null>(null);
    const [currentTheme, setCurrentTheme] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    useEffect(() => {
        getUser();

    }, []);
    useEffect(() => {
        if (style) {
            console.log("Style aggiornato:", style);
            setCurrentFontFamily(style["fontFamily"]);
            setCurrentTheme(style.theme);
            console.log(currentFontFamily);
            console.log(currentTheme);
        }
    }, [style]);

    const getUser = async () => {
        try {
            setLoading(true);
            const {data: {user} = {}} = await supabase.auth.getUser();
            if (user?.id) setUserId(user.id)
            console.log(user?.id);
            const prefs: any = await getUserPreferences(user?.id);

            const rawStyle: Style = prefs.preferences?.style[0];
            console.log("rawStyle",rawStyle);
            setStyle(rawStyle);
            setLoading(false);

        } catch (err) {
            console.error("getUser error:", err);
        }
    };

    const handleStyleChange = () => {
        if (!userId) {
            console.error("No user ID found");
            return;
        }

        console.log("Handle font family change",currentFontFamily,currentTheme)

        const newPrefs = {
            style: [
                {
                    theme: currentTheme,
                    fontFamily: currentFontFamily
                }
            ]
        };

        console.log(userId, newPrefs);
        setIsSaving(true);
        const response=updatePreference(userId, newPrefs).then(() => {
           setTimeout(() => {
            setPopup({
                show: true,
                message: "Style updated successfully",
                status: "success"
            });
           }, 1000);
           setTimeout(() => {
            setPopup(null);
           }, 3000);
           console.log(response);
           setIsSaving(false);
        }).catch((err) => {
            console.error("Error updating style:", err);
            setIsSaving(false);
        });
    };
    if (loading) return <div className="loader"></div>;
    return (
        <div>

            <div className="flex items-center my-8">
                <div>
                    <h2 className="text-xl font-semibold text-[var(--color-primary)]">Choose your font</h2>
                    <p className="text-md text-[var(--color-third)]">With the best font you can have the best experience</p>
                </div>
                <select className="w-[200px] text-[var(--color-primary)] bg-[var(--background-Secondary)] border-none outline-none"
                value={currentFontFamily || "default"}
                onChange={(e) => setCurrentFontFamily(e.target.value)}
                >
                    <option value="default">Default (arial)</option>
                    <option value="times-new-roman">Times New Roman</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="roboto">Roboto</option>



                </select>
            </div>
            <div className="flex items-center my-8">
                <div>
                    <h2 className="text-xl font-semibold text-[var(--color-primary)]">Choose your theme</h2>
                    <p className="text-md text-[var(--color-third)]">More themes will be added soon</p>
                </div>
                <select className="w-[200px] text-[var(--color-primary)] bg-[var(--background-Secondary)] border-none outline-none"
                value={currentTheme || "dark"}
                onChange={(e) => setCurrentTheme(e.target.value)}>

                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="synced_with_device">Synced with device</option>
                    <option value="" disabled>more them soon</option>

                </select>
            </div>
            <button className={`bg-[var(--color-primary)] text-[var(--background-Secondary)] font-semibold px-8 cursor-pointer py-2 rounded-md ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleStyleChange}>{isSaving ? "Saving..." : "Save"}</button>
            <div
                className={`
                ${popup?.show ? "flex text-center animate-slideUp fixed bottom-4 right-4 p-2 rounded-lg" : "hidden"}
                ${popup?.status === "success" ? "bg-[#006239] border border-[#0e7a4c] text-white" : ""}
                ${popup?.status === "error" ? "bg-[#d54848] border border-[#a84444] text-white" : ""}
              `}
            >
                <div className=" p-1 rounded-full  flex items-center justify-center">{popup?.status ? <Check className="w-4 h-4"/> : <X className="w-4 h-4"/>}</div> {popup?.message}
            </div>

        </div>
    );
};

export default CustomizationSettings;
