import React from 'react';
import { CircleUserRound, Settings2, Brush } from 'lucide-react';
import {Link, NavLink, Outlet} from "react-router";

const Settings = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="h-screen w-[250px] text-[var(--color-primary)] p-2 bg-[var(--background-Primary)] flex flex-col relative">
                <ul className="flex flex-col gap-4">
                    <li>
                        <NavLink to="general" className="flex items-center gap-2 hover:text-[var(--color-Tertiary)]">
                            <Settings2 /> General
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="customization" className="flex items-center gap-2 hover:text-[var(--color-Tertiary)]">
                            <Brush /> Customization
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="account" className="flex items-center gap-2 hover:text-[var(--color-Tertiary)]">
                            <CircleUserRound /> Account
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Contenuto dinamico */}
            <div className="w-[calc(100%-250px)] h-screen bg-[var(--background-Secondary)] p-4 overflow-auto">
                <Outlet /> {/* Qui React Router inserisce la pagina giusta */}
            </div>
            <Link to="/chat" className="fixed top-4 right-4  text-[var(--color-primary)] ">X</Link>
        </div>
    );
};

export default Settings;
