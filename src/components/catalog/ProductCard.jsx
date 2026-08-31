import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Scale, 
  Eye, 
  Check, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Layers 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { StarRating } from '../common/StarRating';

export const ProductCard = ({ product, onSelectProduct, isFlash = false, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Active display image (swatch image or gallery image)
  const currentImage = selectedColor?.image || product.images[activeImageIndex] || product.images[0];

  const handleCompareClick = (e) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedColor);
  };

  // List View Rendering
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelectProduct(product)}
        className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col sm:flex-row gap-5 items-center cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative w-full sm:w-48 h-48 sm:h-40 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between w-full h-full">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                {product.brand}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {product.shortDescription}
            </p>

            <div className="mt-2.5 flex items-center gap-4">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              {product.specs?.processor && (
                <span className="hidden md:inline text-xs text-slate-400 font-mono">
                  ⚙️ {product.specs.processor.split('(')[0]}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Bar: Price & Actions */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlistClick}
                className={`p-2 rounded-xl border transition-colors ${
                  isLiked
                    ? 'bg-red-50 dark:bg-red-500/20 text-red-500 border-red-200 dark:border-red-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-red-500'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
              </button>

              <button
                onClick={handleCompareClick}
                className={`p-2 rounded-xl border transition-colors ${
                  isCompared
                    ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-indigo-500'
                }`}
                title="Compare Specs"
              >
                <Scale className="w-4 h-4" />
              </button>

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid View Card
  return (
    <div
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/40 dark:hover:border-blue-500/40 rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between cursor-pointer"
    >
      
      {/* Top Action Overlay Badges */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-2">
          {/* Discount / Flash Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.discountPercentage > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                -{product.discountPercentage}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm">
                NEW
              </span>
            )}
            {isFlash && (
              <span className="bg-amber-500 text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                <Flame className="w-3 h-3 fill-black" /> FLASH
              </span>
            )}
          </div>

          {/* Wishlist & Compare Quick Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleCompareClick}
              className={`p-1.5 rounded-lg border transition-all ${
                isCompared
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-indigo-500'
              }`}
              title="Compare Specs"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleWishlistClick}
              className={`p-1.5 rounded-lg border transition-all ${
                isLiked
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-red-500'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Multi-Angle / Swatch Image */}
        <div className="relative aspect-square w-full rounded-xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-800/80 p-4 flex items-center justify-center overflow-hidden mb-3.5">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-108 transition-transform duration-300"
          />

          {/* Quick View Button on Hover */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 pointer-events-none sm:pointer-events-auto">
            <span className="bg-white text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </span>
          </div>

          {/* Angle Indicator Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full z-10">
              {product.images.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeImageIndex === idx ? 'bg-cyan-400 w-3' : 'bg-white/50'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Color Swatch Selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map(col => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor?.name === col.name
                    ? 'ring-2 ring-blue-500 scale-110 border-white'
                    : 'border-slate-300 dark:border-slate-700 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            <span className="text-[10px] text-slate-400 ml-1 font-medium truncate">
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Brand & Category Title */}
        <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-0.5">
          {product.brand}
        </div>

        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>

        {/* Star Rating */}
        <div className="mt-1.5">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="xs" />
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
            {product.stock > 0 ? '✓ Ready to ship' : 'Backorder'}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center p-2.5 sm:px-3 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-xs transition-all shadow-md shadow-blue-500/20 active:scale-95 shrink-0"
          title="Add to Shopping Cart"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline ml-1.5">Add</span>
        </button>
      </div>

    </div>
  );
};
