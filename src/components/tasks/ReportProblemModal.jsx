import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ReportProblemModal() {
  const {
    reportProblemModalOpen,
    setReportProblemModalOpen,
    problemTaskTarget,
    setProblemTaskTarget,
    reportTaskProblem
  } = useApp();

  const [issueText, setIssueText] = useState('');

  if (!reportProblemModalOpen || !problemTaskTarget) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    reportTaskProblem(problemTaskTarget.id, issueText.trim());
    setIssueText('');
    setProblemTaskTarget(null);
    setReportProblemModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full p-4 border border-slate-200 shadow-2xl space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Report Site Problem</h3>
              <p className="text-[11px] text-slate-500">Alert Project Manager & Owner</p>
            </div>
          </div>
          <button
            onClick={() => {
              setProblemTaskTarget(null);
              setReportProblemModalOpen(false);
            }}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Related Task:</span>
          <span className="font-bold text-slate-800">{problemTaskTarget.title}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Describe the Obstacle or Issue *
            </label>
            <textarea
              required
              rows="4"
              placeholder="e.g. Discovered severe dry rot behind casing on south elevation. Requires PM inspection and structural repair before topcoat..."
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 resize-none text-xs"
            />
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setProblemTaskTarget(null);
                setReportProblemModalOpen(false);
              }}
              className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl text-white font-bold bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
