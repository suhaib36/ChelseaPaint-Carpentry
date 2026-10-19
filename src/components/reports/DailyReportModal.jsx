import React, { useState } from 'react';
import { X, FileText, Clock, Users, Wrench, AlertTriangle, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mockData';

export default function DailyReportModal() {
  const {
    dailyReportModalOpen,
    setDailyReportModalOpen,
    addDailyReport,
    projects,
    currentUser,
  } = useApp();

  const [formData, setFormData] = useState({
    projectId: projects[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    hoursWorked: '8.0',
    workersPresent: ['Dave Miller', 'Sarah Jenkins'],
    workCompleted: '',
    materialsUsed: '',
    issuesEncountered: '',
    notes: ''
  });

  if (!dailyReportModalOpen) return null;

  const toggleWorker = (name) => {
    setFormData(prev => {
      const exists = prev.workersPresent.includes(name);
      return {
        ...prev,
        workersPresent: exists
          ? prev.workersPresent.filter(n => n !== name)
          : [...prev.workersPresent, name]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.workCompleted) return;

    addDailyReport({
      ...formData,
      projectId: formData.projectId || projects[0]?.id,
      hoursWorked: parseFloat(formData.hoursWorked) || 8.0,
      workersPresent: formData.workersPresent.length > 0 ? formData.workersPresent : [currentUser.name]
    });

    setFormData({
      projectId: projects[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      hoursWorked: '8.0',
      workersPresent: [currentUser.name],
      workCompleted: '',
      materialsUsed: '',
      issuesEncountered: '',
      notes: ''
    });
    setDailyReportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chelsea-50 text-chelsea-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Submit Daily Work Log</h3>
              <p className="text-[11px] text-slate-500">Document site hours, work done & materials</p>
            </div>
          </div>
          <button
            onClick={() => setDailyReportModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Project Site *</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.customer})</option>
              ))}
            </select>
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
              <label className="font-semibold text-slate-700 block mb-1">Total Crew Hours Worked *</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                required
                value={formData.hoursWorked}
                onChange={(e) => setFormData({ ...formData, hoursWorked: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Workers Present Today</label>
            <div className="grid grid-cols-2 gap-1.5">
              {USERS.filter(u => u.role === 'worker').map((w) => {
                const checked = formData.workersPresent.includes(w.name);
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => toggleWorker(w.name)}
                    className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all ${
                      checked
                        ? 'bg-rose-50 border-chelsea-500 text-chelsea-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <img src={w.avatar} alt={w.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="truncate">{w.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Work Completed Today *</label>
            <textarea
              required
              rows="3"
              placeholder="Detail specific surfaces prepped, coats brushed, carpentry installed, or areas masked..."
              value={formData.workCompleted}
              onChange={(e) => setFormData({ ...formData, workCompleted: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 resize-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Materials / Coatings Used</label>
            <input
              type="text"
              placeholder="e.g. 2 gals Emerald Exterior Primer, 1 tube Quad Max, 2 boxes fasteners"
              value={formData.materialsUsed}
              onChange={(e) => setFormData({ ...formData, materialsUsed: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Issues Encountered / Delay Factors</label>
            <input
              type="text"
              placeholder="e.g. Rain delay from 1-2 PM; dry rot found on east sill plate"
              value={formData.issuesEncountered}
              onChange={(e) => setFormData({ ...formData, issuesEncountered: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">General Notes</label>
            <input
              type="text"
              placeholder="e.g. Homeowner requested test patch on laundry room trim tomorrow"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDailyReportModalOpen(false)}
              className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record Daily Log</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
