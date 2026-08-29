'use client';

import React, { useState, useEffect } from 'react';
import { IInquiry, InquiryStatus } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import {
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  RefreshCw,
  Trash2,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';

export default function AdminInquiriesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [inquiries, setInquiries] = useState<IInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error('Failed to load inquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: InquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((item) => ((item.id || (item as any)._id) === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا الحجز؟' : 'Delete this reservation?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
      }
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || inq.category === categoryFilter;
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.notes && inq.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isAr ? 'مؤكد' : 'Confirmed'}
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5" />
            {isAr ? 'تم التواصل' : 'Contacted'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            <XCircle className="w-3.5 h-3.5" />
            {isAr ? 'ملغي' : 'Cancelled'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            {isAr ? 'قيد الانتظار' : 'Pending'}
          </span>
        );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <AdminNav lang={params.lang} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isAr ? 'لوحة إدارة طلبات الحجز وحجوزات الدورات' : 'Client Inquiries & Course Reservations'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isAr ? `إجمالي الحجوزات: ${inquiries.length}` : `Total Reservations: ${inquiries.length}`}
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{isAr ? 'تحديث' : 'Refresh'}</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
          <input
            type="text"
            placeholder={isAr ? 'بحث بالاسم، الهاتف، الدورة...' : 'Search name, phone, course...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1">
            {['all', 'pending', 'contacted', 'confirmed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 font-bold focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="courses">🎓 Courses</option>
            <option value="camp">🏕️ Camps</option>
            <option value="kids_youth">🎯 Activities</option>
            <option value="bazar">🛍️ Store</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">Loading reservations...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-500">No matching reservations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">{isAr ? 'العميل / الطالب' : 'Client / Student'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'النوع / البرنامج' : 'Type & Course'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'تفاصيل وملاحظات' : 'Details & Notes'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="px-6 py-3.5 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInquiries.map((inq) => {
                  const id = (inq.id || (inq as any)._id) as string;
                  const isCourse = inq.category === 'courses';

                  return (
                    <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Client Info */}
                      <td className="px-6 py-4">
                        <div className="font-black text-gray-900 text-sm">{inq.fullName}</div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{inq.phone}</span>
                          </a>
                          <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-blue-600">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{inq.email}</span>
                          </a>
                        </div>
                      </td>

                      {/* Program Badge */}
                      <td className="px-6 py-4">
                        {isCourse ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Course Reservation</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full capitalize">
                            {inq.category.replace('_', ' ')}
                          </span>
                        )}
                        <div className="text-gray-400 text-[10px] mt-1">{inq.location || 'Maadi Branch'}</div>
                      </td>

                      {/* Details & Notes */}
                      <td className="px-6 py-4 text-gray-700 max-w-xs">
                        <p className="font-medium text-xs line-clamp-2">{inq.notes || 'Direct reservation request'}</p>
                        <span className="text-[10px] text-gray-400 block mt-1">
                          {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">{getStatusBadge(inq.status)}</td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            disabled={updatingId === id}
                            value={inq.status}
                            onChange={(e) => updateStatus(id, e.target.value as InquiryStatus)}
                            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1 bg-white font-bold focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => deleteInquiry(id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
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
    </main>
  );
}