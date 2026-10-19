import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Image, Camera, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mockData';

export default function ChatConversation({ conversation, onBack }) {
  const { sendMessage, currentUser } = useApp();
  const [inputText, setInputText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(conversation.id, inputText.trim());
    setInputText('');
  };

  const handleSendSampleImage = (imgUrl) => {
    sendMessage(conversation.id, 'Sharing site progress photo from today:', imgUrl);
    setShowAttachMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Chat Top Bar */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3.5 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-600 hover:text-chelsea-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />

          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">{conversation.name}</h3>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{conversation.type === 'project' ? 'Project Crew Channel' : conversation.title || 'Online'}</span>
            </span>
          </div>
        </div>

        {conversation.type === 'direct' && (
          <a
            href="tel:7342604999"
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-chelsea-600 hover:bg-slate-50 transition-colors"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversation.messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          const senderObj = USERS.find(u => u.id === msg.senderId);

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <img
                  src={senderObj?.avatar || conversation.avatar}
                  alt={msg.senderName}
                  title={msg.senderName}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200 mb-0.5 shrink-0"
                />
              )}

              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-2xs text-xs space-y-1 ${
                isMe
                  ? 'bg-chelsea-500 text-white rounded-br-xs'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
              }`}>
                {!isMe && (
                  <span className="text-[10px] font-bold text-slate-500 block">
                    {msg.senderName}
                  </span>
                )}

                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {msg.image && (
                  <div className="rounded-xl overflow-hidden mt-1.5 border border-white/20">
                    <img src={msg.image} alt="Site attachment" className="w-full max-h-48 object-cover" />
                  </div>
                )}

                <div className={`text-[9px] text-right font-medium mt-1 ${isMe ? 'text-rose-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment popover */}
      {showAttachMenu && (
        <div className="px-4 py-2 bg-white border-t border-slate-200 text-xs flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Attach sample photo:</span>
          <button
            onClick={() => handleSendSampleImage('https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80')}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold"
          >
            Sash Paint
          </button>
          <button
            onClick={() => handleSendSampleImage('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80')}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold"
          >
            Ceiling Beam
          </button>
          <button
            onClick={() => handleSendSampleImage('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80')}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold"
          >
            Exterior Prep
          </button>
        </div>
      )}

      {/* Input Field */}
      <div className="p-3 bg-white border-t border-slate-200/90 shadow-md">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="p-2 text-slate-500 hover:text-chelsea-600 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
            title="Attach site photo"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder={`Message as ${currentUser.name.split(' ')[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 text-xs bg-slate-50 focus:bg-white"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 bg-chelsea-500 hover:bg-chelsea-600 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
