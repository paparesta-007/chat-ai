import { useState, useEffect, useRef, } from "react";
import Leftbar from "./Leftbar/Leftbar";
import runChat from "../../api/gemini-generate.js";
import TextBar from "./Textbar/Textbar.jsx";
import supabase from "../../src/library/supabaseclient.js";
import { marked } from "marked";
import createMessage from "../services/conversations/createMessage.js";
import createConversation from "../services/conversations/createConversation.js";
import getMessages from "../services/conversations/getMessages.js";
import LandingChat from "./LandingChat/LandingChat.js";
import avaibleModels from "../data/avaibleModels.js";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from "../Components/Tooltip";
import PlanPopUp from "./PlanPopUp/PlanPopUp.jsx";
import { Menu, Star, Ellipsis, SunMedium, Moon } from "lucide-react";
import getAllConversations from "../services/conversations/getConversations.js";
import getUserPreferences from "../services/userSettings/getUserPreferences.js";
import favouriteConversation from "../services/conversations/favouriteConversation";
import { Message, Conversation, Style } from "../types/types.js";
import ConversationOption from "./ConversationOption/ConversationOption";
import SkeletonConversation from "../Components/Skeleton";

import { convertLatexInMarkdown, cleanLatexText } from "../utils/convertLatexInMarkdown";



