import React from 'react';
import { Clock, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../common/Badge';
import { USERS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function DayCalendar({ dateStr, events }) {
  const { navigateTo, updateScheduleJob } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Timeline for {dateStr}</span>
        <span>{events.length} Site Visits</span>
      </div>

      {events.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="font-semibold text-slate-700">No work scheduled for this day</p>
          <p className="text-slate-400 mt-0.5">Tap + Schedule Job above to book a crew visit.</p>
        </div>
      ) : (
        events.map((visit) => {
          const assignedCrew = visit.assignedWorkers.map(id => USERS.find(u => u.id === id)).filter(Boolean);

          return (
            <div
              key={visit.id}
              onClick={() => navigateTo({ tab: 'projects', projectId: visit.projectId, projectTab: 'schedule' })}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-subtle hover:border-chelsea-300 transition-all cursor-pointer group space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                      {visit.type}
                    </span>
                    <StatusBadge status={visit.status} size="small" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-chelsea-700 transition-colors">
                    {visit.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-chelsea-600 block">
                    {visit.projectName}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs font-extrabold text-slate-900">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{visit.timeWindow}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] truncate">{visit.siteAddress}</span>
                </div>

                <div className="flex items-center -space-x-1.5 shrink-0">
                  {assignedCrew.map((user) => (
                    <img
                      key={user.id}
                      src={user.avatar}
                      alt={user.name}
                      title={user.name}
                      className="w-5 h-5 rounded-full border border-white object-cover shadow-2xs"
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
