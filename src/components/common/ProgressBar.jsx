import React from 'react';

export default function ProgressBar({ value, max = 100, label, showValue = true, variant = 'brand', size = 'default' }) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const variants = {
    brand: 'bg-gradient-to-r from-chelsea-500 to-chelsea-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    cost: percentage > 90 ? 'bg-rose-500' : percentage > 75 ? 'bg-amber-500' : 'bg-emerald-500',
  };

  const heights = {
    small: 'h-1.5',
    default: 'h-2',
    large: 'h-3',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs mb-1 text-slate-600 font-medium">
          {label && <span>{label}</span>}
          {showValue && <span className="text-slate-700 font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size] || heights.default}`}>
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${variants[variant] || variants.brand}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
