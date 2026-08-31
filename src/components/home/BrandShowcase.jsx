import React from 'react';
import { brands } from '../../data/brands';
import { ArrowRight } from 'lucide-react';

export const BrandShowcase = ({ selectedBrand, setSelectedBrand, setActiveTab }) => {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Top Smartphone & Gear Brands
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Official authorized retail distributor for global tech leaders
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedBrand('all');
            setActiveTab('catalog');
          }}
          className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          View All Brands <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3.5">
        {brands.map(b => {
          const isSelected = selectedBrand === b.id;
          return (
            <button
              key={b.id}
              onClick={() => {
                setSelectedBrand(b.id);
                setActiveTab('catalog');
              }}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center group ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:shadow-md dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <img src={b.logo} alt={b.name} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs font-bold truncate max-w-full">
                {b.name}
              </span>
              <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                {b.country}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
