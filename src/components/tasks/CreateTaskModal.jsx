import React, { useState } from 'react';
import { X, CheckSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mockData';

export default function CreateTaskModal() {
  const {
    createTaskModalOpen,
    setCreateTaskModalOpen,
    createTaskDefaults,
    addTask,
    projects
  } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: createTaskDefaults.projectId || (projects[0]?.id || ''),
    assignedTo: 'user_dave',
    priority: 'Medium',
    status: 'To Do',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  });

  if (!createTaskModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    addTask({
      ...formData,
      projectId: formData.projectId || projects[0]?.id
    });

    setFormData({
      title: '',
      description: '',
      projectId: projects[0]?.id || '',
      assignedTo: 'user_dave',
      priority: 'Medium',
      status: 'To Do',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
    });
    setCreateTaskModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Assign New Task</h3>
            <p className="text-xs text-slate-500">Create work item for painters & carpenters</p>
          </div>
          <button
            onClick={() => setCreateTaskModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Task Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Scrape & prime exterior brackets on north wall"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Related Job / Project *</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.customer})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Assign Responsible Worker *</label>
            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white font-medium"
            >
              {USERS.filter(u => u.role === 'worker' || u.role === 'project_manager').map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} — {user.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Priority Level *</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Due Date *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Detailed Work Instructions</label>
            <textarea
              rows="3"
              placeholder="Specify tools, paint formulas, safety precautions, or prep instructions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCreateTaskModalOpen(false)}
              className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
