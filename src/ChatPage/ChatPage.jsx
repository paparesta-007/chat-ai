import { useState, useEffect, useRef } from "react";
import Leftbar from "./Leftbar/Leftbar";
import runChat from "../../api/gemini-generate.js";
import TextBar from "./Textbar/Textbar.jsx";
import supabase from "../../src/library/supabaseclient.js";
import { marked } from "marked";
import createMessage from "../services/createMessage.js";
import createConversation from "../services/createConversation.js";
import getMessages from "../services/getMessages.js";

function ChatPage() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [isNewChat, setIsNewChat] = useState(true);
    const [user_id, setUser_id] = useState(null);
    const [conversation_id, setConversation_id] = useState(null);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        console.log("Conversation id: " + conversation_id);
    }, [conversation_id]);

    const getUser = async () => {
        try {
            const { data: { user } = {} } = await supabase.auth.getUser();
            if (user?.id) setUser_id(user.id);
        } catch (err) {
            console.error("getUser error:", err);
        }
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

        try {
            let convId = conversation_id;

            if (isNewChat) {
                const titlePrompt = `Write a short title 5-10 word about, return 1 concise phrase, avoid markdown styling : ${prompt}`;
                const rawTitle = await runChat(titlePrompt);
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

            // Ottieni risposta AI
            const rawReply = await runChat(prompt);
            const reply = safeToString(rawReply);

            // Aggiorna l'ultimo messaggio con la risposta AI
            setMessages((prev) =>
                prev.map((m, idx) =>
                    idx === prev.length - 1
                        ? { ...m, content: reply, conversation_id: convId }
                        : m
                )
            );

            // Salva messaggi sul DB
            await createMessage(userMessage.sender, reply, convId);
        } catch (err) {
            console.error("handleSend error:", err);
        }
    };




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


    const MarkdownRenderer = ({ text }) => {
        const safe = safeToString(text);
        // marked può avere API .parse in alcune versioni, ma marked(safe) funziona generalmente
        const html = marked(safe || "");
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    const handleSendMessageTest = async () => {
        if (conversation_id === null) return;
        console.log(conversation_id);
        await createMessage(
            "Chi è Cristiano Ronaldo",
            "Cristiano Ronaldo è un giocatore di calcio",
            conversation_id
        );
        console.log("Messaggio inviato");
    };

    return (
        <div className="flex bg-black gap-2">
            <Leftbar onSelectConversation={handleSelectConversation} />
            <div className="w-full relative bg-[var(--background-Primary)] overflow-auto flex flex-col sm:px-[5%] md:px-[10%] lg:px-[10%] px-[5%]">
                {/* sezione messaggi */}
                <div className="overflow-y current-chat overflow-auto h-screen pb-40 p-4 flex flex-col" ref={messagesEndRef}>
                    {messages.map((m, i) => (
                        <div key={i} className="flex flex-col mb-4">
                            {m.sender ? (
                                <div
                                    className={`max-w-[100%] mb-4 text-gray-200 p-2 rounded-xl 
                    bg-[var(--background-Tertiary)] border border-[var(--border-Tertiary)] px-4 self-end text-right`}
                                >
                                    <MarkdownRenderer text={m.sender} />
                                </div>
                            ) : null}

                            {m.content ? (
                                <div
                                    className={`max-w-[100%] text-gray-200 p-2 rounded-xl 
                    tracking-wider bg-[var(--background-Secondary)] border border-[var(--border-secondary)] px-4 self-start text-left`}
                                >
                                    <MarkdownRenderer text={m.content} />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    <button
                        className="bg-red-500 fixed bottom-4 right-4 border  border-red-400 cursor-pointer p-2 rounded-md"
                        onClick={() => handleSendMessageTest()}
                    >
                        Messaggio Test
                    </button>
                </div>

                {/* barra input */}
                <TextBar handleSend={handleSend} setPrompt={setPrompt} prompt={prompt} />
            </div>
        </div>
    );
}

export default ChatPage;
