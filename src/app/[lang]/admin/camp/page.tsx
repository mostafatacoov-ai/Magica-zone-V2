'use client';

import React, { useState, useEffect } from 'react';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { processImageFile } from '@/lib/imageUpload';
import {
  Tent,
  Plus,
  Edit2,
  Trash2,
  Upload,
  RefreshCw,
  X,
  Camera,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminCampManagerPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [activeTab, setActiveTab] = useState<'programs' | 'gallery'>('programs');

  // Camp Programs State
  const [camps, setCamps] = useState<any[]>([]);
  const [loadingCamps, setLoadingCamps] = useState(true);
  const [isCampModalOpen, setIsCampModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState<any | null>(null);

  const [campFormData, setCampFormData] = useState({
    titleEn: '',
    titleAr: '',
    season: 'summer',
    locationEn: 'Royal Valley Campsite & Tech Village',
    locationAr: 'موقع الوادي الملكي وقرية التكنولوجيا',
    datesEn: 'July 1 - August 30',
    datesAr: '1 يوليو - 30 أغسطس',
    ageGroup: '6 - 15 Years',
    sessionDuration: '2-Week & Monthly Options',
    priceUSD: 350,
    priceEGP: 15000,
    descriptionEn: '',
    descriptionAr: '',
    inclusionsEn: 'Daily Organic Brain Fuel Meals, Official Magica Explorer Uniform, Royal Bazar Booth Access, Weekly Assessment Report',
    inclusionsAr: 'وجبات بينتو بوكس صحية يومية، يونيفورم وكاب المستكشف، مساحة في البازار الملكي، تقرير تقييم أسبوعي',
    isActive: true,
  });

  // Gallery Photos State
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [photoFormData, setPhotoFormData] = useState({
    imageUrl: '',
    captionEn: 'Camp Adventure Moment',
    captionAr: 'لحظة مميزة من المعسكر',
  });

  const fetchCamps = async () => {
    setLoadingCamps(true);
    try {
      const res = await fetch('/api/camps?all=true');
      const json = await res.json();
      if (json.success) setCamps(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCamps(false);
    }
  };

  const fetchPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const res = await fetch('/api/camp-photos');
      const json = await res.json();
      if (json.success) {
        setGalleryPhotos(json.rawPhotos || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  useEffect(() => {
    fetchCamps();
    fetchPhotos();
  }, []);

  // Camp CRUD Handlers
  const openCreateCamp = () => {
    setEditingCamp(null);
    setCampFormData({
      titleEn: '',
      titleAr: '',
      season: 'summer',
      locationEn: 'Royal Valley Campsite & Tech Village',
      locationAr: 'موقع الوادي الملكي وقرية التكنولوجيا',
      datesEn: 'July 1 - August 30',
      datesAr: '1 يوليو - 30 أغسطس',
      ageGroup: '6 - 15 Years',
      sessionDuration: '2-Week & Monthly Options',
      priceUSD: 350,
      priceEGP: 15000,
      descriptionEn: '',
      descriptionAr: '',
      inclusionsEn: 'Daily Organic Brain Fuel Meals, Official Magica Explorer Uniform, Royal Bazar Booth Access, Weekly Assessment Report',
      inclusionsAr: 'وجبات بينتو بوكس صحية يومية، يونيفورم وكاب المستكشف، مساحة في البازار الملكي، تقرير تقييم أسبوعي',
      isActive: true,
    });
    setIsCampModalOpen(true);
  };

  const openEditCamp = (camp: any) => {
    setEditingCamp(camp);
    setCampFormData({
      titleEn: camp.titleEn,
      titleAr: camp.titleAr,
      season: camp.season || 'summer',
      locationEn: camp.locationEn,
      locationAr: camp.locationAr,
      datesEn: camp.datesEn,
      datesAr: camp.datesAr,
      ageGroup: camp.ageGroup,
      sessionDuration: camp.sessionDuration,
      priceUSD: camp.priceUSD || 350,
      priceEGP: camp.priceEGP || 15000,
      descriptionEn: camp.descriptionEn,
      descriptionAr: camp.descriptionAr,
      inclusionsEn: camp.inclusionsEn ? camp.inclusionsEn.join(', ') : '',
      inclusionsAr: camp.inclusionsAr ? camp.inclusionsAr.join(', ') : '',
      isActive: camp.isActive,
    });
    setIsCampModalOpen(true);
  };

  const handleSaveCamp = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...campFormData,
      inclusionsEn: campFormData.inclusionsEn ? campFormData.inclusionsEn.split(',').map((s) => s.trim()) : [],
      inclusionsAr: campFormData.inclusionsAr ? campFormData.inclusionsAr.split(',').map((s) => s.trim()) : [],
    };

    try {
      const id = editingCamp?._id || editingCamp?.id;
      const url = editingCamp ? `/api/camps/${id}` : '/api/camps';
      const method = editingCamp ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsCampModalOpen(false);
        fetchCamps();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCamp = async (id: string) => {
    if (!confirm(isAr ? 'حذف هذا البرنامج الصيفي؟' : 'Delete this camp program?')) return;
    try {
      const res = await fetch(`/api/camps/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCamps();
    } catch (err) {
      console.error(err);
    }
  };

  // Photo Upload Handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const base64 = await processImageFile(file, 900, 900, 0.85);
      setPhotoFormData((prev) => ({ ...prev, imageUrl: base64 }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFormData.imageUrl) return;

    try {
      const res = await fetch('/api/camp-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photoFormData),
      });
      if (res.ok) {
        setIsPhotoModalOpen(false);
        setPhotoFormData({ imageUrl: '', captionEn: 'Camp Moment', captionAr: 'لحظة مميزة' });
        fetchPhotos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm(isAr ? 'حذف هذه الصورة من المعرض؟' : 'Delete this photo from camp gallery?')) return;
    try {
      const res = await fetch(`/api/camp-photos/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <AdminNav lang={params.lang} />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            {isAr ? 'إدارة برامج ومعسكرات ماجيكا ومعرض الصور' : 'Manage Camp Programs & Photo Gallery'}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {isAr
              ? 'إنشاء وتعديل وتسمية المعسكرات الصيفية والشتوية، وإضافة وحذف صور الأبطال بالمعسكر'
              : 'Create, edit and rename summer/winter camps, and manage real kids camp photos'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'programs' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🏕️ {isAr ? 'برامج المعسكرات' : 'Camp Programs'} ({camps.length})
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'gallery' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📸 {isAr ? 'معرض صور الأبطال' : 'Photo Gallery'} ({galleryPhotos.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: CAMP PROGRAMS */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={openCreateCamp}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إنشاء معسكر جديد (صيفي / شتوي)' : 'Create New Camp Program'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp) => {
              const id = camp._id || camp.id;
              return (
                <div
                  key={id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                        {camp.season?.toUpperCase() || 'SUMMER'} CAMP
                      </span>
                      <span className="text-base font-black text-amber-600">
                        {camp.priceUSD ? `$${camp.priceUSD}` : `${camp.priceEGP?.toLocaleString()} EGP`}
                      </span>
                    </div>

                    <h3 className="font-black text-gray-900 text-lg">{camp.titleEn}</h3>
                    <p className="text-xs text-gray-500 font-medium">{camp.titleAr}</p>

                    <div className="space-y-1.5 pt-2 text-xs text-gray-600 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{camp.locationEn}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{camp.datesEn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => openEditCamp(camp)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تعديل وتغيير الاسم' : 'Edit & Rename'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteCamp(id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: PHOTO GALLERY MANAGER */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200">
            <div>
              <h3 className="text-sm font-black text-gray-900">{isAr ? 'إدارة صور الأبطال بالمعسكر' : 'Kids Camp Photo Uploads'}</h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {isAr ? 'ارفع الصور من جهازك لتظهر فوراً في قسم (معرض صور الأبطال)' : 'Upload photos from your computer to appear directly in the gallery'}
              </p>
            </div>

            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة صورة من جهازك' : 'Upload New Photo'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryPhotos.map((photo) => {
              const id = photo._id || photo.id;
              return (
                <div key={id} className="relative h-48 rounded-2xl overflow-hidden bg-gray-100 border shadow-sm group">
                  <img src={photo.imageUrl} alt="Camp Moment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDeletePhoto(id)}
                      className="p-2 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal 1: Create / Edit Camp Program */}
      {isCampModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-black text-gray-900 text-base">
                {editingCamp ? (isAr ? 'تعديل وتسمية المعسكر' : 'Edit & Rename Camp Program') : (isAr ? 'إنشاء معسكر جديد' : 'Create New Camp Program')}
              </h3>
              <button onClick={() => setIsCampModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSaveCamp} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Camp Name (English) *</label>
                  <input
                    required
                    value={campFormData.titleEn}
                    onChange={(e) => setCampFormData({ ...campFormData, titleEn: e.target.value })}
                    placeholder="e.g. Magica Winter Adventure Camp 2026"
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">اسم المعسكر (عربي) *</label>
                  <input
                    required
                    value={campFormData.titleAr}
                    onChange={(e) => setCampFormData({ ...campFormData, titleAr: e.target.value })}
                    placeholder="مثال: معسكر ماجيكا الشتوي للمغامرة 2026"
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Season</label>
                  <select
                    value={campFormData.season}
                    onChange={(e) => setCampFormData({ ...campFormData, season: e.target.value as any })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="summer">☀️ Summer Camp</option>
                    <option value="winter">❄️ Winter Camp</option>
                    <option value="midyear">🌿 Mid-Year Camp</option>
                    <option value="weekend">⛺ Weekend Camp</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Tuition (USD)</label>
                  <input
                    type="number"
                    value={campFormData.priceUSD}
                    onChange={(e) => setCampFormData({ ...campFormData, priceUSD: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Tuition (EGP)</label>
                  <input
                    type="number"
                    value={campFormData.priceEGP}
                    onChange={(e) => setCampFormData({ ...campFormData, priceEGP: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Campsite Location (En)</label>
                  <input
                    value={campFormData.locationEn}
                    onChange={(e) => setCampFormData({ ...campFormData, locationEn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">الموقع ومكان المعسكر (عربي)</label>
                  <input
                    value={campFormData.locationAr}
                    onChange={(e) => setCampFormData({ ...campFormData, locationAr: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Dates (En)</label>
                  <input
                    value={campFormData.datesEn}
                    onChange={(e) => setCampFormData({ ...campFormData, datesEn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">المواعيد والتاريخ (عربي)</label>
                  <input
                    value={campFormData.datesAr}
                    onChange={(e) => setCampFormData({ ...campFormData, datesAr: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Package Inclusions (comma separated)</label>
                <input
                  value={campFormData.inclusionsEn}
                  onChange={(e) => setCampFormData({ ...campFormData, inclusionsEn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">المميزات المشمولة (مفصولة بفاصلة)</label>
                <input
                  value={campFormData.inclusionsAr}
                  onChange={(e) => setCampFormData({ ...campFormData, inclusionsAr: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsCampModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-md">Save Camp Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Upload Real Camp Photo */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="font-black text-gray-900 text-sm">{isAr ? 'رفع صورة جديدة للمعسكر' : 'Upload New Camp Photo'}</h3>
              <button onClick={() => setIsPhotoModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-3 text-center">
                {photoFormData.imageUrl ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-white border">
                    <img src={photoFormData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center gap-2 text-gray-400">
                    <Camera className="w-10 h-10 text-emerald-600" />
                    <span>{isAr ? 'اختر صورة من جهازك' : 'Choose photo from device'}</span>
                  </div>
                )}

                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer shadow-md hover:bg-emerald-700 transition-all">
                  <Upload className="w-4 h-4" />
                  <span>{uploadingImage ? 'Processing...' : (isAr ? 'اختيار صورة من جهازك' : 'Browse Photo')}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>

              <div>
                <label className="block font-bold mb-1">Caption / Title (English)</label>
                <input
                  value={photoFormData.captionEn}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, captionEn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsPhotoModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" disabled={!photoFormData.imageUrl} className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-md disabled:opacity-50">
                  {isAr ? 'حفظ ونشر الصورة' : 'Save & Publish Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}