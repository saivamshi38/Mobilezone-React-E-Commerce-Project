import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupons } from '../data/coupons';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [tradeInCredit, setTradeInCredit] = useState(0);
  const [tradeInModel, setTradeInModel] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mz_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedColor = null, selectedStorage = null, quantity = 1) => {
    const color = selectedColor || (product.colors && product.colors[0]) || { name: 'Standard' };
    const storage = selectedStorage || (product.storageOptions && product.storageOptions[0]) || { size: 'Standard', priceDelta: 0 };
    
    const finalPrice = product.price + (storage.priceDelta || 0);
    const cartItemId = `${product.id}-${color.name}-${storage.size}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        addToast(`Updated quantity for ${product.name}`, 'info');
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        addToast(`Added ${product.name} to cart!`, 'success');
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            basePrice: product.price,
            finalPrice,
            image: (color && color.image) || (product.images && product.images[0]),
            selectedColor: color,
            selectedStorage: storage,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => {
      const item = prev.find(i => i.cartItemId === cartItemId);
      if (item) {
        addToast(`Removed ${item.name} from cart`, 'info');
      }
      return prev.filter(i => i.cartItemId !== cartItemId);
    });
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setTradeInCredit(0);
    setTradeInModel('');
  };

  const applyCoupon = (code) => {
    const formatted = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === formatted);

    if (!found) {
      addToast('Invalid coupon code. Try MOBILE20 or ZONE10', 'error');
      return false;
    }

    if (subtotal < found.minSpend) {
      addToast(`Minimum spend of $${found.minSpend} required for coupon ${formatted}`, 'error');
      return false;
    }

    setAppliedCoupon(found);
    addToast(`Coupon ${formatted} applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  const applyTradeIn = (amount, oldPhoneName) => {
    setTradeInCredit(amount);
    setTradeInModel(oldPhoneName);
    addToast(`Applied $${amount} Trade-In credit for your ${oldPhoneName}!`, 'success');
  };

  const removeTradeIn = () => {
    setTradeInCredit(0);
    setTradeInModel('');
    addToast('Trade-in credit removed', 'info');
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = (subtotal * appliedCoupon.discount) / 100;
    } else {
      couponDiscount = Math.min(appliedCoupon.discount, subtotal);
    }
  }

  const shipping = subtotal === 0 || subtotal >= 50 || appliedCoupon?.code === 'FREESHIP' ? 0 : 9.99;
  const tax = (subtotal - couponDiscount) > 0 ? (subtotal - couponDiscount) * 0.08 : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount - tradeInCredit + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        couponDiscount,
        tradeInCredit,
        tradeInModel,
        shipping,
        tax,
        grandTotal,
        appliedCoupon,
        isCartOpen,
        isCheckoutOpen,
        setIsCartOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        applyTradeIn,
        removeTradeIn
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
