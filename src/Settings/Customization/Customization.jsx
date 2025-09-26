    import React from 'react';
    import {useState, useEffect} from 'react';
    import supabase from "../../library/supabaseclient.js";
    import getUserPreferences from "../../services/userSettings/getUserPreferences.js";
    import updatePreference from "../../services/userSettings/updatePreference.js";
    const CustomizationSettings = () => {
        const [userId, setUserId] = useState(null);
        const [isAnythingChanged, setIsAnythingChanged] = useState(false);
        const [style, setStyle] = useState(null);
        const [currentFontFamily, setCurrentFontFamily] = useState(null);
        const [currentTheme, setCurrentTheme] = useState(null);
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
        useEffect(() => {
            if (currentFontFamily || currentTheme) {
                setIsAnythingChanged(true);
            }
        }, [currentFontFamily, currentTheme]);
        const getUser = async () => {
            try {
                const {data: {user} = {}} = await supabase.auth.getUser();
                if (user?.id) setUserId(user.id)
                console.log(user.id);
                const prefs = await getUserPreferences(user.id);

                const rawStyle = prefs.preferences?.style[0];
                console.log("rawStyle",rawStyle);
                setStyle(rawStyle);


            } catch (err) {
                console.error("getUser error:", err);
            }
        };

        const handleStyleChange = () => {
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
            const response=updatePreference(userId, newPrefs).then(() => {
               console.log("Style aggiornato");
               console.log(response);
            }).catch((err) => {
                console.error("Error updating style:", err);
            });
        };
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
                <button className="bg-[var(--color-primary)] text-[var(--background-Secondary)] font-semibold px-8 cursor-pointer py-2 rounded-md " onClick={handleStyleChange}>Save</button>
            </div>
        );
    };

    export default CustomizationSettings;
