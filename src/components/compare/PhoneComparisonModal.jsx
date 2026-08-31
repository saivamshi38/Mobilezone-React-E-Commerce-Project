import React from 'react';
import { X, Scale, ShoppingCart, Trash2, Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { StarRating } from '../common/StarRating';

export const PhoneComparisonModal = ({ isOpen, onClose, onSelectProduct }) => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const specKeys = [
    { label: 'Display & Screen', key: 'display' },
    { label: 'Resolution', key: 'resolution' },
    { label: 'Chipset / Processor', key: 'processor' },
    { label: 'RAM & Memory', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Rear Cameras', key: 'mainCamera' },
    { label: 'Front Camera', key: 'selfieCamera' },
    { label: 'Battery Capacity', key: 'battery' },
    { label: 'Charging Speed', key: 'charging' },
    { label: 'Operating System', key: 'os' },
    { label: 'Weight', key: 'weight' },
    { label: 'Water / Dust IP', key: 'ipRating' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 custom-scrollbar animate-in fade-in">
      <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Side-by-Side Spec Comparison Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparing {compareItems.length} of max 4 devices
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareItems.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {compareItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto text-2xl">
                ⚖️
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                No smartphones or gadgets selected for comparison
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Browse our smartphone catalog and click the scale icon on any device card to compare technical specifications side-by-side!
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow transition-colors"
              >
                Browse All Phones
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-left text-xs font-extrabold uppercase text-slate-400 w-44 sticky left-0 bg-white dark:bg-slate-900 z-10">
                      Product Overview
                    </th>
                    {compareItems.map(item => (
                      <th key={item.id} className="p-3 text-center min-w-[200px] align-top">
                        <div className="relative bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center group">
                          <button
                            onClick={() => removeFromCompare(item.id)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
                            title="Remove from compare"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-24 h-24 object-contain mb-2 cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => {
                              onSelectProduct(item);
                              onClose();
                            }}
                          />
                          <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-cyan-400">
                            {item.brand}
                          </span>
                          <h4 
                            onClick={() => {
                              onSelectProduct(item);
                              onClose();
                            }}
                            className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 text-center cursor-pointer hover:text-blue-500"
                          >
                            {item.name}
                          </h4>
                          
                          <div className="mt-2 text-base font-extrabold text-slate-900 dark:text-white">
                            ${item.price}
                          </div>

                          <button
                            onClick={() => addToCart(item)}
                            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {/* Rating row */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900">
                      User Rating
                    </td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3 text-center">
                        <div className="flex justify-center">
                          <StarRating rating={item.rating} reviewCount={item.reviewCount} size="xs" />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic specs rows */}
                  {specKeys.map(spec => (
                    <tr key={spec.key} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-slate-600 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900">
                        {spec.label}
                      </td>
                      {compareItems.map(item => (
                        <td key={item.id} className="p-3 text-center text-slate-800 dark:text-slate-200 font-medium">
                          {item.specs?.[spec.key] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
