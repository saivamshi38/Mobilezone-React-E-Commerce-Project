import React from 'react';
import { 
  Filter, 
  X, 
  RotateCcw, 
  Check, 
  DollarSign, 
  Star, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Watch 
} from 'lucide-react';
import { categories } from '../../data/categories';
import { brands } from '../../data/brands';

export const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  only5G,
  setOnly5G,
  onlySale,
  setOnlySale,
  minRating,
  setMinRating,
  onResetFilters,
  totalMatching
}) => {
  return (
    <aside className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Filters ({totalMatching} items)
          </h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Category
        </h4>
        <div className="space-y-1">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Brand
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              selectedBrand === 'all'
                ? 'bg-blue-600 text-white border-blue-600 font-bold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
            }`}
          >
            All Brands
          </button>
          {brands.map(b => {
            const isSelected = selectedBrand === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                {b.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Max Price
          </h4>
          <span className="text-xs font-extrabold text-blue-600 dark:text-cyan-400">
            ${priceRange}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="2000"
          step="10"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
          <span>$10</span>
          <span>$500</span>
          <span>$1000</span>
          <span>$2000</span>
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-500">
            🔥 On Sale / Discount Only
          </span>
          <input
            type="checkbox"
            checked={onlySale}
            onChange={(e) => setOnlySale(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-500">
            📶 5G Ready Devices Only
          </span>
          <input
            type="checkbox"
            checked={only5G}
            onChange={(e) => setOnly5G(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
          />
        </label>
      </div>

      {/* Minimum Rating */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          Customer Rating
        </h4>
        <div className="flex items-center gap-1.5">
          {[0, 4.5, 4.7, 4.8].map(rate => (
            <button
              key={rate}
              onClick={() => setMinRating(rate)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border text-center transition-colors ${
                minRating === rate
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {rate === 0 ? 'All' : `${rate}★+`}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};
