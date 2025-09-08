import { useState, useEffect } from "react";
import Leftbar from "./Leftbar/Leftbar";
import runChat from "../../api/gemini-generate.js";
import TextBar from "./Textbar/Textbar.jsx";
import supabase from "../../src/library/supabaseclient.js";
import createConversation from "../services/createConversation.js"
function ChatPage() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [isNewChat, setIsNewChat] = useState(true);
    const [user_id, setUser_id] = useState(1);

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser_id(user.id)
    }
    const handleSend = async () => {
        if (prompt !== "") {
            // 1. Aggiungo messaggio utente
            setMessages((prev) => [...prev, { role: "user", text: prompt }]);

            // 2. Chiamata API
            const reply = await runChat(prompt);

            // 3. Aggiungo messaggio modello
            setMessages((prev) => [...prev, { role: "model", text: reply }]);

            // 4. Se è una nuova chat, crea titolo e conversazione
            if (isNewChat) {
                // Usa direttamente il prompt appena inviato
                const titlePrompt = `Write a short title (max 5/10 words) that summarizes this message avoid styling, bold, italic, etc : ${prompt}`;
                const chatTitle = await runChat(titlePrompt);

                await createConversation(user_id, chatTitle);

                setIsNewChat(false);
                alert("Nuova chat creata");
            }

            // 5. Reset input
            setPrompt("");
        }
    };


    return (
        <div className="flex bg-black gap-2">
            <Leftbar />
            <div className="w-full relative bg-[var(--background-Primary)] overflow-auto flex flex-col px-[20%]">
                {/* sezione messaggi */}
                <div className="flex-1 overflow-y-auto border overflow-auto h-screen border-red-500 p-4 flex flex-col">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`mb-2 max-w-[100%] text-white p-2 rounded-xl 
                             ${m.role === "user"
                                ? "bg-[var(--background-Tertiary)] border border-[var(--border-Tertiary)] px-4 text-white self-end text-right"
                                : "tracking-wider"
                            }`}
                        >
                            {m.text}
                        </div>
                    ))}
                </div>


                {/* barra input */}
                <TextBar handleSend={handleSend} setPrompt={setPrompt} />
            </div>
        </div>
    );
}

export default ChatPage;
