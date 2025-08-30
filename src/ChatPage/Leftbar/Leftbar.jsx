import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Leftbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                console.log("Session found");
                setUser(session.user); // salva l'utente nello stato
            } else {
                console.log("No session found");
                setUser(null); // nessun utente loggato
            }
        });
    }, []);

    return (
       <div className="h-screen w-[250px] bg-[var(--background-Primary)]">
           <h2>Chat AI</h2>
           <div className="chat-container"></div>
           <div className="user-container">
               <img src="" alt="" />
               <h3>Tommaso</h3>
           </div>
       </div>
    );
};

export default Leftbar;
