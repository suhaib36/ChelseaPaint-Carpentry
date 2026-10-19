import React, { useState } from 'react';
import { X, Calendar, User, CheckCircle2, Clock, MessageSquare, AlertTriangle, Send, Camera, History } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PriorityBadge, StatusBadge } from '../common/Badge';
import { USERS } from '../../data/mockData';

export default function TaskDetailModal() {
  const {
    selectedTaskId,
    setSelectedTaskId,
    tasks,
    projects,
    updateTaskStatus,
    addTaskComment,
    setReportProblemModalOpen,
    setProblemTaskTarget,
    currentUser,
  } = useApp();

  const [commentInput, setCommentInput] = useState('');

  if (!selectedTaskId) return null;

  const task = tasks.find(t => t.id === selectedTaskId);
  if (!task) return null;

  const project = projects.find(p => p.id === task.projectId);
  const assignedUser = USERS.find(u => u.id === task.assignedTo);

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addTaskComment(task.id, commentInput.trim());
    setCommentInput('');
  };

  const handleReportProblem = () => {
    setProblemTaskTarget(task);
    setReportProblemModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
            {task.isOverdue && task.status !== 'Completed' && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                OVERDUE
              </span>
            )}
          </div>
          <button
            onClick={() => setSelectedTaskId(null)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Project & Title */}
          <div>
            {project && (
              <span className="text-[10px] uppercase font-bold text-chelsea-600 tracking-wider block mb-1">
                {project.name}
              </span>
            )}
            <h2 className="text-base font-bold text-slate-900 leading-snug">{task.title}</h2>
          </div>

          {/* Description */}
          {task.description && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed font-normal">
              {task.description}
            </div>
          )}

          {/* Meta Grid (Worker & Deadline) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-2">
              {assignedUser && (
                <>
                  <img
                    src={assignedUser.avatar}
                    alt={assignedUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Worker</span>
                    <span className="font-bold text-slate-800">{assignedUser.name}</span>
                  </div>
                </>
              )}
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                <span className={`font-bold ${task.isOverdue && task.status !== 'Completed' ? 'text-rose-600' : 'text-slate-800'}`}>
                  {task.dueDate}
                </span>
              </div>
            </div>
          </div>

          {/* Reported Issue Banner */}
          {task.issueReported && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Problem Reported on Site</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                {task.issueReported.text}
              </p>
              <span className="text-[10px] text-rose-500 block pt-1 border-t border-rose-200/50">
                Reported by {task.issueReported.reportedBy} ({task.issueReported.timestamp})
              </span>
            </div>
          )}

          {/* Attached Photos */}
          {task.photos && task.photos.length > 0 && (
            <div>
              <span className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-slate-400" />
                <span>Attached Work Photos</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                {task.photos.map((url, i) => (
                  <div key={i} className="h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img src={url} alt="Task photo" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments & Discussion */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Comments & Crew Notes ({task.comments?.length || 0})</span>
            </span>

            <div className="space-y-2">
              {(!task.comments || task.comments.length === 0) ? (
                <p className="text-[11px] text-slate-400 italic py-1">No comments yet. Leave a note for the crew.</p>
              ) : (
                task.comments.map((c) => (
                  <div key={c.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <img src={c.avatar} alt={c.author} className="w-4 h-4 rounded-full object-cover" />
                        <span className="font-bold text-slate-800">{c.author}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({c.authorRole})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-5">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleSendComment} className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                placeholder={`Leave a comment as ${currentUser.name.split(' ')[0]}...`}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 text-xs"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2 bg-chelsea-500 hover:bg-chelsea-600 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Actions (Done / Reopen / Report Issue) */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={handleReportProblem}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Report Problem</span>
            </button>

            <div className="flex items-center gap-1.5">
              {task.status !== 'Completed' ? (
                <button
                  onClick={() => updateTaskStatus(task.id, 'Completed')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Completed</span>
                </button>
              ) : (
                <button
                  onClick={() => updateTaskStatus(task.id, 'In Progress')}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Move to In Progress
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
