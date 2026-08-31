import React, { useState } from 'react';
import { 
  RefreshCw, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingCart 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const TradeInCalculator = ({ setActiveTab }) => {
  const { applyTradeIn, tradeInCredit, tradeInModel, removeTradeIn, setIsCartOpen } = useCart();
  const { addToast } = useToast();

  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('iPhone 14 Pro Max');
  const [storage, setStorage] = useState('256GB');
  const [condition, setCondition] = useState('good');
  const [screenCondition, setScreenCondition] = useState('flawless');

  const phoneValues = {
    'Apple': {
      'iPhone 15 Pro Max': 680,
      'iPhone 15 Pro': 570,
      'iPhone 14 Pro Max': 490,
      'iPhone 14 Pro': 410,
      'iPhone 13 Pro Max': 350,
      'iPhone 12': 210
    },
    'Samsung': {
      'Galaxy S23 Ultra': 520,
      'Galaxy S23+': 410,
      'Galaxy S22 Ultra': 340,
      'Galaxy Z Fold 5': 580,
      'Galaxy Note 20 Ultra': 190
    },
    'Google': {
      'Pixel 8 Pro': 430,
      'Pixel 8': 320,
      'Pixel 7 Pro': 240
    },
    'OnePlus': {
      'OnePlus 11 5G': 310,
      'OnePlus 10 Pro': 220
    }
  };

  const currentModels = Object.keys(phoneValues[brand] || {});
  const baseValue = (phoneValues[brand] && phoneValues[brand][model]) || 300;

  // Condition multipliers
  let finalEstimate = baseValue;
  if (storage === '512GB') finalEstimate += 50;
  if (storage === '1TB') finalEstimate += 100;
  if (condition === 'flawless') finalEstimate *= 1.1;
  if (condition === 'fair') finalEstimate *= 0.8;
  if (screenCondition === 'cracked') finalEstimate *= 0.65;

  finalEstimate = Math.round(finalEstimate);

  const handleApplyVoucher = () => {
    applyTradeIn(finalEstimate, `${brand} ${model}`);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Hero */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 text-white shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-4 h-4 text-emerald-300" /> Instant Trade-In Credit
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Exchange Your Old Phone for Instant Cash Off
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 font-normal">
            Calculate your device estimated trade-in value in 30 seconds. Apply the credit instantly at checkout to lower your new smartphone price!
          </p>
        </div>
      </div>

      {/* Interactive Wizard Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Step-by-Step Inputs */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* Brand */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              1. Select Brand
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {['Apple', 'Samsung', 'Google', 'OnePlus'].map(b => (
                <button
                  key={b}
                  onClick={() => {
                    setBrand(b);
                    setModel(Object.keys(phoneValues[b])[0]);
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    brand === b
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Model */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              2. Select Phone Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {currentModels.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Storage */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              3. Storage Capacity
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {['128GB', '256GB', '512GB', '1TB'].map(s => (
                <button
                  key={s}
                  onClick={() => setStorage(s)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    storage === s
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Body Condition */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              4. Overall Cosmetic Condition
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'flawless', title: 'Flawless', desc: 'No scratches, like new' },
                { id: 'good', title: 'Good', desc: 'Normal micro-wear' },
                { id: 'fair', title: 'Fair', desc: 'Visible dents or scuffs' }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setCondition(c.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    condition === c.id
                      ? 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">{c.title}</span>
                  <span className="text-[10px] text-slate-400">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Screen Condition */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              5. Front Glass & Screen Display
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'flawless', title: 'Intact Screen', desc: 'No cracks, touch works 100%' },
                { id: 'cracked', title: 'Cracked or Defective', desc: 'Cracked glass or display lines' }
              ].map(sc => (
                <button
                  key={sc.id}
                  onClick={() => setScreenCondition(sc.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    screenCondition === sc.id
                      ? 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">{sc.title}</span>
                  <span className="text-[10px] text-slate-400">{sc.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Trade-In Value Estimate Summary Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl space-y-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                Estimated Trade-In Credit
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1">
                ${finalEstimate}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                For {brand} {model} ({storage})
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prepaid return shipping kit included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Immediate checkout discount applied</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Military grade data wipe guarantee</span>
              </div>
            </div>

            {tradeInCredit > 0 && tradeInModel === `${brand} ${model}` ? (
              <div className="space-y-2">
                <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold p-3 rounded-xl text-center">
                  ✓ Credit Applied to Cart (${tradeInCredit})
                </div>
                <button
                  onClick={removeTradeIn}
                  className="w-full text-xs font-semibold text-red-400 hover:underline text-center block"
                >
                  Remove Trade-in Voucher
                </button>
              </div>
            ) : (
              <button
                onClick={handleApplyVoucher}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Apply ${finalEstimate} to Cart
              </button>
            )}

            <button
              onClick={() => setActiveTab('catalog')}
              className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors text-center block"
            >
              Shop New Smartphones
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
