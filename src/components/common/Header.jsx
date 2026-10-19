import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';

export default function Header() {
  const {
    currentUser,
    currentRole,
    setNotificationDrawerOpen,
    setRoleModalOpen,
    notifications,
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleConfigs = {
    owner: { label: 'Owner', color: 'bg-chelsea-50 text-chelsea-700 border-chelsea-200/80' },
    project_manager: { label: 'PM', color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80' },
    worker: { label: 'Field', color: 'bg-amber-50 text-amber-800 border-amber-200/80' },
  };

  const roleMeta = roleConfigs[currentRole] || roleConfigs.owner;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-16 px-3.5 sm:px-4 flex items-center justify-between transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-2">
        <Logo size="default" />
      </div>

      {/* Right Action Items */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Notification Bell */}
        <button
          onClick={() => setNotificationDrawerOpen(true)}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
          aria-label="View notifications"
          title="Notifications & Activity"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-chelsea-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Role Switcher Pill with User Avatar */}
        <button
          onClick={() => setRoleModalOpen(true)}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-slate-200 hover:border-chelsea-300 bg-slate-50/90 hover:bg-slate-100 transition-all text-left shadow-2xs group active:scale-95"
          title="Switch role (Owner / PM / Worker)"
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-white shadow-xs ring-1 ring-slate-200"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
          </div>

          <div className="flex flex-col pr-0.5">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-xs font-bold text-slate-800 group-hover:text-chelsea-600 truncate max-w-[75px] sm:max-w-[100px]">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-chelsea-600 transition-transform group-hover:translate-y-0.5" />
            </div>
            <span className={`text-[9px] uppercase tracking-wider font-extrabold px-1 rounded border leading-tight mt-0.5 w-fit ${roleMeta.color}`}>
              {roleMeta.label}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
