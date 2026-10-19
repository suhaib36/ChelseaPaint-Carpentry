import React from 'react';
import { X, Download, Printer, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';

export default function PreviewDocModal() {
  const { previewDocModal, setPreviewDocModal, showToast } = useApp();

  if (!previewDocModal) return null;

  const handleDownload = () => {
    showToast(`Downloading "${previewDocModal.name}"...`, 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-chelsea-50 text-chelsea-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate max-w-[240px]">
              <h3 className="font-bold text-slate-900 text-xs truncate">{previewDocModal.name}</h3>
              <p className="text-[10px] text-slate-500">{previewDocModal.category} • {previewDocModal.size}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg text-slate-600 hover:text-chelsea-600 hover:bg-slate-200 transition-colors"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-600 hover:text-chelsea-600 hover:bg-slate-200 transition-colors"
              title="Print File"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDocModal(null)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Sheet Simulation */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-100/70 text-xs">
          <div className="bg-white rounded-xl shadow-card border border-slate-200/90 p-6 space-y-4 max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b pb-4 border-slate-200">
              <Logo size="default" />
              <div className="text-right text-[10px] text-slate-500">
                <span className="font-bold text-slate-800 block text-xs">OFFICIAL DOCUMENT</span>
                <span>Chelsea Paint & Carpentry LLC</span>
                <span className="block">Ann Arbor, MI • (734) 260-4999</span>
                <span className="block text-chelsea-600 font-semibold">chelseapc.com</span>
              </div>
            </div>

            {/* Doc Title & Meta */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Category: {previewDocModal.category}
              </span>
              <h2 className="text-base font-bold text-slate-900">{previewDocModal.name}</h2>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                <span>Date: {previewDocModal.uploadDate}</span>
                <span>•</span>
                <span>Uploaded by: {previewDocModal.uploader}</span>
              </div>
            </div>

            {/* Simulated Content Body */}
            <div className="space-y-2.5 text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
              <p className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-serif italic text-slate-800">
                "Chelsea Paint & Carpentry delivers master craftsmanship in architectural coatings, finish carpentry, coffered ceilings, and residential remodeling throughout Ann Arbor and Washtenaw County."
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-slate-800 block text-xs">Scope Specifications & Standards:</span>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
                  <li>Lead-Safe Certified containment and HEPA extraction prep.</li>
                  <li>Premium Sherwin-Williams Emerald / Benjamin Moore architectural coatings.</li>
                  <li>Mortise-and-tenon or GRK structural fastening for millwork and porch framing.</li>
                  <li>Full 3-year craftsmanship warranty backed by Chelsea PC heritage.</li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified & Approved Document</span>
                </div>
                <span className="text-slate-400 font-mono text-[10px]">DOC-ID: {previewDocModal.id.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
