import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import supabase from "../../library/supabaseclient.js";
import getAllConversations from "../../services/conversations/getConversations.js";
import deleteConversation from "../../services/conversations/deleteConversation.js";
import {ArrowRightToLine, LayoutGrid, Compass, Plus, Command, ArrowBigUpDash} from "lucide-react";


const Leftbar = ({
                     onSelectConversation, handleNewChat, isMinimized, setIsMinimized,
                     conversation_id, conversations, setConversations, isConversationLoading
                 }) => {
    const [user, setUser] = useState(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const [menuOpen, setMenuOpen] = useState(null); // id conversazione aperta
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {data, error} = await supabase.auth.getUser();
                if (error) throw error;
                if (data?.user) {
                    setUser(data.user); // metti l’intero oggetto user
                }
            } catch (err) {
                console.error("getUser error:", err);
            }
        };
        fetchUser();
    }, []);
    useEffect(() => {
        const handleNewChatShortcut = (event) => {
            // Ctrl + ,
            if (event.ctrlKey && event.key === ',') {
                event.preventDefault();
                handleNewChat();
            }
        };

        window.addEventListener("keydown", handleNewChatShortcut);

        return () => {
            window.removeEventListener("keydown", handleNewChatShortcut);
        };
    }, []);

    useEffect(() => {

        const handleMinimizedShortcut = (event) => {
            // Ctrl + Enter
            if (event.ctrlKey && event.key === "\\") {
                event.preventDefault();
                setIsMinimized(prev => !prev);
            }

        };

        window.addEventListener("keydown", handleMinimizedShortcut);

        return () => {
            window.removeEventListener("keydown", handleMinimizedShortcut);

        };
    }, []); // attenzione: [] così si aggiunge solo una volta

    const handleLogout = async () => {
        const {error} = await supabase.auth.signOut();
        if (!error) navigate("/login");
    };
    const handleDeleteConversation = async (conversationId) => {
        console.log(conversationId);
        await deleteConversation(conversationId);
        const convers = await getAllConversations(user.id);
        setConversations(convers);
        setMenuOpen(null);


    };
    return (
        <div
            className={`h-screen text-[var(--color-primary)]  border border-[var(--border-primary)] select-none bg-[var(--background-Secondary)]  flex flex-col gap-2 relative transition-all duration-300 ${
                isMinimized ? "w-0 border-0" : "md:w-[250px] w-screen "} `}>
            {/* header */}

            {menuOpen && <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] opacity-50 z-10"
                              onClick={() => setMenuOpen(null)}></div>}
            {isMinimized ? null : (
                <>
                    <div className="flex flex-col ">
                        <h2

                            className="flex cursor-pointer justify-between rounded-lg py-2 px-1 text-lg gap-2"
                        >
                            <span className="text-[#2ed992] " onClick={() => navigate("/")}>Chat AI </span>

                            <span className="text-[var(--color-third)] text-xs flex items-center  gap-2">
                        {/*<span className="text-sm flex  gap-1"><Command className="h- w-4" /> + \</span>*/}
                                <ArrowRightToLine
                                    className={isMinimized ? "text-[var(--color-third)] w-5 h-5 group relative" : "text-[var(--color-third)] group relative rotate-180 x w-5 h-5"}
                                    onClick={() => {
                                        setIsMinimized(!isMinimized)
                                    }}>

                                </ArrowRightToLine>
                    </span>
                        </h2>
                        <button className="actionBtn group" onClick={handleNewChat}>
                            <Plus className="w-5 h-5"/>
                            <span className="flex w-full justify-between items-center ">New Chat <kbd
                                className="hidden text-sm items-center group-hover:flex gap-1"><Command
                                className="h-4 w-4"/>+,</kbd></span>
                        </button>
                        <button className="actionBtn group">
                            <Compass className="w-5 h-5"/>
                            <span className="flex w-full justify-between items-center ">Explore <kbd
                                className="hidden text-sm items-center group-hover:flex gap-1"><Command
                                className="h-4 w-4"/>+\</kbd></span>
                        </button>
                        <button className="actionBtn group">
                            <LayoutGrid className="w-5 h-5"/>
                            <span className="flex w-full justify-between items-center ">Connections <kbd
                                className="hidden text-sm items-center group-hover:flex gap-1"><Command
                                className="h-4 w-4"/>+<ArrowBigUpDash className="h-4 w-4"/>+/</kbd></span>
                        </button>
                    </div>


                    <h4 className="text-[var(--color-secondary)] mt-2 text-md items-center flex  px-1">Chat</h4>
                    {isMinimized ? null : (
                        <div className="chat-container w-full h-full">

                            {isConversationLoading ? (
                                <div className="loader"/>
                            ) : conversations.length > 0 ? (
                                conversations.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className={conversation.id === conversation_id ? "conversationDiv group bg-[rgba(0,0,0,0.25)] border border-red-500  " : "conversationDiv group hover:bg-[rgba(0,0,0,0.20)]"}
                                    >
                                        <button
                                            onClick={() => onSelectConversation(conversation.id)}
                                            className={conversation.id === conversation_id ? "text-[var(--color-primary)] truncate w-full text-left " : "w-full text-left  group-hover:text-[var(--color-primary)] truncate"}
                                            title={conversation.title}
                                        >
                                            {conversation.title}
                                        </button>

                                        <svg
                                            className="ml-2 w-5 h-5 group-hover:opacity-100 opacity-0 text-[var(--color-third)] hover:text-[var(--color-primary)] cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setMenuOpen(menuOpen === conversation.id ? null : conversation.id);
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>

                                        {/* menu */}
                                        {menuOpen === conversation.id && (
                                            <div
                                                className="absolute top-10 right-0
                                          overflow-hidden
                                          bg-[var(--background-Secondary)]
                                          rounded-lg shadow-lg z-10 border border-[var(--border-primary)]
                                          transition-all duration-300 ease-in-out select-none"
                                            >
                                                <button
                                                    className="w-full text-left px-4 py-2 hover:bg-[var(--background-Tertiary)] rounded-t-lg"
                                                >
                                                    ✏️ Rinomina
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteConversation(conversation.id)}
                                                    className="w-full flex gap-2 text-left px-4 py-2 hover:bg-red-800 rounded-b-lg"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        className="lucide lucide-trash-icon lucide-trash"
                                                    >
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                                                        <path d="M3 6h18"/>
                                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                    </svg>
                                                    Elimina
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-[var(--color-third)] text-sm px-1">No conversations found</p>
                            )}
                        </div>

                    )}

                    {/* utente */}
                    <div
                        className="user-container"
                        onClick={() => setIsSettingOpen(!isSettingOpen)}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/it/6/69/Il_Bambino_%28Guerre_stellari%29.png"
                            className="w-10 h-10 rounded-full object-cover"
                            alt=""
                        />
                        {isMinimized ? null : (<h3>Tommaso</h3>)}
                    </div>

                    {/* settings */}
                    {isSettingOpen && (
                        <div className="settings animate-slideUp">
                            <button onClick={() => navigate("/pricing")}>
                                Upgrade plan{" "}
                                <small className="bg-violet-900 border border-violet-500 text-white px-2 rounded-lg">
                                    Pro
                                </small>
                            </button>
                            <button onClick={() => navigate("/settings")}>Settings</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </>)}
        </div>
    );
};

export default Leftbar;
