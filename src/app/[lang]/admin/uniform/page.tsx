'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IProduct } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { Plus, Edit2, Trash2, Search, RefreshCw, X, Shirt, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminUniformPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        category: 'uniforms' as const,
        priceEGP: 450,
        imageUrl: '',
        inStock: true,
        featuresEn: '100% Breathable Cotton, Comfort Fit, Official Embroidered Badge',
        featuresAr: 'قطن 100% مسامي ومريح، مقاسات لكافة الأعمار، تطريز شعار ماجيكا',
    });

    const fetchUniforms = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            const json = await res.json();
            if (json.success) {
                const uniformsOnly = json.data.filter((p: IProduct) => p.category === 'uniforms');
                setProducts(uniformsOnly);
            }
        } catch (err) {
            console.error('Failed to load uniforms', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUniforms();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const data = new FormData();
        data.append('file', file);
        data.append('folder', 'uniform');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const json = await res.json();
            if (json.success) {
                setFormData((prev) => ({ ...prev, imageUrl: json.url }));
            } else {
                alert(json.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error', err);
        } finally {
            setUploadingImage(false);
        }
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setFormData({
            nameEn: '',
            nameAr: '',
            descriptionEn: '',
            descriptionAr: '',
            category: 'uniforms',
            priceEGP: 450,
            imageUrl: '',
            inStock: true,
            featuresEn: '100% Breathable Cotton, Comfort Fit, Official Embroidered Badge',
            featuresAr: 'قطن 100% مسامي ومريح، مقاسات لكافة الأعمار، تطريز شعار ماجيكا',
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
            category: 'uniforms',
            priceEGP: p.priceEGP,
            imageUrl: p.imageUrl || '',
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
                fetchUniforms();
            }
        } catch (err) {
            console.error('Failed to save uniform', err);
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
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(isAr ? 'حذف هذا اليونيفورم؟' : 'Delete this uniform item?')) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) setProducts((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
        } catch (err) {
            console.error(err);
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
                        {isAr ? 'إدارة يونيفورم وملابس ماجيكا' : 'Manage Magica Uniform & Apparel'}
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        {isAr ? `إجمالي الملابس واليونيفورم: ${products.length}` : `Total Apparel Items: ${products.length}`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={fetchUniforms} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border rounded-xl hover:bg-gray-50">
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        <span>{isAr ? 'تحديث' : 'Refresh'}</span>
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isAr ? 'إضافة يونيفورم / هودي' : 'Add Apparel Item'}</span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
                <input
                    type="text"
                    placeholder={isAr ? 'بحث عن ملابس أو يونيفورم...' : 'Search uniforms...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full ps-9 pe-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="py-20 text-center text-xs text-gray-500">Loading apparel...</div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center text-xs text-gray-500">No uniforms found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-start text-xs">
                            <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3.5">Product Photo & Name</th>
                                    <th className="px-6 py-3.5">Price</th>
                                    <th className="px-6 py-3.5">Stock Status</th>
                                    <th className="px-6 py-3.5 text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map((p) => {
                                    const id = (p.id || (p as any)._id) as string;
                                    return (
                                        <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-xl bg-blue-50/60 border border-blue-100 overflow-hidden shrink-0 flex items-center justify-center">
                                                    {p.imageUrl ? (
                                                        <Image src={p.imageUrl} alt={p.nameEn} fill className="object-contain p-1" />
                                                    ) : (
                                                        <Shirt className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm">{p.nameEn}</div>
                                                    <div className="text-gray-500 text-[11px]">{p.nameAr}</div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 font-bold text-blue-600 text-sm">
                                                {p.priceEGP.toLocaleString()} EGP
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleStock(p)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {p.inStock ? 'In Stock' : 'Out of Stock'}
                                                </button>
                                            </td>

                                            <td className="px-6 py-4 text-end">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => openEditModal(p)} className="p-1.5 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete(id)} className="p-1.5 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
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

            {/* Modal with Upload Button */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <h3 className="font-bold text-gray-900">{editingProduct ? 'Edit Uniform Item' : 'Add New Uniform Item'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Item Name (English) *</label>
                                    <input required value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">اسم اليونيفورم (عربي) *</label>
                                    <input required value={formData.nameAr} onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                                </div>
                            </div>

                            {/* Upload Photo from Device */}
                            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                                <label className="block font-bold text-gray-800">
                                    {isAr ? 'صورة اليونيفورم من جهازك:' : 'Upload Apparel Photo:'}
                                </label>

                                <div className="flex items-center gap-4">
                                    {formData.imageUrl ? (
                                        <div className="relative w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-white shrink-0">
                                            <Image src={formData.imageUrl} alt="Preview" fill className="object-contain p-1" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-white shrink-0">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                    )}

                                    <div className="flex-1 space-y-1.5">
                                        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer shadow-sm transition-all">
                                            <Upload className="w-4 h-4" />
                                            <span>{uploadingImage ? (isAr ? 'جاري الرفع...' : 'Uploading...') : (isAr ? 'اختر صورة من جهازك' : 'Choose Photo from Device')}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                        <p className="text-[10px] text-gray-500">
                                            {isAr ? 'PNG, JPG, WEBP حتى 5MB' : 'Supports PNG, JPG, WEBP files up to 5MB'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Price in EGP *</label>
                                <input type="number" required value={formData.priceEGP} onChange={(e) => setFormData({ ...formData, priceEGP: Number(e.target.value) })} className="w-full p-2.5 border rounded-xl" />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Description (English)</label>
                                <textarea rows={2} value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">الوصف (عربي)</label>
                                <textarea rows={2} value={formData.descriptionAr} onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold">Save Uniform</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}