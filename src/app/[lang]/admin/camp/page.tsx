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
  X,
  Camera,
  MapPin,
  Calendar,
  Layers,
  Check,
} from 'lucide-react';

interface BatchPhotoItem {
  id: string;
  imageUrl: string;
  captionEn: string;
  captionAr: string;
}

export default function AdminCampManagerPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [activeTab, setActiveTab] = useState<'programs' | 'gallery'>('gallery');

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
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });

  // Selected Batch Photos List
  const [stagedBatchPhotos, setStagedBatchPhotos] = useState<BatchPhotoItem[]>([]);
  const [batchDefaultCaption, setBatchDefaultCaption] = useState('Magica Camp Heroes Moment');

  const fetchCamps = async () => {
    setLoadingCamps(true);
    try {
      const res = await fetch('/api/camps?all=true', { cache: 'no-store' });
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
      const res = await fetch('/api/camp-photos', { cache: 'no-store' });
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

  // Multi-File Selection & Batch Processing
  const handleMultiplePhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    setUploadProgress({ current: 0, total: files.length });

    const processedList: BatchPhotoItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const base64 = await processImageFile(file, 900, 900, 0.85);
        processedList.push({
          id: `${Date.now()}-${i}-${Math.random()}`,
          imageUrl: base64,
          captionEn: batchDefaultCaption,
          captionAr: 'لحظة مميزة من أبطال المعسكر',
        });
      } catch (err) {
        console.error('Error compressing image:', file.name, err);
      }
      setUploadProgress({ current: i + 1, total: files.length });
    }

    setStagedBatchPhotos((prev) => [...prev, ...processedList]);
    setUploadingImages(false);
  };

  const removeStagedPhoto = (id: string) => {
    setStagedBatchPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveBatchPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stagedBatchPhotos.length === 0) return;

    try {
      const payload = stagedBatchPhotos.map((p, idx) => ({
        imageUrl: p.imageUrl,
        captionEn: p.captionEn || batchDefaultCaption,
        captionAr: p.captionAr || 'لحظة مميزة من أبطال المعسكر',
        order: idx,
      }));

      const res = await fetch('/api/camp-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: payload }),
      });

      if (res.ok) {
        setIsPhotoModalOpen(false);
        setStagedBatchPhotos([]);
        fetchPhotos();
      }
    } catch (err) {
      console.error('Failed to save batch photos', err);
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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <AdminNav lang={params.lang} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            {isAr ? 'إدارة برامج ومعسكرات ماجيكا ومعرض الصور' : 'Manage Camp Programs & Photo Gallery'}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {isAr
              ? 'إنشاء وتعديل وتسمية المعسكرات الصيفية والشتوية، وإضافة باقة صور متعددة دفعة واحدة'
              : 'Create & rename summer/winter camps, and batch-upload kids camp photos'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'gallery' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📸 {isAr ? 'معرض صور الأبطال' : 'Photo Gallery'} ({galleryPhotos.length})
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'programs' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🏕️ {isAr ? 'برامج المعسكرات' : 'Camp Programs'} ({camps.length})
          </button>
        </div>
      </div>

      {/* TAB 1: MULTI-PHOTO GALLERY MANAGER */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-black mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{isAr ? 'خاصية الرفع المتعدد' : 'Multi-Upload Enabled'}</span>
              </div>
              <h3 className="text-base font-black text-gray-900">{isAr ? 'معرض صور أبطال المعسكر' : 'Kids Camp Photo Gallery'}</h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {isAr
                  ? 'يمكنك الآن اختيار 10، 20 أو أكثر من الصور من جهازك ورفعها دفعة واحدة بضغطة زر'
                  : 'You can now select 10, 20 or more photos from your device and upload them in one single batch'}
              </p>
            </div>

            <button
              onClick={() => {
                setStagedBatchPhotos([]);
                setIsPhotoModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl shadow-md transition-all hover:scale-105 shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>{isAr ? 'رفع باقة صور متعددة دفعة واحدة' : '+ Batch Upload Photos'}</span>
            </button>
          </div>

          {loadingPhotos ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 font-bold text-xs text-gray-500">
              Loading gallery photos...
            </div>
          ) : galleryPhotos.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 font-bold text-xs text-gray-500 space-y-2">
              <Camera className="w-8 h-8 text-gray-300 mx-auto" />
              <p>{isAr ? 'لم يتم إضافة صور بعد. اضغط على زر الرفع لإضافة باقة صور.' : 'No photos added yet. Click Batch Upload to add photos.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {galleryPhotos.map((photo, idx) => {
                const id = photo._id || photo.id || idx;
                return (
                  <div key={id} className="relative h-52 rounded-3xl overflow-hidden bg-gray-100 border shadow-sm group">
                    <img src={photo.imageUrl} alt="Camp Moment" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                      <button
                        onClick={() => handleDeletePhoto(id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isAr ? 'حذف الصورة' : 'Delete'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CAMP PROGRAMS */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={openCreateCamp}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl shadow-md transition-all hover:scale-105"
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

      {/* BATCH MULTI-PHOTO UPLOAD MODAL */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">
                  {isAr ? 'رفع صور متعددة' : 'Batch Photo Uploader'}
                </span>
                <h3 className="text-xl font-black text-gray-900">
                  {isAr ? 'إضافة مجموعة صور جديدة للمعسكر' : 'Upload Multiple Camp Photos'}
                </h3>
              </div>
              <button onClick={() => setIsPhotoModalOpen(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSaveBatchPhotos} className="space-y-6 text-xs">
              {/* Multi-File Picker Dropzone */}
              <div className="p-8 bg-emerald-50/50 border-2 border-dashed border-emerald-300 rounded-3xl text-center space-y-3 hover:bg-emerald-50 transition-colors">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Camera className="w-7 h-7" />
                </div>

                <div>
                  <label className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl cursor-pointer shadow-lg transition-transform hover:scale-105">
                    <Upload className="w-4 h-4" />
                    <span>
                      {uploadingImages
                        ? `${isAr ? 'جاري معالجة' : 'Processing'} (${uploadProgress.current}/${uploadProgress.total})...`
                        : isAr ? 'اختر مجموعة صور من جهازك' : 'Select Multiple Photos from Device'}
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleMultiplePhotosUpload}
                    />
                  </label>
                  <p className="text-[11px] text-gray-500 font-medium mt-2">
                    {isAr
                      ? 'يمكنك تحديد عدة صور معاً (Ctrl + Click أو تحديد الكل). يتم ضغطها وحفظها بأمان.'
                      : 'Hold Ctrl / Shift to select multiple photos at once. Optimized automatically.'}
                  </p>
                </div>
              </div>

              {/* Live Preview of Staged Photos */}
              {stagedBatchPhotos.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-gray-900 text-xs">
                      {isAr ? `الصور المحددة للرفع (${stagedBatchPhotos.length} صورة):` : `Selected Photos (${stagedBatchPhotos.length} ready):`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStagedBatchPhotos([])}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      {isAr ? 'مسح الكل' : 'Clear All'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-2xl border">
                    {stagedBatchPhotos.map((p, idx) => (
                      <div key={p.id} className="relative h-20 rounded-xl overflow-hidden border shadow-sm group">
                        <img src={p.imageUrl} alt="Staged Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeStagedPhoto(p.id)}
                          className="absolute top-1 end-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 start-1 bg-black/60 text-white text-[9px] px-1 rounded font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={stagedBatchPhotos.length === 0 || uploadingImages}
                  className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isAr
                    ? `حفظ ونشر جميع الصور (${stagedBatchPhotos.length})`
                    : `Save & Publish All (${stagedBatchPhotos.length}) Photos`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT CAMP MODAL */}
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

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsCampModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-md">Save Camp Program</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}