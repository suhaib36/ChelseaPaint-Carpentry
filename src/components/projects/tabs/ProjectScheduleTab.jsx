import React from 'react';
import { Calendar, Plus, Clock, MapPin, Users } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { USERS } from '../../../data/mockData';
import { StatusBadge } from '../../common/Badge';

export default function ProjectScheduleTab({ project }) {
  const { schedule, setScheduleJobModalOpen, currentRole } = useApp();

  const projectVisits = schedule.filter(s => s.projectId === project.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Upcoming Site Visits & Shifts</h4>
          <p className="text-[11px] text-slate-500">Scheduled work shifts at {project.name}</p>
        </div>

        {currentRole !== 'worker' && (
          <button
            onClick={() => setScheduleJobModalOpen(true)}
            className="flex items-center gap-1 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Visit</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {projectVisits.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No scheduled visits for this project</p>
            <p className="text-slate-400 mt-0.5">Use Add Visit to assign a date, time window, and workers.</p>
          </div>
        ) : (
          projectVisits.map((visit) => {
            const assignedUserObjs = visit.assignedWorkers.map(id => USERS.find(u => u.id === id)).filter(Boolean);

            return (
              <div
                key={visit.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle space-y-2.5 hover:border-chelsea-300 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                        {visit.type}
                      </span>
                      <StatusBadge status={visit.status} size="small" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">{visit.title}</h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-900 block">{visit.date}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{visit.timeWindow}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-[11px] truncate max-w-[200px]">{visit.siteAddress}</span>
                  </div>

                  <div className="flex items-center -space-x-1.5">
                    {assignedUserObjs.map((user) => (
                      <img
                        key={user.id}
                        src={user.avatar}
                        alt={user.name}
                        title={user.name}
                        className="w-5 h-5 rounded-full border border-white object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
