import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Tag, 
  DollarSign, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';
import { products as initialProducts } from '../../data/products';
import { coupons as initialCoupons } from '../../data/coupons';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard = ({ onOpenAddProduct, onOpenEditProduct }) => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState('inventory');
  const [productsList, setProductsList] = useState(initialProducts);
  const [couponsList, setCouponsList] = useState(initialCoupons);
  const [searchQuery, setSearchQuery] = useState('');

  const [orders, setOrders] = useState([
    {
      id: 'MZ-89241',
      customer: 'Alex Reynolds',
      email: 'alex@example.com',
      date: 'Today, 2:40 PM',
      total: 1268.99,
      status: 'Processing',
      items: ['Apple iPhone 16 Pro Max (256GB)', 'Spigen Ultra Hybrid Case']
    },
    {
      id: 'MZ-78192',
      customer: 'Elena Rostova',
      email: 'elena@example.com',
      date: 'Today, 11:15 AM',
      total: 1149.00,
      status: 'Shipped',
      items: ['Samsung Galaxy S24 Ultra 5G']
    },
    {
      id: 'MZ-65410',
      customer: 'Marcus Brody',
      email: 'marcus@tech.io',
      date: 'Yesterday',
      total: 89.99,
      status: 'Delivered',
      items: ['3-in-1 Foldable MagSafe Qi2 Stand']
    }
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponMin, setNewCouponMin] = useState('50');

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Remove this product from live catalog?')) {
      setProductsList(prev => prev.filter(p => p.id !== productId));
      addToast('Product removed from catalog', 'info');
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addToast(`Order ${orderId} status set to ${newStatus}`, 'success');
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponDiscount) return;
    const newCoupon = {
      code: newCouponCode.trim().toUpperCase(),
      discount: Number(newCouponDiscount),
      type: 'percentage',
      minSpend: Number(newCouponMin) || 0,
      description: `${newCouponDiscount}% OFF on orders over $${newCouponMin}`
    };
    setCouponsList([newCoupon, ...couponsList]);
    setNewCouponCode('');
    setNewCouponDiscount('');
    addToast(`Coupon ${newCoupon.code} created!`, 'success');
  };

  const handleDeleteCoupon = (code) => {
    setCouponsList(prev => prev.filter(c => c.code !== code));
    addToast('Coupon deleted', 'info');
  };

  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Admin Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 shadow-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                Master Administration
              </span>
              <span className="text-xs text-slate-400">Logged in as {user?.name || 'Admin'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
              Mobilezone Control Panel
            </h2>
          </div>
        </div>

        <button
          onClick={() => onOpenAddProduct(setProductsList)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">$148,920</div>
          <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% this month
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1,248</div>
          <span className="text-xs font-semibold text-blue-500 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 98.6% delivered
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2">
            <span>Live Catalog</span>
            <Package className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{productsList.length}</div>
          <span className="text-xs text-slate-400 mt-1 block">Active devices & gear</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2">
            <span>Satisfaction</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">4.9 / 5.0</div>
          <span className="text-xs text-amber-500 font-semibold mt-1 block">★ 4,890 reviews</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto custom-scrollbar">
        {[
          { id: 'inventory', label: '📦 Catalog Inventory', count: productsList.length },
          { id: 'orders', label: '🛒 Customer Orders', count: orders.length },
          { id: 'coupons', label: '🏷️ Promo Coupons', count: couponsList.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeAdminTab === tab.id
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeAdminTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* INVENTORY */}
      {activeAdminTab === 'inventory' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-2 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
            <span className="text-xs text-slate-400">{filteredProducts.length} items</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-extrabold uppercase border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3.5">Item</th>
                  <th className="p-3.5">Brand</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} className="w-10 h-10 object-contain rounded-lg bg-slate-100 dark:bg-slate-800 p-1" />
                        <strong className="text-slate-900 dark:text-white truncate max-w-xs block">{product.name}</strong>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-blue-600 dark:text-cyan-400">{product.brand}</td>
                    <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">${product.price}</td>
                    <td className="p-3.5">
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        {product.stock || 20} In Stock
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS */}
      {activeAdminTab === 'orders' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-extrabold uppercase border-b border-slate-200 dark:border-slate-800">
                <th className="p-3.5">Reference</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-cyan-400">{order.id}</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{order.customer}</td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400">{order.items.join(', ')}</td>
                  <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">${order.total.toFixed(2)}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-blue-500/10 text-blue-500">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg p-1.5 cursor-pointer text-slate-800 dark:text-slate-200"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* COUPONS */}
      {activeAdminTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Create New Coupon</h4>
            <form onSubmit={handleAddCoupon} className="space-y-3">
              <div>
                <label className="font-semibold block mb-1">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. MEGA30"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl uppercase font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Discount (%)</label>
                <input
                  type="number"
                  placeholder="30"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl"
              >
                Create Promo Code
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {couponsList.map(c => (
              <div key={c.code} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <strong className="font-mono text-sm text-slate-900 dark:text-white font-bold">{c.code}</strong>
                  <span className="text-slate-400 block">{c.description || `${c.discount}% discount`}</span>
                </div>
                <button
                  onClick={() => handleDeleteCoupon(c.code)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
