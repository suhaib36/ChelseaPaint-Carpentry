import React, { useState } from 'react';
import { Camera, Plus, Calendar, User, MapPin, Eye, FileText, ChevronRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export default function PhotosTab({ project }) {
  const {
    photos,
    dailyReports,
    setUploadPhotoModalOpen,
    setUploadPhotoProjectId,
    setDailyReportModalOpen
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('photos'); // 'photos' | 'reports'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'Before' | 'During' | 'After'
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(null);

  const projectPhotos = photos.filter(p => p.projectId === project.id);
  const projectReports = dailyReports.filter(r => r.projectId === project.id);

  const filteredPhotos = projectPhotos.filter(p => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const handleOpenUpload = () => {
    setUploadPhotoProjectId(project.id);
    setUploadPhotoModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Subtab toggle: Photos vs Daily Reports */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('photos')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'photos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Site Photos ({projectPhotos.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('reports')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'reports' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Daily Logs ({projectReports.length})</span>
        </button>
      </div>

      {activeSubTab === 'photos' ? (
        <>
          {/* Photos Header & Category Filter */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto text-xs py-0.5">
              {['all', 'Before', 'During', 'After'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-chelsea-500 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? 'All Photos' : cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleOpenUpload}
              className="flex items-center gap-1 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload</span>
            </button>
          </div>

          {/* Photo Grid / Cards */}
          {filteredPhotos.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              <Camera className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No photos in this category</p>
              <p className="text-slate-400 mt-0.5">Tap Upload to document site conditions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredPhotos.map((photo) => {
                const categoryColors = {
                  Before: 'bg-amber-100 text-amber-800 border-amber-200',
                  During: 'bg-sky-100 text-sky-800 border-sky-200',
                  After: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                };

                return (
                  <div
                    key={photo.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle flex flex-col group hover:border-chelsea-300 transition-all"
                  >
                    <div
                      className="relative h-44 bg-slate-100 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedPreviewImage(photo)}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs ${categoryColors[photo.category] || 'bg-slate-100'}`}>
                        {photo.category}
                      </span>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Eye className="w-6 h-6 drop-shadow" />
                      </div>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                          {photo.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-chelsea-600 font-semibold mt-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{photo.areaRef}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-medium text-slate-700">{photo.uploader}</span>
                        <span>{photo.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* Daily Reports List */
        <>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Project Daily Logs</h4>
              <p className="text-[11px] text-slate-500">Chronological work hours & crew notes</p>
            </div>
            <button
              onClick={() => setDailyReportModalOpen(true)}
              className="flex items-center gap-1 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Daily Log</span>
            </button>
          </div>

          <div className="space-y-3">
            {projectReports.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">No daily reports recorded yet</p>
                <p className="text-slate-400 mt-0.5">Field workers can submit daily progress, hours, and materials.</p>
              </div>
            ) : (
              projectReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{report.date}</span>
                      <p className="text-[11px] text-slate-500">
                        Submitted by <span className="font-semibold text-slate-700">{report.author}</span> ({report.authorRole})
                      </p>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                      {report.hoursWorked} hrs
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div>
                      <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Workers Present:</span>
                      <p className="text-slate-600">{Array.isArray(report.workersPresent) ? report.workersPresent.join(', ') : report.workersPresent}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Work Completed:</span>
                      <p className="text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                        {report.workCompleted}
                      </p>
                    </div>

                    {report.materialsUsed && (
                      <div>
                        <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Materials Used:</span>
                        <p className="text-slate-600">{report.materialsUsed}</p>
                      </div>
                    )}

                    {report.issuesEncountered && report.issuesEncountered !== 'None' && report.issuesEncountered !== 'None.' && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                        <span className="font-bold block text-[11px] uppercase tracking-wider">Issues Encountered:</span>
                        <p className="text-xs mt-0.5">{report.issuesEncountered}</p>
                      </div>
                    )}

                    {report.notes && (
                      <div className="pt-1 text-[11px] text-slate-500 italic">
                        Note: {report.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Lightbox / Preview Modal for Photos */}
      {selectedPreviewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPreviewImage(null)}
        >
          <div className="flex justify-end p-2">
            <button
              onClick={() => setSelectedPreviewImage(null)}
              className="text-white hover:text-rose-300 font-bold text-sm bg-white/20 px-3 py-1 rounded-full"
            >
              Close ✕
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-2">
            <img
              src={selectedPreviewImage.url}
              alt={selectedPreviewImage.title}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>
          <div className="bg-white/10 backdrop-blur-md text-white p-3 rounded-2xl max-w-lg mx-auto w-full text-center">
            <span className="text-xs uppercase font-bold text-rose-300 block mb-0.5">
              {selectedPreviewImage.category} • {selectedPreviewImage.areaRef}
            </span>
            <h4 className="text-sm font-semibold">{selectedPreviewImage.title}</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              Uploaded by {selectedPreviewImage.uploader} on {selectedPreviewImage.timestamp}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
