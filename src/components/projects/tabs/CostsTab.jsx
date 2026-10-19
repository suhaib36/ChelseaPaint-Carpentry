import React, { useState } from 'react';
import { DollarSign, Plus, TrendingUp, AlertCircle, Receipt, PieChart, Layers } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import ProgressBar from '../../common/ProgressBar';

export const EXPENSE_CATEGORIES = [
  'Labor',
  'Paint & Primers',
  'Lumber & Trim',
  'Hardware & Fasteners',
  'Equipment & Rentals',
  'Subcontractor'
];

export default function CostsTab({ project }) {
  const {
    expenses,
    addExpense,
    changeOrders,
    currentRole
  } = useApp();

  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Paint & Primers',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const projectExpenses = expenses.filter(e => e.projectId === project.id);
  const approvedCOs = changeOrders.filter(co => co.projectId === project.id && co.status === 'Approved');
  const coTotal = approvedCOs.reduce((sum, co) => sum + Number(co.totalPrice), 0);

  const totalBudget = project.estimatedBudget; // includes approved COs via context
  const totalActual = project.actualCost;
  const remaining = totalBudget - totalActual;
  const budgetSpentPct = totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    addExpense({
      projectId: project.id,
      amount: formData.amount,
      category: formData.category,
      description: formData.description,
      date: formData.date
    });

    setFormData({
      amount: '',
      category: 'Paint & Primers',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setAddExpenseModal(false);
  };

  const isWorker = currentRole === 'worker';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Job Costs & Financial Tracking</h4>
          <p className="text-[11px] text-slate-500">Real-time labor, material & change order accounting</p>
        </div>

        <button
          onClick={() => setAddExpenseModal(true)}
          className="flex items-center gap-1 bg-chelsea-500 hover:bg-chelsea-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Main Budget Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Budget Consumption</span>
          <span className={`text-xs font-extrabold ${budgetSpentPct > 90 ? 'text-rose-600' : 'text-slate-900'}`}>
            {budgetSpentPct}% Spent
          </span>
        </div>

        <ProgressBar value={totalActual} max={totalBudget} variant="cost" size="large" />

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Budget</span>
            <span className="text-xs font-extrabold text-slate-900">${totalBudget.toLocaleString()}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Actual Spend</span>
            <span className="text-xs font-extrabold text-chelsea-600">${totalActual.toLocaleString()}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining</span>
            <span className={`text-xs font-extrabold ${remaining >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ${remaining.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown (Labor vs Materials vs Change Orders) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Labor Incurred</span>
          <div className="text-sm font-bold text-slate-900">
            ${(project.laborCost || 0).toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 block">Field hours & journeyman rates</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Materials & Supplies</span>
          <div className="text-sm font-bold text-slate-900">
            ${(project.materialCost || 0).toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 block">Lumber, coatings & consumables</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-subtle space-y-1 col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Approved Change Orders</span>
              <div className="text-sm font-bold text-emerald-700">
                +${coTotal.toLocaleString()}
              </div>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {approvedCOs.length} additions approved
            </span>
          </div>
        </div>
      </div>

      {/* Itemized Expenses List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900">Expense Receipts & Purchases</h4>
          <span className="text-[11px] font-semibold text-slate-500">{projectExpenses.length} entries</span>
        </div>

        <div className="space-y-2">
          {projectExpenses.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No expenses logged yet.</p>
          ) : (
            projectExpenses.map((exp) => (
              <div
                key={exp.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs hover:bg-slate-100/70 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                      {exp.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{exp.date}</span>
                  </div>
                  <h5 className="font-semibold text-slate-800 mt-0.5">{exp.description}</h5>
                  <span className="text-[10px] text-slate-500">Logged by {exp.recordedBy}</span>
                </div>

                <span className="font-extrabold text-slate-900 text-xs shrink-0">
                  ${exp.amount.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      {addExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-4 border border-slate-200 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Add Job Expense</h3>
              <button onClick={() => setAddExpenseModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Expense Amount ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Expense Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description / Supplier *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Gals Sherwin-Williams Emerald Gloss (Chelsea Lumber)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
                />
              </div>

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

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAddExpenseModal(false)}
                  className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
