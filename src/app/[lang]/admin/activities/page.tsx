'use client';

import React, { useState, useEffect } from 'react';
import { IActivity } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { Plus, Edit2, Trash2, Search, RefreshCw, X, Sparkles, Target, Users, Clock } from 'lucide-react';

export default function AdminActivitiesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<IActivity | null>(null);

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: 'kids_youth',
    ageRange: '6+',
    durationMinutes: 20,
    participantsMin: 4,
    participantsMax: 20,
    pricePerDayEGP: 6000,
    benefitsEn: '',
    benefitsAr: '',
    imageUrl: '/magica-games-print.png',
    isActive: true,
  });

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/activities?all=true');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setActivities(json.data);
      }
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
      participantsMax: 20,
      pricePerDayEGP: 6000,
      benefitsEn: 'Active Listening, Non-verbal Communication, Teamwork',
      benefitsAr: 'الاستماع الفعال، التواصل الحركي، العمل الجماعي',
      imageUrl: '/magica-games-print.png',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (act: IActivity) => {
    setEditingActivity(act);
    setFormData({
      titleEn: act.titleEn ?? '',
      titleAr: act.titleAr ?? '',
      descriptionEn: act.descriptionEn ?? '',
      descriptionAr: act.descriptionAr ?? '',
      category: act.category ?? 'kids_youth',
      ageRange: act.ageRange ?? '6+',
      durationMinutes: act.durationMinutes ?? 20,
      participantsMin: act.participantsMin ?? 4,
      participantsMax: act.participantsMax ?? 20,
      pricePerDayEGP: act.pricePerDayEGP ?? 6000,
      benefitsEn: act.benefitsEn ? act.benefitsEn.join(', ') : '',
      benefitsAr: act.benefitsAr ? act.benefitsAr.join(', ') : '',
      imageUrl: act.imageUrl || '/magica-games-print.png',
      isActive: act.isActive ?? true,
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
      const id = editingActivity?.id || (editingActivity as any)?._id;
      const url = editingActivity ? `/api/activities/${id}` : '/api/activities';
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
      console.error(err);
    }
  };

  const toggleActive = async (act: IActivity) => {
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
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? 'حذف هذه اللعبة؟' : 'Delete this game/activity?')) return;
    try {
      const res = await fetch(`/api/activities/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setActivities((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = activities.filter((act) => {
    const matchesCategory = categoryFilter === 'all' || act.category === categoryFilter;
    const matchesSearch =
      act.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.titleAr.includes(searchQuery) ||
      act.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <AdminNav lang={params.lang} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            {isAr ? 'إدارة كتالوج الألعاب والفعاليات' : 'Manage Activities & Games Catalog'}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {isAr
              ? `إجمالي الألعاب في النظام: ${activities.length} (17 ألعاب أطفال + 20 ألعاب هوائية للشركات)`
              : `Total Catalog Games: ${activities.length} (17 Youth Games + 20 Corporate Floatable Games)`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchActivities}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'تحديث' : 'Refresh'}</span>
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة لعبة جديدة' : 'Add New Activity'}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-gray-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
          <input
            type="text"
            placeholder={isAr ? 'بحث باسم اللعبة أو الوصف...' : 'Search activity by name or description...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              categoryFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isAr ? 'الكل' : 'All'} ({activities.length})
          </button>
          <button
            onClick={() => setCategoryFilter('kids_youth')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              categoryFilter === 'kids_youth' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎯 {isAr ? 'ألعاب الأطفال (17)' : 'Youth Games (17)'}
          </button>
          <button
            onClick={() => setCategoryFilter('corporate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              categoryFilter === 'corporate' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🌊 {isAr ? 'الألعاب الهوائية للشركات (20)' : 'Floatable Corporate (20)'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-24 text-center text-xs text-gray-500 font-bold">Loading catalog...</div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-xs text-gray-500 font-bold">No activities found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-black border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">Activity & Game Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Rate / Day (EGP)</th>
                  <th className="px-6 py-3.5">Participants</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filtered.map((act) => {
                  const id = (act.id || (act as any)._id) as string;
                  const isYouth = act.category === 'kids_youth';

                  return (
                    <tr key={id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-black text-gray-900 text-sm">{act.titleEn}</div>
                        <div className="text-gray-500 text-[11px]">{act.titleAr}</div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black ${
                            isYouth ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {isYouth ? '🎯 Youth (Ages 6+)' : '🌊 Corporate Floatable'}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-black text-blue-600 text-sm">
                        {(act.pricePerDayEGP ?? 6000).toLocaleString()} EGP
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {act.participantsMin} - {act.participantsMax} players ({act.durationMinutes} mins)
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(act)}
                          className={`px-3 py-1 rounded-full text-xs font-black transition-colors ${
                            act.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {act.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>

                      <td className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditModal(act)} className="p-1.5 hover:text-blue-600">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(id)} className="p-1.5 hover:text-red-600">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-black text-gray-900">
                {editingActivity ? 'Edit Activity & Game' : 'Add New Activity'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Activity Name (English) *</label>
                  <input
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">اسم اللعبة (عربي) *</label>
                  <input
                    required
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="kids_youth">🎯 Kids & Youth (Ages 6+)</option>
                    <option value="corporate">🌊 Corporate Floatable</option>
                    <option value="camp">🏕️ Camp Challenge</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Price / Day (EGP) *</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerDayEGP}
                    onChange={(e) => setFormData({ ...formData, pricePerDayEGP: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الوصف (عربي)</label>
                <textarea
                  rows={2}
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Benefits (comma-separated)</label>
                <input
                  value={formData.benefitsEn}
                  onChange={(e) => setFormData({ ...formData, benefitsEn: e.target.value })}
                  placeholder="e.g. Active Listening, Balance, Teamwork"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md">
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