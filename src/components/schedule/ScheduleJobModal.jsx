import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mockData';

export default function ScheduleJobModal() {
  const {
    scheduleJobModalOpen,
    setScheduleJobModalOpen,
    addScheduleJob,
    projects
  } = useApp();

  const [formData, setFormData] = useState({
    projectId: projects[0]?.id || '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    timeWindow: '8:00 AM – 4:00 PM',
    siteAddress: projects[0]?.address || '',
    assignedWorkers: ['user_dave', 'user_sarah'],
    type: 'Site Visit',
    status: 'Scheduled'
  });

  if (!scheduleJobModalOpen) return null;

  const handleProjectChange = (projId) => {
    const proj = projects.find(p => p.id === projId);
    setFormData(prev => ({
      ...prev,
      projectId: projId,
      siteAddress: proj?.address || prev.siteAddress
    }));
  };

  const toggleWorker = (userId) => {
    setFormData(prev => {
      const exists = prev.assignedWorkers.includes(userId);
      return {
        ...prev,
        assignedWorkers: exists
          ? prev.assignedWorkers.filter(id => id !== userId)
          : [...prev.assignedWorkers, userId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const proj = projects.find(p => p.id === formData.projectId);

    addScheduleJob({
      ...formData,
      projectName: proj?.name || 'Project Site'
    });

    setFormData({
      projectId: projects[0]?.id || '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      timeWindow: '8:00 AM – 4:00 PM',
      siteAddress: '',
      assignedWorkers: ['user_dave'],
      type: 'Site Visit',
      status: 'Scheduled'
    });
    setScheduleJobModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Schedule Job / Site Visit</h3>
            <p className="text-xs text-slate-500">Plan shifts, consultations, and prep visits</p>
          </div>
          <button
            onClick={() => setScheduleJobModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Related Job *</label>
            <select
              value={formData.projectId}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.customer})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Visit Title / Scope *</label>
            <input
              type="text"
              required
              placeholder="e.g. Scaffolding erection & surface prep"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Time Window *</label>
              <input
                type="text"
                required
                placeholder="e.g. 8:00 AM – 4:30 PM"
                value={formData.timeWindow}
                onChange={(e) => setFormData({ ...formData, timeWindow: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Site Address *</label>
            <input
              type="text"
              required
              placeholder="e.g. 1420 Cambridge Rd, Ann Arbor"
              value={formData.siteAddress}
              onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Visit Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
              >
                <option value="Site Visit">Site Visit</option>
                <option value="Installation">Installation</option>
                <option value="Prep & Prime">Prep & Prime</option>
                <option value="Finishing">Finishing</option>
                <option value="Consultation">Consultation</option>
                <option value="Inspection">Inspection</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Delayed">Delayed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Assign Workers</label>
            <div className="grid grid-cols-2 gap-2">
              {USERS.filter(u => u.role === 'worker').map((worker) => {
                const isAssigned = formData.assignedWorkers.includes(worker.id);
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
                    <img src={worker.avatar} alt={worker.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-xs truncate">{worker.name.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScheduleJobModalOpen(false)}
              className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors"
            >
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
