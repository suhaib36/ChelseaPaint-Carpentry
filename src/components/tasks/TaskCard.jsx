import React from 'react';
import { Calendar, MessageSquare, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { PriorityBadge, StatusBadge } from '../common/Badge';
import { USERS } from '../../data/mockData';

export default function TaskCard({ task, project, onSelect, onStatusChange, onReportProblem }) {
  const assignedUser = USERS.find(u => u.id === task.assignedTo);

  return (
    <div
      onClick={() => onSelect(task.id)}
      className={`p-3.5 rounded-2xl bg-white border transition-all cursor-pointer shadow-subtle hover:border-chelsea-300 group ${
        task.isOverdue && task.status !== 'Completed' ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80'
      }`}
    >
      {/* Top Badges & Priority */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <PriorityBadge priority={task.priority} size="small" />
          <StatusBadge status={task.status} size="small" />
          {task.isOverdue && task.status !== 'Completed' && (
            <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
              OVERDUE
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span className={task.isOverdue && task.status !== 'Completed' ? 'text-rose-600 font-bold' : ''}>
            {task.dueDate}
          </span>
        </div>
      </div>

      {/* Project Reference */}
      {project && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-chelsea-600 block truncate">
          {project.name}
        </span>
      )}

      {/* Task Title */}
      <h3 className="text-xs font-bold text-slate-900 mt-0.5 leading-snug group-hover:text-chelsea-700 transition-colors">
        {task.title}
      </h3>

      {/* Reported Problem Alert */}
      {task.issueReported && (
        <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Issue Flagged: </span>
            <span className="line-clamp-2">{task.issueReported.text}</span>
          </div>
        </div>
      )}

      {/* Footer Info & Status Actions */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {assignedUser && (
            <div className="flex items-center gap-1.5">
              <img
                src={assignedUser.avatar}
                alt={assignedUser.name}
                className="w-5 h-5 rounded-full object-cover border border-slate-200 shadow-2xs"
              />
              <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[90px]">
                {assignedUser.name.split(' ')[0]}
              </span>
            </div>
          )}

          {task.comments && task.comments.length > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] text-slate-400 font-medium">
              <MessageSquare className="w-3 h-3 text-slate-400" />
              <span>{task.comments.length}</span>
            </span>
          )}
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onReportProblem(task)}
            className="px-2 py-1 rounded-lg text-[10px] font-semibold text-amber-700 hover:bg-amber-50 border border-amber-200 transition-colors"
            title="Report job issue"
          >
            Issue
          </button>

          {task.status !== 'Completed' ? (
            <button
              onClick={() => onStatusChange(task.id, 'Completed')}
              className="px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Done</span>
            </button>
          ) : (
            <button
              onClick={() => onStatusChange(task.id, 'In Progress')}
              className="px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Reopen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
