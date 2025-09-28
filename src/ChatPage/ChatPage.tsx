import {useState, useEffect, useRef,} from "react";
import Leftbar from "./Leftbar/Leftbar";
import runChat from "../../api/gemini-generate.js";
import TextBar from "./Textbar/Textbar.jsx";
import supabase from "../../src/library/supabaseclient.js";
import {marked} from "marked";
import createMessage from "../services/conversations/createMessage.js";
import createConversation from "../services/conversations/createConversation.js";
import getMessages from "../services/conversations/getMessages.js";
import LandingChat from "./LandingChat/LandingChat.js";
import avaibleModels from "../library/avaibleModels.js";
import {useNavigate, useParams} from "react-router";

import PlanPopUp from "./PlanPopUp/PlanPopUp.jsx";
import {ArrowRightToLine} from "lucide-react";
import getAllConversations from "../services/conversations/getConversations.js";
import getUserPreferences from "../services/userSettings/getUserPreferences.js";
import type {User} from '@supabase/supabase-js';

import {Dispatch, SetStateAction} from "react";


class Message {
    sender: string = "";

    content: string = "";
    conversation_id: string = "";
    id: string = "";
    created_at: string = "";
}

type Style = {
    theme: string;
    fontFamily: string;
}

type Conversation = {
    id: string;
    title: string;
    created_at: string;
}

type Preferences = {
    style: Style[];
}


function ChatPage() {
    const {chatId} = useParams();
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
    const fetchIdRef = useRef(0);

    useEffect(() => {
        getUser();
        fetchConversations();
    }, []);

    const fetchConversations: () => Promise<void> = async () => {
        const {data: {session}} = await supabase.auth.getSession();
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
                    navigate("/404", {replace: true});
                } else {
                    setMessages(msgs);
                    setConversation_id(chatId);
                    setIsNewChat(false);
                }
            } catch (err) {
                // Se errore e request non invalidato -> fallback
                if (localFetchId !== fetchIdRef.current) return;
                console.error("loadChat error:", err);
                navigate("/404", {replace: true});
            } finally {
                if (localFetchId === fetchIdRef.current) {
                    setIsConversationLoading(false);
                }
            }
        };

        loadChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);


    useEffect(() => {

        console.log("Conversation id: " + conversation_id);

    }, [conversation_id]);

    const getUser: () => void = async (): Promise<void> => {
        try {
            const {data: {user} = {}} = await supabase.auth.getUser();

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

                const rawTitle: string = await runChat(titlePrompt, model.id);
                const chatTitle: string = safeToString(rawTitle);
                const conversation: any = await createConversation(user_id, chatTitle);
                convId = conversation?.[0]?.id ?? conversation?.id;
                setConversation_id(convId);
                setIsNewChat(false); // <- molto importante!
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
            const rawReply = await runChat("You are an helpful assistant, return content in markdown styled with header, bullet list, list, tables if needed prompt:" + prompt, model.id);

            const reply = safeToString(rawReply);

            // Aggiorna l'ultimo messaggio con la risposta AI
            setMessages((prev) =>
                prev.map((m, idx) =>
                    idx === prev.length - 1
                        ? {...m, content: reply, conversation_id: convId}
                        : m
                )
            );


            setIsAnswering(false);
            setPrompt("");
            // Salva messaggi sul DB
            await createMessage(userMessage.sender, reply, convId);
            navigate(`/chat/${convId}`);
            await fetchConversations()
        } catch (err) {
            console.error("handleSend error:", err);
        }
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

        // Carica messaggi
        const messages = await getMessages(conversationId);
        // All'onload prendo i messaggi e li mostro
        setMessages(messages || []);
        setIsAnswering(false);
    };


    const MarkdownRenderer = ({text}: { text: string }) => {
        const safe = text || "";

        // Converti Markdown in HTML
        let html = marked(safe);

        // Avvolgi ogni <code> che non è già in <pre>


        return <div className="renderChat" dangerouslySetInnerHTML={{__html: html}}/>;
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

        // naviga alla route newchat
        navigate("/newchat");
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            (messagesEndRef.current as any).scrollTop = (messagesEndRef.current as any).scrollHeight;
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
                className="w-full relative  bg-[var(--background-Primary)]  h-screen overflow-auto flex flex-col items-center justify-center">
                {/* sezione messaggi */}
                {isMinimized && <div><ArrowRightToLine
                    className="w-5 text-[var(--color-Secondary)] ml-1 absolute top-3 cursor-pointer left-0 h-5"
                    onClick={() => setIsMinimized(!isMinimized)}/></div>}
                <div className="overflow-y  overflow-auto h-full pb-40 md:p-4 p-0 flex flex-col"
                     ref={messagesEndRef}>
                    {messages.map((m, i) => (
                        <div key={i} className="flex flex-col mb-4 lg:w-[750px] w-[500px] ">
                            {m.sender && (
                                <div
                                    className="max-w-[100%] mb-4 p-2 text-gray-200  rounded-xl bg-[var(--background-Tertiary)] border border-[var(--border-Tertiary)] px-4 self-end text-right">
                                    {m.sender}
                                </div>
                            )}
                            {m.content && (
                                <div
                                    className="max-w-[100%] text-gray-200 p-2 rounded-xl  px-4 self-start text-left">
                                    <MarkdownRenderer text={m.content}/>
                                </div>
                            )}
                        </div>
                    ))}

                    {messages.length === 0 && !isAnswering && (
                        <LandingChat selectedPhrase={handleSelectQuickPhrase}/>
                    )}

                    {/* Loader AI */}
                    {isAnswering && (
                        <div className=" text-gray-200 absolute top-[50%] left-[50%] self-start text-left">
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
                {isUpgradeToProPopUpOpen && (
                    <PlanPopUp handleUpgradeToProPopUp={handleUpgradeToProPopUp}
                               setIsUpgradeToProPopUpOpen={setIsUpgradeToProPopUpOpen}/>

                )}
                {/* barra input */}
                <TextBar handleSend={handleSend} setModel={setModel}
                         setPrompt={setPrompt} prompt={prompt} isAnswering={isAnswering}/>
            </div>
        </div>
    );
}

export default ChatPage;
