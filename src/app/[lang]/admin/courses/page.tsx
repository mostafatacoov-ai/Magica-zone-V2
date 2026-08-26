'use client';

import React, { useState, useEffect } from 'react';
import { ICourse, CourseCategory } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, RefreshCw, X } from 'lucide-react';

export default function AdminCoursesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<ICourse | null>(null);

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: 'stem_robotics' as CourseCategory,
    ageGroup: '8-14 Years',
    durationWeeks: 4,
    sessionsCount: 8,
    priceEGP: 2000,
    syllabusEn: '',
    syllabusAr: '',
    scheduleEn: 'Saturdays & Tuesdays (4-6 PM)',
    scheduleAr: 'السبت والثلاثاء (4-6 مساءً)',
    isActive: true,
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/courses');
      const json = await res.json();
      if (json.success) setCourses(json.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData({
      titleEn: '',
      titleAr: '',
      descriptionEn: '',
      descriptionAr: '',
      category: 'stem_robotics',
      ageGroup: '8-14 Years',
      durationWeeks: 4,
      sessionsCount: 8,
      priceEGP: 2000,
      syllabusEn: '',
      syllabusAr: '',
      scheduleEn: 'Saturdays & Tuesdays (4-6 PM)',
      scheduleAr: 'السبت والثلاثاء (4-6 مساءً)',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (c: ICourse) => {
    setEditingCourse(c);
    setFormData({
      titleEn: c.titleEn,
      titleAr: c.titleAr,
      descriptionEn: c.descriptionEn,
      descriptionAr: c.descriptionAr,
      category: c.category,
      ageGroup: c.ageGroup,
      durationWeeks: c.durationWeeks,
      sessionsCount: c.sessionsCount,
      priceEGP: c.priceEGP,
      syllabusEn: c.syllabusEn ? c.syllabusEn.join(', ') : '',
      syllabusAr: c.syllabusAr ? c.syllabusAr.join(', ') : '',
      scheduleEn: c.scheduleEn,
      scheduleAr: c.scheduleAr,
      isActive: c.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      syllabusEn: formData.syllabusEn ? formData.syllabusEn.split(',').map((s) => s.trim()) : [],
      syllabusAr: formData.syllabusAr ? formData.syllabusAr.split(',').map((s) => s.trim()) : [],
    };

    try {
      const id = editingCourse?.id || (editingCourse as any)?._id;
      const url = editingCourse ? `/api/courses/${id}` : '/api/courses';
      const method = editingCourse ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCourses();
      }
    } catch (err) {
      console.error('Failed to save course', err);
    }
  };

  const toggleActive = async (c: ICourse) => {
    const id = c.id || (c as any)._id;
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !c.isActive }),
      });
      if (res.ok) {
        setCourses((prev) =>
          prev.map((item) => ((item.id || (item as any)._id) === id ? { ...item, isActive: !item.isActive } : item))
        );
      }
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذه الورشة؟' : 'Delete this course?')) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (res.ok) setCourses((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const filtered = courses.filter(
    (c) => c.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || c.titleAr.includes(searchQuery)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <AdminNav lang={params.lang} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isAr ? 'إدارة الورش والدورات التدريبية' : 'Manage Workshops & Courses'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isAr ? `إجمالي الدورات: ${courses.length}` : `Total Courses: ${courses.length}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCourses}
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
            <span>{isAr ? 'إضافة دورة جديدة' : 'Add New Course'}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">{isAr ? 'جاري التحميل...' : 'Loading...'}</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-500">{isAr ? 'لا توجد دورات.' : 'No courses found.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">{isAr ? 'اسم الورشة' : 'Course Title'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'الفئة' : 'Category'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'الرسوم' : 'Tuition (EGP)'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'المدة' : 'Duration'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="px-6 py-3.5 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => {
                  const id = (c.id || (c as any)._id) as string;
                  return (
                    <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{c.titleEn}</div>
                        <div className="text-gray-500 text-[11px]">{c.titleAr}</div>
                      </td>
                      <td className="px-6 py-4 capitalize">{c.category.replace('_', ' ')}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600">{c.priceEGP.toLocaleString()} EGP</td>
                      <td className="px-6 py-4 text-gray-600">{c.durationWeeks} wks ({c.sessionsCount} sessions)</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(c)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {c.isActive ? (isAr ? 'مفعل' : 'Active') : (isAr ? 'معطل' : 'Inactive')}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditModal(c)} className="p-1 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
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
              <h3 className="font-bold text-gray-900">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Title (English) *</label>
                  <input required value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">الاسم (بالعربية) *</label>
                  <input required value={formData.titleAr} onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })} className="w-full p-2 border rounded-lg" />
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as CourseCategory })} className="w-full p-2 border rounded-lg">
                    <option value="stem_robotics">STEM & Robotics</option>
                    <option value="leadership">Leadership</option>
                    <option value="creative_arts">Creative Arts</option>
                    <option value="outdoor_survival">Outdoor Survival</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price (EGP) *</label>
                  <input type="number" required value={formData.priceEGP} onChange={(e) => setFormData({ ...formData, priceEGP: Number(e.target.value) })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Age Group</label>
                  <input value={formData.ageGroup} onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}