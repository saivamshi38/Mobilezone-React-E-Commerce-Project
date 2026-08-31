import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [category, setCategory] = useState('smartphones-flagship');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('20');
  const [tagline, setTagline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd = {
      id: `prod-${Date.now()}`,
      name,
      brand,
      brandId: brand.toLowerCase(),
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      discountPercentage: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      rating: 5.0,
      reviewCount: 1,
      stock: Number(stock),
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      tagline: tagline || 'Next-generation flagship performance',
      shortDescription: tagline || 'Newly added product to Mobilezone marketplace.',
      fullDescription: tagline || 'Newly added product to Mobilezone marketplace.',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
      ],
      colors: [{ name: 'Standard Edition', hex: '#2b2d30' }],
      storageOptions: [{ size: 'Standard', priceDelta: 0 }],
      specs: {
        display: '6.7" OLED 120Hz',
        processor: 'Flagship Multi-Core SoC',
        battery: '5,000 mAh'
      }
    };

    onAddProduct(prev => [newProd, ...prev]);
    addToast(`Product "${name}" published to catalog!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 custom-scrollbar animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4 text-xs">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-500" /> Add New Smartphone / Accessory
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Product Title</label>
            <input
              type="text"
              placeholder="e.g. Sony Xperia 1 VI 5G"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Google">Google</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Nothing">Nothing</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Anker">Anker</option>
                <option value="Spigen">Spigen</option>
                <option value="Sony">Sony</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="smartphones-flagship">Flagship Smartphones</option>
                <option value="smartphones-foldable">Foldable Phones</option>
                <option value="smartphones-budget">Value & Budget 5G</option>
                <option value="chargers-power">Chargers & Power</option>
                <option value="cases-protection">Cases & Protection</option>
                <option value="audio-earbuds">TWS Earbuds & Audio</option>
                <option value="smartwatches-wearables">Smartwatches</option>
                <option value="magsafe-mounts">MagSafe & Mounts</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Price ($)</label>
              <input
                type="number"
                placeholder="799"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Original ($)</label>
              <input
                type="number"
                placeholder="899"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Stock Units</label>
              <input
                type="number"
                placeholder="20"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tagline</label>
            <input
              type="text"
              placeholder="e.g. Snapdragon 8 Gen 3 with LTPO 120Hz display"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow mt-2"
          >
            Publish Product to Store
          </button>
        </form>

      </div>
    </div>
  );
};
