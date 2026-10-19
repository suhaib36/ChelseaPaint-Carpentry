import React, { useState } from 'react';
import { X, Plus, Users, Calendar, DollarSign, MapPin, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mockData';

export default function CreateProjectModal() {
  const {
    createProjectModalOpen,
    setCreateProjectModalOpen,
    addProject,
    setSelectedProjectId,
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    customer: '',
    customerPhone: '',
    customerEmail: '',
    address: '',
    jobType: 'Painting',
    status: 'Scheduled',
    estimatedBudget: '',
    startDate: new Date().toISOString().split('T')[0],
    deadline: '',
    scope: '',
    description: '',
    assignedTeam: ['user_dave', 'user_sarah'],
  });

  if (!createProjectModalOpen) return null;

  const toggleWorker = (userId) => {
    setFormData(prev => {
      const exists = prev.assignedTeam.includes(userId);
      return {
        ...prev,
        assignedTeam: exists
          ? prev.assignedTeam.filter(id => id !== userId)
          : [...prev.assignedTeam, userId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.customer || !formData.address) return;

    const newProj = addProject({
      ...formData,
      estimatedBudget: parseFloat(formData.estimatedBudget) || 12000,
      deadline: formData.deadline || '2026-11-30',
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
    });

    setCreateProjectModalOpen(false);
    setSelectedProjectId(newProj.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Create New Job</h3>
            <p className="text-xs text-slate-500">Add a painting, carpentry or remodeling job</p>
          </div>
          <button
            onClick={() => setCreateProjectModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ives Woods Historic Trim & Exterior"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Thomas & Linda Hayes"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="(734) 555-0192"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Property Site Address *</label>
            <input
              type="text"
              required
              placeholder="e.g. 1820 Hill St, Ann Arbor, MI 48104"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Job Type *</label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
              >
                <option value="Painting">Painting</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Remodeling">Remodeling</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Initial Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
              >
                <option value="Estimate">Estimate</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Budget ($)</label>
              <input
                type="number"
                placeholder="15000"
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Finish</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Scope of Work *</label>
            <textarea
              required
              rows="3"
              placeholder="Detailed description of painting, carpentry, or remodeling work..."
              value={formData.scope}
              onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 resize-none"
            />
          </div>

          {/* Assigned Crew Selector */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Assign Field Workers</label>
            <div className="grid grid-cols-2 gap-2">
              {USERS.filter(u => u.role === 'worker').map((worker) => {
                const isAssigned = formData.assignedTeam.includes(worker.id);
                return (
                  <div
                    key={worker.id}
                    onClick={() => toggleWorker(worker.id)}
                    className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      isAssigned
                        ? 'border-chelsea-500 bg-rose-50/50 text-slate-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="truncate">
                      <span className="text-xs truncate block">{worker.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal truncate block">{worker.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCreateProjectModalOpen(false)}
              className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
