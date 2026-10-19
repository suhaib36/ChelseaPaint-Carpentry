import React, { useState } from 'react';
import { Search, Plus, Filter, CheckCircle2, Clock, ListFilter, User, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TaskCard from './TaskCard';
import TaskDetailModal from './TaskDetailModal';
import CreateTaskModal from './CreateTaskModal';
import ReportProblemModal from './ReportProblemModal';
import { USERS } from '../../data/mockData';

export default function TaskManager() {
  const {
    tasks,
    projects,
    setSelectedTaskId,
    updateTaskStatus,
    setCreateTaskModalOpen,
    setReportProblemModalOpen,
    setProblemTaskTarget,
    currentRole,
    currentUser,
  } = useApp();

  const [activeStatusTab, setActiveStatusTab] = useState('all'); // 'all' | 'To Do' | 'In Progress' | 'Completed'
  const [projectFilter, setProjectFilter] = useState('all');
  const [workerFilter, setWorkerFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [myTasksOnly, setMyTasksOnly] = useState(currentRole === 'worker');

  const overdueCount = tasks.filter(t => t.isOverdue && t.status !== 'Completed').length;

  const filteredTasks = tasks.filter(task => {
    // Search
    const q = searchQuery.toLowerCase().trim();
    if (q && !task.title.toLowerCase().includes(q) && !task.description?.toLowerCase().includes(q)) {
      return false;
    }

    // Status Tab
    if (activeStatusTab !== 'all' && task.status !== activeStatusTab) {
      return false;
    }

    // My Tasks Only toggle
    if (myTasksOnly && task.assignedTo !== currentUser.id) {
      return false;
    }

    // Project Filter
    if (projectFilter !== 'all' && task.projectId !== projectFilter) {
      return false;
    }

    // Worker Filter
    if (workerFilter !== 'all' && task.assignedTo !== workerFilter) {
      return false;
    }

    // Priority Filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
      return false;
    }

    return true;
  });

  const handleReportProblem = (task) => {
    setProblemTaskTarget(task);
    setReportProblemModalOpen(true);
  };

  const statusCounts = {
    'all': tasks.length,
    'To Do': tasks.filter(t => t.status === 'To Do').length,
    'In Progress': tasks.filter(t => t.status === 'In Progress').length,
    'Completed': tasks.filter(t => t.status === 'Completed').length,
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Title & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 font-serif">Tasks & Crew Work</h1>
          <p className="text-xs text-slate-500">
            {tasks.length} Total tasks • {overdueCount > 0 && <span className="text-rose-600 font-bold">{overdueCount} overdue</span>}
          </p>
        </div>

        <button
          onClick={() => setCreateTaskModalOpen(true)}
          className="flex items-center gap-1.5 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Overdue Alert banner if any */}
      {overdueCount > 0 && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs text-rose-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong className="font-bold">{overdueCount} task{overdueCount > 1 ? 's are' : ' is'} overdue.</strong> Review deadlines with field leads.
            </span>
          </div>
          <button
            onClick={() => {
              setActiveStatusTab('To Do');
              setPriorityFilter('High');
            }}
            className="text-[11px] font-bold text-rose-700 hover:underline shrink-0"
          >
            Filter
          </button>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search task title, prep instructions, or trade..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 shadow-subtle focus:outline-none focus:border-chelsea-500"
        />
      </div>

      {/* 3 Status Columns / Tabs: To Do, In Progress, Completed */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/80 rounded-xl text-xs font-bold">
        {['all', 'To Do', 'In Progress', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveStatusTab(tab)}
            className={`py-1.5 rounded-lg transition-all text-center ${
              activeStatusTab === tab
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="block capitalize truncate">{tab === 'all' ? 'All' : tab}</span>
            <span className="text-[10px] font-normal text-slate-400">({statusCounts[tab]})</span>
          </button>
        ))}
      </div>

      {/* Multi-Filters Row: Project, Worker, Priority & "My Tasks" switch */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {/* My Tasks Switch */}
        <button
          onClick={() => setMyTasksOnly(!myTasksOnly)}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
            myTasksOnly
              ? 'bg-chelsea-50 text-chelsea-700 border-chelsea-200'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Assigned to Me</span>
        </button>

        {/* Project Dropdown */}
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-chelsea-500"
        >
          <option value="all">All Projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* Worker Dropdown */}
        <select
          value={workerFilter}
          onChange={(e) => setWorkerFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-chelsea-500"
        >
          <option value="all">All Workers</option>
          {USERS.filter(u => u.role === 'worker').map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>

        {/* Priority Dropdown */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-chelsea-500"
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-2.5 pt-1">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-800 text-sm">No tasks match your filters</p>
            <p className="text-slate-400 mt-1 max-w-xs mx-auto">
              Try resetting your filter or search query.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const project = projects.find(p => p.id === task.projectId);

            return (
              <TaskCard
                key={task.id}
                task={task}
                project={project}
                onSelect={(id) => setSelectedTaskId(id)}
                onStatusChange={updateTaskStatus}
                onReportProblem={handleReportProblem}
              />
            );
          })
        )}
      </div>

      {/* Modals */}
      <TaskDetailModal />
      <CreateTaskModal />
      <ReportProblemModal />
    </div>
  );
}
