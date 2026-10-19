import React from 'react';
import { X, ShieldCheck, Briefcase, HardHat, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mockData';

export default function RoleSwitcherModal() {
  const { roleModalOpen, setRoleModalOpen, currentRole, currentUserId, switchRole } = useApp();

  if (!roleModalOpen) return null;

  const roleDefinitions = [
    {
      role: 'owner',
      userId: 'user_jonah',
      name: 'Jonah Brown',
      title: 'Owner & Founder',
      icon: ShieldCheck,
      color: 'border-chelsea-500 bg-chelsea-50/40',
      badgeColor: 'bg-chelsea-100 text-chelsea-800',
      description: 'Full administrative access across all projects, financial margins, invoices, team management, and final approvals.',
      capabilities: ['View all budgets & financial spending', 'Approve high-value change orders', 'Manage team members & assignments', 'Access confidential contracts & invoices']
    },
    {
      role: 'project_manager',
      userId: 'user_marcus',
      name: 'Marcus Vance',
      title: 'Senior Project Manager',
      icon: Briefcase,
      color: 'border-indigo-500 bg-indigo-50/40',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description: 'Coordinates job sites, creates projects, schedules workers, handles day-to-day approvals, and monitors material expenditures.',
      capabilities: ['Create projects & assign tasks', 'Reschedule visits & manage calendars', 'Review change orders & daily reports', 'Log job expenses & view site photos']
    },
    {
      role: 'worker',
      userId: 'user_dave',
      name: 'Dave Miller',
      title: 'Lead Painter (Worker)',
      icon: HardHat,
      color: 'border-amber-500 bg-amber-50/40',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Focused field crew interface. View assigned jobs & tasks, report issues, upload site photos, submit daily work logs, and message the crew.',
      capabilities: ['View assigned projects & tasks', 'Update status: To Do → In Progress → Done', 'Report job problems & add comments', 'Upload Before/During/After photos', 'Submit daily work hours & material logs']
    },
    {
      role: 'worker',
      userId: 'user_carlos',
      name: 'Carlos Ortiz',
      title: 'Lead Carpenter (Worker)',
      icon: HardHat,
      color: 'border-amber-500 bg-amber-50/40',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Field carpenter perspective on custom millwork, coffered ceilings, and structural porch restorations.',
      capabilities: ['Focus on carpentry work items', 'Submit change orders from the field', 'File end-of-day carpentry logs']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Select Prototype Role</h3>
            <p className="text-xs text-slate-500">Experience the UI from different permissions</p>
          </div>
          <button
            onClick={() => setRoleModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-4 overflow-y-auto space-y-3">
          {roleDefinitions.map((item) => {
            const Icon = item.icon;
            const isSelected = currentRole === item.role && currentUserId === item.userId;

            return (
              <div
                key={item.userId}
                onClick={() => {
                  switchRole(item.role, item.userId);
                  setRoleModalOpen(false);
                }}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? `${item.color} shadow-sm ring-1 ring-slate-300`
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={USERS.find(u => u.id === item.userId)?.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${item.badgeColor}`}>
                          {item.role === 'owner' ? 'Owner' : item.role === 'project_manager' ? 'PM' : 'Worker'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{item.title}</p>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-chelsea-500 text-white' : 'border border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 grid grid-cols-1 gap-1">
                  {item.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Tip: You can switch roles at any time by tapping the profile avatar in the top bar.
          </p>
        </div>
      </div>
    </div>
  );
}
