import React from 'react';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Plus,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  FileCheck,
  TrendingUp,
  FileText,
  Camera,
  MessageSquare,
  Sparkles,
  HardHat
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, JobTypeBadge } from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import { USERS } from '../../data/mockData';

export default function HomeDashboard() {
  const {
    currentRole,
    currentUser,
    projects,
    tasks,
    schedule,
    changeOrders,
    photos,
    dailyReports,
    navigateTo,
    setCreateProjectModalOpen,
    setCreateTaskModalOpen,
    setDailyReportModalOpen,
    setUploadPhotoModalOpen,
  } = useApp();

  const isWorker = currentRole === 'worker';

  // Metrics
  const activeProjects = projects.filter(p => p.status === 'In Progress');
  const upcomingProjects = projects.filter(p => p.status === 'Scheduled' || p.status === 'Estimate');
  const completedProjects = projects.filter(p => p.status === 'Completed');
  const overdueTasks = tasks.filter(t => t.isOverdue && t.status !== 'Completed');

  // Filter for worker if worker role
  const workerTasks = isWorker
    ? tasks.filter(t => t.assignedTo === currentUser.id && t.status !== 'Completed')
    : tasks.filter(t => t.status !== 'Completed');

  const todayStr = '2026-10-20';
  const todaySchedule = schedule.filter(s => {
    if (isWorker) {
      return s.date === todayStr && s.assignedWorkers.includes(currentUser.id);
    }
    return s.date === todayStr;
  });

  const pendingApprovals = changeOrders.filter(co => co.status === 'Pending');

  return (
    <div className="p-4 space-y-5 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-chelsea-500 via-chelsea-600 to-chelsea-800 rounded-2xl p-4 text-white shadow-card relative overflow-hidden">
        {/* Subtle decorative architectural curves */}
        <div className="absolute right-0 top-0 -translate-y-4 translate-x-4 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-rose-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Ann Arbor & Chelsea, MI Operations</span>
            </div>
            <h1 className="text-xl font-bold font-serif tracking-tight text-white">
              Good morning, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-rose-100/90 mt-0.5">
              {isWorker
                ? `You have ${todaySchedule.length} active site visits scheduled today.`
                : `${activeProjects.length} active jobs in progress • ${pendingApprovals.length} pending approvals`}
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/20 text-center">
            <span className="text-[10px] text-rose-200 block uppercase font-bold tracking-wider">Today</span>
            <span className="text-sm font-extrabold text-white">Oct 20</span>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-3 gap-2">
          {!isWorker ? (
            <>
              <button
                onClick={() => setCreateProjectModalOpen(true)}
                className="bg-white text-chelsea-700 hover:bg-rose-50 text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Job</span>
              </button>
              <button
                onClick={() => setCreateTaskModalOpen(true)}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 border border-white/20 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Assign Task</span>
              </button>
              <button
                onClick={() => setDailyReportModalOpen(true)}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 border border-white/20 transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Daily Log</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setDailyReportModalOpen(true)}
                className="bg-white text-chelsea-700 hover:bg-rose-50 text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Daily Log</span>
              </button>
              <button
                onClick={() => setUploadPhotoModalOpen(true)}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 border border-white/20 transition-all active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Add Photo</span>
              </button>
              <button
                onClick={() => navigateTo({ tab: 'tasks' })}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 border border-white/20 transition-all active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>My Tasks</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div
          onClick={() => navigateTo({ tab: 'projects' })}
          className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-chelsea-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Active Jobs</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{activeProjects.length}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">on track</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo({ tab: 'projects' })}
          className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-chelsea-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Upcoming</span>
            <div className="w-7 h-7 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{upcomingProjects.length}</span>
            <span className="text-[11px] text-slate-500">pipeline</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo({ tab: 'projects' })}
          className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-chelsea-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Completed</span>
            <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{completedProjects.length}</span>
            <span className="text-[11px] text-slate-500">finished</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo({ tab: 'tasks' })}
          className={`bg-white p-3 rounded-2xl border shadow-subtle transition-all cursor-pointer group ${
            overdueTasks.length > 0 ? 'border-rose-200 bg-rose-50/20 hover:border-rose-300' : 'border-slate-200/80 hover:border-chelsea-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Overdue</span>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              overdueTasks.length > 0 ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
            }`}>
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className={`text-2xl font-bold ${overdueTasks.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {overdueTasks.length}
            </span>
            <span className="text-[11px] text-rose-500 font-semibold">needs action</span>
          </div>
        </div>
      </div>

      {/* Today's Schedule Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Today's Schedule</h2>
              <p className="text-[11px] text-slate-500">October 20, 2026</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo({ tab: 'schedule' })}
            className="text-xs font-semibold text-chelsea-600 hover:text-chelsea-700 flex items-center gap-0.5"
          >
            <span>Full Calendar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {todaySchedule.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">No visits scheduled for today.</div>
          ) : (
            todaySchedule.map((visit) => {
              const assignedUserObjects = visit.assignedWorkers.map(id => USERS.find(u => u.id === id)).filter(Boolean);

              return (
                <div
                  key={visit.id}
                  onClick={() => navigateTo({ tab: 'projects', projectId: visit.projectId, projectTab: 'schedule' })}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 transition-all cursor-pointer flex flex-col gap-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-chelsea-700 transition-colors">
                        {visit.projectName}
                      </h3>
                      <p className="text-[11px] text-slate-600 font-medium">{visit.title}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 shrink-0">
                      {visit.timeWindow}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                    <div className="flex items-center gap-1 truncate max-w-[200px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{visit.siteAddress}</span>
                    </div>

                    <div className="flex items-center -space-x-1.5 shrink-0">
                      {assignedUserObjects.map((user) => (
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

      {/* Pending Change Orders & Approvals Section */}
      {(!isWorker || pendingApprovals.length > 0) && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Pending Approvals</h2>
                <p className="text-[11px] text-slate-500">Requires review before billing</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingApprovals.length} Pending
            </span>
          </div>

          <div className="space-y-2">
            {pendingApprovals.length === 0 ? (
              <p className="text-xs text-slate-500 py-2 text-center">All change orders have been reviewed.</p>
            ) : (
              pendingApprovals.slice(0, 2).map((co) => {
                const project = projects.find(p => p.id === co.projectId);

                return (
                  <div
                    key={co.id}
                    onClick={() => navigateTo({ tab: 'projects', projectId: co.projectId, projectTab: 'changeOrders' })}
                    className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/30 hover:bg-amber-50/60 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-amber-800 block truncate">
                          {project?.name || 'Project'}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 truncate">{co.title}</h3>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                        +${Number(co.totalPrice).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                      <span>Requested by {co.requestedBy}</span>
                      <span className="text-chelsea-600 font-semibold hover:underline flex items-center gap-0.5">
                        <span>Review</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Project Progress Cards */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Active Job Progress</h2>
            <p className="text-[11px] text-slate-500">Live completion & deadlines</p>
          </div>
          <button
            onClick={() => navigateTo({ tab: 'projects' })}
            className="text-xs font-semibold text-chelsea-600 hover:text-chelsea-700 flex items-center gap-0.5"
          >
            <span>All Jobs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {activeProjects.slice(0, 3).map((proj) => {
            return (
              <div
                key={proj.id}
                onClick={() => navigateTo({ tab: 'projects', projectId: proj.id })}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <JobTypeBadge type={proj.jobType} />
                      <StatusBadge status={proj.status} size="small" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-chelsea-600 transition-colors">
                      {proj.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{proj.progress}%</span>
                </div>

                <ProgressBar value={proj.progress} size="small" />

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Due {proj.deadline}</span>
                  <div className="flex items-center -space-x-1.5">
                    {proj.assignedTeam.map((id) => {
                      const user = USERS.find(u => u.id === id);
                      if (!user) return null;
                      return (
                        <img
                          key={user.id}
                          src={user.avatar}
                          alt={user.name}
                          title={user.name}
                          className="w-4 h-4 rounded-full border border-white object-cover"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Team Activity Feed */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Field Activity</h2>
            <p className="text-[11px] text-slate-500">Real-time team updates & logs</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Live Feed
          </span>
        </div>

        <div className="space-y-3">
          {/* Latest photo */}
          {photos[0] && (
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="leading-snug">
                  <span className="font-bold text-slate-900">{photos[0].uploader}</span> uploaded a {photos[0].category.toLowerCase()} photo for <span className="font-semibold text-slate-900">{projects.find(p => p.id === photos[0].projectId)?.name}</span>.
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">{photos[0].timestamp}</span>
              </div>
            </div>
          )}

          {/* Latest daily report */}
          {dailyReports[0] && (
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="leading-snug">
                  <span className="font-bold text-slate-900">{dailyReports[0].author}</span> submitted daily log ({dailyReports[0].hoursWorked} hrs) on <span className="font-semibold text-slate-900">{projects.find(p => p.id === dailyReports[0].projectId)?.name}</span>.
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">{dailyReports[0].date}</span>
              </div>
            </div>
          )}

          {/* Task update */}
          <div className="flex items-start gap-2.5 text-xs text-slate-700">
            <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <p className="leading-snug">
                <span className="font-bold text-slate-900">Dave Miller</span> updated status on <span className="font-semibold text-slate-900">"Final topcoat on south dormer"</span> to In Progress.
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Today at 8:15 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
