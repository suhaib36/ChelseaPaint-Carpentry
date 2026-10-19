import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { PriorityBadge, StatusBadge } from '../../common/Badge';
import { USERS } from '../../../data/mockData';

export default function ProjectTasksTab({ project }) {
  const {
    tasks,
    updateTaskStatus,
    setCreateTaskModalOpen,
    setCreateTaskDefaults,
    setSelectedTaskId,
    setReportProblemModalOpen,
    setProblemTaskTarget,
    currentRole
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');

  const projectTasks = tasks.filter(t => t.projectId === project.id);

  const filteredTasks = projectTasks.filter(t => {
    if (statusFilter === 'all') return true;
    return t.status === statusFilter;
  });

  const handleAddTask = () => {
    setCreateTaskDefaults({ projectId: project.id });
    setCreateTaskModalOpen(true);
  };

  const handleReportProblem = (e, task) => {
    e.stopPropagation();
    setProblemTaskTarget(task);
    setReportProblemModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Action & Filter Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto text-xs py-0.5">
          {['all', 'To Do', 'In Progress', 'Completed'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
                statusFilter === s
                  ? 'bg-chelsea-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s === 'all' ? `All (${projectTasks.length})` : s}
            </button>
          ))}
        </div>

        {currentRole !== 'worker' && (
          <button
            onClick={handleAddTask}
            className="flex items-center gap-1 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Task</span>
          </button>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No tasks in this section</p>
            <p className="text-slate-400 mt-0.5">All tasks for this filter have been completed or not yet created.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const assignedUser = USERS.find(u => u.id === task.assignedTo);

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className={`p-3.5 rounded-2xl bg-white border transition-all cursor-pointer shadow-subtle hover:border-chelsea-300 ${
                  task.isOverdue && task.status !== 'Completed' ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <PriorityBadge priority={task.priority} size="small" />
                    <StatusBadge status={task.status} size="small" />
                    {task.isOverdue && task.status !== 'Completed' && (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                        OVERDUE
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-500 font-medium">Due {task.dueDate}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 mt-2 leading-snug">
                  {task.title}
                </h3>

                {task.description && (
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                )}

                {/* Reported Problem Alert banner */}
                {task.issueReported && (
                  <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Problem Flagged: </span>
                      <span>{task.issueReported.text}</span>
                    </div>
                  </div>
                )}

                {/* Footer with Worker & Quick Status Toggles */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {assignedUser && (
                      <div className="flex items-center gap-1.5">
                        <img
                          src={assignedUser.avatar}
                          alt={assignedUser.name}
                          className="w-5 h-5 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-[11px] font-semibold text-slate-700">{assignedUser.name}</span>
                      </div>
                    )}
                    {task.comments.length > 0 && (
                      <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                        <MessageSquare className="w-3 h-3 text-slate-400" />
                        <span>{task.comments.length}</span>
                      </span>
                    )}
                  </div>

                  {/* Quick Status Buttons */}
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleReportProblem(e, task)}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold text-amber-700 hover:bg-amber-50 border border-amber-200 transition-colors"
                      title="Report an issue"
                    >
                      Report Issue
                    </button>

                    {task.status !== 'Completed' ? (
                      <button
                        onClick={() => updateTaskStatus(task.id, 'Completed')}
                        className="px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Done</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => updateTaskStatus(task.id, 'In Progress')}
                        className="px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                      >
                        Reopen
                      </button>
                    )}
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
