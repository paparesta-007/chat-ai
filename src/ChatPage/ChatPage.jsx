import {useState, useEffect, useRef,} from "react";
import Leftbar from "./Leftbar/Leftbar";
import runChat from "../../api/gemini-generate.js";
import TextBar from "./Textbar/Textbar.jsx";
import supabase from "../../src/library/supabaseclient.js";
import {marked} from "marked";
import createMessage from "../services/conversations/createMessage.js";
import createConversation from "../services/conversations/createConversation.js";
import getMessages from "../services/conversations/getMessages.js";
import LandingChat from "./LandingChat/LandingChat.jsx";
import avaibleModels from "../library/avaibleModels.js";
import {useNavigate, useParams} from "react-router";

import PlanPopUp from "./PlanPopUp/PlanPopUp.jsx";
import {ArrowRightToLine} from "lucide-react";
import getAllConversations from "../services/conversations/getConversations.js";

function ChatPage() {
    const {chatId} = useParams();
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [isNewChat, setIsNewChat] = useState(true);
    const [user_id, setUser_id] = useState(null);
    const [conversation_id, setConversation_id] = useState(null);
    const messagesEndRef = useRef(null);
    const [isAnswering, setIsAnswering] = useState(false);

    const [model, setModel] = useState(avaibleModels[2]);
    const [isUpgradeToProPopUpOpen, setIsUpgradeToProPopUpOpen] = useState(false);
    const navigate = useNavigate();
    const [isMinimized, setIsMinimized] = useState(false);
    const [justCreatedChat, setJustCreatedChat] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [isConversationLoading, setIsConversationLoading] = useState(false);
    useEffect(() => {
        getUser();
        const fetchConversations = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if (session) {
                setIsConversationLoading(true);

                const convers = await getAllConversations(session.user.id);
                setConversations(convers);

                setIsConversationLoading(false);
            }
        };

        fetchConversations();
    }, []);


    useEffect(() => {
        const loadChat = async () => {
            if (!chatId) return setIsNewChat(true);

            // Se la chat è appena stata creata, non fare redirect
            if (justCreatedChat && chatId === conversation_id) return setJustCreatedChat(false);

            try {
                const msgs = await getMessages(chatId);
                if (!msgs || msgs.length === 0) {
                    navigate("/404", {replace: true});
                } else {
                    setMessages(msgs);
                    setConversation_id(chatId);
                    setIsNewChat(false);
                }
            } catch {
                navigate("/404", {replace: true});
            }
        };
        loadChat();
    }, [chatId, conversation_id, justCreatedChat]);


    useEffect(() => {
        console.log("Conversation id: " + conversation_id);

    }, [conversation_id]);

    const getUser = async () => {
        try {
            const {data: {user} = {}} = await supabase.auth.getUser();
            if (user?.id) setUser_id(user.id)


        } catch (err) {
            console.error("getUser error:", err);
        }
    };
    const handleSelectQuickPhrase = (text) => {

        setPrompt(text); // aggiorna la TextBar
    };

    const safeToString = (val) => {
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
            let convId = conversation_id;

            if (isNewChat) {

                const titlePrompt = `Write a short title 4-8 word about, return 1 concise phrase, avoid markdown styling : ${prompt}`;

                const rawTitle = await runChat(titlePrompt, model.id);
                const chatTitle = safeToString(rawTitle);
                const conversation = await createConversation(user_id, chatTitle);
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


            const userMessage = {
                sender: prompt,
                content: "",
                conversation_id: convId,
            };

            // Mostra subito messaggio utente
            setMessages((prev) => [...prev, userMessage]);
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
        } catch (err) {
            console.error("handleSend error:", err);
        }
    };

    const handleUpgradeToProPopUp = () => {
        setIsUpgradeToProPopUpOpen(false);
        navigate("/pricing");
    }


    const handleSelectConversation = async (conversationId) => {
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


    const MarkdownRenderer = ({text}) => {
        const safe = text || "";

        // Converti Markdown in HTML
        let html = marked(safe);

        // Avvolgi ogni <code> che non è già in <pre>


        return <div className="renderChat" dangerouslySetInnerHTML={{__html: html}}/>;
    };
    const handleNewChat = () => {
        setIsNewChat(true);
        setConversation_id(null);
        setMessages([]);
        navigate(`/newchat`);
    };


    return (
        <div className="flex  bg-[var(--background-Primary)]">

            <Leftbar onSelectConversation={handleSelectConversation} conversations={conversations}
                     setConversations={setConversations}
                     conversation_id={conversation_id} isConversationLoading={isConversationLoading}
                     handleNewChat={handleNewChat} isMinimized={isMinimized} setIsMinimized={setIsMinimized}
                     />

            <div
                className="w-full relative bg-[var(--background-Primary)] h-screen overflow-auto flex flex-col items-center justify-center">
                {/* sezione messaggi */}
                {isMinimized && <div><ArrowRightToLine
                    className="w-5 text-[var(--color-secondary)] ml-1 absolute top-3 cursor-pointer left-0 h-5"
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
