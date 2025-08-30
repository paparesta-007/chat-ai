import { useEffect, useState } from "react";
import "./App.css";
import ChatPage from "./ChatPage/ChatPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { createClient } from "@supabase/supabase-js";
import Login from "./Login/Login.jsx";

import supabase from "../src/library/supabaseclient.js";
import Pricing from "./Pricing/Pricing.jsx";
function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Recupera subito la sessione
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listener su login/logout
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>; // spinner o skeleton
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Landing page pubblica */}
                <Route path="/" element={<><h1>Landing Page</h1></>} />

                {/* Login */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/chat" /> : <Login />}
                />

                {/* Chat protetta */}
                <Route
                    path="/chat"
                    element={user ? <ChatPage /> : <Navigate to="/login" />}
                />
                <Route path="/pricing" element={<Pricing/>} />
                {/* Catch-all */}
                <Route path="*" element={<>Page Not Found</>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
