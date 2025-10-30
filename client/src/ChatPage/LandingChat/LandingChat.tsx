import React, {useEffect} from 'react';
import {useState} from 'react';
import supabase from '../../library/supabaseclient.js';
import chatQuickFunction from '../../data/chatQuickFunction.js';
import iconSlack from "../../../public/img/workspaceIcons/icons8-slack.png"
import iconNotion from "../../../public/img/workspaceIcons/icons8-notion.png"
import iconGmail from "../../../public/img/workspaceIcons/icons8-gmail.svg"
import iconTeams from "../../../public/img/workspaceIcons/icons8-microsoft-teams.png"
import iconGithub from "../../../public/img/workspaceIcons/icons8-github.svg"
import {LucideProps, X} from "lucide-react";
import {Link} from "react-router";
import type {User} from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from "react";
type QuickFunction = {
    title: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    link?: string;
    prompt: string;

}
interface LandingChatProps{
    selectedPhrase: (text: string) => void
}
const LandingChat: React.FC<LandingChatProps> = ({selectedPhrase}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isUpgradeConnectionsPopUpOpen, setIsUpgradeConnectionsPopUpOpen] = useState(true);
    const iconList = [
        {
            title: "Slack",
            icon: iconSlack,
            link: "https://slack.com"
        },
        {
            title: "Notion",
            icon: iconNotion,
            link: "https://notion.com"
        },
        {
            title: "Gmail",
            icon: iconGmail,
            link: "https://gmail.com"
        },
        {
            title: "Teams",
            icon: iconTeams,
            link: "https://teams.com"
        },
        {
            title: "Github",
            icon: iconGithub,
            link: "https://github.com"
        }
    ];
    const date: Date = new Date()
    const hours: number = date.getHours();
    let greeting: string = getGreeting();
    const [quickFunction, setQuickFunction] = useState<QuickFunction[]>([]);
    useEffect(() => {

        const fetchUser = async (): Promise<void> => {
            const {data: {user} = {}} = await supabase.auth.getUser();
            if (user?.id) setUser(user);

        }
        const getRandomQuickFunction = (): QuickFunction[] => {
            const functionNumber = 3;
            return chatQuickFunction.sort(() => Math.random() - 0.5).slice(0, functionNumber);

        }
        setQuickFunction(getRandomQuickFunction());
        fetchUser();
    }, [])

    function getGreeting(): string {
        let greeting;
        if (hours >= 0 && hours < 12) {
            greeting = 'Good Morning';
        } else if (hours >= 12 && hours < 17) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        return greeting
    }

    return (
        <div className="h-full w-full gap-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-center text-[var(--color-primary)]">{greeting} {user?.email} </h1>
            <div className="flex md:flex-row flex-col gap-4">
                {quickFunction.map((item:QuickFunction, index:number) => {
                    const Icon:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> = item.icon;
                    return (
                        <div key={index} onClick={() => {
                            selectedPhrase(item.prompt)
                        }}
                             className="bg-[var(--background-Secondary)] max-w-[250px] flex  gap-2 text-[var(--color-third)]  p-4 rounded-2xl cursor-pointer border border-[var(--border-secondary)]">
                            <Icon className="w-8 h-8 "/>
                            <h2 className="text-sm ">{item.title}</h2>

                        </div>
                    )
                })}
            </div>
            {isUpgradeConnectionsPopUpOpen && <div
                className="bg-[var(--background-Secondary)] border border-[var(--border-secondary)] md:w-[650px] w-full py-2 px-4 rounded-2xl flex md:flex-row flex-col items-center justify-between">
                <h3 className="text-[var(--color-primary)]">
                    Connect your workspace, <Link className="text-[var(--color-Tertiary)] hover:underline"
                                                  to="/pricing">upgrade to pro</Link>
                </h3>
                <div className="flex gap-1">
                    {iconList.map((icon, index) => {
                        return (
                            <div key={index} className="group relative cursor-help" onClick={() => {
                                window.open(icon.link, '_blank')
                            }}>
                                <img
                                    src={icon.icon}
                                    className="w-6 h-6 object-contain"
                                    alt={icon.title}/>
                                <div
                                    className="absolute left-1/2 bg-[var(--background-Secondary)] animate-slideDown
                                    rounded-full px-2 transition duration-300 ease-in-out text-[var(--color-third)]
                                    transform hidden group-hover:block -translate-x-1/2 top-full mt-4">
                                    {icon.title}
                                </div>
                            </div>
                        )
                    })}
                    <div className="cursor-pointer text-[var(--color-primary)] text-sm">
                        <X className="w-4 h-4"
                           onClick={() => {
                               setIsUpgradeConnectionsPopUpOpen(false)
                           }}/></div>
                </div>

            </div>}
        </div>
    );
};

export default LandingChat;
