import React, { useState } from 'react';
import DayCalendar from './DayCalendar';

export default function WeekCalendar({ schedule }) {
  // Current week centered around Oct 20, 2026
  const weekDays = [
    { day: 'Mon', date: '19', fullDate: '2026-10-19' },
    { day: 'Tue', date: '20', fullDate: '2026-10-20' }, // Today
    { day: 'Wed', date: '21', fullDate: '2026-10-21' },
    { day: 'Thu', date: '22', fullDate: '2026-10-22' },
    { day: 'Fri', date: '23', fullDate: '2026-10-23' },
    { day: 'Sat', date: '24', fullDate: '2026-10-24' },
    { day: 'Sun', date: '25', fullDate: '2026-10-25' },
  ];

  const [selectedDay, setSelectedDay] = useState('2026-10-20');

  const selectedEvents = schedule.filter(s => s.date === selectedDay);

  return (
    <div className="space-y-4">
      {/* 7-Day Pill Selector Strip */}
      <div className="grid grid-cols-7 gap-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-subtle text-center">
        {weekDays.map((w) => {
          const isSelected = selectedDay === w.fullDate;
          const isToday = w.fullDate === '2026-10-20';
          const dayHasEvents = schedule.some(s => s.date === w.fullDate);

          return (
            <button
              key={w.fullDate}
              onClick={() => setSelectedDay(w.fullDate)}
              className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center relative ${
                isSelected
                  ? 'bg-chelsea-500 text-white shadow-xs'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                {w.day}
              </span>
              <span className="text-sm font-extrabold my-0.5">{w.date}</span>
              {dayHasEvents && (
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-chelsea-500'}`} />
              )}
              {isToday && !isSelected && (
                <span className="text-[9px] text-chelsea-600 font-bold block">Today</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Content */}
      <DayCalendar dateStr={selectedDay} events={selectedEvents} />
    </div>
  );
}
