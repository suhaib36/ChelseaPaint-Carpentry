import React, { useState } from 'react';
import { X, CheckCheck, Bell, AlertTriangle, FileText, Camera, CheckSquare, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationDrawer() {
  const {
    notificationDrawerOpen,
    setNotificationDrawerOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo,
  } = useApp();

  const [filter, setFilter] = useState('all');

  if (!notificationDrawerOpen) return null;

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'approval') return n.type === 'approval';
    if (filter === 'task') return n.type === 'task' || n.type === 'issue';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'approval':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'task':
        return <CheckSquare className="w-4 h-4 text-sky-600" />;
      case 'photo':
        return <Camera className="w-4 h-4 text-emerald-600" />;
      case 'report':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-chelsea-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id);
    navigateTo({
      tab: item.targetTab,
      projectId: item.targetProjectId,
      projectTab: item.targetSection,
      taskId: item.targetTaskId,
      convId: item.targetConvId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md mx-auto bg-white rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chelsea-50 flex items-center justify-center text-chelsea-600">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Notifications & Activity</h3>
              <p className="text-[11px] text-slate-500">Stay updated on team actions</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllNotificationsRead}
              className="p-1.5 text-xs text-slate-500 hover:text-chelsea-600 rounded-lg hover:bg-slate-50 flex items-center gap-1 font-medium transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xs:inline">Read all</span>
            </button>
            <button
              onClick={() => setNotificationDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs overflow-x-auto">
          {['all', 'unread', 'approval', 'task'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all whitespace-nowrap ${
                filter === f
                  ? 'bg-chelsea-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f === 'approval' ? 'Approvals' : f === 'task' ? 'Tasks' : f}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="font-medium">No notifications in this filter</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 my-0.5 ${
                  item.read
                    ? 'hover:bg-slate-50 text-slate-600'
                    : 'bg-chelsea-50/40 hover:bg-chelsea-50/70 text-slate-800'
                }`}
              >
                <div className={`p-2 rounded-xl mt-0.5 ${
                  item.read ? 'bg-slate-100' : 'bg-white shadow-xs ring-1 ring-slate-200'
                }`}>
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className={`text-xs truncate ${!item.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-chelsea-600 hover:text-chelsea-700">
                    <span>Tap to view details</span>
                    <span>→</span>
                  </div>
                </div>

                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-chelsea-500 shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
