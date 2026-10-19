import React from 'react';
import { Home, FolderKanban, CheckSquare, Calendar, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
  const { activeTab, setActiveTab, setSelectedProjectId, messages } = useApp();

  const totalUnreadMessages = messages.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: totalUnreadMessages },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'projects' && activeTab === 'projects') {
      setSelectedProjectId(null);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto grid grid-cols-5 h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-col items-center justify-center pt-1.5 pb-1 transition-all select-none group active:scale-95 ${
                isActive ? 'text-chelsea-500 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                {/* Active subtle background pill */}
                {isActive && (
                  <span className="absolute -inset-1.5 bg-chelsea-50 rounded-full scale-100 transition-transform" />
                )}
                <Icon
                  className={`relative w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-chelsea-500' : 'group-hover:scale-105'
                  }`}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
                {/* Badge if any */}
                {Boolean(tab.badge) && (
                  <span className="absolute -top-1.5 -right-2 bg-chelsea-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`relative text-[11px] mt-1 tracking-tight ${
                isActive ? 'text-chelsea-600 font-bold' : 'text-slate-500 font-medium'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 bg-chelsea-500 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
