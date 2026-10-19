import React from 'react';
import { Clock, CheckCircle2, Camera, FileText, AlertTriangle, FileCheck, MessageSquare } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export default function UpdatesTab({ project }) {
  const { photos, dailyReports, changeOrders, tasks } = useApp();

  const projectPhotos = photos.filter(p => p.projectId === project.id);
  const projectReports = dailyReports.filter(r => r.projectId === project.id);
  const projectCOs = changeOrders.filter(co => co.projectId === project.id);
  const projectTasks = tasks.filter(t => t.projectId === project.id);

  // Synthesize chronological activity items
  const activityItems = [
    ...projectReports.map(r => ({
      id: `act_${r.id}`,
      type: 'report',
      title: `${r.author} logged daily work hours`,
      description: `${r.hoursWorked} hours logged. ${r.workCompleted.slice(0, 80)}...`,
      timestamp: r.date,
      icon: FileText,
      color: 'bg-indigo-50 text-indigo-600'
    })),
    ...projectPhotos.map(p => ({
      id: `act_${p.id}`,
      type: 'photo',
      title: `${p.uploader} uploaded a ${p.category.toLowerCase()} photo`,
      description: `Area: ${p.areaRef} - "${p.title}"`,
      timestamp: p.timestamp,
      icon: Camera,
      color: 'bg-emerald-50 text-emerald-600'
    })),
    ...projectCOs.map(co => ({
      id: `act_${co.id}`,
      type: 'changeOrder',
      title: `Change Order ${co.status.toLowerCase()}`,
      description: `"${co.title}" (+$${Number(co.totalPrice).toLocaleString()}) - requested by ${co.requestedBy}`,
      timestamp: co.requestedDate,
      icon: FileCheck,
      color: co.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
    })),
    ...projectTasks.filter(t => t.status === 'Completed').map(t => ({
      id: `act_t_${t.id}`,
      type: 'task',
      title: `Task completed`,
      description: `"${t.title}" was marked complete.`,
      timestamp: t.dueDate,
      icon: CheckCircle2,
      color: 'bg-sky-50 text-sky-600'
    }))
  ];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-bold text-slate-900">Project Activity Stream</h4>
        <p className="text-[11px] text-slate-500">Audit trail of team actions, photo uploads, and status changes</p>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {activityItems.map((act) => {
          const Icon = act.icon;

          return (
            <div key={act.id} className="relative group">
              {/* Dot / Icon */}
              <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ring-1 ring-slate-200 ${act.color}`}>
                <Icon className="w-2.5 h-2.5" />
              </div>

              {/* Card */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-subtle group-hover:border-chelsea-300 transition-colors">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h5 className="text-xs font-bold text-slate-900">{act.title}</h5>
                  <span className="text-[10px] text-slate-400 shrink-0">{act.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{act.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
