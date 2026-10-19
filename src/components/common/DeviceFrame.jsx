import React from 'react';
import { RotateCcw, ShieldCheck, Briefcase, HardHat } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DeviceFrame({ children }) {
  const { resetDemoData, currentRole, switchRole } = useApp();

  return (
    <div className="min-h-screen bg-slate-100/80 flex flex-col items-center justify-start antialiased text-slate-800">
      {/* Top Prototype Utility Bar (unobtrusive, helpful for testing roles) */}
      <aside aria-label="Prototype control toolbar" className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 px-3.5 py-1.5 flex flex-wrap items-center justify-between text-xs z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-chelsea-500 animate-pulse" />
          <span className="font-serif font-bold text-rose-300 tracking-wide text-xs">Chelsea Paint & Carpentry</span>
          <span className="text-slate-400 font-normal hidden sm:inline">| Mobile App Prototype</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-slate-400 text-[11px] hidden xs:inline">Quick Role:</span>
          <div className="flex bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/80 text-[11px]">
            <button
              onClick={() => switchRole('owner')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                currentRole === 'owner' ? 'bg-chelsea-500 text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="Jonah Brown — Founder & Owner"
            >
              Owner
            </button>
            <button
              onClick={() => switchRole('project_manager')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                currentRole === 'project_manager' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="Marcus Vance — Senior Project Manager"
            >
              PM
            </button>
            <button
              onClick={() => switchRole('worker')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                currentRole === 'worker' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="Dave Miller — Lead Painter"
            >
              Field Crew
            </button>
          </div>

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-slate-300 hover:text-rose-300 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Reset to default seeded demo data"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </aside>

      {/* Main Responsive Application Shell (Natural mobile-first layout) */}
      <main id="main-content" tabIndex="-1" className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto min-h-screen bg-slate-50 border-x border-slate-200/90 shadow-sm relative flex flex-col pb-20">
        {children}
      </main>
    </div>
  );
}
