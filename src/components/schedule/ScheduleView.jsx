import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import DayCalendar from './DayCalendar';
import WeekCalendar from './WeekCalendar';
import MonthCalendar from './MonthCalendar';
import WorkerAvailabilityBar from './WorkerAvailabilityBar';
import ScheduleJobModal from './ScheduleJobModal';

export default function ScheduleView() {
  const {
    schedule,
    setScheduleJobModalOpen,
    currentRole
  } = useApp();

  const [viewMode, setViewMode] = useState('week'); // 'day' | 'week' | 'month'

  const todayStr = '2026-10-20';
  const todayEvents = schedule.filter(s => s.date === todayStr);

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Title & Add Visit Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 font-serif">Job Schedule</h1>
          <p className="text-xs text-slate-500">Site visits, consultations & crew shifts</p>
        </div>

        {currentRole !== 'worker' && (
          <button
            onClick={() => setScheduleJobModalOpen(true)}
            className="flex items-center gap-1.5 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Job</span>
          </button>
        )}
      </div>

      {/* View Mode Toggle: Day, Week, Month */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/80 rounded-xl text-xs font-bold">
        {[
          { id: 'day', label: 'Day View' },
          { id: 'week', label: 'Week View' },
          { id: 'month', label: 'Month View' },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setViewMode(v.id)}
            className={`py-1.5 rounded-lg transition-all text-center ${
              viewMode === v.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Quick Mobile Access: Today's Jobs Highlight */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-3.5 text-white shadow-subtle flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-chelsea-500 text-white flex items-center justify-center font-extrabold text-xs">
            20
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-rose-300 block">Today's Jobs Quick Access</span>
            <span className="text-xs font-semibold text-slate-200">
              {todayEvents.length} Active Crews On Site (Ann Arbor & Barton Hills)
            </span>
          </div>
        </div>
        <button
          onClick={() => setViewMode('day')}
          className="text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg transition-colors"
        >
          View
        </button>
      </div>

      {/* Worker Availability Bar */}
      <WorkerAvailabilityBar />

      {/* Active Calendar View */}
      {viewMode === 'day' && (
        <DayCalendar dateStr={todayStr} events={todayEvents} />
      )}
      {viewMode === 'week' && (
        <WeekCalendar schedule={schedule} />
      )}
      {viewMode === 'month' && (
        <MonthCalendar schedule={schedule} />
      )}

      {/* Schedule Job Form Modal */}
      <ScheduleJobModal />
    </div>
  );
}
