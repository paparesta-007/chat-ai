import React, { useEffect, useState } from 'react';
import {
  CircleUserRound,
  Settings2,
  Brush,
  LayoutGrid,
  PanelRightOpen,
} from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Settings = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    console.log('isMinimized:', isMinimized);
  }, [isMinimized]);

  useEffect(() => {
    const handleShorCut = (e) => {
      if (e.key === '\\' && e.ctrlKey) {
        console.log('Ctrl + 1 pressed');
        setIsMinimized((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleShorCut);
    return () => {
      window.removeEventListener('keydown', handleShorCut);
    }
  }, []);
  return (
    <div className="flex relative h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`h-full select-none text-[var(--color-primary)] border-r border-dashed border-[var(--border-primary)] py-2 bg-[var(--background-Primary)] flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isMinimized ? 'w-16 px-2' : 'w-[250px] pl-2 pr-4'
        }`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="general"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:bg-[var(--background-Secondary)] p-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-[var(--background-Hover)] font-medium' : ''
                }`
              }
            >
              <Settings2 className="min-w-5 min-h-5" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isMinimized ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}
              >
                General
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="customization"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:bg-[var(--background-Secondary)] p-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-[var(--background-Hover)] font-medium' : ''
                }`
              }
            >
              <Brush className="min-w-5 min-h-5" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isMinimized ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}
              >
                Customization
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="api-integration"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:bg-[var(--background-Secondary)] p-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-[var(--background-Hover)] font-medium' : ''
                }`
              }
            >
              <LayoutGrid className="min-w-5 min-h-5" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isMinimized ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}
              >
                API Integration
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:bg-[var(--background-Secondary)] p-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-[var(--background-Hover)] font-medium' : ''
                }`
              }
            >
              <CircleUserRound className="min-w-5 min-h-5" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isMinimized ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}
              >
                Account
              </span>
            </NavLink>
          </li>
        </ul>

        {/* Toggle */}
        <div
          className="flex items-center justify-center hover:bg-[var(--background-Secondary)] p-2 rounded-md cursor-pointer transition-colors duration-200"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <PanelRightOpen
            className={`text-[var(--color-third)] w-5 h-5 transition-transform duration-300 ease-in-out ${
              isMinimized ? '' : 'rotate-180'
            }`}
          />
        </div>
      </div>

      {/* Contenuto dinamico */}
      <div className="flex-1 h-full bg-[var(--background-Primary)] p-8 overflow-auto">
        <Outlet />
      </div>

      {/* Close button */}
      <Link
        to="/chat"
        className="fixed top-4 right-4 text-[var(--color-primary)] hover:bg-[var(--background-Secondary)] w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
      >
        ✕
      </Link>
    </div>
  );
};

export default Settings;