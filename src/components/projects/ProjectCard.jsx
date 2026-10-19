import React from 'react';
import { MapPin, Calendar, Users, ChevronRight } from 'lucide-react';
import { StatusBadge, JobTypeBadge } from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import { USERS } from '../../data/mockData';

export default function ProjectCard({ project, onSelect }) {
  const assignedUsers = project.assignedTeam.map(id => USERS.find(u => u.id === id)).filter(Boolean);

  return (
    <div
      onClick={() => onSelect(project.id)}
      className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-subtle hover:shadow-card hover:border-chelsea-300 transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Top Badges & Status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <JobTypeBadge type={project.jobType} />
            <StatusBadge status={project.status} size="small" />
          </div>
          <span className="text-xs font-bold text-slate-800">{project.progress}%</span>
        </div>

        {/* Project & Client Title */}
        <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-chelsea-600 transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Client: <span className="text-slate-700 font-semibold">{project.customer}</span>
        </p>

        {/* Property Address */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{project.address}</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <ProgressBar value={project.progress} size="small" />
        </div>
      </div>

      {/* Footer Info: Deadline & Crew */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-500 text-[11px]">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>Due {project.deadline}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center -space-x-1.5">
            {assignedUsers.map((user) => (
              <img
                key={user.id}
                src={user.avatar}
                alt={user.name}
                title={user.name}
                className="w-5 h-5 rounded-full border border-white object-cover"
              />
            ))}
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-chelsea-600 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
}
