import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const styles = {
    primary: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
    dark: 'bg-slate-800 text-slate-200 border border-slate-700'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${styles[variant] || styles.primary} ${className}`}>
      {children}
    </span>
  );
};
