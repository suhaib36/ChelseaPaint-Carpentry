import React, { useState } from 'react';
import { Plus, CheckCircle, XCircle, AlertTriangle, FileText, Check, DollarSign } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from '../../common/Badge';

export default function ChangeOrdersTab({ project }) {
  const {
    changeOrders,
    updateChangeOrderStatus,
    addChangeOrder,
    currentRole
  } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [confirmApprovalCo, setConfirmApprovalCo] = useState(null); // for confirmation dialog

  // New CO Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    laborCost: '',
    materialCost: '',
  });

  const projectCOs = changeOrders.filter(co => co.projectId === project.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const labor = parseFloat(formData.laborCost) || 0;
    const material = parseFloat(formData.materialCost) || 0;
    const total = labor + material;

    addChangeOrder({
      projectId: project.id,
      title: formData.title,
      description: formData.description,
      laborCost: labor,
      materialCost: material,
      totalPrice: total,
    });

    setFormData({ title: '', description: '', laborCost: '', materialCost: '' });
    setCreateModalOpen(false);
  };

  const handleApproveConfirm = () => {
    if (confirmApprovalCo) {
      updateChangeOrderStatus(confirmApprovalCo.id, 'Approved');
      setConfirmApprovalCo(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Change Orders & Scope Adjustments</h4>
          <p className="text-[11px] text-slate-500">Document and approve additional work</p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-1 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Change Orders List */}
      <div className="space-y-3">
        {projectCOs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No change orders on this job</p>
            <p className="text-slate-400 mt-0.5">Any scope additions, client requests, or unforeseen repairs appear here.</p>
          </div>
        ) : (
          projectCOs.map((co) => {
            const isPending = co.status === 'Pending';
            const canApprove = currentRole === 'owner' || currentRole === 'project_manager';

            return (
              <div
                key={co.id}
                className={`bg-white rounded-2xl border p-4 shadow-subtle space-y-3 transition-all ${
                  isPending ? 'border-amber-300/80 bg-amber-50/20' : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                        {co.id.replace('co_', 'CO #')}
                      </span>
                      <StatusBadge status={co.status} size="small" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{co.title}</h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-slate-900 block">
                      +${Number(co.totalPrice).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Price adjustment</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {co.description}
                </p>

                {/* Costs breakdown */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Labor Subtotal</span>
                    <span className="font-bold text-slate-800">${Number(co.laborCost).toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Materials Subtotal</span>
                    <span className="font-bold text-slate-800">${Number(co.materialCost).toLocaleString()}</span>
                  </div>
                </div>

                {/* Supporting docs/photos if any */}
                {co.attachments && co.attachments.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-100/70 px-2.5 py-1.5 rounded-lg">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Attachments: {co.attachments.join(', ')}</span>
                  </div>
                )}

                {/* Meta & Approval Workflow */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500">
                    <span>Requested {co.requestedDate}</span>
                    <span className="block font-medium text-slate-700">by {co.requestedBy}</span>
                  </div>

                  {isPending && canApprove && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateChangeOrderStatus(co.id, 'Rejected')}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => setConfirmApprovalCo(co)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  )}

                  {co.status === 'Approved' && (
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approved & Added to Budget</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Confirmation Step Modal for Approval */}
      {confirmApprovalCo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-slate-900 text-sm">Confirm Change Order Approval</h4>
              <p className="text-xs text-slate-600 mt-1">
                Approving <span className="font-bold text-slate-900">"{confirmApprovalCo.title}"</span> will increase the project budget by <span className="font-extrabold text-emerald-600">+${Number(confirmApprovalCo.totalPrice).toLocaleString()}</span>.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setConfirmApprovalCo(null)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveConfirm}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Change Order Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-4 border border-slate-200 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Request Change Order</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Work Description / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Additional trim repair on west porch"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Scope Details & Justification *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Explain why the additional scope or material upgrade is required..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Labor Cost ($)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={formData.laborCost}
                    onChange={(e) => setFormData({ ...formData, laborCost: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Material Cost ($)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={formData.materialCost}
                    onChange={(e) => setFormData({ ...formData, materialCost: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between font-bold">
                <span className="text-slate-600">Total Price Adjustment:</span>
                <span className="text-chelsea-600 text-sm">
                  ${((parseFloat(formData.laborCost) || 0) + (parseFloat(formData.materialCost) || 0)).toLocaleString()}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors"
                >
                  Submit Change Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
