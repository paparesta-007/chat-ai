import React from 'react';
import { useState, useEffect } from 'react';
import supabase from "../../library/supabaseclient.js";
import getUserPreferences from "../../services/userSettings/getUserPreferences.js";
import updatePreference from "../../services/userSettings/updatePreference.js";
import type { User } from '@supabase/supabase-js';
import { Check, X } from 'lucide-react';
import updateUserData from '../../services/userSettings/updateUserData.js';
import selectUserData from '../../services/userSettings/getUserData.js';
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
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

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
            const { data: { user } = {} } = await supabase.auth.getUser();
            if (user?.id) setUserId(user.id)
            console.log(user?.id);
            const prefs: any = await getUserPreferences(user?.id);

            const rawStyle: Style = prefs.preferences?.style[0];
            console.log("rawStyle", rawStyle);

            const userTitleAndImg = await selectUserData(user?.id);
            console.log("userTitleAndImg", userTitleAndImg);
            setCurrentTitle(userTitleAndImg?.full_name || "");
            setCurrentImageUrl(userTitleAndImg?.avatar_url || "");
            setStyle(rawStyle);
            setLoading(false);

        } catch (err) {
            console.error("getUser error:", err);
        }
    };
    const isImageUrl = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url, { method: "HEAD" }); // Effettua una richiesta HEAD
            const contentType = response.headers.get("Content-Type");
            return contentType?.startsWith("image/") || false; // Controlla se il Content-Type inizia con "image/"
        } catch (error) {
            console.error("Errore durante la verifica dell'immagine:", error);
            return false;
        }
    };

    const handleCustomizationSave = async () => {
        if (!userId) {
            console.error("No user ID found");
            return;
        }

        console.log("Handle customization change", currentFontFamily, currentTheme, currentTitle, currentImageUrl);

        // Verifica che non siano vuoti title e image
        const hasTitleOrImage = currentTitle.trim() !== "" || currentImageUrl.trim() !== "";
        const hasStyleChange = currentFontFamily || currentTheme;

        if (!hasTitleOrImage && !hasStyleChange) {
            setPopup({
                show: true,
                message: "Nothing to update",
                status: "error",
            });
            setTimeout(() => setPopup(null), 3000);
            return;
        }

        // Verifica se l'immagine è valida
        if (currentImageUrl.trim() !== "") {
            const isValidImage = await isImageUrl(currentImageUrl);
            if (!isValidImage) {
                setPopup({
                    show: true,
                    message: "The provided URL is not a valid image.",
                    status: "error",
                });
                setTimeout(() => setPopup(null), 3000);
                return;
            }
        }

        setIsSaving(true);

        try {
            // 🔹 1. Se ci sono title o image, fai la tua update personalizzata
            if (hasTitleOrImage) {
                await updateUserData(userId, currentTitle, currentImageUrl);
                console.log("Updated title and image");
            }

            // 🔹 2. Se ci sono modifiche allo stile, chiama l’updatePreference
            if (hasStyleChange) {
                const newPrefs = {
                    style: [
                        {
                            theme: currentTheme,
                            fontFamily: currentFontFamily,
                        },
                    ],
                };
                await updatePreference(userId, newPrefs);
                console.log("Updated style preferences");
            }

            // Popup successo
            setPopup({
                show: true,
                message: "Settings updated successfully",
                status: "success",
            });
            setTimeout(() => setPopup(null), 3000);
        } catch (err) {
            console.error("Error updating settings:", err);
            setPopup({
                show: true,
                message: "Error updating settings",
                status: "error",
            });
            setTimeout(() => setPopup(null), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="loader"></div>;
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mt-6 mb-2">Title and Image Customization</h2>
            <div className='border border-[var(--border-primary)] p-4 rounded-lg flex flex-col gap-4'>
                <div>
                    <h2 className="text-xl font-semibold text-[var(--color-primary)]">How ChatAI should call you?</h2>
                    <input type="text" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} placeholder="Your title" 
                    className="w-full mt-2 p-2 border border-[var(--border-secondary)] rounded-md bg-[var(--background-Secondary)] text-[var(--color-primary)] outline-none" />
                    <p className="text-sm text-[var(--color-third)] mt-1">This will be shown on the top left of the sidebar, no one will see it.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-[var(--color-primary)]">Want change your avatar?</h2>
                    <input type="text" value={currentImageUrl} onChange={(e) => setCurrentImageUrl(e.target.value)} placeholder="Your image url (must be a valid URL)" 
                    className="w-full mt-2 p-2 border border-[var(--border-secondary)] rounded-md bg-[var(--background-Secondary)] text-blue-500 text-underline outline-none" />
                    <p className="text-sm text-[var(--color-third)] mt-1">This will be shown on the top left avatar section of the sidebar, no one will see it.</p>
                </div>

            </div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mt-6 mb-2">Theme and Font Customization</h2>
            <div className='border border-[var(--border-primary)] p-4 rounded-lg flex flex-col'>
                <div className="flex items-center my-8 ">
                    <div>
                        <h2 className="text-xl font-semibold text-[var(--color-primary)]">Choose your font</h2>
                        <p className="text-md text-[var(--color-third)]">With the best font you can have the best experience</p>
                    </div>
                    <select className="w-[200px] text-[var(--color-primary)] bg-[var(--background-Secondary)] p-2 rounded-md border border-[var(--border-secondary)] outline-none"
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
                    <select className="w-[200px] text-[var(--color-primary)] bg-[var(--background-Secondary)] p-2 rounded-md border border-[var(--border-secondary)] outline-none"
                        value={currentTheme || "dark"}
                        onChange={(e) => setCurrentTheme(e.target.value)}>

                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="synced_with_device">Synced with device</option>
                        <option value="" disabled>more them soon</option>

                    </select>
                </div>
                <div
                    className={`
                ${popup?.show ? "flex text-center animate-slideUp fixed bottom-4 right-4 p-2 rounded-lg" : "hidden"}
                ${popup?.status === "success" ? "bg-[var(--bg-success)] border border-[var(--border-success)] text-white" : ""}
                ${popup?.status === "error" ? "bg-[var(--bg-error)] border border-[var(--border-error)] text-white" : ""}
              `}
                >
                    <div className=" p-1 rounded-full  flex items-center justify-center">{popup?.status ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}</div> {popup?.message}
                </div>

            </div>
            <button className={`bg-[var(--color-primary)] w-[200px] text-[var(--background-Secondary)] font-semibold px-8 cursor-pointer py-2 rounded-md ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleCustomizationSave}>{isSaving ? "Saving..." : "Save"}</button>

        </div>
    );
};

export default CustomizationSettings;
