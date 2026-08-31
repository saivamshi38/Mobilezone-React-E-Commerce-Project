import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider, useCompare } from './context/CompareContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { FlashDeals } from './components/home/FlashDeals';
import { BrandShowcase } from './components/home/BrandShowcase';
import { FilterSidebar } from './components/catalog/FilterSidebar';
import { ProductGrid } from './components/catalog/ProductGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { PhoneComparisonModal } from './components/compare/PhoneComparisonModal';
import { CompatibilityMatcher } from './components/tools/CompatibilityMatcher';
import { TradeInCalculator } from './components/tools/TradeInCalculator';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AddProductModal } from './components/admin/AddProductModal';

// Data
import { products } from './data/products';
import { categories } from './data/categories';
import { brands } from './data/brands';
import { ArrowUp, Sparkles, Shield, Zap } from 'lucide-react';

function MainStore() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'catalog', 'compare', 'matcher', 'tradein', 'admin'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [onAddProductCallback, setOnAddProductCallback] = useState(null);

  // Catalog Filters & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(2000);
  const [only5G, setOnly5G] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const { isCompareOpen, setIsCompareOpen } = useCompare();
  const { isAdmin } = useAuth();

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange(2000);
    setOnly5G(false);
    setOnlySale(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const handleOpenAddProduct = (setProductsListFn) => {
    setOnAddProductCallback(() => setProductsListFn);
    setIsAddProductOpen(true);
  };

  const handleLoginSuccess = (loggedInUser) => {
    if (loggedInUser.role === 'admin') {
      setActiveTab('admin');
    }
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && p.brandId !== selectedBrand && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      if (p.price > priceRange) return false;
      if (only5G && !(p.name.includes('5G') || p.specs?.connectivity?.includes('5G'))) return false;
      if (onlySale && !(p.discountPercentage > 0 || p.isFlashDeal)) return false;
      if (minRating > 0 && p.rating < minRating) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedBrand, priceRange, only5G, onlySale, minRating, sortBy]);

  const activeCategoryObj = categories.find(c => c.id === selectedCategory);
  const activeBrandObj = brands.find(b => b.id === selectedBrand);

  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : 'All Products';
  const activeBrandName = activeBrandObj ? activeBrandObj.name : 'All Brands';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            <HeroBanner
              onSelectProduct={handleSelectProduct}
              setActiveTab={setActiveTab}
            />

            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveTab('catalog');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 text-slate-800 dark:text-slate-200"
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="text-[9px] bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 px-1.5 py-0.5 rounded-full font-bold">
                      {cat.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <FlashDeals
              onSelectProduct={handleSelectProduct}
              setActiveTab={setActiveTab}
            />

            <BrandShowcase
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              setActiveTab={setActiveTab}
            />

            <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">Next-Gen Smartphone Market</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Featuring Grade 5 Titanium builds, 3nm Silicon SoCs, periscope zoom lenses, and on-device AI.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">15W Qi2 & 100W GaN Fast Charging</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ultra-compact GaNPrime chargers, magnetic car mounts, and certified wireless stations.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base">30-Day Money Back Guarantee</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Complete satisfaction with official warranty, instant replacements, and 24/7 support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CATALOG */}
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            <div className="lg:col-span-3 lg:sticky lg:top-24">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                only5G={only5G}
                setOnly5G={setOnly5G}
                onlySale={onlySale}
                setOnlySale={setOnlySale}
                minRating={minRating}
                setMinRating={setMinRating}
                onResetFilters={handleResetFilters}
                totalMatching={filteredProducts.length}
              />
            </div>

            <div className="lg:col-span-9">
              <ProductGrid
                products={filteredProducts}
                onSelectProduct={handleSelectProduct}
                activeCategoryName={activeCategoryName}
                activeBrandName={activeBrandName}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: COMPARE */}
        {activeTab === 'compare' && (
          <div className="animate-in fade-in duration-300">
            <PhoneComparisonModal
              isOpen={true}
              onClose={() => setActiveTab('catalog')}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        )}

        {/* VIEW 4: MATCHER */}
        {activeTab === 'matcher' && (
          <div className="animate-in fade-in duration-300">
            <CompatibilityMatcher onSelectProduct={handleSelectProduct} />
          </div>
        )}

        {/* VIEW 5: TRADE-IN */}
        {activeTab === 'tradein' && (
          <div className="animate-in fade-in duration-300">
            <TradeInCalculator setActiveTab={setActiveTab} />
          </div>
        )}

        {/* VIEW 6: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <div className="animate-in fade-in duration-300">
            <AdminDashboard
              onOpenAddProduct={handleOpenAddProduct}
              onOpenEditProduct={handleSelectProduct}
            />
          </div>
        )}

      </main>

      {/* Global Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={onAddProductCallback || (() => {})}
      />

      <AuthModal onLoginSuccess={handleLoginSuccess} />

      {isCompareOpen && activeTab !== 'compare' && (
        <PhoneComparisonModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          onSelectProduct={handleSelectProduct}
        />
      )}

      <CartDrawer />
      <WishlistDrawer onSelectProduct={handleSelectProduct} />
      <CheckoutModal />

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all z-30 group"
        title="Back to top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        setSelectedCategory={setSelectedCategory}
        setSelectedBrand={setSelectedBrand}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <MainStore />
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
