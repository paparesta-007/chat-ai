import React, { useEffect, useState } from 'react';
import { useNavigate, } from "react-router";
import discoverIcon from "../../assets/discover.svg";
import supabase from "../../library/supabaseclient.js";
const Leftbar = () => {
    const [user, setUser] = useState(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                console.log("Session found");
                setUser(session.user); // salva l'utente nello stato
            } else {
                console.log("No session found");
                setUser(null); // nessun utente loggato
            }
        });
    }, []);

    const handleLogout = async () => {
        console.log("Logout");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="h-screen w-[250px] p-2 bg-[var(--background-Primary)] flex flex-col relative">

        <div>
            <h2>Chat AI</h2>
            <button className="text-white flex gap-2"><img src={discoverIcon} alt="" /><span>Explore</span></button>
        </div>
           <div className="chat-container">

            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
            <button>Conversazioneeee</button>
           </div>
           <div className="user-container "
           onClick={() => setIsSettingOpen(!isSettingOpen)}>
               <img src="https://upload.wikimedia.org/wikipedia/it/6/69/Il_Bambino_%28Guerre_stellari%29.png"
                    className="w-10 h-10 rounded-full object-cover" alt="" />
               <h3>Tommaso</h3>
           </div>



           {isSettingOpen && (
               <div className="settings">
                   <button onClick={() => navigate("/pricing")}>Upgrade plan <small className="bg-violet-900 border border-violet-500 text-white px-2 rounded-lg">Pro</small></button>
                   <button>Settings</button>
                   <button onClick={handleLogout}>Logout</button>
               </div>
           )}
       </div>
    );
};

export default Leftbar;
