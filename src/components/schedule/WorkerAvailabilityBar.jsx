import React from 'react';
import { USERS } from '../../data/mockData';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function WorkerAvailabilityBar() {
  const workers = USERS.filter(u => u.role === 'worker');

  const statuses = [
    { id: 'user_dave', status: 'On Site', site: 'Washtenaw Historic', dot: 'bg-emerald-500' },
    { id: 'user_carlos', status: 'On Site', site: 'Barton Hills', dot: 'bg-emerald-500' },
    { id: 'user_sarah', status: 'On Site', site: 'Washtenaw Historic', dot: 'bg-emerald-500' },
    { id: 'user_leo', status: 'On Site', site: 'Barton Hills', dot: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-subtle space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Worker Availability</span>
        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          4 Crew Active On-Site
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {workers.map((worker) => {
          const st = statuses.find(s => s.id === worker.id) || { status: 'Available', site: 'Shop / Available', dot: 'bg-sky-500' };

          return (
            <div key={worker.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <div className="relative">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-7 h-7 rounded-full object-cover border border-white"
                />
                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${st.dot}`} />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-900 block leading-tight truncate">{worker.name.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-500 truncate block">{st.site}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
