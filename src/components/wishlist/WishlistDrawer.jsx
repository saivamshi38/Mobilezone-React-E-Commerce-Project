import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const WishlistDrawer = ({ onSelectProduct }) => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                <Heart className="w-4 h-4 fill-red-500" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Saved Wishlist ({wishlistItems.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  ❤️
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">No items saved yet</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any smartphone or accessory to save it for later.
                </p>
              </div>
            ) : (
              wishlistItems.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 items-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProduct(item);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-cyan-400">
                      {item.brand}
                    </span>
                    <h4
                      onClick={() => {
                        onSelectProduct(item);
                        setIsWishlistOpen(false);
                      }}
                      className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate cursor-pointer hover:text-blue-500"
                    >
                      {item.name}
                    </h4>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white block mt-0.5">
                      ${item.price}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1"
                      title="Move to Cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-center"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
