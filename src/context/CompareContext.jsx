import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const { addToast } = useToast();
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mz_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mz_compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product) => {
    if (compareItems.length >= 4) {
      addToast('You can compare up to 4 devices at once', 'error');
      return;
    }

    if (compareItems.some(i => i.id === product.id)) {
      addToast(`${product.name} is already in comparison`, 'info');
      return;
    }

    setCompareItems(prev => [...prev, product]);
    addToast(`Added ${product.name} to comparison list!`, 'success');
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(i => i.id !== productId));
    addToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (productId) => {
    return compareItems.some(i => i.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        isCompareOpen,
        setIsCompareOpen,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
