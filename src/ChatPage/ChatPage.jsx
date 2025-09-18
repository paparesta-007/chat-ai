import {useState, useEffect, useRef} from "react";
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
import {useNavigate} from "react-router";

import PlanPopUp from "./PlanPopUp/PlanPopUp.jsx";

function ChatPage() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [isNewChat, setIsNewChat] = useState(true);
    const [user_id, setUser_id] = useState(null);
    const [conversation_id, setConversation_id] = useState(null);
    const messagesEndRef = useRef(null);
    const [isAnswering, setIsAnswering] = useState(false);
    const [selectedPhraseQuick, setSelectedPhraseQuick] = useState("");
    const [model, setModel] = useState(avaibleModels[2]);
    const [isUpgradeToProPopUpOpen, setIsUpgradeToProPopUpOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        console.log("Conversation id: " + conversation_id);
    }, [conversation_id]);

    const getUser = async () => {
        try {
            const {data: {user} = {}} = await supabase.auth.getUser();
            if (user?.id) setUser_id(user.id);

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
                console.log("Conversation created?", conversation);
                // Prendi sempre l'id ritornato dal backend
                convId = conversation?.[0]?.id ?? conversation?.id;

                if (!convId) {
                    console.error("❌ createConversation non ha ritornato un id valido:", conversation);
                    return;
                }

                setConversation_id(convId); // aggiorna lo stato per le chiamate future
                setIsNewChat(false);
                console.log("✅ Nuova conversazione creata con id:", convId);
            }

            // Ora convId è sicuro
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
        } catch (err) {
            console.error("handleSend error:", err);
        }
    };

    const handleUpgradeToProPopUp = () => {
        setIsUpgradeToProPopUpOpen(false);
        navigate("/pricing");
    }


    const handleSelectConversation = async (conversationId) => {
        // 1) Cambia id conversazione
        setConversation_id(conversationId);

        // 2) Pulisce il contenitore
        setMessages([]);

        // 3) Imposta flag isNewChat su false, perché stiamo aprendo una conversazione esistente
        setIsNewChat(false);

        // 4) Carica i messaggi
        const messages = await getMessages(conversationId);
        setMessages(messages || []);
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

    };

    return (
        <div className="flex bg-[var(--background-Primary)] gap-2">

            <Leftbar onSelectConversation={handleSelectConversation} handleNewChat={handleNewChat}/>
            <div
                className="w-full relative bg-[var(--background-Primary)] overflow-auto flex flex-col sm:px-[5%] md:px-[5%] lg:px-[10%] px-[5%]">
                {/* sezione messaggi */}
                <div className="overflow-y current-chat overflow-auto h-screen pb-40 p-4 flex flex-col"
                     ref={messagesEndRef}>
                    {messages.map((m, i) => (
                        <div key={i} className="flex flex-col mb-4">
                            {m.sender && (
                                <div
                                    className="max-w-[100%] mb-4 p-2 text-gray-200  rounded-xl bg-[var(--background-Tertiary)] border border-[var(--border-Tertiary)] px-4 self-end text-right">
                                    {m.sender}
                                </div>
                            )}
                            {m.content && (
                                <div
                                    className="max-w-[100%] text-gray-200 p-2 rounded-xl border border-[var(--border-secondary)] px-4 self-start text-left">
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
                        <div className=" text-gray-200  self-start text-left">
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
                {isUpgradeToProPopUpOpen && (
                    <PlanPopUp handleUpgradeToProPopUp={handleUpgradeToProPopUp} setIsUpgradeToProPopUpOpen={setIsUpgradeToProPopUpOpen}/>

                )}
                {/* barra input */}
                <TextBar handleSend={handleSend} setModel={setModel} selectedPhraseQuick={selectedPhraseQuick}
                         setPrompt={setPrompt} prompt={prompt} isAnswering={isAnswering}/>
            </div>
        </div>
    );
}

export default ChatPage;
