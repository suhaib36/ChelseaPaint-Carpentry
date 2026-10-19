import React, { useState } from 'react';
import DayCalendar from './DayCalendar';

export default function MonthCalendar({ schedule }) {
  const [selectedDate, setSelectedDate] = useState('2026-10-20');

  // October 2026 starts on Thursday (index 4) and has 31 days
  const daysInMonth = 31;
  const startDayOffset = 4; // Thursday

  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getFullDate = (dayNum) => {
    const formatted = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    return `2026-10-${formatted}`;
  };

  const selectedEvents = schedule.filter(s => s.date === selectedDate);

  return (
    <div className="space-y-4">
      {/* Month Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">October 2026</h3>
          <span className="text-xs font-semibold text-slate-500">Washtenaw Fall Schedule</span>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-xs">
          {/* Empty cells before 1st */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty_${i}`} className="h-8" />
          ))}

          {dayNumbers.map((num) => {
            const dateStr = getFullDate(num);
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === '2026-10-20';
            const hasEvents = schedule.some(s => s.date === dateStr);

            return (
              <button
                key={num}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-9 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                  isSelected
                    ? 'bg-chelsea-500 text-white font-bold shadow-xs'
                    : isToday
                    ? 'bg-rose-50 text-chelsea-700 font-bold border border-rose-200'
                    : 'text-slate-700 hover:bg-slate-100 font-medium'
                }`}
              >
                <span>{num}</span>
                {hasEvents && (
                  <span className={`w-1 h-1 rounded-full mt-0.5 ${
                    isSelected ? 'bg-white' : 'bg-chelsea-500'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Timeline */}
      <DayCalendar dateStr={selectedDate} events={selectedEvents} />
    </div>
  );
}
