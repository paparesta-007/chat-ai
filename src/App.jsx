import {useEffect, useState} from "react";
import "./App.css";
import ChatPage from "./ChatPage/ChatPage.js";
import {BrowserRouter, Routes, Route, Navigate} from "react-router";

import Login from "./Login/Login.jsx";

import supabase from "../src/library/supabaseclient.js";
import Pricing from "./Pricing/Pricing.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Settings from "./Settings/Setting.jsx";
import GeneralSettings from "./Settings/General/General.jsx";
import AccountSettings from "./Settings/Account/Account.jsx";
import CustomizationSettings from "./Settings/Customization/Customization.tsx";
import ReleaseNotes from "./ReleaseNotes/ReleaseNotes.jsx";
import PageNotFound from "./404Page/404page.jsx";
import Explore from "./Explore/Explore.jsx";
import PdfAnalyzer from "./pdfAnalyzer/pdfAnalyzer.tsx";
import Test from "./Test/test";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Recupera subito la sessione
        supabase.auth.getSession().then(({data: {session}}) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });


        // Listener su login/logout
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
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
        return <div className="loader"></div>; // spinner o skeleton
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Landing page pubblica */}
                <Route path="/" element={<LandingPage/>}/>

                {/* Login */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/newchat"/> : <Login/>}
                />

                <Route path="/newchat" element={<ChatPage/>}/>
                <Route path="/chat/:chatId" element={<ChatPage/>}/>
                <Route path="/chat" element={<Navigate to="/newchat"/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/pdf" element={<PdfAnalyzer/>}/>
                <Route path="/settings" element={<Settings/>}>
                    <Route path="general" element={<GeneralSettings/>}/>
                    <Route path="account" element={<AccountSettings/>}/>
                    <Route path="customization" element={<CustomizationSettings/>}/>
                </Route>
                <Route path="/test" element={<Test/>}/>
                <Route path="/release-notes" element={<ReleaseNotes/>}/>
                {/* Catch-all */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
