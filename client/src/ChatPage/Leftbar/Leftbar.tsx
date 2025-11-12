import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import supabase from "../../library/supabaseclient.js";
import deleteConversation from "../../services/conversations/deleteConversation.js";
import { ArrowRightToLine, LayoutGrid, Compass, LogOut, Plus, Command, ArrowBigUpDash, RefreshCw, Settings } from "lucide-react";
import type { User } from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from "react";
import { Conversation } from '../../types/types.js';
import { ButtonOption } from '../../types/types.js';
import ButtonLabel from '../../Components/ButtonLabel.js';
import selectUserData from '../../services/userSettings/getUserData.js';
interface LeftbarProps {
    onSelectConversation: (conversationId: string) => Promise<void> | void;
    handleNewChat: () => void;
    isMinimized: boolean;
    setIsMinimized: Dispatch<SetStateAction<boolean>>;
    conversation_id: string;
    fetchConversations: () => void;
    conversations: Conversation[];
    setConversations: Dispatch<SetStateAction<Conversation[]>>;
    isConversationLoading: boolean;
}

const Leftbar: React.FC<LeftbarProps> = ({
    onSelectConversation, handleNewChat, isMinimized, setIsMinimized,
    conversation_id, conversations, setConversations, isConversationLoading, fetchConversations
}) => {
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const [menuOpen, setMenuOpen] = useState<string | null>(null); // id conversazione aperta
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);
    const [userTitle, setUserTitle] = useState<string>("");
    const [userImageUrl, setUserImageUrl] = useState<string>("");
    const settingOption: ButtonOption[] = [
        {
            type: "primary",
            Icon: <Compass className="w-4 h-4" />,
            text: "Upgrade to Pro",
            Kbd: "",

            onClick: () => navigate("/pricing")
        },
        {
            type: "primary",
            Icon: <Settings className="w-4 h-4" />,
            text: "Settings",
            Kbd: "",

            onClick: () => navigate("/settings")

        },
        {
            type: "danger",
            Icon: <LogOut className="w-4 h-4" />,
            text: "Logout",
            Kbd: "",

            onClick: () => handleLogout()
        }
    ]

    useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) throw error;
                const user: User | null = data?.user ?? null;
                if (user) {
                    setUserId(user.id);
                    const userTitleAndImg= await selectUserData(user.id);
                    setUserTitle(userTitleAndImg?.full_name || "");
                    setUserImageUrl(userTitleAndImg?.avatar_url || "");
                }
            } catch (err) {
                console.error("getUser error:", err);
            }
        };
        fetchUser().catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const handleNewChatShortcut = (event: KeyboardEvent): void => {
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

        const handleMinimizedShortcut = (event: KeyboardEvent): void => {
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
    }, []);

    const handleLogout = async (): Promise<void> => {
        const { error } = await supabase.auth.signOut();
        if (!error) navigate("/login");
    };
    const handleDeleteConversation = async (conversationId: string) => {

        console.log(conversationId);
        await deleteConversation(conversationId);
        setConversations(conversations.filter(conversation => conversation.id !== conversationId));

        setMenuOpen(null);
        handleNewChat()
    };
    const handleRefresh = () => {
        fetchConversations();
    };
    return (
        <div
            className={`h-screen text-[var(--color-primary)]  select-none bg-[var(--background-Primary)]  flex flex-col  relative transition-all duration-300 ${isMinimized ? "w-0 border-1 border-transparent" : "md:w-[250px]  border-r border-dashed border-[var(--border-third)] w-screen "} `}>
            {/* header */}

            {menuOpen && <div className="absolute top-0 left-0 w-full h-full  bg-[rgba(0,0,0,0.5)] opacity-50 z-10"
                onClick={() => setMenuOpen(null)}></div>}
            {isMinimized ? null : (
                <>
                    <div className="flex flex-col border-b p-2 border-dashed border-[var(--border-third)] ">
                        <h2

                            className="flex cursor-pointer justify-between rounded-lg py-2 px-1 text-lg gap-2"
                        >
                            <span className="text-[var(--color-primary)] " onClick={() => navigate("/")}>Chat AI </span>

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
                            <Plus className="w-5 h-5" />
                            <span className="flex w-full justify-between items-center ">New Chat <kbd
                                className="hidden text-sm items-center group-hover:flex gap-1"><Command
                                    className="h-4 w-4" />+,</kbd></span>
                        </button>
                        <button className="actionBtn group">
                            <Compass className="w-5 h-5" />
                            <span className="flex w-full justify-between items-center "
                                onClick={() => navigate("/explore")}>Explore <kbd
                                    className="hidden text-sm items-center group-hover:flex gap-1"><Command
                                        className="h-4 w-4" />+\</kbd></span>
                        </button>
                        <button className="actionBtn group">
                            <LayoutGrid className="w-5 h-5" />
                            <span className="flex w-full justify-between items-center ">Connections <kbd
                                className="hidden text-sm items-center group-hover:flex gap-1"><Command
                                    className="h-4 w-4" />+<ArrowBigUpDash className="h-4 w-4" />+/</kbd></span>
                        </button>
                    </div>
                    <div className="flex flex-col p-2 ">

                        <h4 className="text-[var(--color-primary)]  text-sm items-center relative flex justify-between  px-1">Favourite

                            <button className="hover:rotate-100 transition-all duration-300  group" onClick={handleRefresh}><RefreshCw className="w-5 h-5" /></button></h4>

                    </div>
                    {isMinimized ? null : (
                        <div className="chat-container p-2 w-full h-64">

                            {isConversationLoading ? (
                                <div className="loader" />
                            ) : conversations.length > 0 ? (
                                conversations.map((conversation) => (
                                    conversation.favourite ? <div
                                        key={conversation.id}
                                        className={conversation.id === conversation_id ? "conversationDiv group bg-[rgba(0,0,0,0.2)] border border-red-500  " : "conversationDiv group hover:bg-[rgba(0,0,0,0.10)]"}
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
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
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
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                        <path d="M3 6h18" />
                                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                    Elimina
                                                </button>
                                            </div>
                                        )}
                                    </div> : null
                                ))
                            ) : (
                                <p className="text-[var(--color-third)] text-sm px-1">No conversations found</p>
                            )}
                        </div>

                    )}
                    <div className="flex flex-col p-2 ">
                        <h4 className="text-[var(--color-Primary)] mt-2 text-sm items-center relative flex justify-between  px-1">All chat

                            <button className="hover:rotate-100 transition-all duration-300  group" onClick={handleRefresh}><RefreshCw className="w-5 h-5" /></button></h4>

                    </div>

                    {isMinimized ? null : (
                        <div className="chat-container pl-2 w-full h-full">

                            {isConversationLoading ? (
                                <div className="loader" />
                            ) : conversations.length > 0 ? (
                                conversations.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className={conversation.id === conversation_id ? "conversationDiv group bg-[rgba(0,0,0,0.2)] border border-red-500  " : "conversationDiv group hover:bg-[rgba(0,0,0,0.10)]"}
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
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
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
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                        <path d="M3 6h18" />
                                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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
                            src={userImageUrl || '/default-avatar.png'}
                            className="w-10 h-10 rounded-full object-cover"
                            alt=""
                        />
                        {isMinimized ? null : (<h3>{userTitle}</h3>)}
                    </div>

                    {/* settings */}
                    {isSettingOpen && (
                        <div className="settings animate-slideUp ">
                            {
                                settingOption.map((option, index) => (
                                    <ButtonLabel
                                        key={index}
                                        type={option.type}
                                        Icon={option.Icon}
                                        text={option.text}
                                        onClick={option.onClick}
                                    />
                                ))

                            }
                        </div>
                    )}
                </>)}
        </div>
    );
};

export default Leftbar;