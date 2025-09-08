import React, { useEffect, useState } from 'react';
import { useNavigate, } from "react-router";
import discoverIcon from "../../assets/discover.svg";
import supabase from "../../library/supabaseclient.js";
import getAllConversations from "../../services/getConversations.js";
const Leftbar = () => {
    const [user, setUser] = useState(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchConversations = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                console.log("Session found");
                setUser(session.user);

                const convers = await getAllConversations(session.user.id);
                console.log(`Number of conversations found: ${convers.length}`)
                setConversations(convers);
            } else {
                console.log("No session found");
                setUser(null);
            }
        };

        fetchConversations();
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
        <div className="h-screen text-white max-w-[200px] p-2 bg-[var(--background-Primary)] flex flex-col relative">

        <div>
            <h2>Chat AI</h2>
            <button className="text-white flex gap-2"><img src={discoverIcon} alt="" /><span>Explore</span></button>
        </div>
           <div className="chat-container">

               {conversations.length > 0 ? (
                   conversations.map((conversation) => (
                       <button key={conversation.id} className=" text-left p-2 border border-transparent cursor-pointer hover:border-[var(--border-primary)] rounded-lg bg-[var(--background-Secondary)]">{conversation.title}</button>
                   ))
               ) : <p>No conversations found</p>}
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
