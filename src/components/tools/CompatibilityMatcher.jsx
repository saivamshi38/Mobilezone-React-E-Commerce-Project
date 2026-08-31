import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Zap, 
  Search 
} from 'lucide-react';
import { ProductCard } from '../catalog/ProductCard';
import { products } from '../../data/products';

export const CompatibilityMatcher = ({ onSelectProduct }) => {
  const supportedPhones = [
    'Apple iPhone 16 Pro Max',
    'Apple iPhone 16 Pro',
    'Samsung Galaxy S24 Ultra 5G',
    'Google Pixel 9 Pro XL',
    'OnePlus 12 5G Flagship',
    'Samsung Galaxy Z Fold6',
    'Nothing Phone (2) 5G',
    'Samsung Galaxy A55 5G'
  ];

  const [selectedPhone, setSelectedPhone] = useState(supportedPhones[0]);
  const [selectedAccessoryType, setSelectedAccessoryType] = useState('all');

  // Filter matching accessories
  const matchingAccessories = products.filter(p => {
    if (p.category.includes('smartphones')) return false;
    const isCompatible = (p.compatibleWith || []).includes(selectedPhone);
    if (!isCompatible) return false;
    if (selectedAccessoryType === 'all') return true;
    return p.category === selectedAccessoryType;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Tool Hero Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 text-white shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-300" /> Guaranteed 100% Fit
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Accessory Compatibility Matcher
          </h2>
          <p className="text-sm sm:text-base text-blue-100 font-normal">
            Select your exact smartphone model below to filter cases, 9H tempered glasses, GaN chargers, and magnetic car mounts engineered precisely for your phone.
          </p>
        </div>
      </div>

      {/* Interactive Phone Model Selector */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-600" /> Step 1: Select Your Current Device
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {supportedPhones.map(phone => {
            const isSelected = selectedPhone === phone;
            return (
              <button
                key={phone}
                onClick={() => setSelectedPhone(phone)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-500/15 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/50'
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 absolute top-3 right-3" />
                )}
                <span className="text-xs font-bold text-slate-900 dark:text-white block pr-4">
                  {phone}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Click to filter gear
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter sub-types */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { id: 'all', label: 'All Compatible Gear' },
            { id: 'cases-protection', label: '🛡️ Cases & Glass' },
            { id: 'chargers-power', label: '⚡ Fast Chargers & Power' },
            { id: 'magsafe-mounts', label: '🧲 MagSafe & Car Mounts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedAccessoryType(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedAccessoryType === tab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Accessories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Matching Accessories for <span className="text-blue-600 dark:text-cyan-400 font-extrabold">{selectedPhone}</span> ({matchingAccessories.length})
          </h3>
        </div>

        {matchingAccessories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchingAccessories.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-400">No accessories found for this specific filter combination.</p>
          </div>
        )}
      </div>

    </div>
  );
};
