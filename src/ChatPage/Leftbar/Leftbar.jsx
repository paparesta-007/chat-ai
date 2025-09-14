import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import supabase from "../../library/supabaseclient.js";
import getAllConversations from "../../services/getConversations.js";
import deleteConversation from "../../services/deleteConversation.js";

const Leftbar = ({ onSelectConversation, handleNewChat }) => {
    const [user, setUser] = useState(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null); // id conversazione aperta
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConversations = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
                const convers = await getAllConversations(session.user.id);
                setConversations(convers);
            } else {
                setUser(null);
            }
        };

        fetchConversations();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) navigate("/login");
    };
    const handleDeleteConversation = async (conversationId) => {
        console.log(conversationId);
        const deleted = await deleteConversation(conversationId);
        const convers = await getAllConversations(user.id);
        setConversations(convers);
        setMenuOpen(null);

    };
    return (
        <div className="h-screen w-[300px] text-white p-2 bg-[var(--background-Primary)] flex flex-col relative">
            {/* header */}
            <div className="flex flex-col">
                <h2
                    onClick={() => navigate("/")}
                    className="flex mb-5 hover:bg-[var(--background-Secondary)] cursor-pointer rounded-lg py-2 px-1 text-lg gap-2"
                >
                    <span className="text-[#2ed992]">ChatAI</span>
                </h2>
                <button className="actionBtn" onClick={handleNewChat}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-square-pen-icon lucide-square-pen">
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path
                            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                    </svg>
                    New Chat
                </button>
                <button className="actionBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-compass-icon lucide-compass">
                        <path
                            d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>
                        <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Explore
                </button>
            </div>

            {/* lista chat */}
            <h4 className="text-[var(--color-primary)] mt-4">Chat</h4>
            <div className="chat-container space-y-2">
                {conversations.length > 0 ? (
                    conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className="relative group  flex items-center justify-between p-2 border border-transparent rounded-lg bg-[var(--background-Secondary)] hover:border-[var(--border-primary)]"
                        >
                            {/* titolo cliccabile */}
                            <button
                                onClick={() => onSelectConversation(conversation.id)}
                                className="flex-1 text-left"
                            >
                                {conversation.title}
                            </button>

                            <svg className="ml-2 w-5 h-5 hidden group-hover:block text-gray-400 hover:text-white cursor-pointer"
                                 onClick={(e) => {
                                     e.stopPropagation(); // evita apertura conversazione
                                     setMenuOpen(menuOpen === conversation.id ? null : conversation.id);
                                 }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>


                            {/* menu contestuale */}
                            {menuOpen === conversation.id && (
                                <div className="absolute right-0 shadow-lg top-10 w-40 color-[var(--color-primary)] bg-[var(--background-Secondary)] border border-[var(--border-primary)] rounded-lg shadow-lg z-10">
                                    <button className="w-full text-left px-4 py-2 hover:bg-[var(--background-Tertiary)] rounded-t-lg">
                                        ✏️ Rinomina
                                    </button>
                                    <button onClick={() => handleDeleteConversation(conversation.id)} className="w-full flex gap-2 text-left px-4 py-2 hover:bg-red-800 rounded-b-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="lucide lucide-trash-icon lucide-trash">
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
                    <p>No conversations found</p>
                )}
            </div>

            {/* utente */}
            <div
                className="user-container mt-auto flex items-center gap-2 cursor-pointer"
                onClick={() => setIsSettingOpen(!isSettingOpen)}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/it/6/69/Il_Bambino_%28Guerre_stellari%29.png"
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                />
                <h3>Tommaso</h3>
            </div>

            {/* settings */}
            {isSettingOpen && (
                <div className="settings absolute bottom-16 left-2 right-2 bg-[var(--background-Secondary)] border border-[var(--border-primary)] rounded-lg shadow-lg">
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
        </div>
    );
};

export default Leftbar;
