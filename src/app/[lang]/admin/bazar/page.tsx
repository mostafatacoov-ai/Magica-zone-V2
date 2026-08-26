'use client';

import React, { useState, useEffect } from 'react';
import { IProduct, ProductCategory } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, RefreshCw, X } from 'lucide-react';

export default function AdminBazarPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: 'uniforms' as ProductCategory,
    priceEGP: 450,
    inStock: true,
    featuresEn: '',
    featuresAr: '',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      category: 'uniforms',
      priceEGP: 450,
      inStock: true,
      featuresEn: '',
      featuresAr: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: IProduct) => {
    setEditingProduct(p);
    setFormData({
      nameEn: p.nameEn,
      nameAr: p.nameAr,
      descriptionEn: p.descriptionEn,
      descriptionAr: p.descriptionAr,
      category: p.category,
      priceEGP: p.priceEGP,
      inStock: p.inStock,
      featuresEn: p.featuresEn ? p.featuresEn.join(', ') : '',
      featuresAr: p.featuresAr ? p.featuresAr.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      featuresEn: formData.featuresEn ? formData.featuresEn.split(',').map((s) => s.trim()) : [],
      featuresAr: formData.featuresAr ? formData.featuresAr.split(',').map((s) => s.trim()) : [],
    };

    try {
      const id = editingProduct?.id || (editingProduct as any)?._id;
      const url = editingProduct ? `/api/products/${id}` : '/api/products';
      const method = editingProduct ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error('Failed to save product', err);
    }
  };

  const toggleStock = async (p: IProduct) => {
    const id = p.id || (p as any)._id;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !p.inStock }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((item) => ((item.id || (item as any)._id) === id ? { ...item, inStock: !item.inStock } : item))
        );
      }
    } catch (err) {
      console.error('Failed to toggle stock', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? 'حذف هذا المنتج؟' : 'Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) setProducts((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const filtered = products.filter(
    (p) => p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || p.nameAr.includes(searchQuery)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <AdminNav lang={params.lang} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isAr ? 'إدارة المتجر ومستلزمات البازار' : 'Manage Store & Bazar Products'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isAr ? `إجمالي المنتجات: ${products.length}` : `Total Products: ${products.length}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'تحديث' : 'Refresh'}</span>
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة منتج جديد' : 'Add New Product'}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">{isAr ? 'جاري التحميل...' : 'Loading...'}</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-500">{isAr ? 'لا توجد منتجات.' : 'No products found.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">{isAr ? 'المنتج' : 'Product'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'القسم' : 'Category'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'السعر' : 'Price (EGP)'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'المخزون' : 'Availability'}</th>
                  <th className="px-6 py-3.5 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => {
                  const id = (p.id || (p as any)._id) as string;
                  return (
                    <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{p.nameEn}</div>
                        <div className="text-gray-500 text-[11px]">{p.nameAr}</div>
                      </td>
                      <td className="px-6 py-4 capitalize">{p.category.replace('_', ' ')}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">{p.priceEGP.toLocaleString()} EGP</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStock(p)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.inStock ? (isAr ? 'متوفر' : 'In Stock') : (isAr ? 'نفذ' : 'Out of Stock')}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditModal(p)} className="p-1 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(id)} className="p-1 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Name (English) *</label>
                  <input required value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">الاسم (بالعربية) *</label>
                  <input required value={formData.nameAr} onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description (English) *</label>
                <textarea rows={2} required value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="block font-semibold mb-1">الوصف (بالعربية) *</label>
                <textarea rows={2} required value={formData.descriptionAr} onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })} className="w-full p-2 border rounded-lg" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })} className="w-full p-2 border rounded-lg">
                    <option value="uniforms">Uniforms & Apparel</option>
                    <option value="camp_gear">Camp Gear</option>
                    <option value="event_supplies">Event Supplies</option>
                    <option value="souvenirs">Souvenirs & Medals</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price (EGP) *</label>
                  <input type="number" required value={formData.priceEGP} onChange={(e) => setFormData({ ...formData, priceEGP: Number(e.target.value) })} className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}