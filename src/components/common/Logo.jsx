import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Logo({ size = 'default', light = false, compact = false }) {
  const { navigateTo } = useApp();
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <div
      onClick={() => navigateTo({ tab: 'home' })}
      className="flex items-center gap-2.5 select-none cursor-pointer group transition-opacity hover:opacity-90"
      title="Chelsea Paint & Carpentry — Home"
    >
      {/* Brand Emblem: House Peak + Paint Brush + Carpenter Triangle */}
      <div className={`relative flex items-center justify-center rounded-xl transition-transform group-hover:scale-105 shrink-0 ${
        isSmall ? 'w-8 h-8' : isLarge ? 'w-11 h-11' : 'w-9 h-9'
      } ${
        light
          ? 'bg-white text-chelsea-500 shadow-sm'
          : 'bg-gradient-to-br from-chelsea-500 to-chelsea-700 text-white shadow-md shadow-chelsea-500/20'
      }`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={isSmall ? 'w-4 h-4' : isLarge ? 'w-6 h-6' : 'w-5 h-5'}>
          {/* Gable / House Roof */}
          <path d="M3 11L12 3l9 8" />
          {/* Paint Brush & Carpenter Geometry */}
          <path d="M9 21V12h6v9" opacity="0.65" strokeWidth="1.8" />
          <path d="M12 7.5v3.5" strokeWidth="2.4" />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {!compact && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif tracking-tight font-extrabold ${
            isSmall ? 'text-sm' : isLarge ? 'text-xl' : 'text-base sm:text-lg'
          } ${light ? 'text-white' : 'text-slate-900'}`}>
            CHELSEA
          </span>
          <span className={`tracking-[0.18em] uppercase font-bold text-chelsea-600 ${
            isSmall ? 'text-[8px]' : isLarge ? 'text-[10px]' : 'text-[9px] sm:text-[9.5px]'
          } ${light ? 'text-rose-200' : 'text-chelsea-600'}`}>
            Paint & Carpentry
          </span>
        </div>
      )}
    </div>
  );
}
