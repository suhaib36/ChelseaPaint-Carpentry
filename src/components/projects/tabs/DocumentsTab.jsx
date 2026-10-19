import React, { useState } from 'react';
import { FileText, Plus, Download, Trash2, Eye, Lock, Shield, FileCheck, Palette, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const DOCUMENT_CATEGORIES = [
  'Estimates and Proposals',
  'Contracts',
  'Invoices and Receipts',
  'Plans and Specifications',
  'Paint Colors and Material Selections',
  'Permits and Warranty Documents'
];

export default function DocumentsTab({ project }) {
  const {
    documents,
    addDocument,
    removeDocument,
    currentRole,
    setPreviewDocModal
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'Estimates and Proposals',
    isRestricted: false,
    size: '1.2 MB'
  });

  const projectDocs = documents.filter(d => d.projectId === project.id);

  const filteredDocs = projectDocs.filter(d => {
    if (selectedCategory === 'all') return true;
    return d.category === selectedCategory;
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.name) return;

    addDocument({
      projectId: project.id,
      name: uploadForm.name.endsWith('.pdf') ? uploadForm.name : `${uploadForm.name}.pdf`,
      category: uploadForm.category,
      size: uploadForm.size,
      restrictedTo: uploadForm.isRestricted ? ['owner', 'project_manager'] : null,
      type: 'pdf'
    });

    setUploadForm({ name: '', category: 'Estimates and Proposals', isRestricted: false, size: '1.2 MB' });
    setUploadModalOpen(false);
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Contracts':
      case 'Estimates and Proposals':
        return <FileCheck className="w-4 h-4 text-chelsea-600" />;
      case 'Paint Colors and Material Selections':
        return <Palette className="w-4 h-4 text-indigo-600" />;
      case 'Invoices and Receipts':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Project Documents & Files</h4>
          <p className="text-[11px] text-slate-500">Estimates, blueprints, swatches & permits</p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-1 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-chelsea-500 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All ({projectDocs.length})
        </button>
        {DOCUMENT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-chelsea-500 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Document List */}
      <div className="space-y-2.5">
        {filteredDocs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No documents in this category</p>
            <p className="text-slate-400 mt-0.5">Upload proposals, architectural sheets, or paint color specifications.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isRestricted = doc.restrictedTo && doc.restrictedTo.length > 0;
            const hasAccess = !isRestricted || (currentRole === 'owner' || currentRole === 'project_manager');

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-subtle flex items-start justify-between gap-3 hover:border-chelsea-300 transition-all"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(doc.category)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {doc.category}
                      </span>
                      {isRestricted ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Owner/PM Only</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                          All Crew
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5" title={doc.name}>
                      {doc.name}
                    </h4>

                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Uploaded {doc.uploadDate} by {doc.uploader}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {hasAccess ? (
                    <>
                      <button
                        onClick={() => setPreviewDocModal(doc)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-chelsea-600 hover:bg-slate-50 border border-slate-200 transition-colors"
                        title="Preview Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {currentRole !== 'worker' && (
                        <button
                          onClick={() => removeDocument(doc.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold px-2 py-1 bg-slate-100 rounded-lg">
                      Confidential
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Upload Document Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-4 border border-slate-200 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Upload Project File</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Title / File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Architectural_Elevations_Rev2.pdf"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category *</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
                >
                  {DOCUMENT_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Simulated File Size</label>
                <input
                  type="text"
                  value={uploadForm.size}
                  onChange={(e) => setUploadForm({ ...uploadForm, size: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">Role Restriction</span>
                  <span className="text-[11px] text-slate-500">Restrict visibility to Owner & PMs only</span>
                </div>
                <input
                  type="checkbox"
                  checked={uploadForm.isRestricted}
                  onChange={(e) => setUploadForm({ ...uploadForm, isRestricted: e.target.checked })}
                  className="w-4 h-4 text-chelsea-600 rounded border-slate-300 focus:ring-chelsea-500 cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
