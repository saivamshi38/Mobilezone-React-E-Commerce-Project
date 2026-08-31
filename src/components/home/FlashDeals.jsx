import React, { useState, useEffect } from 'react';
import { Flame, Clock, Zap, ArrowRight } from 'lucide-react';
import { ProductCard } from '../catalog/ProductCard';
import { products } from '../../data/products';

export const FlashDeals = ({ onSelectProduct, setActiveTab }) => {
  const flashProducts = products.filter(p => p.isFlashDeal);

  // Countdown timer for flash deals (e.g. 11h 45m 20s)
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n) => n.toString().padStart(2, '0');

  return (
    <section className="mt-14">
      
      {/* Header with Live Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-xl shadow-red-500/10 mb-8">
        
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 animate-pulse">
            <Flame className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded">
                ⚡ 24-Hour Blitz
              </span>
              <span className="text-xs font-semibold text-amber-200">Up to 25% OFF</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
              Daily Flash Deals
            </h2>
          </div>
        </div>

        {/* Live Timer Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1.5 mr-1">
            <Clock className="w-4 h-4 text-amber-300" /> Ends in:
          </span>
          <div className="flex items-center gap-1.5 font-mono text-base font-extrabold">
            <div className="bg-black/30 backdrop-blur-md border border-white/20 px-2.5 py-1.5 rounded-lg text-white">
              {formatNum(timeLeft.hours)}
              <span className="block text-[9px] font-sans font-normal text-slate-300 text-center">HRS</span>
            </div>
            <span className="text-amber-200 font-bold">:</span>
            <div className="bg-black/30 backdrop-blur-md border border-white/20 px-2.5 py-1.5 rounded-lg text-white">
              {formatNum(timeLeft.minutes)}
              <span className="block text-[9px] font-sans font-normal text-slate-300 text-center">MIN</span>
            </div>
            <span className="text-amber-200 font-bold">:</span>
            <div className="bg-black/30 backdrop-blur-md border border-white/20 px-2.5 py-1.5 rounded-lg text-amber-300">
              {formatNum(timeLeft.seconds)}
              <span className="block text-[9px] font-sans font-normal text-slate-300 text-center">SEC</span>
            </div>
          </div>
        </div>

      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {flashProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            isFlash={true}
          />
        ))}
      </div>

    </section>
  );
};
