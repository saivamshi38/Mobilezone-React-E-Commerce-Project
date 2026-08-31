import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingCart, 
  Heart, 
  Scale, 
  Plus, 
  Minus, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useToast } from '../../context/ToastContext';
import { StarRating } from '../common/StarRating';
import { SpecTable } from './SpecTable';
import { ReviewSection } from './ReviewSection';
import { products } from '../../data/products';

export const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const { addToast } = useToast();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setSelectedStorage(product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : null);
      setQuantity(1);
      setActiveTab('specs');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const currentPrice = product.price + (selectedStorage?.priceDelta || 0);
  const originalPrice = product.originalPrice ? product.originalPrice + (selectedStorage?.priceDelta || 0) : null;

  const displayImage = selectedColor?.image && activeImageIndex === 0
    ? selectedColor.image
    : product.images[activeImageIndex] || product.images[0];

  const bundleProducts = (product.frequentlyBoughtTogether || [])
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedStorage, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedStorage, quantity);
    setIsCartOpen(true);
    onClose();
  };

  const handleAddBundle = () => {
    addToCart(product, selectedColor, selectedStorage, 1);
    bundleProducts.forEach(bp => {
      addToCart(bp, bp.colors?.[0], bp.storageOptions?.[0], 1);
    });
    addToast('Bundle added to Cart with combined discount!', 'success');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Product link copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 custom-scrollbar animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              {product.brand}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Model ID: {product.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 custom-scrollbar">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-800/80 p-6 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-inner group">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md text-slate-800 dark:text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md text-slate-800 dark:text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  {product.discountPercentage > 0 && (
                    <span className="bg-red-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-lg shadow">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-emerald-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-lg shadow">
                      NEW RELEASE
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  Photo {activeImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 custom-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-100 dark:bg-slate-800 shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-blue-500 ring-2 ring-blue-500/30 scale-105'
                        : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Configuration & Buy Actions */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {product.stock > 0 ? `✓ In Stock (${product.stock} units ready)` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.fullDescription || product.shortDescription}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    <span>Selected Colorway:</span>
                    <span className="text-blue-600 dark:text-cyan-400">{selectedColor?.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map(col => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-semibold ${
                          selectedColor?.name === col.name
                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: col.hex }} />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage */}
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    <span>Capacity / Variant:</span>
                    <span className="text-blue-600 dark:text-cyan-400">{selectedStorage?.size}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.storageOptions.map(opt => (
                      <button
                        key={opt.size}
                        onClick={() => setSelectedStorage(opt)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          selectedStorage?.size === opt.size
                            ? 'border-blue-500 bg-blue-600 text-white shadow-md'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div>{opt.size}</div>
                        {opt.priceDelta > 0 && (
                          <div className={`text-[10px] font-normal mt-0.5 ${selectedStorage?.size === opt.size ? 'text-blue-100' : 'text-slate-400'}`}>
                            +${opt.priceDelta}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Quantity Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        ${currentPrice}
                      </span>
                      {originalPrice && (
                        <span className="text-base text-slate-400 line-through">
                          ${originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Includes all local taxes and standard warranty</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-95 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Buy Now (Instant)</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`flex items-center gap-1.5 font-semibold transition-colors ${
                      isLiked ? 'text-red-500' : 'text-slate-600 dark:text-slate-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                    <span>{isLiked ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    onClick={() => isCompared ? removeFromCompare(product.id) : addToCompare(product)}
                    className={`flex items-center gap-1.5 font-semibold transition-colors ${
                      isCompared ? 'text-indigo-500' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                    <span>{isCompared ? 'In Compare List' : 'Compare Specs'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bundle */}
          {bundleProducts.length > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> Frequently Bought Together
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Bundle and save extra on essential protection and chargers
                  </p>
                </div>
                <button
                  onClick={handleAddBundle}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow"
                >
                  Add Bundle to Cart
                </button>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shrink-0">
                  <img src={displayImage} alt={product.name} className="w-12 h-12 object-contain" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[140px]">{product.name}</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-extrabold">${currentPrice}</span>
                  </div>
                </div>

                <Plus className="w-4 h-4 text-slate-400 shrink-0" />

                {bundleProducts.map(bp => (
                  <div key={bp.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shrink-0">
                    <img src={bp.images[0]} alt={bp.name} className="w-12 h-12 object-contain" />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[140px]">{bp.name}</span>
                      <span className="text-blue-600 dark:text-cyan-400 font-extrabold">${bp.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lower Tabs */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'specs'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Full Tech Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Customer Reviews ({product.reviewCount || 0})
              </button>
            </div>

            {activeTab === 'specs' && <SpecTable specs={product.specs} />}
            {activeTab === 'reviews' && <ReviewSection product={product} />}
          </div>

        </div>

      </div>
    </div>
  );
};
