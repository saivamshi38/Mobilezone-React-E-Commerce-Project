import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShoppingCart, 
  Scale, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Flame, 
  Cpu 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../context/CompareContext';
import { products } from '../../data/products';

export const HeroBanner = ({ onSelectProduct, setActiveTab }) => {
  const { addToCart } = useCart();
  const { addToCompare } = useCompare();

  // Flagships featured in hero
  const featuredPhones = products.filter(p => p.isFeatured && p.category.includes('smartphones')).slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  useEffect(() => {
    setSelectedImgIndex(0);
  }, [currentIndex]);

  // Auto rotate banner every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredPhones.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredPhones.length]);

  if (!featuredPhones.length) return null;
  const current = featuredPhones[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white shadow-2xl border border-slate-800">
      
      {/* Background glow effects */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Flagship Drop of the Season</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Title & Tagline */}
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-blue-400 mb-1 flex items-center gap-2">
                <span>{current.brand}</span>
                <span>•</span>
                <span className="text-emerald-400">In Stock ({current.stock} units)</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {current.name}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                {current.tagline}
              </p>
            </div>

            {/* Quick Specs Highlight Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">Processor</span>
                <span className="text-xs font-bold text-slate-100 truncate block mt-0.5">{current.specs?.processor?.split('(')[0] || 'Flagship SoC'}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">Main Camera</span>
                <span className="text-xs font-bold text-cyan-300 truncate block mt-0.5">{current.specs?.mainCamera?.split('+')[0] || 'Pro Camera'}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">Charging</span>
                <span className="text-xs font-bold text-amber-300 truncate block mt-0.5">{current.specs?.charging?.split(',')[0] || 'Fast Charging'}</span>
              </div>
            </div>

            {/* Price & Primary Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    ${current.price}
                  </span>
                  {current.originalPrice && (
                    <span className="text-lg text-slate-400 line-through">
                      ${current.originalPrice}
                    </span>
                  )}
                  {current.discountPercentage > 0 && (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2 py-0.5 rounded-full">
                      Save {current.discountPercentage}%
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 block mt-0.5">Free Express 2-Day Shipping included</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => addToCart(current)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
                <button
                  onClick={() => onSelectProduct(current)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold px-5 py-3 rounded-xl backdrop-blur-md transition-colors text-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => addToCompare(current)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white transition-colors"
                  title="Add to Compare"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2 pt-2">
              {featuredPhones.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-8 bg-gradient-to-r from-blue-400 to-cyan-400' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Multi-Angle Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Primary Hero Phone Display */}
            <div 
              onClick={() => onSelectProduct(current)}
              className="relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-6 backdrop-blur-md flex items-center justify-center group cursor-pointer shadow-2xl hover:border-cyan-400/40 transition-all duration-300"
            >
              <img
                src={current.images[selectedImgIndex] || current.images[0]}
                alt={current.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500 rounded-2xl"
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-blue-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md">
                  ★ {current.rating} ({current.reviewCount} reviews)
                </span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
                Angle {selectedImgIndex + 1} of {current.images.length}
              </div>
            </div>

            {/* Multi-angle Thumbnails row */}
            <div className="flex items-center gap-2.5 mt-4 overflow-x-auto p-1 max-w-full custom-scrollbar">
              {current.images.map((imgUrl, imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => setSelectedImgIndex(imgIdx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-800 shrink-0 ${
                    selectedImgIndex === imgIdx 
                      ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-105' 
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Angle ${imgIdx + 1}`} className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Prev / Next Banner Buttons */}
      <button
        onClick={() => setCurrentIndex(prev => (prev - 1 + featuredPhones.length) % featuredPhones.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        aria-label="Previous Phone"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentIndex(prev => (prev + 1) % featuredPhones.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        aria-label="Next Phone"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </div>
  );
};
