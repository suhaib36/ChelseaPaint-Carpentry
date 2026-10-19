import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-chelsea-500 shrink-0" />,
  };

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 border border-slate-700/60 pointer-events-auto">
        {icons[toastMessage.type] || icons.success}
        <span className="font-medium text-slate-100 flex-1">{toastMessage.message}</span>
      </div>
    </div>
  );
}
