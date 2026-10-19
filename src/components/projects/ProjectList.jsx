import React, { useState } from 'react';
import { Search, Plus, Filter, FolderKanban, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';

export default function ProjectList() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    setCreateProjectModalOpen,
    currentRole,
    currentUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'upcoming' | 'completed'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'Painting' | 'Carpentry' | 'Remodeling'

  // If a project is selected, render the detailed project view
  if (selectedProjectId) {
    const selectedProj = projects.find(p => p.id === selectedProjectId);
    if (selectedProj) {
      return (
        <ProjectDetail
          project={selectedProj}
          onBack={() => setSelectedProjectId(null)}
        />
      );
    }
  }

  // Filter projects
  const filteredProjects = projects.filter(project => {
    // Role filter: if worker, can toggle between all jobs or only assigned jobs
    // In our prototype, workers see all jobs with priority badges or assigned focus
    // Search query
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      project.name.toLowerCase().includes(query) ||
      project.customer.toLowerCase().includes(query) ||
      project.address.toLowerCase().includes(query) ||
      project.jobType.toLowerCase().includes(query);

    // Status filter
    let matchesStatus = true;
    if (statusFilter === 'active') matchesStatus = project.status === 'In Progress';
    else if (statusFilter === 'upcoming') matchesStatus = project.status === 'Scheduled' || project.status === 'Estimate';
    else if (statusFilter === 'completed') matchesStatus = project.status === 'Completed';

    // Type filter
    let matchesType = true;
    if (typeFilter !== 'all') matchesType = project.jobType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Title & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 font-serif">Jobs & Projects</h1>
          <p className="text-xs text-slate-500">
            {projects.length} Total Projects • Ann Arbor & Washtenaw County
          </p>
        </div>

        {currentRole !== 'worker' && (
          <button
            onClick={() => setCreateProjectModalOpen(true)}
            className="flex items-center gap-1.5 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Job</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by job name, client, address, or trade..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200/90 shadow-subtle focus:outline-none focus:border-chelsea-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
        {[
          { id: 'all', label: `All (${projects.length})` },
          { id: 'active', label: `Active (${projects.filter(p => p.status === 'In Progress').length})` },
          { id: 'upcoming', label: `Upcoming (${projects.filter(p => p.status === 'Scheduled' || p.status === 'Estimate').length})` },
          { id: 'completed', label: `Completed (${projects.filter(p => p.status === 'Completed').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
              statusFilter === tab.id
                ? 'bg-chelsea-500 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trade / Job Type Sub-filter */}
      <div className="flex items-center gap-1 text-[11px] overflow-x-auto">
        <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          <span>Trade:</span>
        </span>
        {['all', 'Painting', 'Carpentry', 'Remodeling'].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
              typeFilter === type
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {type === 'all' ? 'All Trades' : type}
          </button>
        ))}
      </div>

      {/* Project Cards List */}
      <div className="space-y-3 pt-1">
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            <FolderKanban className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-800 text-sm">No jobs found</p>
            <p className="text-slate-400 mt-1 max-w-xs mx-auto">
              No projects match the current search or filter criteria. Try adjusting your search term.
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(id) => setSelectedProjectId(id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
