import React from 'react';
import { ArrowLeft, MoreVertical, Edit2, Share2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, JobTypeBadge } from '../common/Badge';

import OverviewTab from './tabs/OverviewTab';
import ProjectTasksTab from './tabs/ProjectTasksTab';
import PhotosTab from './tabs/PhotosTab';
import ProjectScheduleTab from './tabs/ProjectScheduleTab';
import ChangeOrdersTab from './tabs/ChangeOrdersTab';
import DocumentsTab from './tabs/DocumentsTab';
import CostsTab from './tabs/CostsTab';
import UpdatesTab from './tabs/UpdatesTab';

export default function ProjectDetail({ project, onBack }) {
  const {
    selectedProjectTab,
    setSelectedProjectTab,
    updateProject,
    currentRole,
  } = useApp();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'photos', label: 'Photos & Logs' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'changeOrders', label: 'Change Orders' },
    { id: 'documents', label: 'Documents' },
    { id: 'costs', label: 'Costs & Budget' },
    { id: 'updates', label: 'Updates' },
  ];

  const handleStatusChange = (newStatus) => {
    updateProject(project.id, {
      status: newStatus,
      progress: newStatus === 'Completed' ? 100 : project.progress
    });
  };

  const renderActiveTab = () => {
    switch (selectedProjectTab) {
      case 'overview':
        return <OverviewTab project={project} />;
      case 'tasks':
        return <ProjectTasksTab project={project} />;
      case 'photos':
        return <PhotosTab project={project} />;
      case 'schedule':
        return <ProjectScheduleTab project={project} />;
      case 'changeOrders':
        return <ChangeOrdersTab project={project} />;
      case 'documents':
        return <DocumentsTab project={project} />;
      case 'costs':
        return <CostsTab project={project} />;
      case 'updates':
        return <UpdatesTab project={project} />;
      default:
        return <OverviewTab project={project} />;
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Detail Top Sub-Header */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-chelsea-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </button>

        <div className="flex items-center gap-2">
          {currentRole !== 'worker' ? (
            <select
              value={project.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-xs font-bold px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-chelsea-500 cursor-pointer"
            >
              <option value="Estimate">Estimate</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          ) : (
            <StatusBadge status={project.status} size="small" />
          )}
        </div>
      </div>

      {/* Project Title Bar */}
      <div className="px-4 pt-3 pb-2.5 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <JobTypeBadge type={project.jobType} />
          <span className="text-xs font-semibold text-slate-500">{project.customer}</span>
        </div>
        <h1 className="text-base font-bold text-slate-900 leading-snug">{project.name}</h1>
      </div>

      {/* Horizontal Tabs Scrollbar */}
      <div className="sticky top-[110px] z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2 overflow-x-auto no-scrollbar shadow-xs">
        <div className="flex gap-1 py-1.5 min-w-max">
          {tabs.map((tab) => {
            const isActive = selectedProjectTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedProjectTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-chelsea-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Screen Content */}
      <div className="p-4 flex-1">
        {renderActiveTab()}
      </div>
    </div>
  );
}
