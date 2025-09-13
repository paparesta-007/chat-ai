import React, {useEffect} from 'react';
import { useState } from 'react';
import supabase from '../../library/supabaseclient.js';
import chatQuickFunction from '../../library/chatQuickFunction.js';
const LandingChat = () => {
    const [user, setUser] = useState(null);
    const date=new Date()
    const hours = date.getHours();
    let greeting=getGreeting();
    const [quickFunction,setQuickFunction]=useState([]);
    useEffect(()=>{

        const fetchUser=async()=>{
            const { data: { user } = {} } = await supabase.auth.getUser();
            if (user?.id) setUser(user);
        }
        const getRandomQuickFunction=()=>{
            const functionNumber=3;
            return  chatQuickFunction.sort(()=>Math.random()-0.5).slice(0,functionNumber);

        }
        setQuickFunction(getRandomQuickFunction());
        fetchUser();
    },[])
    function getGreeting(){
        let greeting;
        if (hours >= 0 && hours < 12) {
            greeting='Good Morning';
        } else if (hours >= 12 && hours < 17) {
            greeting='Good Afternoon';
        } else {
            greeting='Good Evening';
        }
        return greeting
    }
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-white">{greeting} {user?.email} </h1>
            <div className="flex mt-10 gap-x-4">
                {quickFunction.map((item,index)=>{
                    return(
                        <div key={index} className="bg-[var(--background-Secondary)] text-white  p-4 rounded-2xl cursor-pointer border border-[var(--border-secondary)]">
                            <h2 className="text-sm ">{item.title}</h2>

                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default LandingChat;
