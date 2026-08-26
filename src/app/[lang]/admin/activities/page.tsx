'use client';

import React, { useState, useEffect } from 'react';
import { IActivity, ProgramCategory } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, RefreshCw, X } from 'lucide-react';

export default function AdminActivitiesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<IActivity | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: 'kids_youth' as ProgramCategory,
    ageRange: '6+',
    durationMinutes: 20,
    participantsMin: 4,
    participantsMax: 15,
    pricePerDayEGP: 6000,
    benefitsEn: '',
    benefitsAr: '',
    isActive: true,
  });

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/activities');
      const json = await res.json();
      if (json.success) setActivities(json.data);
    } catch (err) {
      console.error('Failed to load activities', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const openCreateModal = () => {
    setEditingActivity(null);
    setFormData({
      titleEn: '',
      titleAr: '',
      descriptionEn: '',
      descriptionAr: '',
      category: 'kids_youth',
      ageRange: '6+',
      durationMinutes: 20,
      participantsMin: 4,
      participantsMax: 15,
      pricePerDayEGP: 6000,
      benefitsEn: '',
      benefitsAr: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (act: IActivity) => {
    setEditingActivity(act);
    setFormData({
      titleEn: act.titleEn,
      titleAr: act.titleAr,
      descriptionEn: act.descriptionEn,
      descriptionAr: act.descriptionAr,
      category: act.category,
      ageRange: act.ageRange || '6+',
      durationMinutes: act.durationMinutes,
      participantsMin: act.participantsMin,
      participantsMax: act.participantsMax,
      pricePerDayEGP: act.pricePerDayEGP,
      benefitsEn: act.benefitsEn ? act.benefitsEn.join(', ') : '',
      benefitsAr: act.benefitsAr ? act.benefitsAr.join(', ') : '',
      isActive: act.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      benefitsEn: formData.benefitsEn ? formData.benefitsEn.split(',').map((s) => s.trim()) : [],
      benefitsAr: formData.benefitsAr ? formData.benefitsAr.split(',').map((s) => s.trim()) : [],
    };

    try {
      const url = editingActivity
        ? `/api/activities/${editingActivity.id || (editingActivity as any)._id}`
        : '/api/activities';
      const method = editingActivity ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchActivities();
      }
    } catch (err) {
      console.error('Failed to save activity', err);
    }
  };

  const toggleActiveStatus = async (act: IActivity) => {
    const id = act.id || (act as any)._id;
    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !act.isActive }),
      });
      if (res.ok) {
        setActivities((prev) =>
          prev.map((item) => ((item.id || (item as any)._id) === id ? { ...item, isActive: !item.isActive } : item))
        );
      }
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا النشاط؟' : 'Are you sure you want to delete this activity?')) return;
    try {
      const res = await fetch(`/api/activities/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setActivities((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
      }
    } catch (err) {
      console.error('Failed to delete activity', err);
    }
  };

  const filtered = activities.filter(
    (act) =>
      act.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.titleAr.includes(searchQuery)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Navigation Tabs */}
      <AdminNav lang={params.lang} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isAr ? 'إدارة الألعاب والأنشطة' : 'Manage Activities & Games'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isAr ? `إجمالي الألعاب في الكتالوج: ${activities.length}` : `Total Catalog Activities: ${activities.length}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchActivities}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'تحديث' : 'Refresh'}</span>
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة لعبة جديدة' : 'Add New Activity'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
        <input
          type="text"
          placeholder={isAr ? 'بحث عن نشاط بالاسم...' : 'Search activities by name...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full ps-9 pe-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-sm text-gray-500">{isAr ? 'جاري التحميل...' : 'Loading activities...'}</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-gray-500">{isAr ? 'لا توجد ألعاب مطابقة.' : 'No activities found.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">{isAr ? 'اللعبة / النشاط' : 'Activity Name'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'القسم' : 'Category'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'السعر لليوم' : 'Price / Day'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'المدة والمشاركين' : 'Duration & Players'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="px-6 py-3.5 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((act) => {
                  const id = (act.id || (act as any)._id) as string;
                  return (
                    <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 text-sm">{act.titleEn}</div>
                        <div className="text-gray-500 text-xs">{act.titleAr}</div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 capitalize">
                          {act.category.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-bold text-blue-600">
                        {act.pricePerDayEGP.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        <div>{act.durationMinutes} mins</div>
                        <div className="text-gray-400 text-[11px]">{act.participantsMin}-{act.participantsMax} players</div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActiveStatus(act)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                            act.isActive
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {act.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          <span>{act.isActive ? (isAr ? 'مفعل' : 'Active') : (isAr ? 'معطل' : 'Inactive')}</span>
                        </button>
                      </td>

                      <td className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(act)}
                            className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editingActivity
                  ? isAr ? 'تعديل بيانات النشاط' : 'Edit Activity'
                  : isAr ? 'إضافة نشاط جديد' : 'Add New Activity'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title (English) *</label>
                  <input
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">الاسم (بالعربية) *</label>
                  <input
                    required
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description (English) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">الوصف (بالعربية) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProgramCategory })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="kids_youth">Kids & Youth</option>
                    <option value="corporate">Corporate</option>
                    <option value="camp">Camp</option>
                    <option value="bazar">Bazar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price per Day (EGP) *</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerDayEGP}
                    onChange={(e) => setFormData({ ...formData, pricePerDayEGP: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Benefits (English, comma-separated)</label>
                  <input
                    value={formData.benefitsEn}
                    onChange={(e) => setFormData({ ...formData, benefitsEn: e.target.value })}
                    placeholder="e.g. Active Listening, Team Rhythm"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">الفوائد التنموية (مفصولة بفواصل)</label>
                  <input
                    value={formData.benefitsAr}
                    onChange={(e) => setFormData({ ...formData, benefitsAr: e.target.value })}
                    placeholder="مثال: الاستماع الفعال، الإيقاع المشترك"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}