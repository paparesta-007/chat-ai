import React, { useEffect, useState } from 'react';
import { useNavigate, } from "react-router";
import discoverIcon from "../../assets/discover.svg";
import supabase from "../../library/supabaseclient.js";
import getAllConversations from "../../services/getConversations.js";
const Leftbar = ({onSelectConversation}) => {
    const [user, setUser] = useState(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchConversations = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                console.log("Session found");
                setUser(session.user);

                const convers = await getAllConversations(session.user.id);
                console.log(`Number of conversations found: ${convers.length}`)
                setConversations(convers);
            } else {
                console.log("No session found");
                setUser(null);
            }
        };

        fetchConversations();
    }, []);

    const handleLogout = async () => {
        console.log("Logout");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="h-screen w-[300px] text-white p-2 bg-[var(--background-Primary)] flex flex-col relative">


        <div className="flex flex-col">
            <h2 onClick={() => navigate("/")} className="flex mb-5 w-30 hover:bg-[var(--background-Secondary)] cursor-pointer rounded-lg py-2 px-1 text-lg  gap-2"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#2ed992" width="40" height="30" viewBox="0 0 50 50"> <path d="M 25 4.5 C 15.204 4.5 5.9439688 11.985969 3.9179688 21.542969 C 3.9119687 21.571969 3.9200156 21.599906 3.9160156 21.628906 C 1.5620156 23.233906 -0.04296875 26.383 -0.04296875 30 C -0.04296875 35.238 3.3210312 39.5 7.4570312 39.5 C 7.7850313 39.5 8.0913438 39.339313 8.2773438 39.070312 C 8.4643437 38.800312 8.5065781 38.456438 8.3925781 38.148438 C 8.3775781 38.110438 6.9550781 34.244 6.9550781 29.5 C 6.9550781 24.506 8.3091719 22.022187 8.3261719 21.992188 C 8.5011719 21.683187 8.4983125 21.305047 8.3203125 20.998047 C 8.1433125 20.689047 7.8130313 20.5 7.4570312 20.5 C 7.0350313 20.5 6.62275 20.554625 6.21875 20.640625 C 8.58675 12.613625 16.57 6.5 25 6.5 C 32.992 6.5 40.688641 12.044172 43.431641 19.576172 C 43.133641 19.530172 42.831438 19.5 42.523438 19.5 C 42.169438 19.5 41.841109 19.689094 41.662109 19.996094 C 41.482109 20.302094 41.481297 20.683187 41.654297 20.992188 C 41.668297 21.016188 43.023437 23.5 43.023438 28.5 C 43.023438 32.44 42.045078 35.767641 41.705078 36.806641 C 40.558078 37.740641 38.815344 39.034297 36.777344 40.154297 C 36.016344 39.305297 34.839391 38.873437 33.650391 39.148438 L 31.867188 39.558594 C 31.024188 39.751594 30.308609 40.262094 29.849609 40.996094 C 29.391609 41.728094 29.245453 42.5965 29.439453 43.4375 C 29.783453 44.9335 31.11975 45.949219 32.59375 45.949219 C 32.83275 45.949219 33.074359 45.923187 33.318359 45.867188 L 35.103516 45.455078 C 35.945516 45.262078 36.661141 44.752531 37.119141 44.019531 C 37.503141 43.406531 37.653984 42.698234 37.583984 41.990234 C 39.728984 40.828234 41.570453 39.481469 42.814453 38.480469 C 46.814453 38.285469 50.023438 34.114 50.023438 29 C 50.023438 25.237 48.284437 21.989172 45.773438 20.451172 C 45.769438 20.376172 45.777859 20.301563 45.755859 20.226562 C 43.152859 11.113563 34.423 4.5 25 4.5 z M 12 19 C 11.447 19 11 19.447 11 20 L 11 32 C 11 32.553 11.447 33 12 33 L 28.044922 33 C 27.540922 34.057 26.743578 35.482375 26.142578 36.484375 C 25.941578 36.819375 25.954828 37.2405 26.173828 37.5625 C 26.360828 37.8395 26.673 38 27 38 C 27.055 38 27.109063 37.995328 27.164062 37.986328 C 33.351062 36.955328 38.412 32.95125 38.625 32.78125 C 38.862 32.59125 39 32.304 39 32 L 39 20 C 39 19.447 38.553 19 38 19 L 12 19 z M 13 21 L 37 21 L 37 31.501953 C 35.952 32.266953 32.821953 34.393672 29.001953 35.513672 C 29.643953 34.334672 30.328469 32.955266 30.480469 32.197266 C 30.539469 31.903266 30.462438 31.598187 30.273438 31.367188 C 30.082438 31.135188 29.8 31 29.5 31 L 13 31 L 13 21 z M 44.121094 21.822266 C 46.378094 22.758266 48.023437 25.622 48.023438 29 C 48.023438 32.456 46.299891 35.373281 43.962891 36.238281 C 44.420891 34.565281 45.023438 31.747 45.023438 28.5 C 45.023438 25.445 44.556094 23.226266 44.121094 21.822266 z M 5.859375 22.822266 C 5.423375 24.225266 4.9570313 26.445 4.9570312 29.5 C 4.9570312 32.747 5.5595781 35.565281 6.0175781 37.238281 C 3.6805781 36.373281 1.9570312 33.456 1.9570312 30 C 1.9570312 26.622 3.602375 23.758266 5.859375 22.822266 z M 18.5 23 C 17.098 23 16 24.317 16 26 C 16 27.683 17.098 29 18.5 29 C 19.902 29 21 27.683 21 26 C 21 24.317 19.902 23 18.5 23 z M 31.5 23 C 30.098 23 29 24.317 29 26 C 29 27.683 30.098 29 31.5 29 C 32.902 29 34 27.683 34 26 C 34 24.317 32.902 23 31.5 23 z M 18.5 25 C 18.677 25 19 25.38 19 26 C 19 26.62 18.677 27 18.5 27 C 18.323 27 18 26.62 18 26 C 18 25.38 18.323 25 18.5 25 z M 31.5 25 C 31.677 25 32 25.38 32 26 C 32 26.62 31.677 27 31.5 27 C 31.323 27 31 26.62 31 26 C 31 25.38 31.323 25 31.5 25 z M 34.376953 41.064453 C 34.605953 41.064453 34.83225 41.128906 35.03125 41.253906 C 35.31025 41.428906 35.504125 41.702391 35.578125 42.025391 C 35.652125 42.348391 35.598828 42.678984 35.423828 42.958984 C 35.248828 43.237984 34.976297 43.433812 34.654297 43.507812 L 34.652344 43.507812 L 32.869141 43.917969 C 32.208141 44.071969 31.540672 43.654234 31.388672 42.990234 C 31.314672 42.668234 31.369922 42.337641 31.544922 42.056641 C 31.719922 41.777641 31.992453 41.581813 32.314453 41.507812 L 34.097656 41.097656 C 34.190656 41.076656 34.284953 41.064453 34.376953 41.064453 z"></path> </svg>
                <span className="text-[#2ed992]">ChatAI</span></h2>
            <button className="actionBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg><span>New Chat</span></button>
            <button className="actionBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
            </svg><span>Explore</span></button>
        </div>
            <h4 className="text-[var(--color-primary)] mt-4">Chat</h4>
           <div className="chat-container">

               {conversations.length > 0 ? (
                   conversations.map((conversation) => (
                       <button key={conversation.id} onClick={() => onSelectConversation(conversation.id)} className=" text-left p-2 border border-transparent cursor-pointer hover:border-[var(--border-primary)] rounded-lg bg-[var(--background-Secondary)]">{conversation.title}</button>
                   ))
               ) : <p>No conversations found</p>}
           </div>
           <div className="user-container "
           onClick={() => setIsSettingOpen(!isSettingOpen)}>
               <img src="https://upload.wikimedia.org/wikipedia/it/6/69/Il_Bambino_%28Guerre_stellari%29.png"
                    className="w-10 h-10 rounded-full object-cover" alt="" />
               <h3>Tommaso</h3>
           </div>



           {isSettingOpen && (
               <div className="settings">
                   <button onClick={() => navigate("/pricing")}>Upgrade plan <small className="bg-violet-900 border border-violet-500 text-white px-2 rounded-lg">Pro</small></button>
                   <button>Settings</button>
                   <button onClick={handleLogout}>Logout</button>
               </div>
           )}
       </div>
    );
};

export default Leftbar;
