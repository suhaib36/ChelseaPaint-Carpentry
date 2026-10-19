import React, { useState } from 'react';
import { MessageSquare, Users, User, Search, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ChatConversation from './ChatConversation';

export default function MessagesView() {
  const { messages, activeConvId, setActiveConvId } = useApp();
  const [inConversation, setInConversation] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'projects' | 'direct'

  const activeConv = messages.find(c => c.id === activeConvId) || messages[0];

  if (inConversation && activeConv) {
    return (
      <ChatConversation
        conversation={activeConv}
        onBack={() => setInConversation(false)}
      />
    );
  }

  const projectConvs = messages.filter(c => c.type === 'project');
  const directConvs = messages.filter(c => c.type === 'direct');

  const handleSelectConv = (convId) => {
    setActiveConvId(convId);
    setInConversation(true);
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 font-serif">Team Communications</h1>
          <p className="text-xs text-slate-500">Project channels & direct crew messages</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
        {[
          { id: 'all', label: 'All Chats' },
          { id: 'projects', label: `Projects (${projectConvs.length})` },
          { id: 'direct', label: `Direct (${directConvs.length})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              filterType === f.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project Channels Section */}
      {(filterType === 'all' || filterType === 'projects') && (
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block px-1">
            Project Group Channels
          </span>

          <div className="space-y-2">
            {projectConvs.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(conv.id)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-subtle hover:border-chelsea-300 transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-chelsea-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-chelsea-600 transition-colors truncate">
                        {conv.name}
                      </h4>
                      {lastMsg && (
                        <span className="text-[10px] text-slate-400 shrink-0">{lastMsg.timestamp}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {lastMsg ? `${lastMsg.senderName.split(' ')[0]}: ${lastMsg.text}` : 'No messages yet'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Direct Messages Section */}
      {(filterType === 'all' || filterType === 'direct') && (
        <div className="space-y-2 pt-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block px-1">
            Direct Messages
          </span>

          <div className="space-y-2">
            {directConvs.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(conv.id)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-subtle hover:border-chelsea-300 transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-chelsea-600 transition-colors truncate">
                        {conv.name}
                      </h4>
                      {lastMsg && (
                        <span className="text-[10px] text-slate-400 shrink-0">{lastMsg.timestamp}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {lastMsg ? lastMsg.text : 'Tap to start conversation'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
