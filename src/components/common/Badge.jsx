import React from 'react';

export function StatusBadge({ status, size = 'default' }) {
  const configs = {
    'In Progress': 'bg-emerald-50 text-emerald-700 border-emerald-200/70 dot-emerald-500',
    'Scheduled': 'bg-sky-50 text-sky-700 border-sky-200/70 dot-sky-500',
    'Estimate': 'bg-amber-50 text-amber-700 border-amber-200/70 dot-amber-500',
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200/70 dot-amber-500',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200/70 dot-emerald-500',
    'Rejected': 'bg-rose-50 text-rose-700 border-rose-200/70 dot-rose-500',
    'On Hold': 'bg-slate-100 text-slate-700 border-slate-200 dot-slate-400',
    'Completed': 'bg-slate-100 text-slate-700 border-slate-200 dot-slate-500',
    'To Do': 'bg-slate-100 text-slate-700 border-slate-200 dot-slate-400',
    'Delayed': 'bg-rose-50 text-rose-700 border-rose-200/70 dot-rose-500',
  };

  const style = configs[status] || 'bg-slate-50 text-slate-700 border-slate-200 dot-slate-400';
  const dotColor = style.split(' ').find(c => c.startsWith('dot-'))?.replace('dot-', 'bg-') || 'bg-slate-400';

  const isSmall = size === 'small';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${
      isSmall ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
    } ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority, size = 'default' }) {
  const styles = {
    High: 'bg-rose-50 text-rose-700 border-rose-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  const isSmall = size === 'small';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${
      isSmall ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
    } ${styles[priority] || styles.Low}`}>
      {priority}
    </span>
  );
}

export function JobTypeBadge({ type }) {
  const types = {
    Painting: 'bg-rose-50 text-chelsea-600 border-rose-200',
    Carpentry: 'bg-amber-50 text-amber-800 border-amber-200',
    Remodeling: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  return (
    <span className={`text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md border ${
      types[type] || 'bg-slate-50 text-slate-700 border-slate-200'
    }`}>
      {type}
    </span>
  );
}