function ChatPage() {
    const { chatId } = useParams();
    const [prompt, setPrompt] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isNewChat, setIsNewChat] = useState(true);
    const [user_id, setUser_id] = useState<string | null>(null);
    const [conversation_id, setConversation_id] = useState<string>("");
    const messagesEndRef = useRef(null);
    const [isAnswering, setIsAnswering] = useState(false);

    const [model, setModel] = useState(avaibleModels[2]);
    const [isUpgradeToProPopUpOpen, setIsUpgradeToProPopUpOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [justCreatedChat, setJustCreatedChat] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isConversationLoading, setIsConversationLoading] = useState<boolean>(false);


    const [style, setStyle] = useState<Style>();
    const [currentFontFamily, setCurrentFontFamily] = useState<string>("");
    const [currentTheme, setCurrentTheme] = useState<string>("");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const [isConversationFavourite, setIsConversationFavourite] = useState<boolean>(false);
    const fetchIdRef = useRef(0);
    const [isConversationOptionsOpen, setIsConversationOptionsOpen] = useState<boolean>(false);


    useEffect(() => {
        getUser();
        fetchConversations();
    }, []);


    const fetchConversations: () => Promise<void> = async () => {
        const { data: { session } } = await supabase.auth.getSession();


        if (session) {
            setIsConversationLoading(true);

            const convers = await getAllConversations(session.user.id);

            setConversations(convers);

            setIsConversationLoading(false);
        }
    };
    useEffect(() => {
        if (style) {

            setCurrentFontFamily(style["fontFamily"]);
            setCurrentTheme(style.theme);
            console.log(style.theme, style.fontFamily)

        }
    }, [style]);

    useEffect(() => {
        const loadChat = async (): Promise<void> => {
            // Se non c'è chatId -> siamo in new chat (vuoto)
            if (!chatId) {
                setIsNewChat(true);
                setMessages([]);
                return;
            }

            // Se la chat url corrisponde già alla conversazione caricata -> niente da fare
            if (conversation_id === chatId) {
                setIsNewChat(false);
                return;
            }

            // Altrimenti dobbiamo caricare i messaggi della nuova chatId
            setIsConversationLoading(true);
            const localFetchId: number = ++fetchIdRef.current;

            try {
                const msgs: Message[] = await getMessages(chatId);
                // Se nel frattempo è stato fatto un'altra fetch, ignoro questa risposta
                if (localFetchId !== fetchIdRef.current) return;

                if (!msgs || msgs.length === 0) {
                    navigate("/404", { replace: true });
                } else {
                    setMessages(msgs);
                    setConversation_id(chatId);
                    setIsNewChat(false);
                }
            } catch (err) {
                // Se errore e request non invalidata -> fallback
                if (localFetchId !== fetchIdRef.current) return;
                console.error("loadChat error:", err);
                navigate("/404", { replace: true });
            } finally {
                if (localFetchId === fetchIdRef.current) {
                    setIsConversationLoading(false);
                }
            }
        };

        loadChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);



    // Aggiorna lo stato locale e l'array conversations
    const handleFavouriteConversation = async () => {
        if (!conversation_id) return;

        const newFavourite = !isConversationFavourite;
        setIsConversationFavourite(newFavourite);

        // Aggiorna nel DB
        await favouriteConversation(newFavourite, conversation_id);

        // Aggiorna anche l'array conversations
        setConversations(prev =>
            prev.map(c =>
                c.id === conversation_id ? { ...c, favourite: newFavourite } : c
            )
        );
    };

    // Effetto per aggiornare isConversationFavourite quando cambia conversation_id o conversations
    useEffect(() => {
        if (!conversation_id || conversations.length === 0) return;


        const conv = conversations.find(c => c.id === conversation_id);

        setIsConversationFavourite(conv?.favourite ?? false);
    }, [conversation_id, conversations]);



    const getUser: () => void = async (): Promise<void> => {
        try {
            const { data: { user } = {} } = await supabase.auth.getUser();

            if (user?.id) {
                setUser_id(user.id);       // user.id è string
                console.log(user.id);

                const prefs: any = await getUserPreferences(user.id);

                const rawStyle: Style = prefs.preferences?.style[0];
                console.log("rawStyle", rawStyle);
                setStyle(rawStyle);
            }

        } catch (err) {
            console.error("getUser error:", err);
        }
    };

    const handleSelectQuickPhrase: (text: string) => void = (text: string) => {

        setPrompt(text); // aggiorna la TextBar
    };

    const safeToString = (val: any) => {
        if (val == null) return "";
        if (typeof val === "string") return val;

        if (typeof val === "object") {
            // cerca proprietà comuni
            return val?.text ?? val?.message ?? JSON.stringify(val);
        }

        return String(val);
    };

    const handleSend = async () => {
        if (!prompt || !prompt.trim()) return;

        if (model.id === avaibleModels[0].id) {
            setIsUpgradeToProPopUpOpen(true);
            return;
        }
        try {
            let convId: string = conversation_id;

            if (isNewChat) {
                const titlePrompt = `Write a short title 4-8 word about, return 1 concise phrase, avoid markdown styling : ${prompt}`;

                const res = await fetch(`http://localhost:3000/api/gemini/generate?prompt=${encodeURIComponent(titlePrompt)}&model=${encodeURIComponent(model.id)}`);
                
                // Check if response is OK
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                // Check content type before parsing JSON
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text();
                    console.error("Expected JSON but got:", text);
                    throw new Error("Server returned non-JSON response");
                }
                
                const data = await res.json();
                const usage = data.usage;
                console.log("Title generation usage:", usage);
                const rawTitle: string = data.text;

                const chatTitle: string = safeToString(rawTitle);
                const conversation: any = await createConversation(user_id, chatTitle);
                convId = conversation?.[0]?.id ?? conversation?.id;
                setConversation_id(convId);
                setIsNewChat(false);
                setJustCreatedChat(true);

                console.log("Conversation created?", conversation);

                if (!convId) {
                    console.error("❌ createConversation non ha ritornato un id valido:", conversation);
                    return;
                }

                console.log("✅ Nuova conversazione creata con id:", convId);
            }

        const userMessage = new Message();
        userMessage.sender = prompt;
        userMessage.content = "";
        userMessage.conversation_id = convId;
        userMessage.id = "";
        userMessage.created_at = "";

        // Mostra subito messaggio utente
        setMessages((prev: Message[]) => [...prev, userMessage]);
        setPrompt("");

        setIsAnswering(true);
        const history = toGeminiHistory(messages);
        const rawReply = await runChat("You are an helpful assistant, avoid svg, return content in markdown styled with header, bullet list, list, tables if needed prompt:"
            + prompt, model.id, history);

        const reply = safeToString(rawReply);
            
        // Aggiorna l'ultimo messaggio con la risposta AI
        setMessages((prev) =>
            prev.map((m, idx) =>
                idx === prev.length - 1
                    ? { ...m, content: reply, conversation_id: convId }
                    : m
            )
        );

        setIsAnswering(false);
        setPrompt("");
        setTimeout(() => {
            if (messagesEndRef.current) {
                const container = messagesEndRef.current as HTMLElement;
                container.scrollTop = container.scrollHeight - 150;
            }
        }, 50);
        await createMessage(userMessage.sender, reply, convId);
        navigate(`/chat/${convId}`);
        await fetchConversations()
    } catch (err) {
        console.error("handleSend error:", err);
        setIsAnswering(false);
        // Show error message to user
        alert("Failed to send message. Please check if the server is running and try again.");
    }
};
    const toGeminiHistory = (messages: Message[]) => {
        return messages.flatMap((m) => {
            const historyItems = [];
            if (m.sender) {
                historyItems.push({
                    role: "user",
                    parts: [{ text: m.sender }]
                });
            }
            if (m.content) {
                historyItems.push({
                    role: "model",
                    parts: [{ text: m.content }]
                });
            }
            return historyItems;
        });
    };

    const handleUpgradeToProPopUp = () => {
        setIsUpgradeToProPopUpOpen(false);
        navigate("/pricing");

    }


    const handleSelectConversation = async (conversationId: string) => {
        setIsAnswering(true);
        navigate(`/chat/${conversationId}`);

        // Aggiorna lo stato locale
        setConversation_id(conversationId);
        setMessages([]);
        setIsNewChat(false);

        setIsConversationFavourite(false);

        // Carica messaggi
        const messages = await getMessages(conversationId);
        // All'onload prendo i messaggi e li mostro
        setMessages(messages || []);
        setIsAnswering(false);
    };


    const MarkdownRenderer = ({ text }: { text: string }) => {
        const safe = text || "";
        const withLatex = convertLatexInMarkdown(safe);
        const html = marked(withLatex);

        return (
            <div
                className="renderChat"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );


    };
    const handleNewChat: () => void = (): void => {
        // Invalida richieste pendenti: incrementa fetchId così risposte in arrivo saranno ignorate
        fetchIdRef.current++;

        setIsNewChat(true);
        setMessages([]);
        setConversation_id("");
        setPrompt("");
        setIsAnswering(false);
        setJustCreatedChat(true);
        setIsConversationFavourite(false);


        // naviga alla route newchat
        navigate("/newchat");
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            (messagesEndRef.current as any).scrollTop = (messagesEndRef.current as any).scrollHeight - 500;
        }


    }, [messages]);


    return (
        <div className={`flex  bg-[var(--background-Primary)] ${currentFontFamily}`}>

            <Leftbar onSelectConversation={handleSelectConversation} conversations={conversations}
                setConversations={setConversations} fetchConversations={fetchConversations}
                conversation_id={conversation_id} isConversationLoading={isConversationLoading}
                handleNewChat={handleNewChat} isMinimized={isMinimized} setIsMinimized={setIsMinimized}
            />

            <div
                className="w-full relative bg-[var(--background-Primary)] h-screen overflow-hidden flex flex-col items-center justify-between">
                {/* sezione messaggi */}

                <div className="w-full flex items-center  justify-between py-2 px-2.5">
                    {/*Header*/}
                    <div className="flex items-center text-[var(--color-primary)]  gap-2">
                        {isMinimized && <div><Menu
                            className="w-5 cursor-pointer left-0 h-5"
                            onClick={() => setIsMinimized(!isMinimized)} /></div>}
                        {conversation_id ? conversations.find((c) => c.id === conversation_id)?.title : "New Chat"}</div>
                    <div className="flex gap-0  text-[var(--color-third)]">
                        <button className="relative group p-1.5 hover:bg-[var(--background-Secondary)]  flex items-center text-[var(--color-primary)] rounded-lg">
                            Share

                            <Tooltip text="Export conversation to pdf" position="bottom" />

                        </button>


                        <button onClick={handleFavouriteConversation} className="cursor-pointer relative group hover:bg-[var(--background-Secondary)] rounded-lg p-1.5">

                            {isConversationFavourite ? <Tooltip text="Remove from favorites" position="bottom-right" /> : <Tooltip text="Add to favorites" position="bottom-right" />}
                            {isConversationFavourite ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fde047" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" /></svg>}</button>
                        <button className="cursor-pointer relative group hover:bg-[var(--background-Secondary)] rounded-lg p-1.5" onClick={() => setIsDarkMode(!isDarkMode)}>{!isDarkMode ? <SunMedium /> : <Moon />}
                            <Tooltip text="Toggle theme mode" position="bottom-right" />
                        </button>
                        <button onClick={() => setIsConversationOptionsOpen(!isConversationOptionsOpen)} className="cursor-pointer relative group hover:bg-[var(--background-Secondary)] rounded-lg p-1.5">
                            {!isConversationOptionsOpen && <Tooltip text="More options" position="bottom-right" />}
                            <Ellipsis className="hover:text-[var(--color-primary)]" /></button>
                        {isConversationOptionsOpen && <ConversationOption isConversationOptionsOpen={isConversationOptionsOpen} />}
                    </div>
                </div>



                <div className="  overflow-auto flex h-full flex-col pb-20 w-full items-center"
                    ref={messagesEndRef}>
                    <div>
                        {messages.map((m, i) => (
                            <div key={i} className="flex flex-col mb-4 lg:w-[750px] w-[500px] ">
                                {m.sender && (
                                    <div
                                        className="max-w-[100%] mb-4 p-2 text-[var(--color-secondary)]  rounded-xl bg-[var(--background-Tertiary)] border border-[var(--border-Tertiary)] px-4 self-end text-right">
                                        {m.sender}
                                    </div>
                                )}
                                {m.content && (
                                    <div
                                        className="max-w-[100%] text-[var(--color-primary)] p-2 rounded-xl  px-4 self-start text-left">
                                        <MarkdownRenderer text={m.content} />
                                    </div>

                                )}

                            </div>
                        ))}
                        {isAnswering && (
                            <div className="loader"></div>
                        )}

                        {messages.length === 0 && !isAnswering && (
                            <div className="flex flex-col min-h-full items-center">
                                <LandingChat selectedPhrase={handleSelectQuickPhrase} />
                            </div>
                        )}

                    </div>

                </div>


                {isUpgradeToProPopUpOpen && (
                    <PlanPopUp handleUpgradeToProPopUp={handleUpgradeToProPopUp}
                        setIsUpgradeToProPopUpOpen={setIsUpgradeToProPopUpOpen} />

                )}
                {/* barra input */}
                <TextBar handleSend={handleSend} setModel={setModel}
                    setPrompt={setPrompt} prompt={prompt} isAnswering={isAnswering} />
            </div>
        </div>
    );
}

export default ChatPage;
