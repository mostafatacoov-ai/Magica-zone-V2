'use client';

import React, { useState, useEffect } from 'react';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { Radio, Plus, Trash2, CheckCircle2, XCircle, Play, Pause, RefreshCw, X, Music2 } from 'lucide-react';
import { useRadio } from '@/context/RadioContext';

export default function AdminRadioPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const { playTrack, refreshPlaylist } = useRadio();

    const [tracks, setTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        titleEn: '',
        titleAr: '',
        artistEn: 'Magica Zone',
        artistAr: 'ماجيكا زون',
        category: 'anthem',
        duration: '3:00',
        audioSrc: '/audio/',
        isActive: true,
    });

    const fetchAllTracks = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/radio?all=true');
            const json = await res.json();
            if (json.success) setTracks(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTracks();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/radio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchAllTracks();
                refreshPlaylist();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const toggleTrackActive = async (track: any) => {
        const id = track.id || track._id;
        try {
            const res = await fetch(`/api/radio/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !track.isActive }),
            });
            if (res.ok) {
                setTracks((prev) =>
                    prev.map((t) => (t._id === id ? { ...t, isActive: !t.isActive } : t))
                );
                refreshPlaylist();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(isAr ? 'حذف هذه الأغنية من الراديو؟' : 'Delete this song from radio?')) return;
        try {
            const res = await fetch(`/api/radio/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setTracks((prev) => prev.filter((t) => (t.id || t._id) !== id));
                refreshPlaylist();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <AdminNav lang={params.lang} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        {isAr ? 'إدارة راديو ماجيكا والصوتيات' : 'Magica Live Radio & Music Manager'}
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        {isAr ? 'تحكم في الأغاني المعروضة، الإيقاف والتفعيل، وقائمة البث المباشر' : 'Control live broadcast songs, toggle playback, and manage audio rotation'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={fetchAllTracks} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border rounded-xl hover:bg-gray-50">
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        <span>{isAr ? 'تحديث' : 'Refresh'}</span>
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isAr ? 'إضافة أغنية جديدة' : 'Add New Track'}</span>
                    </button>
                </div>
            </div>

            {/* Tracks Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="py-20 text-center text-xs text-gray-500">Loading radio library...</div>
                ) : tracks.length === 0 ? (
                    <div className="py-20 text-center text-xs text-gray-500">No tracks found. Hit /api/seed to populate the 7 songs.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-start text-xs">
                            <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3.5">Song Title & Artist</th>
                                    <th className="px-6 py-3.5">Category</th>
                                    <th className="px-6 py-3.5">Duration</th>
                                    <th className="px-6 py-3.5">File Source</th>
                                    <th className="px-6 py-3.5">Live Radio Broadcast</th>
                                    <th className="px-6 py-3.5 text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tracks.map((t, idx) => {
                                    const id = t.id || t._id;
                                    return (
                                        <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                                    <Music2 className="w-4 h-4 text-blue-600" />
                                                    <span>{t.titleEn}</span>
                                                </div>
                                                <div className="text-gray-500 text-[11px] ps-6">{t.titleAr} • {t.artistEn}</div>
                                            </td>

                                            <td className="px-6 py-4 capitalize font-semibold text-gray-700">
                                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-[11px]">
                                                    {t.category}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 font-mono text-gray-500">{t.duration}</td>

                                            <td className="px-6 py-4 text-gray-400 font-mono text-[11px] max-w-[150px] truncate">
                                                {t.audioSrc}
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleTrackActive(t)}
                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${t.isActive
                                                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {t.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                                    <span>{t.isActive ? (isAr ? 'نشط على الراديو' : 'Playing Live') : (isAr ? 'معطل' : 'Muted / Off')}</span>
                                                </button>
                                            </td>

                                            <td className="px-6 py-4 text-end">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => playTrack(idx)}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Test Play Now"
                                                    >
                                                        <Play className="w-4 h-4 fill-current" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(id)}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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

            {/* Add Track Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <h3 className="font-bold text-gray-900">{isAr ? 'إضافة أغنية / ملف صوتي للراديو' : 'Add Track to Radio'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Title (English) *</label>
                                    <input required value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">الاسم (بالعربية) *</label>
                                    <input required value={formData.titleAr} onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Category</label>
                                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })} className="w-full p-2.5 border rounded-xl">
                                        <option value="anthem">Anthem</option>
                                        <option value="song">Song</option>
                                        <option value="chant">Chant</option>
                                        <option value="podcast">Podcast</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Duration (e.g. 3:15)</label>
                                    <input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">File Path or URL (e.g. /audio/my-song.mp3) *</label>
                                <input required value={formData.audioSrc} onChange={(e) => setFormData({ ...formData, audioSrc: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold">Add to Radio</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}