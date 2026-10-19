import React from 'react';
import { Phone, Mail, MapPin, Calendar, DollarSign, Users, Award, Clock } from 'lucide-react';
import ProgressBar from '../../common/ProgressBar';
import { USERS } from '../../../data/mockData';
import { useApp } from '../../../context/AppContext';

export default function OverviewTab({ project }) {
  const { currentRole } = useApp();
  const isWorker = currentRole === 'worker';

  const assignedUsers = project.assignedTeam.map(id => USERS.find(u => u.id === id)).filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Cover / Highlights */}
      {project.coverImage && (
        <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-subtle">
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-200 block mb-0.5">
              Chelsea PC Project Site
            </span>
            <h3 className="font-bold text-sm leading-tight text-white">{project.name}</h3>
          </div>
        </div>
      )}

      {/* Progress & Deadlines Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Job Completion</span>
          <span className="text-sm font-extrabold text-chelsea-600">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} size="large" />

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Start Date</span>
              <span className="font-semibold text-slate-800">{project.startDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Target Finish</span>
              <span className="font-semibold text-slate-800">{project.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer & Location Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Client & Property</h4>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Customer</span>
            <span className="font-bold text-slate-800">{project.customer}</span>
          </div>

          <div className="flex items-start justify-between gap-3 pt-1 border-t border-slate-100">
            <span className="text-slate-500 shrink-0">Site Address</span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(project.address)}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-chelsea-600 hover:underline text-right flex items-center gap-1 justify-end"
            >
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{project.address}</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-slate-500">Phone</span>
            <a href={`tel:${project.customerPhone}`} className="font-semibold text-slate-800 hover:text-chelsea-600 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{project.customerPhone}</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-slate-500">Email</span>
            <a href={`mailto:${project.customerEmail}`} className="font-medium text-slate-800 hover:text-chelsea-600 flex items-center gap-1 truncate max-w-[200px]">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{project.customerEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scope of Work Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle space-y-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Scope of Work</h4>
        <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
          {project.scope}
        </p>
        {project.description && (
          <p className="text-[11px] text-slate-500 italic mt-1">
            Note: {project.description}
          </p>
        )}
      </div>

      {/* Assigned Crew Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Assigned Crew</h4>
          <span className="text-[11px] font-semibold text-slate-500">{assignedUsers.length} Workers</span>
        </div>

        <div className="space-y-2">
          {assignedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-white shadow-xs"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 leading-tight">{user.name}</h5>
                  <span className="text-[10px] text-slate-500 font-medium">{user.specialty || user.title}</span>
                </div>
              </div>

              <a
                href={`tel:${user.phone}`}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-chelsea-600 shadow-xs"
                title={`Call ${user.name}`}
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Overview (Restricted if worker) */}
      {!isWorker && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Financial Summary</h4>
            <span className="text-[10px] font-bold text-slate-400">Owner & PM View</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Budget</span>
              <span className="text-xs font-bold text-slate-900">${project.estimatedBudget.toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Spent</span>
              <span className="text-xs font-bold text-chelsea-600">${project.actualCost.toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Remaining</span>
              <span className="text-xs font-bold text-emerald-600">
                ${Math.max(0, project.estimatedBudget - project.actualCost).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
